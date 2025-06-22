import type { MultiSigStruct } from '../multisig/publickey.js';
import type { PublicKey } from './publickey.js';
import type { SignatureScheme } from './signature-scheme.js';
/**
 * Pair of signature and corresponding public key
 */
export type SerializeSignatureInput = {
    signatureScheme: SignatureScheme;
    /** Base64-encoded signature */
    signature: Uint8Array;
    /** Base64-encoded public key */
    publicKey?: PublicKey;
};
/**
 * Takes in a signature, its associated signing scheme and a public key, then serializes this data
 */
export declare function toSerializedSignature({ signature, signatureScheme, publicKey, }: SerializeSignatureInput): string;
/**
 * Decodes a serialized signature into its constituent components: the signature scheme, the actual signature, and the public key
 */
export declare function parseSerializedSignature(serializedSignature: string): {
    serializedSignature: string;
    signatureScheme: "ED25519" | "Secp256k1" | "Secp256r1";
    signature: Uint8Array<ArrayBuffer>;
    publicKey: Uint8Array<ArrayBuffer>;
    bytes: Uint8Array<ArrayBufferLike>;
} | {
    signatureScheme: "Passkey";
    serializedSignature: string;
    signature: Uint8Array<ArrayBufferLike>;
    authenticatorData: number[];
    clientDataJson: string;
    userSignature: Uint8Array<ArrayBuffer>;
    publicKey: Uint8Array<ArrayBuffer>;
} | {
    serializedSignature: string;
    signatureScheme: "ZkLogin";
    zkLogin: {
        inputs: {
            proofPoints: {
                a: string[];
                b: string[][];
                c: string[];
            };
            issBase64Details: {
                value: string;
                indexMod4: number;
            };
            headerBase64: string;
            addressSeed: string;
        };
        maxEpoch: string;
        userSignature: number[];
        iss: string;
        addressSeed: bigint;
    };
    signature: Uint8Array<ArrayBufferLike>;
    publicKey: Uint8Array<ArrayBufferLike>;
} | {
    serializedSignature: string;
    signatureScheme: "MultiSig";
    multisig: MultiSigStruct;
    bytes: Uint8Array<ArrayBufferLike>;
    signature: undefined;
};
