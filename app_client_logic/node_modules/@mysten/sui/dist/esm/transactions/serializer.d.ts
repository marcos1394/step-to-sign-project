import type { BcsType } from '@mysten/bcs';
import type { SuiMoveNormalizedType } from '../client/index.js';
import type { OpenMoveTypeSignature, OpenMoveTypeSignatureBody } from './data/internal.js';
export declare function isTxContext(param: OpenMoveTypeSignature): boolean;
export declare function getPureBcsSchema(typeSignature: OpenMoveTypeSignatureBody): BcsType<any> | null;
export declare function normalizedTypeToMoveTypeSignature(type: SuiMoveNormalizedType): OpenMoveTypeSignature;
export declare function pureBcsSchemaFromOpenMoveTypeSignatureBody(typeSignature: OpenMoveTypeSignatureBody): BcsType<any>;
