import type { EnumInputShape } from '@mysten/bcs';
import type { GenericSchema, InferOutput } from 'valibot';
export declare const SerializedTransactionDataV2: import("valibot").ObjectSchema<{
    readonly version: import("valibot").LiteralSchema<2, undefined>;
    readonly sender: import("valibot").NullishSchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, never>;
    readonly expiration: import("valibot").NullishSchema<GenericSchema<EnumInputShape<{
        None: true;
        Epoch: string | number;
    }>, EnumInputShape<{
        None: true;
        Epoch: string | number;
    }>, import("valibot").BaseIssue<unknown>>, never>;
    readonly gasData: import("valibot").ObjectSchema<{
        readonly budget: import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>;
        readonly price: import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>;
        readonly owner: import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, never>;
        readonly payment: import("valibot").NullableSchema<import("valibot").ArraySchema<import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly digest: import("valibot").StringSchema<undefined>;
        }, undefined>, undefined>, never>;
    }, undefined>;
    readonly inputs: import("valibot").ArraySchema<GenericSchema<EnumInputShape<{
        Object: EnumInputShape<{
            ImmOrOwnedObject: {
                version: string | number;
                objectId: string;
                digest: string;
            };
            SharedObject: {
                objectId: string;
                initialSharedVersion: string | number;
                mutable: boolean;
            };
            Receiving: {
                version: string | number;
                objectId: string;
                digest: string;
            };
        }>;
        Pure: {
            bytes: string;
        };
        UnresolvedPure: {
            value: unknown;
        };
        UnresolvedObject: {
            objectId: string;
            version?: string | number | null | undefined;
            digest?: string | null | undefined;
            initialSharedVersion?: string | number | null | undefined;
        };
    }>, EnumInputShape<{
        Object: EnumInputShape<{
            ImmOrOwnedObject: {
                version: string | number;
                objectId: string;
                digest: string;
            };
            SharedObject: {
                objectId: string;
                initialSharedVersion: string | number;
                mutable: boolean;
            };
            Receiving: {
                version: string | number;
                objectId: string;
                digest: string;
            };
        }>;
        Pure: {
            bytes: string;
        };
        UnresolvedPure: {
            value: unknown;
        };
        UnresolvedObject: {
            objectId: string;
            version?: string | number | null | undefined;
            digest?: string | null | undefined;
            initialSharedVersion?: string | number | null | undefined;
        };
    }>, import("valibot").BaseIssue<unknown>>, undefined>;
    readonly commands: import("valibot").ArraySchema<GenericSchema<EnumInputShape<{
        MoveCall: {
            function: string;
            module: string;
            package: string;
            typeArguments: string[];
            arguments: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        TransferObjects: {
            address: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
            objects: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        SplitCoins: {
            coin: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
            amounts: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        MergeCoins: {
            destination: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
            sources: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        Publish: {
            modules: string[];
            dependencies: string[];
        };
        MakeMoveVec: {
            type: string | null;
            elements: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        Upgrade: {
            package: string;
            modules: string[];
            dependencies: string[];
            ticket: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
        };
        $Intent: {
            name: string;
            inputs: {
                [x: string]: EnumInputShape<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                }> | EnumInputShape<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                }>[];
            };
            data: {
                [x: string]: unknown;
            };
        };
    }>, EnumInputShape<{
        MoveCall: {
            function: string;
            module: string;
            package: string;
            typeArguments: string[];
            arguments: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        TransferObjects: {
            address: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
            objects: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        SplitCoins: {
            coin: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
            amounts: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        MergeCoins: {
            destination: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
            sources: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        Publish: {
            modules: string[];
            dependencies: string[];
        };
        MakeMoveVec: {
            type: string | null;
            elements: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>[];
        };
        Upgrade: {
            package: string;
            modules: string[];
            dependencies: string[];
            ticket: EnumInputShape<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
            }>;
        };
        $Intent: {
            name: string;
            inputs: {
                [x: string]: EnumInputShape<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                }> | EnumInputShape<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                }>[];
            };
            data: {
                [x: string]: unknown;
            };
        };
    }>, import("valibot").BaseIssue<unknown>>, undefined>;
    readonly digest: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, never>, never>;
}, undefined>;
export type SerializedTransactionDataV2 = InferOutput<typeof SerializedTransactionDataV2>;
