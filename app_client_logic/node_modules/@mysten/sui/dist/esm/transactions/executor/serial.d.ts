import type { bcs } from '../../bcs/index.js';
import type { SuiClient, SuiTransactionBlockResponseOptions } from '../../client/index.js';
import type { Signer } from '../../cryptography/keypair.js';
import type { ObjectCacheOptions } from '../ObjectCache.js';
import { Transaction } from '../Transaction.js';
export declare class SerialTransactionExecutor {
    #private;
    constructor({ signer, defaultGasBudget, ...options }: Omit<ObjectCacheOptions, 'address'> & {
        client: SuiClient;
        signer: Signer;
        /** The gasBudget to use if the transaction has not defined it's own gasBudget, defaults to `50_000_000n` */
        defaultGasBudget?: bigint;
    });
    applyEffects(effects: typeof bcs.TransactionEffects.$inferType): Promise<void>;
    buildTransaction(transaction: Transaction): Promise<Uint8Array<ArrayBufferLike>>;
    resetCache(): Promise<void>;
    waitForLastTransaction(): Promise<void>;
    executeTransaction(transaction: Transaction | Uint8Array, options?: SuiTransactionBlockResponseOptions, additionalSignatures?: string[]): Promise<{
        digest: string;
        effects: string;
        data: import("../../client/index.js").SuiTransactionBlockResponse;
    }>;
}
export declare function getGasCoinFromEffects(effects: typeof bcs.TransactionEffects.$inferType): {
    ref: {
        objectId: string;
        digest: string;
        version: string;
    };
    owner: string;
};
