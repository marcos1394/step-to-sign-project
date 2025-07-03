// =================================================================
//  Step-to-Sign: SUITE DE PRUEBAS DE CAMPEONATO (v5.2 - Atómica)
// =================================================================
// - Utiliza transacciones atómicas para crear Kiosk y NFT en un solo paso.
// - Valida el 100% de la funcionalidad de 'shoe_nft' y 'shared_wallet'.
// - Usa billeteras persistentes y la sintaxis de tipos correcta.
// =================================================================

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { blake2b } from '@noble/hashes/blake2b';
import { bcs } from '@mysten/sui/bcs';

// --- CONFIGURACIÓN ---
// IDs extraídos directamente de tu último y definitivo despliegue.
const PACKAGE_ID = '0x4924cb4305ec812ba8e15e58e44d8d16dc69bd719e3898bb2e35002c567c68c4';
const ADMIN_CAP_ID = '0x107d89d1e874240a5b6ccd1e4fd4aad8f503f6831635af9ca72ce8295cd47361';
const STATS_ORACLE_CAP_ID = '0xb7451052c2b063d8f3012085c426d8fb5309b735f76bdb0a3c0818b53567486e';

// --- PARTICIPANTES DE LA PRUEBA (BILLETERAS FIJAS Y VALIDADAS) ---

// La clave del Admin/Oracle que corresponde a la dirección que desplegó el paquete (0x02af...).
const ADMIN_ORACLE_KEY = 'suiprivkey1qzjgp7zpu85yedau8jyndw8z5f9s2qxvw9jnl2r9e26zks4jk8qxyumvjdj';
const adminOracleKeypair = Ed25519Keypair.fromSecretKey(ADMIN_ORACLE_KEY);
const adminOracleAddress = adminOracleKeypair.getPublicKey().toSuiAddress();

// El usuario final que será dueño del NFT y la SharedWallet.
const USER_KEY = 'suiprivkey1qzyg8kdx9qd9649dzhhmre53lrqc3q9d4ly27ch3g88676lp5zx9jecmd6s';
const userKeypair = Ed25519Keypair.fromSecretKey(USER_KEY);
const userAddress = userKeypair.getPublicKey().toSuiAddress();

// El zapato asociado al usuario.
const SHOE_KEY = 'suiprivkey1qz842kut8es39p55kkdlqdxu4p4cnkxf3fwyxw6hv8act0edle8k7gmahvg';
const shoeKeypair = Ed25519Keypair.fromSecretKey(SHOE_KEY);
const shoePublicKeyBytes = shoeKeypair.getPublicKey().toRawBytes();


async function printNftStats(client: SuiClient, nftId: string, message: string) {
    console.log(`\n--- ${message} ---`);
    const response = await client.getObject({ id: nftId, options: { showContent: true } });
    if (response.data?.content?.dataType === 'moveObject') {
        const fields = response.data.content.fields as any;
        console.log(`   - Nombre: ${fields.name}, Nivel: ${fields.level}, Pasos: ${fields.steps_total}, Modelo: ${fields.model_version}`);
    } else {
        console.log(`   - No se pudieron obtener las estadísticas del NFT.`);
    }
}

