import type { IntentScope } from './intent.js';
import type { PublicKey } from './publickey.js';
import type { SignatureScheme } from './signature-scheme.js';
import type { Transaction } from '../transactions/Transaction.js';
import type { ClientWithCoreApi, Experimental_SuiClientTypes } from '../experimental/index.js';
export declare const PRIVATE_KEY_SIZE = 32;
export declare const LEGACY_PRIVATE_KEY_SIZE = 64;
export declare const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
export type ParsedKeypair = {
    scheme: SignatureScheme;
    /** @deprecated use `scheme` instead */
    schema: SignatureScheme;
    secretKey: Uint8Array;
};
export interface SignatureWithBytes {
    bytes: string;
    signature: string;
}
export interface SignAndExecuteOptions {
    transaction: Transaction;
    client: ClientWithCoreApi;
}
/**
 * TODO: Document
 */
export declare abstract class Signer {
    abstract sign(bytes: Uint8Array): Promise<Uint8Array>;
    /**
     * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
     * it ensures that a signed message is tied to a specific purpose and domain separator is provided
     */
    signWithIntent(bytes: Uint8Array, intent: IntentScope): Promise<SignatureWithBytes>;
    /**
     * Signs provided transaction by calling `signWithIntent()` with a `TransactionData` provided as intent scope
     */
    signTransaction(bytes: Uint8Array): Promise<SignatureWithBytes>;
    /**
     * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
     */
    signPersonalMessage(bytes: Uint8Array): Promise<{
        bytes: string;
        signature: string;
    }>;
    signAndExecuteTransaction({ transaction, client, }: SignAndExecuteOptions): Promise<Experimental_SuiClientTypes.TransactionResponse>;
    toSuiAddress(): string;
    /**
     * Get the key scheme of the keypair: Secp256k1 or ED25519
     */
    abstract getKeyScheme(): SignatureScheme;
    /**
     * The public key for this keypair
     */
    abstract getPublicKey(): PublicKey;
}
export declare abstract class Keypair extends Signer {
    /**
     * This returns the Bech32 secret key string for this keypair.
     */
    abstract getSecretKey(): string;
}
/**
 * This returns an ParsedKeypair object based by validating the
 * 33-byte Bech32 encoded string starting with `suiprivkey`, and
 * parse out the signature scheme and the private key in bytes.
 */
export declare function decodeSuiPrivateKey(value: string): ParsedKeypair;
/**
 * This returns a Bech32 encoded string starting with `suiprivkey`,
 * encoding 33-byte `flag || bytes` for the given the 32-byte private
 * key and its signature scheme.
 */
export declare function encodeSuiPrivateKey(bytes: Uint8Array, scheme: SignatureScheme): string;
