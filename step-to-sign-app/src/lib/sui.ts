// Contenido definitivo, listo para producción, apuntando a TESTNET.

import { Buffer } from 'buffer';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { SuinsClient } from '@mysten/suins';

// --- CONFIGURACIÓN E INSTANCIAS ---
const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
// Apuntamos el cliente de SuiNS a 'testnet'
const suinsClient = new SuinsClient({ client: suiClient, network: 'testnet' });

// IDs de nuestro despliegue y objetos en TESTNET.
const PACKAGE_ID = '0x16627327336aab2d089fff11c0c32bcd82a1693f820476ec762a047ea8588e46';
// ¡ID de la SharedWallet que creamos exitosamente en el último script!
const SHARED_WALLET_ID = '0x2da445ccd4c591435fe82a08d1a25ea1f5b293a7f1350ccac0f3640c4dd406a2';

// Claves secretas de los participantes de la Multi-Firma.
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');

// Reconstruimos la dirección Multi-Firma para usarla en la app.
const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
    threshold: 2, 
    publicKeys: [
        { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 },
        { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 },
    ]
});
export const MULTISIG_ADDRESS = multiSigPublicKey.toSuiAddress();


// --- FUNCIONES EXPORTABLES PARA LA APP ---

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
    const txb = new Transaction();
    txb.setSender(MULTISIG_ADDRESS);
    
    const gasCoins = await suiClient.getCoins({ owner: MULTISIG_ADDRESS });
    if (!gasCoins.data.length) {
        throw new Error("La dirección Multi-Firma no tiene monedas de gas para pagar.");
    }
    txb.setGasPayment([ { objectId: gasCoins.data[0].coinObjectId, version: gasCoins.data[0].version, digest: gasCoins.data[0].digest } ]);

    const [coin] = txb.splitCoins(txb.gas, [amountMIST]);
    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
        typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
        arguments: [txb.object(SHARED_WALLET_ID), coin, txb.pure.address(recipientAddress)]
    });
    
    const txBytes = await txb.build({ client: suiClient });

    // En la app real, una firma vendría de la app y la otra del dispositivo IoT.
    const { signature: signature1 } = await ownerAppKeypair.signTransaction(txBytes);
    const { signature: signature2 } = await shoeDeviceKeypair.signTransaction(txBytes);
    
    const multiSigSignature = multiSigPublicKey.combinePartialSignatures([signature1, signature2]);

    const executeResult = await suiClient.executeTransactionBlock({
        transactionBlock: txBytes,
        signature: multiSigSignature,
        options: { showEffects: true }
    });
    
    return executeResult.digest;
}