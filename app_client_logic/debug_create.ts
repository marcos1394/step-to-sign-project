// Contenido corregido para: app_client_logic/debug_create.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

// --- CONFIGURACIÓN ---
// El Package ID de tu último despliegue exitoso.
const PACKAGE_ID = '0x03acad74d33f82171f281de40b1b060bdfb2cfcb76b66134e3e89c309b2d86f1'; 

const mainUserKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru');

// Una dirección de destinatario de prueba.
const recipientAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';

async function main() {
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });
    
    console.log('🔬 MODO DEPURACIÓN: Construyendo la transacción problemática...');
    
    const txb = new Transaction();

    txb.moveCall({ 
        target: `${PACKAGE_ID}::shared_wallet::create_wallet`,
        arguments: [ txb.pure.address(recipientAddress) ]
    });
    
    // --- EL MICROSCOPIO ---
    // Antes de enviarla, vamos a imprimir la estructura de datos interna.
    console.log('\n--- ESTRUCTURA INTERNA DE LA TRANSACCIÓN ---');
    console.log(JSON.stringify(txb.getData(), null, 2));
    console.log('-------------------------------------------\n');

    console.log('🚀 Intentando enviar la transacción para provocar el error...');
    
    // CORRECCIÓN: La variable se llama 'txb', no 'txbCreate'.
    await suiClient.signAndExecuteTransaction({ 
        signer: mainUserKeypair, 
        transaction: txb, 
    });
}

main().catch((error) => {
    console.error('❌ Error esperado:', error.message);
    if(error.cause) {
        console.error('🔍 Causa Raíz (desde el nodo de Sui):', error.cause.executionErrorSource);
    }
});