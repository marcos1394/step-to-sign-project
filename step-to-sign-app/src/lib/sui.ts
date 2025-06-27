// ===================================================================================
//  Step-to-Sign: Lógica de Sui v3.2 (Corrección de Tipos y zkLogin)
// ===================================================================================
// - Corregido el null check en findUserWallet.
// - Reintroducida la función helper 'generateZkLoginSignature' para un manejo correcto.
// ===================================================================================

import { Buffer } from 'buffer';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { blake2b } from '@noble/hashes/blake2b';
import { SuinsClient } from '@mysten/suins';
import { toB64 } from '@mysten/sui/utils';
import { bcs } from '@mysten/sui/bcs';

// --- Imports de zkLogin ---
import { generateNonce, generateRandomness, getZkLoginSignature } from '@mysten/sui/zklogin';
import { decodeJwt } from 'jose';

// --- INTERFACES Y TIPOS ---
export interface AuthData {
  address: string;
  salt: string;
  jwt: string; 
}

export interface BleFunctions {
  sendTxHash: (hash: Uint8Array) => Promise<void>;
  waitForShoeSignature: () => Promise<string>;
}

export interface ExecuteTxParams {
  authData: AuthData;
  ble: BleFunctions;
  recipientAddress: string;
  amountMIST: bigint;
  sharedWalletId: string;
}

// --- CONFIGURACIÓN E INSTANCIAS ---
const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
const suinsClient = new SuinsClient({ client: suiClient, network: 'testnet' });
const ZK_PROVER_URL = 'https://prover-dev.mystenlabs.com/v1';

const PACKAGE_ID = '0x0a48074c8e307f9d80266291447cbf0a9f71ed43a5fee1ac7710ae9907bae749'; 

// --- FUNCIONES PRIVADAS DEL MÓDULO ---

/**
 * Función interna centralizada para generar una firma zkLogin completa.
 */
async function generateZkLoginSignature(authData: AuthData, txBytes: Uint8Array): Promise<ReturnType<typeof getZkLoginSignature>> {    console.log("Generando firma zkLogin...");
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;
    const ephemeralKeypair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeypair.getPublicKey(), maxEpoch, randomness);
    
    // Llamada al ZK Prover para obtener la prueba
    console.log("   - Solicitando prueba al ZK Prover...");
    const proverResponse = await fetch(ZK_PROVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jwt: authData.jwt,
            extendedEphemeralPublicKey: ephemeralKeypair.getPublicKey().toSuiPublicKey(),
            maxEpoch,
            jwtRandomness: randomness,
            salt: authData.salt,
            keyClaimName: 'sub',
        }),
    });
    if (!proverResponse.ok) throw new Error(`Error del ZK Prover: ${await proverResponse.text()}`);
    const zkProof = await proverResponse.json();
    console.log("   - Prueba ZK obtenida.");
    
    // Firmamos los bytes de la transacción con la clave efímera
    const userSignature = await ephemeralKeypair.sign(txBytes);

    // Creamos la firma zkLogin final
    return getZkLoginSignature({ inputs: zkProof, maxEpoch, userSignature });
}



// --- FUNCIONES PÚBLICAS EXPORTABLES ---

export async function findUserWallet(ownerAddress: string): Promise<string | null> {
    console.log(`Buscando billetera para el dueño: ${ownerAddress}`);
    const objectsResponse = await suiClient.getOwnedObjects({ owner: ownerAddress });
    const walletType = `${PACKAGE_ID}::shared_wallet::SharedWallet`;

    for (const obj of objectsResponse.data) {
        // CORRECCIÓN 1: Añadimos una comprobación para asegurar que obj.data no es nulo.
        if (obj.data && obj.data.type === walletType) {
            console.log(`✅ Billetera encontrada: ${obj.data.objectId}`);
            return obj.data.objectId;
        }
    }
    console.log("No se encontró una billetera existente para este usuario.");
    return null;
}

