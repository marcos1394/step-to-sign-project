// Contenido final, con el Package ID correcto de TESTNET.

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// --- CONFIGURACIÓN ---
// ¡¡ID DEFINITIVO!! Obtenido de tu último despliegue en TESTNET.
const PACKAGE_ID = '0x7bba093b21f59f1721153ad984aa98412715e8087d266e3aace0f8a2af884ab7'; 

// --- PARTICIPANTES ---
const mainUserKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru');
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');


async function main() {
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

    // --- FASE 1: CREAR Y CONFIGURAR LA BILLETERA MULTI-FIRMA ---
    console.log('--- FASE 1: Creando Billetera Multi-Firma en TESTNET ---');
    
    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
        threshold: 2, 
        publicKeys: [
            { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 },
            { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 },
        ]
    });

    const multiSigAddress = multiSigPublicKey.toSuiAddress();
    console.log(`✅ Dirección Multi-Firma creada: ${multiSigAddress}`);

    // Asumimos que las billeteras ya fueron fondeadas manualmente.
    console.log('✅ Asumiendo que las billeteras han sido fondeadas manualmente.');

    const txbCreate = new Transaction();
    const [walletObject] = txbCreate.moveCall({ target: `${PACKAGE_ID}::shared_wallet::create_wallet` });
    txbCreate.transferObjects([walletObject], txbCreate.pure.address(multiSigAddress));
    
    console.log('🚀 Creando y transfiriendo la SharedWallet a la dirección Multi-Firma...');
    const createResult = await suiClient.signAndExecuteTransaction({ signer: mainUserKeypair, transaction: txbCreate, options: { showObjectChanges: true } });
    
    await suiClient.waitForTransaction({ digest: createResult.digest });
    
    const createdWalletChange = createResult.objectChanges?.find(
        (c) => c.type === 'created' && typeof c.owner === 'object' && 'AddressOwner' in c.owner && c.owner.AddressOwner === multiSigAddress
    );
    if (!createdWalletChange || !('objectId' in createdWalletChange)) throw new Error("Fallo al encontrar el ID de la SharedWallet creada y transferida.");
    const sharedWalletId = createdWalletChange.objectId;
    console.log(`✅ SharedWallet creada y ahora es propiedad de la Multi-Firma. ID: ${sharedWalletId}`);


    // --- FASE 2: EJECUTAR UNA TRANSACCIÓN CO-FIRMADA ---
    console.log('\n--- FASE 2: Ejecutando Transacción Co-Firmada en TESTNET ---');

    const txbExecute = new Transaction();
    const [coin] = txbExecute.splitCoins(txbExecute.gas, [100000000]);
    txbExecute.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
        typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
        arguments: [txbExecute.object(sharedWalletId), coin, txbExecute.pure.address(mainUserKeypair.getPublicKey().toSuiAddress())]
    });
    
    txbExecute.setSender(multiSigAddress);
    const txBytes = await txbExecute.build({ client: suiClient });

    const { signature: signature1 } = await ownerAppKeypair.signTransaction(txBytes);
    const { signature: signature2 } = await shoeDeviceKeypair.signTransaction(txBytes);
    
    const multiSigSignature = multiSigPublicKey.combinePartialSignatures([signature1, signature2]);

    console.log('🚀 Enviando transacción con Multi-Firma...');
    const executeResult = await suiClient.executeTransactionBlock({
        transactionBlock: txBytes,
        signature: multiSigSignature,
        options: { showEffects: true }
    });

    console.log('🎉 ¡VICTORIA FINAL! La transacción Multi-Firma fue aceptada.');
    console.log('Digest:', executeResult.digest);
    console.log(`🔍 Explora la transacción aquí: https://suiscan.xyz/testnet/tx/${executeResult.digest}`);
}

main().catch(console.error);