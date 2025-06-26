// Contenido para: app_client_logic/duress_test.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// --- CONFIGURACIÓN ---
// ¡IMPORTANTE! Pega aquí el Package ID de tu último despliegue (el que tiene la lógica de freeze).
const PACKAGE_ID = '0x2cb6609dae8a8340eee2c3ef243250a6e5b3624e4db1cb0d6554c825901d3d7f'; 

// --- PARTICIPANTES ---
// La billetera del creador/administrador
const creatorKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru');
// Los dos firmantes de la Multi-Sig
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');

// Helper para obtener el estado de congelamiento de la billetera
async function isWalletFrozen(client: SuiClient, walletId: string): Promise<boolean> {
    const object = await client.getObject({ id: walletId, options: { showContent: true } });
    if (object.error || !object.data?.content || object.data.content.dataType !== 'moveObject') {
        throw new Error("No se pudo leer el estado de la billetera.");
    }
    const fields = object.data.content.fields as any;
    return fields.is_frozen;
}

async function main() {
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

    // --- FASE 1: CREACIÓN ---
    console.log('--- FASE 1: Creando Billetera Multi-Firma ---');
    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
        threshold: 2, 
        publicKeys: [ { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 }, { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 } ]
    });
    const multiSigAddress = multiSigPublicKey.toSuiAddress();
    console.log(`✅ Dirección Multi-Firma creada: ${multiSigAddress}`);
    
    // El creador paga para crear la billetera y transferirla a la Multi-Firma
    const txbCreate = new Transaction();
    const [walletObject] = txbCreate.moveCall({ target: `${PACKAGE_ID}::shared_wallet::create_wallet` });
    txbCreate.transferObjects([walletObject], txbCreate.pure.address(multiSigAddress));
    const createResult = await suiClient.signAndExecuteTransaction({ signer: creatorKeypair, transaction: txbCreate, options: { showObjectChanges: true } });
    await suiClient.waitForTransaction({ digest: createResult.digest });
    const createdWalletChange = createResult.objectChanges?.find(c => c.type === 'created' && typeof c.owner === 'object' && 'AddressOwner' in c.owner && c.owner.AddressOwner === multiSigAddress);
    if (!createdWalletChange || !('objectId' in createdWalletChange)) throw new Error("Fallo al crear la SharedWallet.");
    const sharedWalletId = createdWalletChange.objectId;
    console.log(`✅ SharedWallet creada con ID: ${sharedWalletId}`);


    // --- FASE 2: GESTO DE PÁNICO Y CONGELACIÓN ---
    console.log('\n--- FASE 2: Simulando Gesto de Coerción para Congelar ---');
    const txbFreeze = new Transaction();
    txbFreeze.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::freeze_wallet`,
        arguments: [ txbFreeze.object(sharedWalletId) ]
    });
    txbFreeze.setSender(multiSigAddress); // La propia Multi-Firma se congela a sí misma
    
    // Se necesitan ambas firmas (app y zapato) para confirmar el gesto de pánico
    const txFreezeBytes = await txbFreeze.build({ client: suiClient });
    const { signature: sigFreeze1 } = await ownerAppKeypair.signTransaction(txFreezeBytes);
    const { signature: sigFreeze2 } = await shoeDeviceKeypair.signTransaction(txFreezeBytes);
    const multiSigFreeze = multiSigPublicKey.combinePartialSignatures([sigFreeze1, sigFreeze2]);
    
    await suiClient.executeTransactionBlock({ transactionBlock: txFreezeBytes, signature: multiSigFreeze });
    console.log(`❄️ Billetera congelada. Verificando estado...`);
    const isFrozen = await isWalletFrozen(suiClient, sharedWalletId);
    if (!isFrozen) throw new Error("¡Fallo! La billetera debería estar congelada.");
    console.log("✅ Verificado: La billetera está congelada.");


    // --- FASE 3: INTENTO DE TRANSFERENCIA FALLIDO ---
    console.log('\n--- FASE 3: Intentando transferir desde una billetera congelada (debe fallar) ---');
    try {
        const txbExecute = new Transaction();
        const [coin] = txbExecute.splitCoins(txbExecute.gas, [100]);
        txbExecute.moveCall({
            target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
            typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
            arguments: [txbExecute.object(sharedWalletId), coin, txbExecute.pure.address(creatorKeypair.getPublicKey().toSuiAddress())]
        });
        txbExecute.setSender(multiSigAddress);
        const txExecBytes = await txbExecute.build({ client: suiClient });
        const { signature: sigExec1 } = await ownerAppKeypair.signTransaction(txExecBytes);
        const { signature: sigExec2 } = await shoeDeviceKeypair.signTransaction(txExecBytes);
        const multiSigExec = multiSigPublicKey.combinePartialSignatures([sigExec1, sigExec2]);
        await suiClient.executeTransactionBlock({ transactionBlock: txExecBytes, signature: multiSigExec });
    } catch (error) {
        console.log("✅ ¡Éxito! La transacción fue rechazada como se esperaba.");
        console.log(`   - Causa: ${error}`);
    }

    // --- FASE 4: DESCONGELACIÓN POR EL CREADOR ---
    console.log('\n--- FASE 4: El creador original descongela la billetera ---');
    const txbThaw = new Transaction();
    txbThaw.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::thaw_wallet`,
        arguments: [ txbThaw.object(sharedWalletId) ]
    });
    // ¡IMPORTANTE! Quien firma es el CREADOR, no la Multi-Firma.
    await suiClient.signAndExecuteTransaction({ signer: creatorKeypair, transaction: txbThaw });
    console.log(`☀️ Billetera descongelada. Verificando estado...`);
    const isNowThawed = !(await isWalletFrozen(suiClient, sharedWalletId));
    if (!isNowThawed) throw new Error("¡Fallo! La billetera debería estar descongelada.");
    console.log("✅ Verificado: La billetera ya no está congelada.");

    console.log("\n🎉 ¡DEMO DE SEGURIDAD COMPLETA Y EXITOSA!");
}

main().catch(console.error);

