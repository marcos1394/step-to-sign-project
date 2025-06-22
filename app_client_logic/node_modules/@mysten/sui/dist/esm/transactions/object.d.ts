import type { Transaction, TransactionObjectInput } from './Transaction.js';
export declare function createObjectMethods<T>(makeObject: (value: TransactionObjectInput) => T): {
    (value: TransactionObjectInput): T;
    system(): T;
    clock(): T;
    random(): T;
    denyList(): T;
    option({ type, value }: {
        type: string;
        value: TransactionObjectInput | null;
    }): (tx: Transaction) => import("./Transaction.js").TransactionResult;
};