export async function createUserWallet(authData: AuthData, shoePublicKeyB64: string): Promise<string> {
    console.log('Creando nueva SharedWallet para el usuario...');
    const txb = new Transaction();
    txb.setSender(authData.address);
    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::create`,
        arguments: [
            txb.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(shoePublicKeyB64, 'base64')))
        ]
    });

    const txBytes = await txb.build({ client: suiClient });
    
    // CORRECCIÓN 2: Usamos nuestra función 'helper' que maneja la lógica compleja.
    const userSignature = await generateZkLoginSignature(authData, txBytes);
    console.log("✅ Firma de creación zkLogin generada.");

    const result = await suiClient.executeTransactionBlock({
        transactionBlock: txBytes,
        signature: userSignature,
        options: { showObjectChanges: true }
    });

    const createdObject = result.objectChanges?.find(c => c.type === 'created' && c.sender === authData.address);
    if (!createdObject || !('objectId' in createdObject)) {
        throw new Error("La creación de la billetera fue exitosa, pero no se pudo encontrar el ID del objeto creado.");
    }
    return createdObject.objectId;
}

// (getFormattedBalance y resolveSuiNsAddress no han cambiado)
export async function getFormattedBalance(address: string): Promise<string> {
  try {
    const balance = await suiClient.getBalance({ owner: address });
    const balanceInSui = parseInt(balance.totalBalance, 10) / 1_000_000_000;
    return `${balanceInSui.toFixed(2)} SUI`;
  } catch (error) { 
    console.error("Error al obtener el saldo:", error);
    return "Error"; 
  }
}

export async function resolveSuiNsAddress(suiNsName: string): Promise<string | null> {
  try {
    const nameRecord = await suinsClient.getNameRecord(suiNsName);
    return nameRecord?.targetAddress ?? null;
  } catch (error) {
    console.error("Error al resolver el nombre SuiNS:", error);
    return null;
  }
}


export async function executeCoSignedTransaction({ authData, ble, recipientAddress, amountMIST, sharedWalletId }: ExecuteTxParams): Promise<string> {
    console.log('--- Iniciando flujo de transferencia Co-Firmada ---');
  
    // 1. Construir un digest para el hardware
    const txbForDigest = new Transaction();
    txbForDigest.setSender(authData.address);
    const signaturePlaceholder = txbForDigest.pure(bcs.vector(bcs.u8()).serialize(new Uint8Array(64).fill(0)));
    txbForDigest.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::cosign_and_transfer`,
        arguments: [ txbForDigest.object(sharedWalletId), signaturePlaceholder, txbForDigest.pure.u64(amountMIST), txbForDigest.pure.address(recipientAddress) ],
    });
    const txBytesForDigest = await txbForDigest.build({ client: suiClient, onlyTransactionKind: true });
    const intentMessage = new Uint8Array([3, 0, 0, ...txBytesForDigest]);
    const txDigest = blake2b(intentMessage, { dkLen: 32 });
    
    // 2. Obtener firma del Hardware vía BLE
    await ble.sendTxHash(txDigest);
    console.log('📱 App: Petición de firma enviada al zapato. Por favor, haz el gesto...');
    const shoeSignatureBase64 = await ble.waitForShoeSignature();
    console.log('👟 App: ¡Firma del zapato recibida!');
  
    // 3. Construir la transacción FINAL con la firma real del zapato
    const txbFinal = new Transaction();
    txbFinal.setSender(authData.address);
    const { data: gasCoins } = await suiClient.getCoins({ owner: authData.address });
    if (!gasCoins.length) throw new Error(`La dirección zkLogin ${authData.address} no tiene monedas de gas.`);
    txbFinal.setGasPayment(gasCoins.map(c => ({ objectId: c.coinObjectId, version: c.version, digest: c.digest })));
    txbFinal.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::cosign_and_transfer`,
        arguments: [
            txbFinal.object(sharedWalletId),
            txbFinal.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(shoeSignatureBase64, 'base64'))),
            txbFinal.pure.u64(amountMIST),
            txbFinal.pure.address(recipientAddress)
        ],
    });
    const finalTxBytes = await txbFinal.build({ client: suiClient });

    // 4. Obtener la firma zkLogin para la transacción FINAL (reutilizando nuestra función helper)
    const userSignature = await generateZkLoginSignature(authData, finalTxBytes);
    console.log('✅ Firma zkLogin final generada.');
  
    // 5. Ejecutar
    console.log('🚀 App: Enviando transacción final con co-firma como argumento...');
    const executeResult = await suiClient.executeTransactionBlock({
        transactionBlock: finalTxBytes,
        signature: userSignature,
        options: { showEffects: true }
    });
  
    return executeResult.digest;
}