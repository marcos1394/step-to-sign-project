// Contenido final para: create_wallet.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// --- CONFIGURACIÓN ---
// ¡¡ID Definitivo!! Obtenido de tu último despliegue.
const PACKAGE_ID = '0x16627327336aab2d089fff11c0c32bcd82a1693f820476ec762a047ea8588e46';

// --- PARTICIPANTES ---
const mainUserKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru');
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');


async function main() {
    const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

    console.log('--- Creando y Configurando la Billetera Multi-Firma (Método Definitivo) ---');
    
    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
        threshold: 2, 
        publicKeys: [
            { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 },
            { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 },
        ]
    });
    const multiSigAddress = multiSigPublicKey.toSuiAddress();
    console.log(`✅ Dirección Multi-Firma creada: ${multiSigAddress}`);

    await requestSuiFromFaucetV2({ host: getFaucetHost('devnet'), recipient: mainUserKeypair.getPublicKey().toSuiAddress() });
    console.log(`💧 Fondos solicitados para la billetera principal del usuario.`);

    const txb = new Transaction();
    const walletObject = txb.moveCall({ target: `${PACKAGE_ID}::shared_wallet::create_wallet` });
    txb.transferObjects([walletObject], txb.pure.address(multiSigAddress));
    
    console.log('🚀 Creando y transfiriendo la SharedWallet a la dirección Multi-Firma...');
    const createResult = await suiClient.signAndExecuteTransaction({ signer: mainUserKeypair, transaction: txb, options: { showObjectChanges: true } });
    
    await suiClient.waitForTransaction({ digest: createResult.digest });
    
    const createdWalletChange = createResult.objectChanges?.find(
        (c) => c.type === 'created' && c.objectType.endsWith('::shared_wallet::SharedWallet')
    );
    if (!createdWalletChange || !('objectId' in createdWalletChange)) throw new Error("Fallo al crear la SharedWallet.");
    const sharedWalletId = createdWalletChange.objectId;
    
    console.log("\n----------------------------------------------------");
    console.log(`🎉 ¡NUEVA SharedWallet creada con éxito! ID del Objeto: ${sharedWalletId}`);
    console.log('‼️ COPIA ESTE NUEVO ID. Lo necesitaremos para el script `multisig_test.ts`.');
    console.log("----------------------------------------------------");
}

main().catch(console.error);