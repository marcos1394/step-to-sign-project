// Contenido final y con tipado seguro para: mobile-app/src/lib/sui.ts

import { Buffer } from 'buffer';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

const PACKAGE_ID = '0xe1fb34ee01e46ac246d33177c66d5465114328edbff0a92adeaea31d81ba9791';
const SHARED_WALLET_ID = '0xa85ce9e5525144cc598c012ac7b8b10959a4db2f4d82b014cdda9f7238fc0df5';
const SENDER_SECRET_KEY_SUI = 'suiprivkey1qrzm68nkfqhqu9ydmg52pmhdh8x5aq78m6tx8rx3yhl744zc8yz6uj5g0ru';
const OWNER_APP_SECRET_KEY = 'suiprivkey1qrd7pnswk69xacz5luuv2ep7kh4xrvvtth7c6t7saflpd865hgzqse2ck5k';
const SHOE_DEVICE_SECRET_KEY = 'suiprivkey1qq2pwm9skvm6fgmpkucgtncdju5m3lhm673vh20m4400y5erp0225hxnat6';


// --- DEFINICIÓN DE TIPO (NUEVO) ---
// Le describimos a TypeScript la forma exacta de nuestro objeto SharedWallet on-chain.
type SharedWalletOnChain = {
  id: { id: string };
  owner_pubkey: number[];
  shoe_signer_pubkey: number[];
  nonce: string; // Los u64 de Move se leen como strings desde el SDK.
}

// --- FUNCIONES EXPORTABLES ---

export async function getFormattedBalance(address: string): Promise<string> {
    try {
        const balance = await suiClient.getBalance({ owner: address });
        const balanceInSui = parseInt(balance.totalBalance, 10) / 1_000_000_000;
        return `${balanceInSui.toFixed(2)} SUI`;
    } catch (error) {
        console.error("Error al obtener el saldo:", error);
        return "Error";
    }
}

export async function executeCoSignedTransfer(): Promise<string> {
    const senderKeypair = Ed25519Keypair.fromSecretKey(SENDER_SECRET_KEY_SUI);
    const ownerKeypair = Ed25519Keypair.fromSecretKey(OWNER_APP_SECRET_KEY);
    const shoeKeypair = Ed25519Keypair.fromSecretKey(SHOE_DEVICE_SECRET_KEY);

    // --- OBTENER EL NONCE ACTUAL (VERSIÓN CORREGIDA) ---
    console.log(`🔎 Consultando el estado actual de la SharedWallet: ${SHARED_WALLET_ID}`);
    const walletObject = await suiClient.getObject({
        id: SHARED_WALLET_ID,
        options: { showContent: true },
    });

    if (walletObject.error || !walletObject.data?.content || walletObject.data.content.dataType !== 'moveObject') {
        throw new Error("No se pudo encontrar el objeto de la billetera o su contenido.");
    }
    
    // CORRECCIÓN: Hacemos un "cast" para que TypeScript sepa qué hay en 'fields'.
    const fields = walletObject.data.content.fields as SharedWalletOnChain;
    
    // Ahora podemos acceder a .nonce de forma segura y sin errores.
    const nonce = fields.nonce;
    console.log(`✅ Nonce actual en la blockchain es: ${nonce}`);
    
    const recipientAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    // Construimos el mensaje a firmar usando el nonce real.
    const messageToSign = new Uint8Array(
        Buffer.concat([
            bcs.Address.serialize(recipientAddress).toBytes(),
            // CORRECCIÓN: Convertimos el nonce (que es un string) a BigInt para serializarlo como u64.
            bcs.U64.serialize(BigInt(nonce)).toBytes()
        ])
    );

    const ownerSignature = await ownerKeypair.sign(messageToSign);
    const shoeSignature = await shoeKeypair.sign(messageToSign);

    const txb = new Transaction();
    const [coin] = txb.splitCoins(txb.gas, [100000000]);

    txb.moveCall({
        target: `${PACKAGE_ID}::shared_wallet::execute_co_signed_transfer`,
        typeArguments: ['0x2::coin::Coin<0x2::sui::SUI>'],
        arguments: [
            txb.object(SHARED_WALLET_ID),
            coin,
            txb.pure.address(recipientAddress),
            txb.pure.vector('u8', Array.from(ownerSignature)),
            txb.pure.vector('u8', Array.from(shoeSignature)),
        ],
    });

    const result = await suiClient.signAndExecuteTransaction({
        signer: senderKeypair,
        transaction: txb,
    });
    
    return result.digest;
}