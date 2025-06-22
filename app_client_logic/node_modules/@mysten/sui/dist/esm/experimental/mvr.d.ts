import type { StructTag } from '../utils/sui-types.js';
import type { ClientCache } from './cache.js';
import type { TransactionDataBuilder } from '../transactions/TransactionData.js';
import type { Experimental_SuiClientTypes } from './types.js';
export interface MvrClientOptions {
    cache: ClientCache;
    url?: string;
    pageSize?: number;
    overrides?: {
        packages?: Record<string, string>;
        types?: Record<string, string>;
    };
}
export declare class MvrClient implements Experimental_SuiClientTypes.MvrMethods {
    #private;
    constructor({ cache, url, pageSize, overrides }: MvrClientOptions);
    resolvePackage({ package: name, }: Experimental_SuiClientTypes.MvrResolvePackageOptions): Promise<Experimental_SuiClientTypes.MvrResolvePackageResponse>;
    resolveType({ type, }: Experimental_SuiClientTypes.MvrResolveTypeOptions): Promise<Experimental_SuiClientTypes.MvrResolveTypeResponse>;
    resolve({ types, packages, }: Experimental_SuiClientTypes.MvrResolveOptions): Promise<Experimental_SuiClientTypes.MvrResolveResponse>;
}
/**
 * Extracts all named types from a given type.
 */
export declare function extractMvrTypes(type: string | StructTag, types?: Set<string>): Set<string>;
export declare function hasMvrName(nameOrType: string): boolean;
export type NamedPackagesOverrides = {
    packages: Record<string, string>;
    types: Record<string, string>;
};
/**
 * Looks up all `.move` names in a transaction block.
 * Returns a list of all the names found.
 */
export declare function findNamesInTransaction(builder: TransactionDataBuilder): {
    packages: string[];
    types: string[];
};
/**
 * Replace all names & types in a transaction block
 * with their resolved names/types.
 */
export declare function replaceNames(builder: TransactionDataBuilder, resolved: Experimental_SuiClientTypes.MvrResolveResponse): void;