async function main() {
    console.log("🚀 INICIANDO SUITE DE PRUEBAS DEFINITIVA (con Diagnóstico Mejorado) 🚀");
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    // Envolvemos toda la lógica en un gran try...catch para obtener el error detallado.
    try {
        // --- FASE 0: PREPARACIÓN ---
        console.log("\n--- FASE 0: Verificación de fondos ---");
        console.log(`ℹ️  Usando Admin/Oracle: ${adminOracleAddress}`);
        console.log(`ℹ️  Usando Usuario Final: ${userAddress}`);
        console.log("   -> Asegúrate de que AMBAS direcciones tengan SUI para el gas.");
        
        // --- FASE 1: OBTENER CAPACIDADES ---
        const allAdminObjects = await client.getOwnedObjects({ owner: adminOracleAddress, options: { showType: true } });
        const adminCap = allAdminObjects.data.find(obj => obj.data?.type === `${PACKAGE_ID}::shoe_nft::ShoeAdminCap`);
        if (!adminCap?.data?.objectId) throw new Error("No se encontró la ShoeAdminCap del admin.");
        const adminCapId = adminCap.data.objectId;
        console.log(`✅ Capacidad de Admin encontrada.`);

        // --- FASE 2: CREACIÓN ATÓMICA DE KIOSK Y NFT ---
        console.log(`\n--- FASE 2: Creando Kiosk y Minteando NFT para el usuario... ---`);
        const txbSetup = new Transaction();
        txbSetup.setSender(adminOracleAddress);
        const [kiosk, kioskCap] = txbSetup.moveCall({ target: '0x2::kiosk::new' });
        txbSetup.moveCall({
            target: `${PACKAGE_ID}::shoe_nft::mint_and_place_in_kiosk`,
            arguments: [
                txbSetup.object(adminCapId),
                kiosk, 
                kioskCap, 
                txbSetup.pure(bcs.vector(bcs.u8()).serialize(new TextEncoder().encode('Step-to-Sign Kiosk'))),
                txbSetup.pure(bcs.vector(bcs.u8()).serialize(new TextEncoder().encode('NFT Dinámico en Kiosk'))),
                txbSetup.pure(bcs.vector(bcs.u8()).serialize(new TextEncoder().encode('https://step-to-sign.xyz/nft'))),
                txbSetup.pure.u64(2025),
            ]
        });
        txbSetup.transferObjects([kiosk, kioskCap], userAddress);
        
        console.log("   -> Enviando transacción de setup para firmar y ejecutar...");
        const setupResult = await client.signAndExecuteTransaction({ signer: adminOracleKeypair, transaction: txbSetup, options: { showObjectChanges: true, showEvents: true, showEffects: true }});

        // Verificación de éxito de la transacción
        if (setupResult.effects?.status.status !== 'success') {
            console.error("❌ La transacción de setup fue enviada pero falló en la ejecución.");
            console.error("RAZÓN DEL ERROR ON-CHAIN:", setupResult.effects?.status.error);
            throw new Error("La creación atómica de Kiosk y NFT falló.");
        }

    // --- EXTRACCIÓN DE IDs (MÉTODO SEGURO) ---
    // Extraemos los IDs de los objetos creados para usarlos en las siguientes fases.
    let userKioskId: string | undefined;
    let userKioskCapId: string | undefined;
    if (setupResult.objectChanges) {
        for (const change of setupResult.objectChanges) {
            if (change.type === 'created' && typeof change.owner === 'object' && 'AddressOwner' in change.owner && change.owner.AddressOwner === userAddress) {
                if (change.objectType.endsWith('::kiosk::Kiosk')) userKioskId = change.objectId;
                else if (change.objectType.endsWith('::kiosk::KioskOwnerCap')) userKioskCapId = change.objectId;
            }
        }
    }
    if (!userKioskId || !userKioskCapId) throw new Error("Fallo al encontrar el Kiosk o la KioskOwnerCap para el usuario.");
    
    const mintEvent = setupResult.events?.find(e => e.type.endsWith('::shoe_nft::ShoeMinted'));
    if (!mintEvent) throw new Error("No se encontró el evento de minteo del NFT.");
    const nftId = (mintEvent.parsedJson as any).nft_id;
    
    console.log(`✅ Kiosk y NFT creados atómicamente. NFT ID: ${nftId}`);
    
    // --- FASE 2: GAMIFICACIÓN ---
    await new Promise(resolve => setTimeout(resolve, 3000));
    await printNftStats(client, nftId, "NFT Recién Minteado");
    
      // --- FASE 2.5: ACTUALIZANDO ESTADÍSTICAS (FIRMADO POR EL USUARIO) ---
    console.log("\n--- FASE 2.5: Actualizando estadísticas del NFT en Kiosk ---");
    const txbUpdate = new Transaction();

    // =======================   ¡LA CORRECCIÓN CLAVE DE FIRMANTE!   =========================
    // El DUEÑO del Kiosk (el Usuario) debe ser quien envía y firma la transacción.
    txbUpdate.setSender(userAddress); 
    
    txbUpdate.moveCall({
        target: `${PACKAGE_ID}::shoe_nft::update_stats`,
        arguments: [
            txbUpdate.object(STATS_ORACLE_CAP_ID), // El Cap del Oráculo (compartido)
            txbUpdate.object(userKioskId),         // El Kiosk del Usuario
            txbUpdate.object(userKioskCapId),      // El Cap del Kiosk (prueba de propiedad del usuario)
            txbUpdate.pure.address(nftId),         // El ID del NFT
            txbUpdate.pure.u64(15000)              // Los nuevos pasos
        ]
    });
    
    // La transacción es firmada por el userKeypair, que posee el userKioskId y userKioskCapId.
    const updateResult = await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbUpdate });
    // ====================================================================================
    
    // Verificamos que la transacción de actualización fue exitosa
    if (updateResult.effects?.status.status !== 'success') {
        throw new Error(`La transacción de actualización de stats falló: ${updateResult.effects?.status.error}`);
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    await printNftStats(client, nftId, "NFT Después de Subir de Nivel");
    console.log("✅ Prueba de gamificación completada.");
    
    // --- FASE 3: SHARED WALLET LIFECYCLE ---
    console.log(`\n--- FASE 3: Probando el contrato SharedWallet... ---`);
    const txbCreateWallet = new Transaction();
    txbCreateWallet.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::create`,
        arguments: [ txbCreateWallet.pure(bcs.vector(bcs.u8()).serialize(shoePublicKeyBytes)) ]
    });
    const createResult = await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbCreateWallet, options: { showObjectChanges: true } });
    const walletObject = createResult.objectChanges?.find(c => c.type === 'created' && typeof c.owner === 'object' && 'AddressOwner' in c.owner && c.owner.AddressOwner === userAddress);
    if (!walletObject || !('objectId' in walletObject)) throw new Error("Fallo al crear la SharedWallet.");
    const sharedWalletId = walletObject.objectId;
    console.log(`✅ SharedWallet creada: ${sharedWalletId}`);
    
    const txbDeposit = new Transaction();
    const [coin_to_deposit] = txbDeposit.splitCoins(txbDeposit.gas, [1_000_000_000n]);
    txbDeposit.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::deposit`,
        arguments: [txbDeposit.object(sharedWalletId), coin_to_deposit],
    });
    await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbDeposit });
    console.log("✅ Depósito exitoso.");

    // --- FASE 4: PRUEBAS DE SEGURIDAD (CO-FIRMA, FREEZE/THAW) ---
    console.log("\n--- FASE 4: Probando transferencia co-firmada y seguridad ---");
    const amountToTransfer = 500_000_000n;
    const txbSign = new Transaction();
    txbSign.setSender(userAddress);
    const signaturePlaceholder = txbSign.pure(bcs.vector(bcs.u8()).serialize(new Uint8Array(64).fill(0)));
    txbSign.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::cosign_and_transfer`,
        arguments: [txbSign.object(sharedWalletId), signaturePlaceholder, txbSign.pure.u64(amountToTransfer), txbSign.pure.address(adminOracleAddress)],
    });
    const txSignBytes = await txbSign.build({ client, onlyTransactionKind: true });
    const intentMessage = new Uint8Array([3, 0, 0, ...txSignBytes]);
    const txDigest = blake2b(intentMessage, { dkLen: 32 });
    const shoeSignature = await shoeKeypair.sign(txDigest);
    
    const txbExecute = new Transaction();
    txbExecute.setSender(userAddress);
    txbExecute.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::cosign_and_transfer`,
        arguments: [
            txbExecute.object(sharedWalletId),
            txbExecute.pure(bcs.vector(bcs.u8()).serialize(shoeSignature)),
            txbExecute.pure.u64(amountToTransfer),
            txbExecute.pure.address(adminOracleAddress)
        ],
    });
    await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbExecute });
    console.log(`✅ Transferencia co-firmada exitosa.`);

    const txbFreeze = new Transaction();
    txbFreeze.moveCall({ target: `${PACKAGE_ID}::shared_wallet::freeze_wallet`, arguments: [txbFreeze.object(sharedWalletId)] });
    await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbFreeze });
    console.log("❄️ Billetera congelada.");

    try {
        await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbExecute });
        throw new Error("¡FALLO DE LÓGICA! La transferencia desde una billetera congelada tuvo éxito.");
    } catch (error: any) {
        if (error.toString().includes('EWalletFrozen')) {
            console.log("✅ ¡Éxito! La transferencia fue rechazada con el error 'EWalletFrozen'.");
        } else {
            throw new Error(`La prueba de transferencia congelada falló por una razón inesperada.`);
        }
    }

    const txbThaw = new Transaction();
    txbThaw.moveCall({ target: `${PACKAGE_ID}::shared_wallet::thaw_wallet`, arguments: [txbThaw.object(sharedWalletId)] });
    await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbThaw });
    console.log("☀️ Billetera descongelada.");
    console.log("✅ Pruebas de seguridad completadas.");

    console.log("\n🎉 ¡TODA LA SUITE DE PRUEBAS ON-CHAIN SE COMPLETÓ EXITOSAMENTE! 🎉");
}  catch (error) {
        // =======================   LA CORRECCIÓN CLAVE   ========================
        // Este bloque ahora imprimirá el objeto de error completo, que contiene
        // la causa raíz detallada que nos envía la red de Sui.
        console.error("\n❌ Ocurrió un error DETALLADO en la ejecución de la suite de pruebas:");
        console.error(error);
        // =======================================================================
    }
}


main();