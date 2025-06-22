import type { SignatureScheme } from '../cryptography/index.js';
import { Signer } from '../cryptography/index.js';
import type { MultiSigPublicKey } from './publickey.js';
export declare class MultiSigSigner extends Signer {
    #private;
    constructor(pubkey: MultiSigPublicKey, signers?: Signer[]);
    getKeyScheme(): SignatureScheme;
    getPublicKey(): MultiSigPublicKey;
    sign(_data: Uint8Array): never;
    signData(_data: Uint8Array): never;
    signTransaction(bytes: Uint8Array): Promise<{
        signature: string;
        bytes: string;
    }>;
    signPersonalMessage(bytes: Uint8Array): Promise<{
        signature: string;
        bytes: string;
    }>;
}
