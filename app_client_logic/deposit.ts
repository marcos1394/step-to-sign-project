// Contenido para: app_client_logic/deposit.ts

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

async function deposit() {
    // El Package ID que ya validamos en duress_test.ts
    const PACKAGE_ID = '0x1b76449b6c4ba6f5b5c31dec9d578d9b0405ac8b53044b8235e6c2fc6f6d2c59';
    
    // El ID de la Billetera que acabas de crear con éxito
    const SHARED_WALLET_ID = '0xa1704fc286306cb99987314c9b52d98c167e6901e6d560f1391bb609ce77fe27'; 
    
    // Usaremos la billetera del "Creador" para tomar 1 SUI y depositarlo
    const depositor = Ed25519Keypair.fromSecretKey('suiprivkey1qpj7jjfw5rme0sdpmzkvjmkp64aqyhzchccy9kch8u6vjv604fn3xzkh67a');
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    const txb = new Transaction();
    // Dividimos 1 SUI de la moneda de gas del creador para depositarlo
    const [coin_to_deposit] = txb.splitCoins(txb.gas, [1_000_000_000]); // 1 SUI en MIST
    
    // Llamamos a la función 'deposit' de nuestro nuevo contrato
    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::deposit`,
        arguments: [txb.object(SHARED_WALLET_ID), coin_to_deposit],
    });

    console.log(`Depositando 1 SUI en la billetera ${SHARED_WALLET_ID}...`);
    const result = await client.signAndExecuteTransaction({ signer: depositor, transaction: txb });
    console.log("✅ Depósito exitoso. Digest:", result.digest);
}

deposit().catch(console.error);