import type { PublicKey } from '../cryptography/publickey.js';
export declare function toPaddedBigEndianBytes(num: bigint, width: number): Uint8Array;
export declare function toBigEndianBytes(num: bigint, width: number): Uint8Array;
export declare function getExtendedEphemeralPublicKey(publicKey: PublicKey): string;
/**
 * Splits an array into chunks of size chunk_size. If the array is not evenly
 * divisible by chunk_size, the first chunk will be smaller than chunk_size.
 *
 * E.g., arrayChunk([1, 2, 3, 4, 5], 2) => [[1], [2, 3], [4, 5]]
 *
 * Note: Can be made more efficient by avoiding the reverse() calls.
 */
export declare function chunkArray<T>(array: T[], chunk_size: number): T[][];
export declare function hashASCIIStrToField(str: string, maxSize: number): bigint;
export declare function genAddressSeed(salt: string | bigint, name: string, value: string, aud: string, max_name_length?: number, max_value_length?: number, max_aud_length?: number): bigint;
export declare function normalizeZkLoginIssuer(iss: string): string;
