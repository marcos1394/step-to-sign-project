// Contenido final y completo para: app_client_logic/publish_model_info.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

// --- CONFIGURACIÓN FINAL - DATOS REALES DE NUESTRO PROYECTO ---

// IDs del último despliegue en Testnet
const PACKAGE_ID = '0xc218eb7f1491a8e2f87b652f9685852b0f02bf9f2d82f6220cca09cc28ede2c5';
const AI_REGISTRY_ID = '0xccfd91ba683faac725ae56458c689dea3a3d2cc915b27f4f549abe67bd03ba6e';
const ADMIN_CAP_ID = '0x7032dbc2d3e394216126124e2738828ae23eca507f5aaaf8ac14c804194aa43b';

// CIDs obtenidos de Walrus
const DATASET_CID = 'VwPzBBo-T8nhsDW0FCsk-X7M36EOgV4YJRn3URDbUZ8';
const MODEL_CID = 'M_X4b9CkJIQCrREaml2JMgA5ZZ4i-gukoj3E3VXJln0';
const MODEL_VERSION = "v2.0-lstm";

// Clave secreta de la billetera administradora que posee el AdminCap
const ADMIN_SECRET_KEY_SUI = 'suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a';

async function main() {
    console.log('🔗 Vinculando todo: Registro de IA -> Walrus en la TESTNET...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
    
    const adminKeypair = Ed25519Keypair.fromSecretKey(ADMIN_SECRET_KEY_SUI);

    console.log('🧱 Construyendo la transacción para llamar a update_model...');
    const txb = new Transaction();

    txb.moveCall({
        target: `${PACKAGE_ID}::ai_registry::update_model`,
        arguments: [
            txb.object(AI_REGISTRY_ID),
            txb.object(ADMIN_CAP_ID),
            // Pasamos los strings como vectores de bytes, como espera la función de Move.
            txb.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(MODEL_VERSION))),
            txb.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(MODEL_CID))),
            txb.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(DATASET_CID))),
        ],
    });

    console.log('✍️ Firmando y ejecutando la transacción de registro final...');
    const result = await suiClient.signAndExecuteTransaction({
        signer: adminKeypair,
        transaction: txb,
        options: { showEffects: true }
    });

    console.log('✅ ¡ARQUITECTURA COMPLETA! La información del modelo ha sido registrada en la blockchain.');
    console.log('Digest:', result.digest);
    console.log(`🔍 Explora la transacción aquí: https://suiscan.xyz/testnet/tx/${result.digest}`);
    console.log(`📖 Revisa nuestro objeto AIModelRegistry actualizado aquí: https://suiscan.xyz/testnet/object/${AI_REGISTRY_ID}`);
}

main().catch((error) => console.error('❌ Ocurrió un error:', error));