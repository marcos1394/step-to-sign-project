// Contenido definitivo para: app_client_logic/publish_model_info.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';
import { fromHEX } from '@mysten/sui/utils';

// --- CONFIGURACIÓN - ¡REEMPLAZA LA CLAVE SECRETA! ---
const PACKAGE_ID = '0xe540d84569a233a606d99db8f1acfd652f6de399db780be17fc18c28052a4732';
const AI_REGISTRY_ID = '0xcbbe5e36e1654ece81d22614a919a533e55acf4bd3489055723b44a8a9ab2861';
const ADMIN_CAP_ID = '0x2d575a159408f2c4d1abb0fc832e2b6bdb4c86d3bbd6a1d30dc8205cee32e40b';

const DATASET_HASH = '7ba3dccc63f4030f329567f135516db061da5d02881e3b0a8fb4577383405317';
const MODEL_HASH = '9d4c5a2f8c69b00930a586774c4afe162cfd5defa4f7e496a7ce7a310a847b4e';
const MODEL_VERSION = "v0.1.0-alpha";

// IMPORTANTE: Pega aquí la clave secreta que exportaste con el comando corregido.
const SENDER_SECRET_KEY_SUI = 'suiprivkey1qq8usdauhgm9pmsp5ms4hdslescykhcqss3g9wtvjgdv8jg4yd4jqtycjyx';

async function main() {
    console.log('🚀 Publicando información del modelo de IA en la DEVNET...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });
    
    const keypair = Ed25519Keypair.fromSecretKey(SENDER_SECRET_KEY_SUI);

    console.log('🧱 Construyendo la transacción para llamar a update_model...');
    const txb = new Transaction();

    txb.moveCall({
        target: `${PACKAGE_ID}::ai_registry::update_model`,
        arguments: [
            txb.object(AI_REGISTRY_ID),
            txb.object(ADMIN_CAP_ID),
            // CORRECCIÓN: Usamos serialización explícita para el String de Move.
            txb.pure(bcs.string().serialize(MODEL_VERSION)),
            // Usamos serialización explícita para los vectores de bytes.
            txb.pure(bcs.vector(bcs.U8).serialize(fromHEX(MODEL_HASH))),
            txb.pure(bcs.vector(bcs.U8).serialize(fromHEX(DATASET_HASH))),
        ],
    });

    console.log('✍️ Firmando y ejecutando la transacción...');
    const result = await suiClient.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
    });

    console.log('✅ ¡Éxito! La información del modelo ha sido registrada en la blockchain.');
    console.log('Digest:', result.digest);
    console.log(`🔍 Explora la transacción aquí: https://suiscan.xyz/devnet/tx/${result.digest}`);
    console.log(`📖 Revisa el objeto del registro aquí: https://suiscan.xyz/devnet/object/${AI_REGISTRY_ID}`);
}

main().catch((error) => console.error('❌ Ocurrió un error:', error));