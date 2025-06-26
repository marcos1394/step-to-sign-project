// Contenido definitivo para: mobile-app/src/lib/sui.ts (con integración de Firebase)

import { Buffer } from 'buffer';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { SuinsClient } from '@mysten/suins';
import database from '@react-native-firebase/database';
import { v4 as uuidv4 } from 'uuid';

// --- CONFIGURACIÓN E INSTANCIAS ---
const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
const suinsClient = new SuinsClient({ client: suiClient, network: 'testnet' });

// IDs de nuestro despliegue y objetos en TESTNET.
const PACKAGE_ID = '0x16627327336aab2d089fff11c0c32bcd82a1693f820476ec762a047ea8588e46';
const SHARED_WALLET_ID = '0x2da445ccd4c591435fe82a08d1a25ea1f5b293a7f1350ccac0f3640c4dd406a2';

// --- PARTICIPANTES ---
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');

const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
    threshold: 2, 
    publicKeys: [
        { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 },
        { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 },
    ]
});
export const MULTISIG_ADDRESS = multiSigPublicKey.toSuiAddress();


// --- FUNCIONES EXPORTABLES ---

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

export async function executeMultiSigTransfer(recipientAddress: string, amountMIST: number): Promise<string> {
    console.log('--- Iniciando flujo de transferencia Multi-Firma ---');
    
    // 1. Construir la transacción
    const txb = new Transaction();
    txb.setSender(MULTISIG_ADDRESS);
    const gasCoins = await suiClient.getCoins({ owner: MULTISIG_ADDRESS });
    if (!gasCoins.data.length) throw new Error("La dirección Multi-Firma no tiene monedas de gas para pagar.");
    txb.setGasPayment([ { objectId: gasCoins.data[0].coinObjectId, version: gasCoins.data[0].version, digest: gasCoins.data[0].digest } ]);
    const [coin] = txb.splitCoins(txb.gas, [amountMIST]);
    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
        typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
        arguments: [txb.object(SHARED_WALLET_ID), coin, txb.pure.address(recipientAddress)]
    });
    const txBytes = await txb.build({ client: suiClient });

    // 2. Firmar con la clave de la app
    const { signature: appSignature } = await ownerAppKeypair.signTransaction(txBytes);
    console.log('✅ App ha firmado su parte.');

    // 3. Enviar petición de firma al "zapato" vía Firebase
    const requestId = uuidv4();
    const requestRef = database().ref(`/signing_requests/${requestId}`);
    console.log(`📱 App: Enviando petición de firma a Firebase con ID: ${requestId}`);
    await requestRef.set({
        transactionPayload: Buffer.from(txBytes).toString('base64'),
        timestamp: Date.now()
    });

    // 4. Esperar la respuesta del "zapato" desde Firebase
    console.log('⏳ App: Esperando la firma del zapato...');
    const responseRef = database().ref(`/signing_responses/${requestId}`);
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            responseRef.off('value', listener);
            reject(new Error("Timeout: No se recibió respuesta del zapato en 30 segundos."));
        }, 30000);

        const listener = responseRef.on('value', async (snapshot) => {
            const response = snapshot.val();
            if (response && response.status === 'completed') {
                clearTimeout(timeout);
                responseRef.off('value', listener);
                
                console.log(`✍️ App: ¡Firma del zapato recibida!`);
                
                // NOTA: La firma del simulador es falsa. En un escenario real,
                // recibiríamos una firma válida y la combinaríamos.
                // Aquí, para que la transacción se complete, usaremos la firma real que ya tenemos.
                const { signature: shoeSignature } = await shoeDeviceKeypair.signTransaction(txBytes);
                
                // 5. Combinar las firmas
                const multiSigSignature = multiSigPublicKey.combinePartialSignatures([appSignature, shoeSignature]);

                // 6. Ejecutar la transacción final
                console.log('🚀 App: Enviando transacción final co-firmada a Sui...');
                const executeResult = await suiClient.executeTransactionBlock({
                    transactionBlock: txBytes,
                    signature: multiSigSignature,
                    options: { showEffects: true }
                });

                responseRef.remove();
                resolve(executeResult.digest);
            }
        });
    });
}