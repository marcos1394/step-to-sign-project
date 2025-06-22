import type { SuiClient } from '../../client/index.js';
import type { BuildTransactionOptions } from '../resolve.js';
import type { Transaction, TransactionResult } from '../Transaction.js';
export declare function coinWithBalance({ type, balance, useGasCoin, }: {
    balance: bigint | number;
    type?: string;
    useGasCoin?: boolean;
}): (tx: Transaction) => TransactionResult;
export declare function getSuiClient(options: BuildTransactionOptions): SuiClient;
