import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

// =================================================================
// Pega aquí las constantes de tu archivo full_integration_test.ts
// para asegurarnos de que estamos probando con los mismos datos.
// =================================================================
const PACKAGE_ID = 'PEGA_AQUÍ_TU_PACKAGE_ID'; 
const ADMIN_ORACLE_KEY = 'PEGA_AQUÍ_TU_ADMIN_ORACLE_KEY';
// =================================================================

const adminOracleKeypair = Ed25519Keypair.fromSecretKey(ADMIN_ORACLE_KEY);
const adminOracleAddress = adminOracleKeypair.getPublicKey().toSuiAddress();

async function findTheCaps() {
    console.log("🚀 INICIANDO SCRIPT DE DIAGNÓSTICO DE CAPACIDADES 🚀");
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    console.log(`\nBuscando capacidades en la billetera: ${adminOracleAddress}`);
    console.log(`Para el paquete: ${PACKAGE_ID}`);

    try {
        const allAdminObjects = await client.getOwnedObjects({ 
            owner: adminOracleAddress, 
            options: { showType: true } 
        });

        if (allAdminObjects.data.length === 0) {
            console.error("\n❌ RESULTADO: La billetera del Admin no posee NINGÚN objeto.");
            return;
        }

        console.log(`\n✅ Encontrados ${allAdminObjects.data.length} objetos en total. Analizando...`);

        const adminCapType = `${PACKAGE_ID}::shoe_nft::ShoeAdminCap`;
        const statsCapType = `${PACKAGE_ID}::shoe_nft::StatsOracleCap`;

        const adminCap = allAdminObjects.data.find(obj => obj.data?.type === adminCapType);
        const statsCap = allAdminObjects.data.find(obj => obj.data?.type === statsCapType);

        console.log("\n--- RESULTADOS DEL DIAGNÓSTICO ---");
        if (adminCap) {
            console.log(`✅ ShoeAdminCap: ENCONTRADA (ID: ${adminCap.data?.objectId})`);
        } else {
            console.log(`❌ ShoeAdminCap: NO ENCONTRADA`);
        }

        if (statsCap) {
            console.log(`✅ StatsOracleCap: ENCONTRADA (ID: ${statsCap.data?.objectId})`);
        } else {
            console.log(`❌ StatsOracleCap: NO ENCONTRADA`);
        }
        
        console.log("\n--- LISTA COMPLETA DE OBJETOS ENCONTRADOS ---");
        allAdminObjects.data.forEach(obj => {
            console.log(`- ID: ${obj.data?.objectId}, Tipo: ${obj.data?.type}`);
        });


    } catch (error) {
        console.error("\n❌ Ocurrió un error al intentar obtener los objetos:", error);
    }
}

findTheCaps();