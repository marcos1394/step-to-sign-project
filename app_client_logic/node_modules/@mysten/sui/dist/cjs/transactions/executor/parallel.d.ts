import type { SuiClient, SuiTransactionBlockResponse, SuiTransactionBlockResponseOptions } from '../../client/index.js';
import type { Signer } from '../../cryptography/index.js';
import type { ObjectCacheOptions } from '../ObjectCache.js';
import { Transaction } from '../Transaction.js';
export interface ParallelTransactionExecutorOptions extends Omit<ObjectCacheOptions, 'address'> {
    client: SuiClient;
    signer: Signer;
    /** The number of coins to create in a batch when refilling the gas pool */
    coinBatchSize?: number;
    /** The initial balance of each coin created for the gas pool */
    initialCoinBalance?: bigint;
    /** The minimum balance of a coin that can be reused for future transactions.  If the gasCoin is below this value, it will be used when refilling the gasPool */
    minimumCoinBalance?: bigint;
    /** The gasBudget to use if the transaction has not defined it's own gasBudget, defaults to `minimumCoinBalance` */
    defaultGasBudget?: bigint;
    /**
     * Time to wait before/after the expected epoch boundary before re-fetching the gas pool (in milliseconds).
     * Building transactions will be paused for up to 2x this duration around each epoch boundary to ensure the
     * gas price is up-to-date for the next epoch.
     * */
    epochBoundaryWindow?: number;
    /** The maximum number of transactions that can be execute in parallel, this also determines the maximum number of gas coins that will be created */
    maxPoolSize?: number;
    /** An initial list of coins used to fund the gas pool, uses all owned SUI coins by default */
    sourceCoins?: string[];
}
export declare class ParallelTransactionExecutor {
    #private;
    constructor(options: ParallelTransactionExecutorOptions);
    resetCache(): Promise<void>;
    waitForLastTransaction(): Promise<void>;
    executeTransaction(transaction: Transaction, options?: SuiTransactionBlockResponseOptions, additionalSignatures?: string[]): Promise<{
        digest: string;
        effects: string;
        data: SuiTransactionBlockResponse;
    }>;
}
