import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

// --- CONFIGURACIÓN DE LA TRANSFERENCIA ---

// 1. PEGA AQUÍ la clave secreta de UNA de las billeteras que SÍ tiene fondos.
//    (Por ejemplo, la que usaste como 'ADMIN_ORACLE_KEY' antes: 'suiprivkey1qzjgp7zpu...')
const SENDER_SECRET_KEY = 'PEGA_AQUÍ_LA_CLAVE_SECRETA_DE_LA_BILLETERA_CON_FONDOS';

// 2. PEGA AQUÍ la dirección de tu nueva billetera activa (la que necesita los fondos).
const RECIPIENT_ADDRESS = '0x6f595489d064cbd49e47300eec9fc1836618cadd5eb09cd7133c4d8f1a7218d6';

// 3. Define cuántos SUI quieres transferir.
const AMOUNT_TO_TRANSFER_SUI = 1; // Vamos a transferir 1 SUI

// --- LÓGICA DE LA TRANSFERENCIA ---

async function sendSui() {
    try {
        if (SENDER_SECRET_KEY.includes('PEGA_AQUÍ')) {
            throw new Error("Por favor, edita el script y rellena la constante SENDER_SECRET_KEY.");
        }

        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        const senderKeypair = Ed25519Keypair.fromSecretKey(SENDER_SECRET_KEY);
        const senderAddress = senderKeypair.getPublicKey().toSuiAddress();
        
        console.log(`💸 Intentando transferir ${AMOUNT_TO_TRANSFER_SUI} SUI...`);
        console.log(`   - Desde: ${senderAddress}`);
        console.log(`   - Hacia: ${RECIPIENT_ADDRESS}`);

        const txb = new Transaction();
        const amount_in_mist = BigInt(AMOUNT_TO_TRANSFER_SUI * 1_000_000_000);

        // txb.transferSui es una forma fácil de transferir SUI.
        // Automáticamente encuentra las monedas necesarias para el envío y el gas.
        const [coin] = txb.splitCoins(txb.gas, [amount_in_mist]);
        txb.transferObjects([coin], RECIPIENT_ADDRESS);

        const result = await client.signAndExecuteTransaction({
            signer: senderKeypair,
            transaction: txb,
        });

        console.log("\n✅ ¡Transferencia Exitosa!");
        console.log(`   - Digest: ${result.digest}`);
        console.log(`🔍 Explora la transacción en: https://suiscan.xyz/testnet/tx/${result.digest}`);

    } catch (error) {
        console.error("\n❌ Error durante la transferencia:", error);
    }
}

sendSui();