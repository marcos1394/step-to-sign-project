import type { PublicKey } from '../cryptography/publickey.js';
export declare const NONCE_LENGTH = 27;
export declare function generateRandomness(): string;
export declare function generateNonce(publicKey: PublicKey, maxEpoch: number, randomness: bigint | string): string;
