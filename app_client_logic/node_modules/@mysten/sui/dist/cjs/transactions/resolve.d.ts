import type { ClientWithCoreApi } from '../experimental/index.js';
import type { TransactionDataBuilder } from './TransactionData.js';
export interface BuildTransactionOptions {
    client?: ClientWithCoreApi;
    onlyTransactionKind?: boolean;
}
export interface SerializeTransactionOptions extends BuildTransactionOptions {
    supportedIntents?: string[];
}
export type TransactionPlugin = (transactionData: TransactionDataBuilder, options: BuildTransactionOptions, next: () => Promise<void>) => Promise<void>;
export declare function needsTransactionResolution(data: TransactionDataBuilder, options: BuildTransactionOptions): boolean;
export declare function resolveTransactionPlugin(transactionData: TransactionDataBuilder, options: BuildTransactionOptions, next: () => Promise<void>): Promise<void>;
export declare function getClient(options: BuildTransactionOptions): ClientWithCoreApi;
