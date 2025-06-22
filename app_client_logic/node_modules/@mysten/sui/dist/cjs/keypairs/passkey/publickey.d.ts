import { PublicKey } from '../../cryptography/publickey.js';
import type { PublicKeyInitData } from '../../cryptography/publickey.js';
export declare const PASSKEY_PUBLIC_KEY_SIZE = 33;
export declare const PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
export declare const PASSKEY_SIGNATURE_SIZE = 64;
/** Fixed DER header for secp256r1 SubjectPublicKeyInfo
DER structure for P-256 SPKI:
30 -- SEQUENCE
  59 -- length (89 bytes)
  30 -- SEQUENCE
    13 -- length (19 bytes)
    06 -- OBJECT IDENTIFIER
      07 -- length
      2A 86 48 CE 3D 02 01 -- id-ecPublicKey
    06 -- OBJECT IDENTIFIER
      08 -- length
      2A 86 48 CE 3D 03 01 07 -- secp256r1/prime256v1
  03 -- BIT STRING
    42 -- length (66 bytes)
    00 -- padding
    ===== above bytes are considered header =====
    04 || x || y -- uncompressed point (65 bytes: 0x04 || 32-byte x || 32-byte y)
*/
export declare const SECP256R1_SPKI_HEADER: Uint8Array<ArrayBuffer>;
/**
 * A passkey public key
 */
export declare class PasskeyPublicKey extends PublicKey {
    static SIZE: number;
    private data;
    /**
     * Create a new PasskeyPublicKey object
     * @param value passkey public key as buffer or base-64 encoded string
     */
    constructor(value: PublicKeyInitData);
    /**
     * Checks if two passkey public keys are equal
     */
    equals(publicKey: PasskeyPublicKey): boolean;
    /**
     * Return the byte array representation of the Secp256r1 public key
     */
    toRawBytes(): Uint8Array;
    /**
     * Return the Sui address associated with this Secp256r1 public key
     */
    flag(): number;
    /**
     * Verifies that the signature is valid for for the provided message
     */
    verify(message: Uint8Array, signature: Uint8Array | string): Promise<boolean>;
}
/**
 * Parses a DER SubjectPublicKeyInfo into an uncompressed public key. This also verifies
 * that the curve used is P-256 (secp256r1).
 *
 * @param data: DER SubjectPublicKeyInfo
 * @returns uncompressed public key (`0x04 || x || y`)
 */
export declare function parseDerSPKI(derBytes: Uint8Array): Uint8Array;
/**
 * Parse signature from bytes or base64 string into the following fields.
 */
export declare function parseSerializedPasskeySignature(signature: Uint8Array | string): {
    signatureScheme: "Passkey";
    serializedSignature: string;
    signature: Uint8Array<ArrayBufferLike>;
    authenticatorData: number[];
    clientDataJson: string;
    userSignature: Uint8Array<ArrayBuffer>;
    publicKey: Uint8Array<ArrayBuffer>;
};
