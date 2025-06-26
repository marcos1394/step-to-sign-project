// Contenido definitivo para: app_client_logic/full_lifecycle_test.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

// --- CONFIGURACIÓN FINAL - DATOS REALES DE TU ÚLTIMO DESPLIEGUE EN TESTNET ---
const PACKAGE_ID = '0xc218eb7f1491a8e2f87b652f9685852b0f02bf9f2d82f6220cca09cc28ede2c5';
const AI_REGISTRY_ID = '0xccfd91ba683faac725ae56458c689dea3a3d2cc915b27f4f549abe67bd03ba6e';
const AI_ADMIN_CAP_ID = '0x7032dbc2d3e394216126124e2738828ae23eca507f5aaaf8ac14c804194aa43b';
const SHOE_ADMIN_CAP_ID = '0x511e48c5baba5b15d1ae00582c894ba5ae7e4d7dfbdae8bbf0056f0402d5484b';

// CIDs que obtuvimos de Walrus
const DATASET_CID = 'VwPzBBo-T8nhsDW0FCsk-X7M36EOgV4YJRn3URDbUZ8';
const MODEL_CID = 'M_X4b9CkJIQCrREaml2JMgA5ZZ4i-gukoj3E3VXJln0';
const MODEL_VERSION = "v2.0-lstm";

// La clave secreta de tu billetera administradora 'zealous-cymophane'
const ADMIN_SECRET_KEY_SUI = 'suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a';

async function main() {
    console.log('🚀 Iniciando DEMO DE CICLO DE VIDA COMPLETO...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
    
    const adminKeypair = Ed25519Keypair.fromSecretKey(ADMIN_SECRET_KEY_SUI);
    const adminAddress = adminKeypair.getPublicKey().toSuiAddress();
    
    // --- FASE 1: REGISTRAR EL MODELO DE IA ---
    console.log('\n--- FASE 1: Registrando el Modelo de IA y su Dataset en la Blockchain ---');
    const txbRegister = new Transaction();
    txbRegister.moveCall({
        target: `${PACKAGE_ID}::ai_registry::update_model`,
        arguments: [
            txbRegister.object(AI_REGISTRY_ID),
            txbRegister.object(AI_ADMIN_CAP_ID),
            txbRegister.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(MODEL_VERSION))),
            txbRegister.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(MODEL_CID))),
            txbRegister.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(DATASET_CID))),
        ],
    });
    const registerResult = await suiClient.signAndExecuteTransaction({ signer: adminKeypair, transaction: txbRegister });
    console.log(`✅ Modelo registrado con éxito. Digest: ${registerResult.digest}`);
    await suiClient.waitForTransaction({ digest: registerResult.digest });


    // --- FASE 2: MINTEAR EL NFT DEL ZAPATO ---
    console.log('\n--- FASE 2: Minteando el ShoeNFT para el usuario ---');
    const txbMint = new Transaction();
    txbMint.moveCall({
        target: `${PACKAGE_ID}::shoe_nft::mint`,
        arguments: [
            txbMint.object(SHOE_ADMIN_CAP_ID),
            txbMint.pure(bcs.string().serialize("Founder's Edition #001")),
            txbMint.pure(bcs.string().serialize("Certificado de propiedad digital para el revolucionario sistema Step-to-Sign.")),
            txbMint.pure(bcs.string().serialize("https://i.imgur.com/3ZKJQ3S.png")),
            txbMint.pure.u64(1),
            txbMint.pure.address(adminAddress),
        ],
    });
    const mintResult = await suiClient.signAndExecuteTransaction({ signer: adminKeypair, transaction: txbMint, options: { showObjectChanges: true } });
    await suiClient.waitForTransaction({ digest: mintResult.digest });
    const createdNft = mintResult.objectChanges?.find(c => c.type === 'created' && c.objectType.endsWith('::shoe_nft::ShoeNFT'));
    if (!createdNft || !('objectId' in createdNft)) throw new Error("Fallo al mintear el NFT.");
    const shoeNftId = createdNft.objectId;
    console.log(`✅ ShoeNFT minteado con éxito. ID: ${shoeNftId}`);


    // --- FASE 3: VINCULAR EL NFT AL MODELO ---
    console.log('\n--- FASE 3: Actualizando el NFT para que apunte al modelo de IA ---');
    const txbLink = new Transaction();
    txbLink.moveCall({
        target: `${PACKAGE_ID}::shoe_nft::update_model_on_nft`,
        arguments: [
            txbLink.object(shoeNftId),
            txbLink.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(MODEL_VERSION))),
            txbLink.pure(bcs.vector(bcs.U8).serialize(new TextEncoder().encode(MODEL_CID))),
        ],
    });
    const linkResult = await suiClient.signAndExecuteTransaction({ signer: adminKeypair, transaction: txbLink });
    console.log(`✅ NFT actualizado con la información del modelo. Digest: ${linkResult.digest}`);

    console.log("\n\n🎉 ¡VICTORIA FINAL! Arquitectura Completa Demostrada 🎉");
    console.log("Hemos creado un NFT, registrado un modelo de IA en la blockchain, y vinculado ambos.");
    console.log(`🔍 Explora el resultado final en tu NFT: https://suiscan.xyz/testnet/object/${shoeNftId}`);
}

main().catch((error) => {
    console.error('❌ Ocurrió un error:', error);
    if(error.cause) console.error('🔍 Causa Raíz:', error.cause);
});
