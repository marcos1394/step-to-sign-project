// Contenido para: app_client_logic/verify_key.ts
// Su único propósito es verificar si una clave secreta corresponde a una dirección.

import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

// La clave secreta que hemos estado usando en todos nuestros scripts.
const SECRET_KEY_IN_SCRIPT = 'suiprivkey1qzjgp7zpu85yedau8jyndw8z5f9s2qxvw9jnl2r9e26zks4jk8qxyumvjdj';

// La dirección que CREEMOS que debería ser generada.
const EXPECTED_ADDRESS = '0x02af8b19d8190534f69bab8f714a3f284fe93e8e63dddd90cdd5483b474a5e7f';

function verifyKey() {
    console.log("🔑 Verificando la correspondencia entre la Clave Secreta y la Dirección...");
    console.log(`   - Clave Secreta que estamos probando: ${SECRET_KEY_IN_SCRIPT}`);
    console.log(`   - Dirección que esperamos obtener:    ${EXPECTED_ADDRESS}`);

    try {
        const keypair = Ed25519Keypair.fromSecretKey(SECRET_KEY_IN_SCRIPT);
        const generatedAddress = keypair.getPublicKey().toSuiAddress();

        console.log(`\n✅ La clave secreta es válida y genera la siguiente dirección:`);
        console.log(`   - Dirección REAL generada:          ${generatedAddress}`);
        
        console.log("\n--- VEREDICTO ---");
        if (generatedAddress === EXPECTED_ADDRESS) {
            console.log("✅ ¡COINCIDEN! El problema es otro más extraño y profundo.");
        } else {
            console.log("❌ ¡NO COINCIDEN! ¡Este es el error! La clave secreta en nuestros scripts es incorrecta.");
        }

    } catch (error) {
        console.error("❌ Error al procesar la clave secreta. Es inválida:", error);
    }
}

verifyKey();