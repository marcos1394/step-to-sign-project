import type { SuiMoveNormalizedType } from '../client/index.js';
import { Argument } from './data/internal.js';
import type { CallArg } from './data/internal.js';
export declare function extractMutableReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractReference(normalizedType: SuiMoveNormalizedType): SuiMoveNormalizedType | undefined;
export declare function extractStructTag(normalizedType: SuiMoveNormalizedType): Extract<SuiMoveNormalizedType, {
    Struct: unknown;
}> | undefined;
export declare function getIdFromCallArg(arg: string | CallArg): string | undefined;
export declare function isArgument(value: unknown): value is Argument;
