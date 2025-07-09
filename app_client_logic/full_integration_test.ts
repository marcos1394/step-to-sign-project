// =================================================================
//  Step-to-Sign: SUITE DE PRUEBAS DE ARQUITECTURA FINAL (v6.0)
// =================================================================
// - Valida la arquitectura final con el contrato `shoe_nft` desacoplado.
// - Prueba el flujo principal (minteo directo) y el flujo secundario (uso de Kiosk).
// - Utiliza los IDs de tu último despliegue.
// =================================================================

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

// --- CONFIGURACIÓN (IDs de tu último despliegue) ---
const PACKAGE_ID = '0x81767a045b2a20f9adb864ac6267f9ab2317aa83d083ee3125c835e030792158';
const ADMIN_CAP_ID = '0x4f57c1bca5b84c4ef655c0ff126d2eb9567fae46b21937cced1bff45faaaf565';
const STATS_ORACLE_CAP_ID = '0xa8c6a1653567482037e25b3e1ee12522c2e3cfea6b8261b4a348b382fa3e017c';

// --- PARTICIPANTES DE LA PRUEBA ---
// Administrador que mintea los NFTs
// Administrador que mintea los NFTs
const ADMIN_ORACLE_KEY = 'suiprivkey1qzjgp7zpu85yedau8jyndw8z5f9s2qxvw9jnl2r9e26zks4jk8qxyumvjdj';
// CORRECCIÓN: Usamos fromSuiSecretKey para parsear la clave completa
const adminOracleKeypair = Ed25519Keypair.fromSecretKey(ADMIN_ORACLE_KEY);
const adminOracleAddress = adminOracleKeypair.getPublicKey().toSuiAddress();

// Usuario final que será dueño del NFT (simulando la cuenta Multisig)
const USER_KEY = 'suiprivkey1qzyg8kdx9qd9649dzhhmre53lrqc3q9d4ly27ch3g88676lp5zx9jecmd6s';
// CORRECCIÓN: Usamos fromSuiSecretKey
const userKeypair = Ed25519Keypair.fromSecretKey(USER_KEY);
const userAddress = userKeypair.getPublicKey().toSuiAddress();

// La clave del dispositivo físico (zapato)
const SHOE_KEY = 'suiprivkey1qz842kut8es39p55kkdlqdxu4p4cnkxf3fwyxw6hv8act0edle8k7gmahvg';
// CORRECCIÓN: Usamos fromSuiSecretKey
const shoeKeypair = Ed25519Keypair.fromSecretKey(SHOE_KEY);
const shoePublicKeyBytes = shoeKeypair.getPublicKey().toRawBytes();


// --- FUNCIÓN AUXILIAR ---
async function printNftDetails(client: SuiClient, nftId: string, message: string) {
    console.log(`\n--- ${message} (ID: ${nftId.slice(0, 6)}...) ---`);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Pausa para indexación
    try {
        const response = await client.getObject({ id: nftId, options: { showContent: true } });
        if (response.data?.content?.dataType === 'moveObject') {
            const fields = response.data.content.fields as any;
            console.log(`  - Dueño: ${response.data.owner}`);
            console.log(`  - Pasos: ${fields.steps_total}, Nivel: ${fields.level}`);
            // Verificamos que la clave pública del dispositivo se haya guardado correctamente
            console.log(`  - PubKey del Zapato guardada: ${fields.device_public_key ? '✅ Correcta' : '❌ INCORRECTA'}`);
        } else {
            console.log(`  - No se pudieron obtener los detalles del NFT.`);
        }
    } catch (error) {
        console.log(`  - Error al obtener detalles del NFT: ${(error as Error).message}`);
    }
}

