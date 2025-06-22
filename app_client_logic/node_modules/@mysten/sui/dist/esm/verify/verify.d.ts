import type { PublicKey, SignatureScheme } from '../cryptography/index.js';
import type { ZkLoginCompatibleClient } from '../zklogin/publickey.js';
export declare function verifySignature(bytes: Uint8Array, signature: string, options?: {
    address?: string;
}): Promise<PublicKey>;
export declare function verifyPersonalMessageSignature(message: Uint8Array, signature: string, options?: {
    client?: ZkLoginCompatibleClient;
    address?: string;
}): Promise<PublicKey>;
export declare function verifyTransactionSignature(transaction: Uint8Array, signature: string, options?: {
    client?: ZkLoginCompatibleClient;
    address?: string;
}): Promise<PublicKey>;
export declare function publicKeyFromRawBytes(signatureScheme: SignatureScheme, bytes: Uint8Array, options?: {
    client?: ZkLoginCompatibleClient;
    address?: string;
}): PublicKey;
export declare function publicKeyFromSuiBytes(publicKey: string | Uint8Array, options?: {
    client?: ZkLoginCompatibleClient;
    address?: string;
}): PublicKey;
