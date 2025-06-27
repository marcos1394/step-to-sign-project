import { Buffer } from 'buffer';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair, Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { blake2b } from '@noble/hashes/blake2b';
import { SuinsClient } from '@mysten/suins';

// --- Imports de zkLogin ---
import { generateNonce, generateRandomness, getZkLoginSignature } from '@mysten/sui/zklogin';
import { getZkLoginPublicIdentifier } from '@mysten/zklogin';
import { decodeJwt } from 'jose';

// --- INTERFACES Y TIPOS ---
// Estos tipos nos ayudan a mantener el código limpio y a evitar errores.

// Datos del usuario que obtenemos del AuthContext
export interface AuthData {
  address: string;
  salt: string;
  jwt: string; 
}

// Funciones que tomaremos de nuestro hook useBLE
export interface BleFunctions {
  sendTxHash: (hash: Uint8Array) => Promise<void>;
  waitForShoeSignature: () => Promise<string>;
}

// Parámetros para nuestra función principal de ejecución
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

// ¡USAREMOS EL PACKAGE ID QUE YA VALIDAMOS!
const PACKAGE_ID = '0x1b76449b6c4ba6f5b5c31dec9d578d9b0405ac8b53044b8235e6c2fc6f6d2c59'; 

// Esta es la clave pública de nuestro zapato, la que nos dio el monitor serial de Wokwi.
// En un producto real, esto se obtendría durante el proceso de emparejamiento y se guardaría de forma segura.
const SHOE_PUBLIC_KEY_B64 = "uH6ZLvQdoYibgJ/RyecoLltHI/B1/ljHSHzF8zqu5bi9x5ffzOqrTjSP+sAC7Lse+QV6EnTQsXLX2qQzKo5uRQ==";
const shoePublicKey = new Ed25519PublicKey(SHOE_PUBLIC_KEY_B64);


// --- FUNCIONES PÚBLICAS EXPORTABLES ---

/**
 * Obtiene el saldo de una dirección y lo formatea como un string.
 * @param address La dirección de la cual obtener el saldo.
 * @returns El saldo formateado (ej. "10.50 SUI") o "Error".
 */
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

/**
 * Resuelve un nombre de dominio .sui a su dirección correspondiente.
 * @param suiNsName El nombre de dominio a resolver (ej. "step-to-sign.sui").
 * @returns La dirección resuelta o null si no se encuentra.
 */
export async function resolveSuiNsAddress(suiNsName: string): Promise<string | null> {
  try {
    const nameRecord = await suinsClient.getNameRecord(suiNsName);
    return nameRecord?.targetAddress ?? null;
  } catch (error) {
    console.error("Error al resolver el nombre SuiNS:", error);
    return null;
  }
}

/**
 * Orquesta el flujo completo de una transacción multi-firma (zkLogin + Hardware).
 * Esta es la función principal y más importante de nuestra lógica.
 */
export async function executeTransaction({ authData, ble, recipientAddress, amountMIST, sharedWalletId }: ExecuteTxParams): Promise<string> {
  console.log('--- Iniciando flujo de transferencia Multi-Firma REAL (zkLogin + Hardware) ---');
  
  // === PASO 1: Preparar la firma zkLogin (Firma de la App) ===
  console.log('1. Preparando firma zkLogin...');
  const { epoch } = await suiClient.getLatestSuiSystemState();
  const maxEpoch = Number(epoch) + 2;
  const ephemeralKeypair = new Ed25519Keypair();
  const randomness = generateRandomness();
  const nonce = generateNonce(ephemeralKeypair.getPublicKey(), maxEpoch, randomness);
  const jwtPayload = decodeJwt(authData.jwt);
  if (!jwtPayload.sub || !jwtPayload.aud) {
    throw new Error("JWT Inválido. 'sub' o 'aud' no encontrado.");
  }

  // === PASO 2: Construir la transacción para obtener su hash ===
  console.log('2. Construyendo la transacción...');
  const userZkLoginPublicKey = getZkLoginPublicIdentifier(BigInt(authData.salt), "sub", jwtPayload.sub, jwtPayload.aud);
  const multiSigPublicKey = new MultiSigPublicKey({
    threshold: 2,
    publicKeys: [
      { publicKey: userZkLoginPublicKey, weight: 1 },
      { publicKey: shoePublicKey, weight: 1 },
    ],
  });
  const multiSigAddress = multiSigPublicKey.toSuiAddress();
  console.log(`Dirección Multi-Sig dinámica para esta TX: ${multiSigAddress}`);

  const txb = new Transaction();
  txb.setSender(multiSigAddress);
  // Para la demo, el gas lo paga el Oracle/Creador. En un producto real, el usuario necesitaría gas en su dirección multisig.
  const { data: gasCoins } = await suiClient.getCoins({ owner: ORACLE_KEYPAIR.getPublicKey().toSuiAddress() });
  txb.setGasPayment(gasCoins.map(c => ({ objectId: c.coinObjectId, version: c.version, digest: c.digest })));
  const [coin] = txb.splitCoins(txb.gas, [amountMIST]);
  
  txb.moveCall({
    target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
    typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
    arguments: [txb.object(sharedWalletId), coin, txb.pure.address(recipientAddress)]
  });
  const txBytes = await txb.build({ client: suiClient });


  // === PASO 3: Obtener la firma del Hardware (Firma del Zapato) ===
  console.log('3. Solicitando firma del hardware...');
  const intentMessage = new Uint8Array([3, 0, 0, ...txBytes]);
  const digest = blake2b(intentMessage, { dkLen: 32 });

  await ble.sendTxHash(digest);
  console.log('📱 App: Petición de firma enviada al zapato. Por favor, haz el gesto...');
  const shoeSignatureBase64 = await ble.waitForShoeSignature();
  console.log('👟 App: ¡Firma del zapato recibida!');
  
  // === PASO 4: Obtener la prueba ZK y combinar las firmas ===
  console.log('4. Obteniendo prueba ZK y combinando firmas...');
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

  const userSignature = getZkLoginSignature({ inputs: zkProof, maxEpoch, userSignature: ephemeralKeypair.sign(txBytes) });

  const combinedSignature = multiSigPublicKey.combinePartialSignatures([
      userSignature, 
      shoeSignatureBase64 
  ]);

  // === PASO 5: Ejecutar la transacción final ===
  console.log('🚀 App: Enviando transacción final co-firmada a Sui...');
  const executeResult = await suiClient.executeTransactionBlock({
      transactionBlock: txBytes,
      signature: combinedSignature,
      options: { showEffects: true }
  });

  return executeResult.digest;
}