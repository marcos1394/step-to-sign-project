// Contenido final y completo para: app_client_logic/mint_nft.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

// --- CONFIGURACIÓN CON TUS DATOS DEFINITIVOS DE TESTNET ---
const PACKAGE_ID = '0xc218eb7f1491a8e2f87b652f9685852b0f02bf9f2d82f6220cca09cc28ede2c5';
const SHOE_ADMIN_CAP_ID = '0x511e48c5baba5b15d1ae00582c894ba5ae7e4d7dfbdae8bbf0056f0402d5484b';

// Tu clave secreta para la billetera administradora (zealous-cymophane), que acabas de exportar.
const ADMIN_SECRET_KEY_SUI = 'suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a';

async function main() {
    console.log('👟 Minteando nuestro primer ShoeNFT en la TESTNET...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
    
    // Usamos la clave del administrador que posee la ShoeAdminCap.
    const adminKeypair = Ed25519Keypair.fromSecretKey(ADMIN_SECRET_KEY_SUI);
    const adminAddress = adminKeypair.getPublicKey().toSuiAddress();
    console.log(`👤 Minteando como el administrador: ${adminAddress}`);

    // Datos para nuestro primer NFT de edición limitada.
    const nftName = "Step-to-Sign Founder's Edition #001";
    const nftDescription = "Un certificado de propiedad digital para el revolucionario sistema de firma biométrica Step-to-Sign. Este NFT representa uno de los primeros dispositivos creados.";
    const nftImageUrl = "https://i.imgur.com/3ZKJQ3S.png"; // Una imagen placeholder genial para nuestro zapato
    const shoeSerialNumber = 1;

    console.log('🧱 Construyendo la transacción para llamar a la función `mint`...');
    const txb = new Transaction();

    txb.moveCall({
        target: `${PACKAGE_ID}::shoe_nft::mint`,
        arguments: [
            txb.object(SHOE_ADMIN_CAP_ID),
            txb.pure(bcs.string().serialize(nftName)),
            txb.pure(bcs.string().serialize(nftDescription)),
            txb.pure(bcs.string().serialize(nftImageUrl)),
            txb.pure.u64(shoeSerialNumber),
            txb.pure.address(adminAddress), // Por ahora, nos lo transferimos a nosotros mismos.
        ],
    });

    console.log('✍️ Firmando y ejecutando la transacción de minteo...');
    const result = await suiClient.signAndExecuteTransaction({
        signer: adminKeypair,
        transaction: txb,
        options: { showObjectChanges: true },
    });

    await suiClient.waitForTransaction({ digest: result.digest });

    const createdNft = result.objectChanges?.find(
        (change) => (change.type === 'created' && change.objectType.endsWith('::shoe_nft::ShoeNFT'))
    );

    if (!createdNft || !('objectId' in createdNft)) {
        throw new Error("Fallo al encontrar el ID del ShoeNFT minteado.");
    }

    const nftId = createdNft.objectId;
    console.log('🎉 ¡ÉXITO! Tu primer ShoeNFT ha sido creado.');
    console.log(`   - ID del NFT: ${nftId}`);
    console.log(`   - Propietario: ${adminAddress}`);
    console.log(`🔍 Explora tu nuevo NFT aquí: https://suiscan.xyz/testnet/object/${nftId}`);
}

main().catch((error) => console.error('❌ Ocurrió un error:', error));