async function main() {
    console.log("🚀 INICIANDO PRUEBA DE ARQUITECTURA FINAL 🚀");
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    // =================================================================
    // FASE 1: FLUJO PRINCIPAL - Minteo directo a la cuenta del usuario
    // =================================================================
    console.log("\n--- FASE 1: Probando el minteo directo (función `mint`) ---");
   const txbMint = new Transaction();
txbMint.moveCall({
    target: `${PACKAGE_ID}::shoe_nft::mint`,
    arguments: [
        txbMint.object(ADMIN_CAP_ID),
        // CORRECCIÓN: Serializamos explícitamente los strings y bytes a vector<u8>
        txbMint.pure(bcs.vector(bcs.u8()).serialize(new TextEncoder().encode('Kinetis Gen 1'))),
        txbMint.pure(bcs.vector(bcs.u8()).serialize(new TextEncoder().encode('Zapato digital con Kinesis Key'))),
        txbMint.pure(bcs.vector(bcs.u8()).serialize(new TextEncoder().encode('https://kinetis.xyz/nft/shoe/1'))),
        txbMint.pure(bcs.vector(bcs.u8()).serialize(shoePublicKeyBytes)),
        txbMint.pure.u64(1),
        txbMint.pure.address(userAddress),
    ]
});

    const mintResult = await client.signAndExecuteTransaction({
        signer: adminOracleKeypair,
        transaction: txbMint,
        options: { showObjectChanges: true, showEvents: true, showEffects:true }
    });

    if (mintResult.effects?.status.status !== 'success') {
        throw new Error(`La TX de minteo directo falló: ${mintResult.effects?.status.error}`);
    }

    const mintEvent = mintResult.events?.find(e => e.type.endsWith('::shoe_nft::ShoeMinted'));
    if (!mintEvent) throw new Error("No se encontró el evento de minteo.");
    const nftId = (mintEvent.parsedJson as any).nft_id;
    console.log(`✅ NFT minteado y transferido al usuario. NFT ID: ${nftId}`);
    await printNftDetails(client, nftId, "Detalles del NFT recién minteado");

    // =================================================================
    // =================================================================
    // FASE 2: FLUJO OPCIONAL - El usuario decide usar Kiosk para vender
    // =================================================================
    console.log("\n--- FASE 2: El usuario crea su Kiosk y guarda su NFT ---");
    
    const txbKioskAndPlace = new Transaction();
    txbKioskAndPlace.setSender(userAddress);
    const [kiosk, kioskCap] = txbKioskAndPlace.moveCall({ target: '0x2::kiosk::new' });
    txbKioskAndPlace.moveCall({
        target: '0x2::kiosk::place',
        typeArguments: [`${PACKAGE_ID}::shoe_nft::ShoeNFT`],
        arguments: [kiosk, kioskCap, txbKioskAndPlace.object(nftId)]
    });
    txbKioskAndPlace.transferObjects([kioskCap], txbKioskAndPlace.pure.address(userAddress));
    txbKioskAndPlace.moveCall({ 
        target: '0x2::transfer::public_share_object', 
        typeArguments: ['0x2::kiosk::Kiosk'], 
        arguments: [kiosk] 
    });

    const kioskAndPlaceResult = await client.signAndExecuteTransaction({
        signer: userKeypair,
        transaction: txbKioskAndPlace,
        options: { showObjectChanges: true, showEffects: true }
    });

    if (kioskAndPlaceResult.effects?.status.status !== 'success') {
        throw new Error(`La TX de Kiosk y Place falló: ${kioskAndPlaceResult.effects?.status.error}`);
    }

    if (!kioskAndPlaceResult.objectChanges) {
        throw new Error("La respuesta de la transacción no incluyó los cambios de objetos esperados.");
    }
    
    const createdKiosk = kioskAndPlaceResult.objectChanges.find(c => c.type === 'created' && c.objectType.endsWith('::kiosk::Kiosk')) as { objectId: string };
    const createdKioskCap = kioskAndPlaceResult.objectChanges.find(c => c.type === 'created' && c.objectType.endsWith('::kiosk::KioskOwnerCap')) as { objectId: string };
    
    if (!createdKiosk || !createdKioskCap) {
        throw new Error("No se pudieron encontrar los IDs del Kiosk o KioskCap en la respuesta.");
    }

    console.log(`✅ Kiosk creado y NFT colocado en una sola transacción.`);
    await printNftDetails(client, nftId, "Detalles del NFT dentro del Kiosk");

    // =================================================================
    // FASE 3: Interacción con el NFT a través del Kiosk
    // =================================================================
    console.log("\n--- FASE 3: Actualizando estadísticas del NFT en el Kiosk ---");

    const oracleCapObject = await client.getObject({ id: STATS_ORACLE_CAP_ID, options: { showOwner: true } });
    if (!oracleCapObject.data) {
        throw new Error(`El objeto StatsOracleCap con ID ${STATS_ORACLE_CAP_ID} no fue encontrado.`);
    }
    const owner = oracleCapObject.data.owner;
    if (owner === null || typeof owner !== 'object' || !('Shared' in owner)) {
        throw new Error("StatsOracleCap no es un objeto compartido.");
    }
    const oracleCapSharedVersion = owner.Shared.initial_shared_version;

    const txbUpdate = new Transaction();
    txbUpdate.setSender(userAddress);
    txbUpdate.moveCall({
        target: `${PACKAGE_ID}::shoe_nft::update_stats`,
        arguments: [
            txbUpdate.object(createdKiosk.objectId),
            txbUpdate.object(createdKioskCap.objectId),
            txbUpdate.pure.id(nftId),
            txbUpdate.sharedObjectRef({ objectId: STATS_ORACLE_CAP_ID, initialSharedVersion: oracleCapSharedVersion, mutable: false }),
            txbUpdate.pure.u64(15000),
        ]
    });
    
    const updateResult = await client.signAndExecuteTransaction({ signer: userKeypair, transaction: txbUpdate, options: {showEffects: true} });
    if (updateResult.effects?.status.status !== 'success') {
        throw new Error(`La TX de actualización falló: ${updateResult.effects?.status.error}`);
    }
    console.log(`✅ Estadísticas del NFT actualizadas.`);
    await printNftDetails(client, nftId, "Detalles del NFT después de la actualización");

    console.log("\n🎉 ¡TODA LA SUITE DE PRUEBAS SE COMPLETÓ EXITOSAMENTE! 🎉");
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});