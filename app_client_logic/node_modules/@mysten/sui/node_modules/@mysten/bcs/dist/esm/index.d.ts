import { toBase58, fromBase58, toBase64, fromBase64, toHex, fromHex } from '@mysten/utils';
import type { BcsTypeOptions } from './bcs-type.js';
import { BcsType, isSerializedBcs, SerializedBcs } from './bcs-type.js';
import { bcs } from './bcs.js';
import { BcsReader } from './reader.js';
import type { EnumInputShape, EnumOutputShape, EnumOutputShapeWithKeys, InferBcsInput, InferBcsType } from './types.js';
import { decodeStr, encodeStr, splitGenericParameters } from './utils.js';
import type { BcsWriterOptions } from './writer.js';
import { BcsWriter } from './writer.js';
export { bcs, BcsType, type BcsTypeOptions, SerializedBcs, isSerializedBcs, toBase58, fromBase58, toBase64, fromBase64, toHex, fromHex, encodeStr, decodeStr, splitGenericParameters, BcsReader, BcsWriter, type BcsWriterOptions, type InferBcsInput, type InferBcsType, type EnumOutputShape, type EnumInputShape, type EnumOutputShapeWithKeys, };
/** @deprecated use toBase58 instead */
export declare const toB58: (buffer: Uint8Array) => string;
/** @deprecated use fromBase58 instead */
export declare const fromB58: (str: string) => Uint8Array<ArrayBufferLike>;
/** @deprecated use toBase64 instead */
export declare const toB64: typeof toBase64;
/** @deprecated use fromBase64 instead */
export declare const fromB64: typeof fromBase64;
/** @deprecated use toHex instead */
export declare const toHEX: typeof toHex;
/** @deprecated use fromHex instead */
export declare const fromHEX: typeof fromHex;
