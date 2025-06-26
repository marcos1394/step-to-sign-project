// Contenido para: app_client_logic/setup_for_oracle.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { MultiSigPublicKey } from '@mysten/sui/multisig';
import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// --- CONFIGURACIÓN ---
const PACKAGE_ID = '0x16627327336aab2d089fff11c0c32bcd82a1693f820476ec762a047ea8588e46';

// --- PARTICIPANTES ---
// La billetera que crea todo y actúa como Oracle por defecto
const creatorKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a');
// Los firmantes de la Multi-Sig
const ownerAppKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k');
const shoeDeviceKeypair = Ed25519Keypair.fromSecretKey('suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6');

async function main() {
    console.log('--- Preparando el escenario para la demo del Oracle ---');
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

    const multiSigPublicKey = MultiSigPublicKey.fromPublicKeys({
        threshold: 2, 
        publicKeys: [ { publicKey: ownerAppKeypair.getPublicKey(), weight: 1 }, { publicKey: shoeDeviceKeypair.getPublicKey(), weight: 1 } ]
    });
    const multiSigAddress = multiSigPublicKey.toSuiAddress();
    console.log(`✅ Dirección Multi-Firma: ${multiSigAddress}`);

    // Fondear las billeteras del creador y la multi-firma
    await requestSuiFromFaucetV2({ host: getFaucetHost('testnet'), recipient: creatorKeypair.getPublicKey().toSuiAddress() });
    await requestSuiFromFaucetV2({ host: getFaucetHost('testnet'), recipient: multiSigAddress });
    console.log(`💧 Billeteras fondeadas.`);

    // Crear la SharedWallet y asignarla a la Multi-Firma
    const txbCreate = new Transaction();
    const [walletObject] = txbCreate.moveCall({ target: `${PACKAGE_ID}::shared_wallet::create_wallet` });
    txbCreate.transferObjects([walletObject], txbCreate.pure.address(multiSigAddress));
    
    console.log('🚀 Creando la SharedWallet...');
    const createResult = await suiClient.signAndExecuteTransaction({ signer: creatorKeypair, transaction: txbCreate, options: { showObjectChanges: true } });
    await suiClient.waitForTransaction({ digest: createResult.digest });
    
    const createdWalletChange = createResult.objectChanges?.find(c => c.type === 'created' && typeof c.owner === 'object' && 'AddressOwner' in c.owner && c.owner.AddressOwner === multiSigAddress);
    if (!createdWalletChange || !('objectId' in createdWalletChange)) throw new Error("Fallo al crear la SharedWallet.");
    const sharedWalletId = createdWalletChange.objectId;
    console.log(`✅ SharedWallet creada. ID: ${sharedWalletId}`);
    
    // Ahora, transferimos una moneda de 1 SUI a la SharedWallet para que tenga algo que rescatar
    const txbFund = new Transaction();
    const [coinToFund] = txbFund.splitCoins(txbFund.gas, [1_000_000_000]);
    txbFund.transferObjects([coinToFund], sharedWalletId);
    
    console.log(`💰 Fondeando la SharedWallet con 1 SUI...`);
    await suiClient.signAndExecuteTransaction({ signer: creatorKeypair, transaction: txbFund });

    console.log("\n----------------------------------------------------");
    console.log("✅ ¡Escenario listo!");
    console.log(`   - Billetera a monitorear (SharedWallet ID): ${sharedWalletId}`);
    console.log(`   - Oracle/Creador (y billetera de respaldo): ${creatorKeypair.getPublicKey().toSuiAddress()}`);
    console.log("----------------------------------------------------");
}

main().catch(console.error);
