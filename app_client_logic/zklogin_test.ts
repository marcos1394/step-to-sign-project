// Contenido corregido y final para: app_client_logic/zklogin_test.ts
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { computeZkLoginAddress, generateNonce, generateRandomness } from '@mysten/sui/zklogin';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { decodeJwt } from 'jose';
import { randomBytes } from 'crypto';

// --- CONFIGURACIÓN ---
// ¡¡NUEVO Y DEFINITIVO ID de Cliente!!
const GOOGLE_CLIENT_ID = '322077442996-1h8528pfc6f662h8all6e8c0qp0ev5hh.apps.googleusercontent.com';
const REDIRECT_URI = 'https://zklogin.sui.io/auth';

async function main() {
    console.log('🚀 Iniciando flujo de prueba de zkLogin...');
    const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

    // --- FASE 1: GENERAR LOS DATOS PARA EL LOGIN ---
    
    const ephemeralKeypair = new Ed25519Keypair();
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + 2;

    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeypair.getPublicKey(), maxEpoch, randomness);
    
    console.log(`\n--- PASO 1: AUTORIZACIÓN MANUAL ---`);
    console.log(`🔑 Nonce generado: ${nonce}`);
    
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: nonce,
    });

    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    console.log("\nACTION REQUIRED:");
    console.log("1. Abre la siguiente URL en tu navegador:");
    console.log(loginUrl);
    console.log("2. Inicia sesión con tu cuenta de Google.");
    console.log("3. Serás redirigido a una página de zklogin.sui.io. En la URL de esa página, busca una parte que dice '#id_token=...'");
    console.log("4. Copia el valor LARGO que está después de '#id_token=' y pégalo abajo.");

    const jwt = await promptForInput('Pega el JWT aquí: ');

    // --- FASE 2: GENERAR LA DIRECCIÓN SUI A PARTIR DEL JWT ---
    console.log('\n--- FASE 2: Generando Dirección Sui desde el JWT ---');

    const decoded_jwt = decodeJwt(jwt);
    if (!decoded_jwt.sub || !decoded_jwt.aud) {
        throw new Error("JWT inválido.");
    }
    
    const userSalt = BigInt("123456789012345678901234567890");
    
    const userZkLoginAddress = computeZkLoginAddress({
      claimName: 'sub',
      claimValue: decoded_jwt.sub,
      userSalt: userSalt.toString(),
      iss: decoded_jwt.iss as string,
      aud: decoded_jwt.aud as string,
    });

    console.log(`✅ ¡Dirección zkLogin generada con éxito!`);
    console.log(`   - Dirección: ${userZkLoginAddress}`);
    console.log("Esta dirección ahora puede ser usada como una de las claves en nuestra Multi-Firma.");
}


// Función helper para leer la entrada del usuario en la terminal
function promptForInput(prompt: string): Promise<string> {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        readline.question(prompt, (input: string) => {
            readline.close();
            resolve(input);
        });
    });
}


main().catch(console.error);

