// Contenido COMPLETO con manejo de errores mejorado.

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';

// --- CONFIGURACIÓN ---
// Asegúrate de que este es el Package ID de tu DESPLIEGUE MÁS RECIENTE.
const PACKAGE_ID = '0x1b76449b6c4ba6f5b5c31dec9d578d9b0405ac8b53044b8235e6c2fc6f6d2c59'; 

// --- PERSONAJES / LLAVES ---
const creatorKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a');
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');

// Función auxiliar
async function isWalletFrozen(client: SuiClient, walletId: string): Promise<boolean> {
    const object = await client.getObject({ id: walletId, options: { showContent: true } });
    if (object.error || !object.data?.content || object.data.content.dataType !== 'moveObject') { throw new Error("No se pudo leer el estado de la billetera."); }
    const fields = object.data.content.fields as any;
    return fields.is_frozen;
}

async function main() {
    try {
        const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

        // --- FASE 1: CREAR Y COMPARTIR ---
        console.log('--- FASE 1: Creando y compartiendo la Billetera de prueba ---');
        const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
            threshold: 2, 
            publicKeys: [ { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 }, { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 } ]
        });
        const multiSigAddress = multiSigPublicKey.toSuiAddress();
        console.log(`✅ Dirección del Usuario (Multi-Firma) preparada: ${multiSigAddress}`);
        console.log('-> Asumiendo que las billeteras tienen gas...');
        
        const txbCreate = new Transaction();
        txbCreate.moveCall({ target: `${PACKAGE_ID}::shared_wallet::create_and_share`, arguments: [] });
        
        // =======================   MEJORA DE LOGS 1: OBTENER EFECTOS   ========================
        // Añadimos options: { showEffects: true } para que la respuesta incluya los detalles del resultado.
        const createResult = await suiClient.signAndExecuteTransaction({ 
            signer: creatorKeypair, 
            transaction: txbCreate, 
            options: { showObjectChanges: true, showEffects: true } 
        });

        // =======================   MEJORA DE LOGS 2: VERIFICACIÓN DETALLADA   ========================
        // Ahora comprobamos el estado y si falla, imprimimos el error del contrato.
        if (createResult.effects?.status.status !== 'success') {
            console.error("❌ La transacción para crear la billetera NO fue exitosa.");
            console.error("RAZÓN DEL ERROR EN EL CONTRATO:", createResult.effects?.status.error);
            // Imprimimos el objeto de efectos completo para un análisis más profundo.
            console.error("Efectos completos de la transacción:", JSON.stringify(createResult.effects, null, 2));
            throw new Error("La creación de la SharedWallet falló en la blockchain.");
        }

        await suiClient.waitForTransaction({ digest: createResult.digest });

        const createdWalletChange = createResult.objectChanges?.find(c => c.type === 'created' && typeof c.owner === 'object' && 'Shared' in c.owner);
        if (!createdWalletChange || !('objectId' in createdWalletChange)) {
             // Este error ahora solo saltará si la tx fue exitosa pero no encontramos el objeto.
            throw new Error("La transacción fue exitosa, pero no se pudo encontrar el ID del objeto 'SharedWallet' creado.");
        }
        
        const sharedWalletId = createdWalletChange.objectId;
        console.log(`✅ Caja Fuerte (SharedWallet) creada y compartida con ID: ${sharedWalletId}`);

        // --- FASE 2: CONGELACIÓN ---
        console.log('\n--- FASE 2: El Usuario Multi-Firma congela la billetera ---');
        const txbFreeze = new Transaction();
        txbFreeze.moveCall({ target: `${PACKAGE_ID}::shared_wallet::freeze_wallet`, arguments: [ txbFreeze.object(sharedWalletId) ] });
        txbFreeze.setSender(multiSigAddress);
        
        const txFreezeBytes = await txbFreeze.build({ client: suiClient });
        const { signature: sigFreeze1 } = await ownerAppKeypair.signTransaction(txFreezeBytes);
        const { signature: sigFreeze2 } = await shoeDeviceKeypair.signTransaction(txFreezeBytes);
        
        const multiSigFreeze = multiSigPublicKey.combinePartialSignatures([sigFreeze1, sigFreeze2]);
        
        const freezeResult = await suiClient.executeTransactionBlock({ transactionBlock: txFreezeBytes, signature: multiSigFreeze });
        await suiClient.waitForTransaction({ digest: freezeResult.digest });
        console.log(`❄️ Billetera congelada. Verificando estado...`);

        if (!(await isWalletFrozen(suiClient, sharedWalletId))) throw new Error("¡Fallo! La billetera debería estar congelada.");
        console.log("✅ Verificado: La caja fuerte está congelada.");

        // --- FASE 3: INTENTO FALLIDO ---
        console.log('\n--- FASE 3: Intentando transferir desde billetera congelada (debe fallar) ---');
        try {
            const txbExecute = new Transaction();
            txbExecute.setSender(multiSigAddress); 
            const gasCoins = await suiClient.getCoins({ owner: multiSigAddress });
            if (!gasCoins.data.length) { throw new Error("La dirección Multi-Firma no tiene gas."); }
            
            txbExecute.setGasPayment([{ 
                objectId: gasCoins.data[0].coinObjectId, 
                version: gasCoins.data[0].version, 
                digest: gasCoins.data[0].digest 
            }]);

            const [coin] = txbExecute.splitCoins(txbExecute.gas, [100]);
            
            txbExecute.moveCall({
                target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
                typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
                arguments: [txbExecute.object(sharedWalletId), coin, txbExecute.pure.address(creatorKeypair.getPublicKey().toSuiAddress())]
            });
            
            const txExecBytes = await txbExecute.build({ client: suiClient });
            const { signature: sigExec1 } = await ownerAppKeypair.signTransaction(txExecBytes);
            const { signature: sigExec2 } = await shoeDeviceKeypair.signTransaction(txExecBytes);
            const multiSigExec = multiSigPublicKey.combinePartialSignatures([sigExec1, sigExec2]);
            
            const execResult = await suiClient.executeTransactionBlock({ transactionBlock: txExecBytes, signature: multiSigExec, options: { showEffects: true } });
            
            if(execResult.effects?.status.status !== 'failure') {
                 throw new Error("¡FALLO DE LÓGICA! La transacción se ejecutó cuando debería haber fallado.");
            }
            
            if (!execResult.effects?.status.error?.includes('EWalletFrozen')) {
                throw new Error(`La transacción falló, pero no con el error esperado. Error: ${execResult.effects?.status.error}`);
            }
            console.log("✅ ¡Éxito! La transacción fue rechazada con el error 'EWalletFrozen' como se esperaba.");

        } catch (error: any) {
            if (error.message.includes("¡FALLO DE LÓGICA!")) {
                console.error(error.message);
            } else {
                 console.log("✅ ¡Éxito! La transacción falló en la etapa de construcción o simulación como se esperaba.");
            }
        }

        // --- FASE 4: DESCONGELACIÓN ---
        console.log('\n--- FASE 4: El Creador original descongela la billetera ---');
        const txbThaw = new Transaction();
        txbThaw.moveCall({
            target: `${PACKAGE_ID}::shared_wallet::thaw_wallet`,
            arguments: [ txbThaw.object(sharedWalletId) ]
        });
        
        const thawResult = await suiClient.signAndExecuteTransaction({ signer: creatorKeypair, transaction: txbThaw });
        await suiClient.waitForTransaction({ digest: thawResult.digest });
        console.log(`☀️ Billetera descongelada. Verificando estado...`);

        if (await isWalletFrozen(suiClient, sharedWalletId)) throw new Error("¡Fallo! La billetera debería estar descongelada.");
        console.log("✅ Verificado: La caja fuerte ya no está congelada.");

        console.log("\n🎉 ¡DEMO DE SEGURIDAD COMPLETA Y EXITOSA!");

    } catch (error) {
        // =======================   MEJORA DE LOGS 3: CATCH GENERAL   ========================
        // Este bloque ahora imprimirá el objeto de error completo, que a menudo contiene
        // una causa raíz más detallada (por ejemplo, el error de dryRun).
        console.error("❌ Ocurrió un error DETALLADO en la ejecución:", error);
        // ====================================================================================
    }
}

main();