// Contenido para: create_wallet.ts (versión con claves reales)

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

const PACKAGE_ID = '0xe1fb34ee01e46ac246d33177c66d5465114328edbff0a92adeaea31d81ba9791';
const SENDER_SECRET_KEY_SUI = 'suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru';

// Las mismas claves secretas que usaremos para firmar en el otro script.
const OWNER_APP_SECRET_KEY = 'suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k';
const SHOE_DEVICE_SECRET_KEY = 'suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6';

async function main() {
    console.log('🚀 Creando una SharedWallet con CLAVES PÚBLICAS REALES...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

    const senderKeypair = Ed25519Keypair.fromSecretKey(SENDER_SECRET_KEY_SUI);
    console.log(`👤 Usando la dirección del sender: ${senderKeypair.getPublicKey().toSuiAddress()}`);

    // ¡NUEVO! Creamos los keypairs para obtener sus claves públicas REALES.
    const ownerKeypair = Ed25519Keypair.fromSecretKey(OWNER_APP_SECRET_KEY);
    const shoeKeypair = Ed25519Keypair.fromSecretKey(SHOE_DEVICE_SECRET_KEY);

    // Obtenemos los bytes de las claves públicas.
    const owner_pubkey_bytes = ownerKeypair.getPublicKey().toRawBytes();
    const shoe_pubkey_bytes = shoeKeypair.getPublicKey().toRawBytes();
    
    console.log('🧱 Construyendo la transacción para registrar las claves públicas reales...');
    const txb = new Transaction();
    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::create_wallet`,
        arguments: [
            txb.pure.vector('u8', Array.from(owner_pubkey_bytes)),
            txb.pure.vector('u8', Array.from(shoe_pubkey_bytes)),
        ],
    });

    console.log('✍️ Firmando y ejecutando la transacción de creación...');
    const result = await suiClient.signAndExecuteTransaction({
        signer: senderKeypair,
        transaction: txb,
        options: { showObjectChanges: true },
    });

    console.log('✅ Transacción de creación ejecutada con éxito. Digest:', result.digest);

    const createdObject = result.objectChanges?.find(
        (change) => (change.type === 'created' && change.objectType.endsWith('::shared_wallet::SharedWallet'))
    );
    
    if (createdObject && 'objectId' in createdObject) {
        const walletId = createdObject.objectId;
        console.log('🎉 ¡NUEVA SharedWallet creada con éxito! ID del Objeto:', walletId);
        console.log('‼️ COPIA ESTE NUEVO ID Y PÉGALO EN EL SCRIPT `execute_transfer.ts`');
        console.log(`🔍 Explora tu nuevo objeto aquí: https://suiscan.xyz/devnet/object/${walletId}`);
    }
}

main().catch((error) => {
    console.error('❌ Ocurrió un error:', error);
    process.exit(1);
});