// Contenido para: generate_key.ts
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

const keypair = new Ed25519Keypair();
const address = keypair.getPublicKey().toSuiAddress();
const secretKey = keypair.getSecretKey(); // Obtiene la clave en formato base64

console.log("------- 🔑 Nueva Identidad Persistente Creada -------");
console.log(`Dirección (Pública): ${address}`);
console.log("-----------------------------------------------------");
console.log(`Clave Secreta (Base64): ${secretKey}`);
console.log("-----------------------------------------------------");
console.log("‼️ Guarda esta Clave Secreta. La usaremos en el script principal.");