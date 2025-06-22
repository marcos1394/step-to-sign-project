// Contenido definitivo, basado en la documentación oficial.

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

// --- CONFIGURACIÓN PRINCIPAL ---
const PACKAGE_ID = '0x8d4929e67779940cec777b611496e2e03372c11c2c804eeb0490534caee31b6c';

async function main() {
    console.log('🚀 Conectando con la testnet de Sui usando el SDK moderno...');

    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

    const secretKey_sui = 'suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru';
    const keypair = Ed25519Keypair.fromSecretKey(secretKey_sui);
    
    const userAddress = keypair.getPublicKey().toSuiAddress();
    console.log(`👤 Dirección del usuario para esta sesión: ${userAddress}`);
    console.log('ℹ️ Nota: Esta dirección necesita SUI de la testnet para pagar el gas.');

    // 3. Preparar argumentos para la función
    // Convertimos nuestros Buffers a arrays de números simples, como espera la función.
    const owner_pubkey_array = Array.from(Buffer.from("owner_key_123"));
    const shoe_pubkey_array = Array.from(Buffer.from("shoe_key_456"));

    console.log('🧱 Construyendo la transacción para llamar a create_wallet...');
    const txb = new Transaction();

    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::create_wallet`,
        arguments: [
            // --- LA SOLUCIÓN CORRECTA DE LA DOCUMENTACIÓN ---
            // Usamos el método helper `txb.pure.vector` para ser explícitos.
            txb.pure.vector('u8', owner_pubkey_array),
            txb.pure.vector('u8', shoe_pubkey_array),
        ],
    });

    console.log('✍️ Firmando y ejecutando la transacción...');
    const result = await suiClient.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
        options: {
            showEffects: true,
            showObjectChanges: true,
        },
    });

    console.log('✅ Transacción ejecutada con éxito. Digest:', result.digest);

    const createdObject = result.objectChanges?.find(
        (change) => (change.type === 'created')
    );
    
    if (createdObject && 'objectId' in createdObject) {
        const walletId = createdObject.objectId;
        console.log('🎉 ¡SharedWallet creada con éxito! ID del Objeto:', walletId);
        console.log(`🔍 Explora tu nuevo objeto aquí: https://suiscan.xyz/testnet/object/${walletId}`);
    }
}

main().catch((error) => {
    console.error('❌ Ocurrió un error:', error);
    process.exit(1);
});