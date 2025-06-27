// Contenido FINAL Y VICTORIOSO para: app_client_logic/deepbook_oracle.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

// --- CONFIGURACIÓN ---
// ¡Recuerda poner aquí el Package ID de tu último despliegue!
const PACKAGE_ID = '0x1b76449b6c4ba6f5b5c31dec9d578d9b0405ac8b53044b8235e6c2fc6f6d2c59'; // Reemplaza si es necesario
const PRICE_THRESHOLD = 1.80;
const ORACLE_KEYPAIR = Ed25519Keypair.fromSecretKey('suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a');

function getSuiPriceFromDeepbook(): number {
    const simulatedPrice = 1.78 + Math.random() * 0.04;
    console.log(`🪙  Precio SUI/USDC (simulado): $${simulatedPrice.toFixed(4)}`);
    return simulatedPrice;
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error(`\nUso: npx ts-node ${process.argv[1]} <SHARED_WALLET_ID> <SAFE_ADDRESS>`);
        return;
    }
    const sharedWalletId = args[0];
    const safeAddress = args[1];

    const client = new SuiClient({ url: getFullnodeUrl('testnet') });
    const oracleAddress = ORACLE_KEYPAIR.getPublicKey().toSuiAddress();

    console.log("🤖 Oracle v2.0 iniciado (versión TypeScript). Monitoreando precios...");
    console.log(`   - Billetera a proteger: ${sharedWalletId}`);
    console.log(`   - Dirección del Oracle: ${oracleAddress}`);
    console.log(`   - Dirección segura de respaldo: ${safeAddress}`);
    console.log(`   - Umbral de activación: < $${PRICE_THRESHOLD}`);
    console.log("------------------------------------------------------------------");

    while (true) {
        try {
            const currentPrice = getSuiPriceFromDeepbook();

            if (currentPrice < PRICE_THRESHOLD) {
                console.log(`🚨 ¡ALERTA! El precio cruzó el umbral. Iniciando retiro de emergencia...`);
                
                // Ya no necesitamos buscar las monedas, el contrato lo hace internamente.
                console.log("   - Construyendo la transacción de retiro v2.0...");
                const txb = new Transaction();
                
                // =======================   LA CORRECCIÓN FINAL   ========================
                // La nueva función en el contrato solo necesita 2 argumentos.
                txb.moveCall({
                    target: `${PACKAGE_ID}::shared_wallet::emergency_withdraw`,
                    arguments: [
                        txb.object(sharedWalletId),
                        txb.pure.address(safeAddress)
                    ],
                });
                // ========================================================================

                console.log("   - Firmando y ejecutando la transacción...");
                const result = await client.signAndExecuteTransaction({
                    signer: ORACLE_KEYPAIR,
                    transaction: txb,
                });
                
                console.log("✅ ¡VICTORIA FINAL! Transacción de retiro de emergencia ejecutada con éxito.");
                console.log(`   - Digest: ${result.digest}`);
                console.log(`🔍 Explora la transacción en: https://suiscan.xyz/testnet/tx/${result.digest}`);
                
                console.log("--- Fin del ciclo de demo ---");
                break;
            }
            await sleep(10000); 
        } catch (e) {
            console.error(`❌ Error durante el monitoreo:`, e);
            await sleep(30000);
        }
    }
}

main().catch(console.error);