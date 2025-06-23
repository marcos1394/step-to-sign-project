// Contenido final, completo y listo para ejecutar para: execute_transfer.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

// --- CONFIGURACIÓN PRINCIPAL ---
const PACKAGE_ID = '0xe1fb34ee01e46ac246d33177c66d5465114328edbff0a92adeaea31d81ba9791';
// ¡¡ID ACTUALIZADO!! Este es el ID de la SharedWallet que acabamos de crear.
const SHARED_WALLET_ID = '0xa85ce9e5525144cc598c012ac7b8b10959a4db2f4d82b014cdda9f7238fc0df5';
// La clave del "dueño" del objeto SharedWallet, quien paga el gas.
const SENDER_SECRET_KEY_SUI = 'suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru';

// --- CLAVES DE PRUEBA REALES (Las que generaste, que coinciden con las guardadas en el objeto) ---
const OWNER_APP_SECRET_KEY = 'suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k';
const SHOE_DEVICE_SECRET_KEY = 'suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6';


async function main() {
    console.log('🚀 Iniciando prueba de co-firma en DEVNET...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

    // 1. Reconstruir todos los keypairs a partir de sus claves secretas válidas.
    const senderKeypair = Ed25519Keypair.fromSecretKey(SENDER_SECRET_KEY_SUI);
    const ownerKeypair = Ed25519Keypair.fromSecretKey(OWNER_APP_SECRET_KEY);
    const shoeKeypair = Ed25519Keypair.fromSecretKey(SHOE_DEVICE_SECRET_KEY);

    const recipientAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const nonce = 0; // El nonce de nuestra wallet recién creada es 0.

    // 2. Construir el mensaje a firmar
    console.log('✍️  Construyendo el mensaje para la firma...');
    const messageToSign = new Uint8Array(
        Buffer.concat([
            bcs.Address.serialize(recipientAddress).toBytes(),
            bcs.U64.serialize(nonce).toBytes()
        ])
    );

    // 3. Generar ambas firmas
    const ownerSignature = await ownerKeypair.sign(messageToSign);
    const shoeSignature = await shoeKeypair.sign(messageToSign);
    console.log('✅ Firmas generadas por el "usuario" y el "zapato".');

    // 4. Construir la transacción
    console.log('🧱 Construyendo la transacción para llamar a execute_co_signed_transfer...');
    const txb = new Transaction();
    
    // Creamos una moneda de 0.1 SUI para transferir, usando el gas del sender.
    const [coin] = txb.splitCoins(txb.gas, [100000000]); 

    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::execute_co_signed_transfer`,
        typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'], 
        arguments: [
            txb.object(SHARED_WALLET_ID),
            coin,
            txb.pure.address(recipientAddress),
            txb.pure.vector('u8', Array.from(ownerSignature)),
            txb.pure.vector('u8', Array.from(shoeSignature)),
        ],
    });

    // 5. Firmar (con la billetera dueña del gas) y ejecutar
    console.log('🚀 Enviando transacción de co-firma a la red...');
    const result = await suiClient.signAndExecuteTransaction({
        signer: senderKeypair,
        transaction: txb,
        options: {
            showEffects: true,
        },
    });

    console.log('🎉 ¡ÉXITO TOTAL! La transacción de co-firma fue aceptada.');
    console.log('Digest:', result.digest);
    console.log(`🔍 Explora la transacción aquí: https://suiscan.xyz/devnet/tx/${result.digest}`);
}

main().catch((error) => {
    console.error('❌ Ocurrió un error:', error);
    process.exit(1);
});