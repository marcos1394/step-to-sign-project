// Contenido corregido para: generate_key.ts

// CORRECCIÓN: Importamos desde el nuevo paquete '@mysten/sui'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

const keypair = new Ed25519Keypair();
const address = keypair.getPublicKey().toSuiAddress();
// Esta función devuelve la clave en el formato Bech32 de Sui.
const secretKey = keypair.getSecretKey(); 

console.log("------- 🔑 Nueva Identidad Persistente Creada -------");
console.log(`Dirección (Pública): ${address}`);
console.log("-----------------------------------------------------");
console.log(`Clave Secreta (Formato Sui): ${secretKey}`);
console.log("-----------------------------------------------------");
console.log("‼️ Guarda esta Clave Secreta. La usaremos en el script principal.");