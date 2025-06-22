import type { TransactionDataBuilder } from '../../transactions/TransactionData.js';
import type { SuiClient } from '../../client/index.js';
import type { BuildTransactionOptions } from '../../transactions/index.js';
export declare function suiClientResolveTransactionPlugin(client: SuiClient): (transactionData: TransactionDataBuilder, options: BuildTransactionOptions, next: () => Promise<void>) => Promise<void>;
