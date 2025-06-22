import { bcs } from '../../bcs/index.js';
import type { ExecuteTransactionBlockParams, SuiClient } from '../../client/index.js';
import type { Signer } from '../../cryptography/keypair.js';
import type { BuildTransactionOptions } from '../resolve.js';
import type { ObjectCacheOptions } from '../ObjectCache.js';
import { ObjectCache } from '../ObjectCache.js';
import type { Transaction } from '../Transaction.js';
export declare class CachingTransactionExecutor {
    #private;
    cache: ObjectCache;
    constructor({ client, ...options }: ObjectCacheOptions & {
        client: SuiClient;
    });
    /**
     * Clears all Owned objects
     * Immutable objects, Shared objects, and Move function definitions will be preserved
     */
    reset(): Promise<void>;
    buildTransaction({ transaction, ...options }: {
        transaction: Transaction;
    } & BuildTransactionOptions): Promise<Uint8Array<ArrayBufferLike>>;
    executeTransaction({ transaction, options, ...input }: {
        transaction: Transaction | Uint8Array;
    } & Omit<ExecuteTransactionBlockParams, 'transactionBlock'>): Promise<import("../../client/index.js").SuiTransactionBlockResponse>;
    signAndExecuteTransaction({ options, transaction, ...input }: {
        transaction: Transaction;
        signer: Signer;
    } & Omit<ExecuteTransactionBlockParams, 'transactionBlock' | 'signature'>): Promise<import("../../client/index.js").SuiTransactionBlockResponse>;
    applyEffects(effects: typeof bcs.TransactionEffects.$inferType): Promise<void>;
    waitForLastTransaction(): Promise<void>;
}
