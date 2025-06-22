import type { GenericSchema, InferOutput } from 'valibot';
import type { StructTag as StructTagType, TypeTag as TypeTagType } from '../../bcs/types.js';
import { TransactionData } from './internal.js';
export declare const ObjectRef: import("valibot").ObjectSchema<{
    readonly digest: import("valibot").StringSchema<undefined>;
    readonly objectId: import("valibot").StringSchema<undefined>;
    readonly version: import("valibot").UnionSchema<[import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>, import("valibot").StringSchema<undefined>, import("valibot").BigintSchema<undefined>], undefined>;
}, undefined>;
export declare const NormalizedCallArg: GenericSchema<import("@mysten/bcs").EnumInputShape<{
    Object: import("@mysten/bcs").EnumInputShape<{
        ImmOrOwned: {
            version: string | number | bigint;
            objectId: string;
            digest: string;
        };
        Shared: {
            objectId: string;
            initialSharedVersion: string | number;
            mutable: boolean;
        };
        Receiving: {
            version: string | number | bigint;
            objectId: string;
            digest: string;
        };
    }>;
    Pure: number[];
}>, import("@mysten/bcs").EnumOutputShapeWithKeys<{
    Object: import("@mysten/bcs").EnumOutputShapeWithKeys<{
        ImmOrOwned: {
            version: string | number | bigint;
            objectId: string;
            digest: string;
        };
        Shared: {
            objectId: string;
            initialSharedVersion: string | number;
            mutable: boolean;
        };
        Receiving: {
            version: string | number | bigint;
            objectId: string;
            digest: string;
        };
    }, "Receiving" | "Shared" | "ImmOrOwned">;
    Pure: number[];
}, "Pure" | "Object">, import("valibot").BaseIssue<unknown>>;
export declare const TypeTag: GenericSchema<TypeTagType>;
export declare const StructTag: GenericSchema<StructTagType>;
export declare const TransactionArgument: import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
    readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
    readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
    readonly value: import("valibot").UnknownSchema;
    readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
}, undefined>, import("valibot").ObjectSchema<{
    readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
    readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
    readonly value: import("valibot").UnknownSchema;
    readonly type: import("valibot").LiteralSchema<"pure", undefined>;
}, undefined>], undefined>, import("valibot").ObjectSchema<{
    readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
}, undefined>, import("valibot").ObjectSchema<{
    readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
    readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
}, undefined>, import("valibot").ObjectSchema<{
    readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
    readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
    readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
}, undefined>], undefined>;
export declare const SerializedTransactionDataV1: import("valibot").ObjectSchema<{
    readonly version: import("valibot").LiteralSchema<1, undefined>;
    readonly sender: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    readonly expiration: import("valibot").NullishSchema<import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
        readonly Epoch: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly None: import("valibot").NullableSchema<import("valibot").LiteralSchema<true, undefined>, never>;
    }, undefined>], undefined>, never>;
    readonly gasConfig: import("valibot").ObjectSchema<{
        readonly budget: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").NumberSchema<undefined>, import("valibot").StringSchema<undefined>, import("valibot").BigintSchema<undefined>], undefined>, import("valibot").CheckAction<string | number | bigint, undefined>]>, never>;
        readonly price: import("valibot").OptionalSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").NumberSchema<undefined>, import("valibot").StringSchema<undefined>, import("valibot").BigintSchema<undefined>], undefined>, import("valibot").CheckAction<string | number | bigint, undefined>]>, never>;
        readonly payment: import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").ObjectSchema<{
            readonly digest: import("valibot").StringSchema<undefined>;
            readonly objectId: import("valibot").StringSchema<undefined>;
            readonly version: import("valibot").UnionSchema<[import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>, import("valibot").StringSchema<undefined>, import("valibot").BigintSchema<undefined>], undefined>;
        }, undefined>, undefined>, never>;
        readonly owner: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, never>;
    }, undefined>;
    readonly inputs: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
        readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        readonly value: import("valibot").UnknownSchema;
        readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
        readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        readonly value: import("valibot").UnknownSchema;
        readonly type: import("valibot").LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, undefined>;
    readonly transactions: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"MoveCall", undefined>;
        readonly target: GenericSchema<`${string}::${string}::${string}`>;
        readonly typeArguments: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
        readonly arguments: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>, undefined>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"TransferObjects", undefined>;
        readonly objects: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>, undefined>;
        readonly address: import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"SplitCoins", undefined>;
        readonly coin: import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>;
        readonly amounts: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>, undefined>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"MergeCoins", undefined>;
        readonly destination: import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>;
        readonly sources: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>, undefined>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"Publish", undefined>;
        readonly modules: import("valibot").ArraySchema<import("valibot").ArraySchema<import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>, undefined>, undefined>;
        readonly dependencies: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"Upgrade", undefined>;
        readonly modules: import("valibot").ArraySchema<import("valibot").ArraySchema<import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>, undefined>, undefined>;
        readonly dependencies: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
        readonly packageId: import("valibot").StringSchema<undefined>;
        readonly ticket: import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>;
    }, undefined>, import("valibot").ObjectSchema<{
        readonly kind: import("valibot").LiteralSchema<"MakeMoveVec", undefined>;
        readonly type: import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly Some: GenericSchema<TypeTagType, TypeTagType, import("valibot").BaseIssue<unknown>>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly None: import("valibot").NullableSchema<import("valibot").LiteralSchema<true, undefined>, never>;
        }, undefined>], undefined>;
        readonly objects: import("valibot").ArraySchema<import("valibot").UnionSchema<[import("valibot").UnionSchema<[import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").OptionalSchema<import("valibot").LiteralSchema<"object", undefined>, never>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Input", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly value: import("valibot").UnknownSchema;
            readonly type: import("valibot").LiteralSchema<"pure", undefined>;
        }, undefined>], undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"GasCoin", undefined>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"Result", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>, import("valibot").ObjectSchema<{
            readonly kind: import("valibot").LiteralSchema<"NestedResult", undefined>;
            readonly index: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
            readonly resultIndex: import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>;
        }, undefined>], undefined>, undefined>;
    }, undefined>], undefined>, undefined>;
}, undefined>;
export type SerializedTransactionDataV1 = InferOutput<typeof SerializedTransactionDataV1>;
export declare function serializeV1TransactionData(transactionData: TransactionData): SerializedTransactionDataV1;
export declare function transactionDataFromV1(data: SerializedTransactionDataV1): TransactionData;
