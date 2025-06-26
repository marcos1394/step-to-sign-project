// Contenido final, completo y listo para ejecutar para: app_client_logic/multisig_test.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// --- CONFIGURACIÓN ---
// El Package ID de nuestro contrato final.
const PACKAGE_ID = '0x03acad74d33f82171f281de40b1b060bdfb2cfcb76b66134e3e89c309b2d86f1';
// ¡¡ID ACTUALIZADO!! El ID de la SharedWallet que acabas de crear.
const SHARED_WALLET_ID = '0xc44f8415cece03996450ca172f4c256c82a89f825e9d8ccb05f5c316c5330feb';

// --- PARTICIPANTES ---
const mainUserKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru');
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');


async function main() {
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });
    
    // Construimos la dirección Multi-Firma de nuevo para usarla como sender.
    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
        threshold: 2, 
        publicKeys: [
            { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 },
            { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 },
        ]
    });
    const multiSigAddress = multiSigPublicKey.toSuiAddress();
    console.log(`✅ Usando la Dirección Multi-Firma como sender: ${multiSigAddress}`);
    
    // Paso crucial: nos aseguramos de que la dirección Multi-Firma tenga gas.
    await requestSuiFromFaucetV2({ host: getFaucetHost('devnet'), recipient: multiSigAddress });
    console.log(`💧 Fondos solicitados para la dirección Multi-Firma.`);

    // --- Ejecutando la Transacción Co-Firmada ---
    console.log('\n--- Ejecutando la Transacción de Transferencia Co-Firmada ---');

    const txbExecute = new Transaction();
    // La dirección Multi-Firma usará su propio gas para pagar esta transacción.
    const [coin] = txbExecute.splitCoins(txbExecute.gas, [10000000]); // 0.01 SUI
    txbExecute.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::execute_transfer`,
        typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
        arguments: [txbExecute.object(SHARED_WALLET_ID), coin, txbExecute.pure.address(mainUserKeypair.getPublicKey().toSuiAddress())]
    });
    
    // Le decimos a la transacción que el PÁGADOR del gas es la dirección Multi-Firma
    txbExecute.setSender(multiSigAddress);

    const txBytes = await txbExecute.build({ client: suiClient });

    // 1. Firmar con la primera clave (app)
    const { signature: signature1 } = await ownerAppKeypair.signTransaction(txBytes);
    // 2. Firmar con la segunda clave (zapato)
    const { signature: signature2 } = await shoeDeviceKeypair.signTransaction(txBytes);
    
    console.log('✅ Transacción firmada por ambas claves.');

    // 3. Combinar las firmas en una Multi-Firma
    const multiSigSignature = multiSigPublicKey.combinePartialSignatures([signature1, signature2]);

    // 4. Ejecutar la transacción con la Multi-Firma combinada
    console.log('🚀 Enviando transacción con Multi-Firma...');
    const executeResult = await suiClient.executeTransactionBlock({
        transactionBlock: txBytes,
        signature: multiSigSignature,
        options: { showEffects: true }
    });

    console.log('🎉 ¡VICTORIA FINAL! La transacción Multi-Firma fue aceptada.');
    console.log('Digest:', executeResult.digest);
    console.log(`🔍 Explora la transacción aquí: https://suiscan.xyz/devnet/tx/${executeResult.digest}`);
}

main().catch(console.error);