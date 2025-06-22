import type { InferInput } from 'valibot';
import { Argument } from './data/internal.js';
import type { CallArg, Command } from './data/internal.js';
import type { AsyncTransactionThunk, Transaction } from './Transaction.js';
export type TransactionArgument = InferInput<typeof Argument> | ((tx: Transaction) => InferInput<typeof Argument>) | AsyncTransactionThunk;
export type TransactionInput = CallArg;
export declare enum UpgradePolicy {
    COMPATIBLE = 0,
    ADDITIVE = 128,
    DEP_ONLY = 192
}
type TransactionShape<T extends Command['$kind']> = {
    $kind: T;
} & {
    [K in T]: Extract<Command, {
        [K in T]: any;
    }>[T];
};
/**
 * Simple helpers used to construct transactions:
 */
export declare const Commands: {
    MoveCall(input: {
        package: string;
        module: string;
        function: string;
        arguments?: Argument[];
        typeArguments?: string[];
    } | {
        target: string;
        arguments?: Argument[];
        typeArguments?: string[];
    }): TransactionShape<"MoveCall">;
    TransferObjects(objects: InferInput<typeof Argument>[], address: InferInput<typeof Argument>): TransactionShape<"TransferObjects">;
    SplitCoins(coin: InferInput<typeof Argument>, amounts: InferInput<typeof Argument>[]): TransactionShape<"SplitCoins">;
    MergeCoins(destination: InferInput<typeof Argument>, sources: InferInput<typeof Argument>[]): TransactionShape<"MergeCoins">;
    Publish({ modules, dependencies, }: {
        modules: number[][] | string[];
        dependencies: string[];
    }): TransactionShape<"Publish">;
    Upgrade({ modules, dependencies, package: packageId, ticket, }: {
        modules: number[][] | string[];
        dependencies: string[];
        package: string;
        ticket: InferInput<typeof Argument>;
    }): TransactionShape<"Upgrade">;
    MakeMoveVec({ type, elements, }: {
        type?: string;
        elements: InferInput<typeof Argument>[];
    }): TransactionShape<"MakeMoveVec">;
    Intent({ name, inputs, data, }: {
        name: string;
        inputs?: Record<string, InferInput<typeof Argument> | InferInput<typeof Argument>[]>;
        data?: Record<string, unknown>;
    }): TransactionShape<"$Intent">;
};
export {};
