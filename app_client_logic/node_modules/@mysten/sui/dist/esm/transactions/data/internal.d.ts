import type { EnumInputShape, EnumOutputShape } from '@mysten/bcs';
import type { GenericSchema, InferInput, InferOutput } from 'valibot';
import type { Simplify } from '@mysten/utils';
type EnumSchema<T extends Record<string, GenericSchema<any>>> = GenericSchema<EnumInputShape<Simplify<{
    [K in keyof T]: InferInput<T[K]>;
}>>, EnumOutputShape<Simplify<{
    [K in keyof T]: InferOutput<T[K]>;
}>>>;
export declare function safeEnum<T extends Record<string, GenericSchema<any>>>(options: T): EnumSchema<T>;
export declare const SuiAddress: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
export declare const ObjectID: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
export declare const BCSBytes: import("valibot").StringSchema<undefined>;
export declare const JsonU64: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
export declare const ObjectRef: import("valibot").ObjectSchema<{
    readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
    readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
    readonly digest: import("valibot").StringSchema<undefined>;
}, undefined>;
export type ObjectRef = InferOutput<typeof ObjectRef>;
export declare const Argument: GenericSchema<{
    GasCoin: true;
} | {
    Input: number;
    type?: "pure" | "object";
} | {
    Result: number;
} | {
    NestedResult: [number, number];
}, {
    $kind: "GasCoin";
    GasCoin: true;
} | {
    $kind: "Input";
    Input: number;
    type?: "pure";
} | {
    $kind: "Input";
    Input: number;
    type?: "object";
} | {
    $kind: "Result";
    Result: number;
} | {
    $kind: "NestedResult";
    NestedResult: [number, number];
}>;
export type Argument = InferOutput<typeof Argument>;
export declare const GasData: import("valibot").ObjectSchema<{
    readonly budget: import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>;
    readonly price: import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>;
    readonly owner: import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, never>;
    readonly payment: import("valibot").NullableSchema<import("valibot").ArraySchema<import("valibot").ObjectSchema<{
        readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
        readonly digest: import("valibot").StringSchema<undefined>;
    }, undefined>, undefined>, never>;
}, undefined>;
export type GasData = InferOutput<typeof GasData>;
export declare const StructTag: import("valibot").ObjectSchema<{
    readonly address: import("valibot").StringSchema<undefined>;
    readonly module: import("valibot").StringSchema<undefined>;
    readonly name: import("valibot").StringSchema<undefined>;
    readonly typeParams: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
}, undefined>;
export type StructTag = InferOutput<typeof StructTag>;
export type OpenMoveTypeSignatureBody = 'address' | 'bool' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | {
    vector: OpenMoveTypeSignatureBody;
} | {
    datatype: {
        package: string;
        module: string;
        type: string;
        typeParameters: OpenMoveTypeSignatureBody[];
    };
} | {
    typeParameter: number;
};
export declare const OpenMoveTypeSignatureBody: GenericSchema<OpenMoveTypeSignatureBody>;
export declare const OpenMoveTypeSignature: import("valibot").ObjectSchema<{
    readonly ref: import("valibot").NullableSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"&", undefined>, import("valibot").LiteralSchema<"&mut", undefined>], undefined>, never>;
    readonly body: GenericSchema<OpenMoveTypeSignatureBody, OpenMoveTypeSignatureBody, import("valibot").BaseIssue<unknown>>;
}, undefined>;
export type OpenMoveTypeSignature = InferOutput<typeof OpenMoveTypeSignature>;
declare const ProgrammableMoveCall: import("valibot").ObjectSchema<{
    readonly package: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
    readonly module: import("valibot").StringSchema<undefined>;
    readonly function: import("valibot").StringSchema<undefined>;
    readonly typeArguments: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly arguments: import("valibot").ArraySchema<GenericSchema<{
        GasCoin: true;
    } | {
        Input: number;
        type?: "pure" | "object";
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }, {
        $kind: "GasCoin";
        GasCoin: true;
    } | {
        $kind: "Input";
        Input: number;
        type?: "pure";
    } | {
        $kind: "Input";
        Input: number;
        type?: "object";
    } | {
        $kind: "Result";
        Result: number;
    } | {
        $kind: "NestedResult";
        NestedResult: [number, number];
    }, import("valibot").BaseIssue<unknown>>, undefined>;
    readonly _argumentTypes: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").ArraySchema<import("valibot").ObjectSchema<{
        readonly ref: import("valibot").NullableSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"&", undefined>, import("valibot").LiteralSchema<"&mut", undefined>], undefined>, never>;
        readonly body: GenericSchema<OpenMoveTypeSignatureBody, OpenMoveTypeSignatureBody, import("valibot").BaseIssue<unknown>>;
    }, undefined>, undefined>, never>, never>;
}, undefined>;
export type ProgrammableMoveCall = InferOutput<typeof ProgrammableMoveCall>;
export declare const $Intent: import("valibot").ObjectSchema<{
    readonly name: import("valibot").StringSchema<undefined>;
    readonly inputs: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").UnionSchema<[GenericSchema<{
        GasCoin: true;
    } | {
        Input: number;
        type?: "pure" | "object";
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }, {
        $kind: "GasCoin";
        GasCoin: true;
    } | {
        $kind: "Input";
        Input: number;
        type?: "pure";
    } | {
        $kind: "Input";
        Input: number;
        type?: "object";
    } | {
        $kind: "Result";
        Result: number;
    } | {
        $kind: "NestedResult";
        NestedResult: [number, number];
    }, import("valibot").BaseIssue<unknown>>, import("valibot").ArraySchema<GenericSchema<{
        GasCoin: true;
    } | {
        Input: number;
        type?: "pure" | "object";
    } | {
        Result: number;
    } | {
        NestedResult: [number, number];
    }, {
        $kind: "GasCoin";
        GasCoin: true;
    } | {
        $kind: "Input";
        Input: number;
        type?: "pure";
    } | {
        $kind: "Input";
        Input: number;
        type?: "object";
    } | {
        $kind: "Result";
        Result: number;
    } | {
        $kind: "NestedResult";
        NestedResult: [number, number];
    }, import("valibot").BaseIssue<unknown>>, undefined>], undefined>, undefined>;
    readonly data: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").UnknownSchema, undefined>;
}, undefined>;
export declare const Command: EnumSchema<{
    MoveCall: import("valibot").ObjectSchema<{
        readonly package: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly module: import("valibot").StringSchema<undefined>;
        readonly function: import("valibot").StringSchema<undefined>;
        readonly typeArguments: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
        readonly arguments: import("valibot").ArraySchema<GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, undefined>;
        readonly _argumentTypes: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").ArraySchema<import("valibot").ObjectSchema<{
            readonly ref: import("valibot").NullableSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"&", undefined>, import("valibot").LiteralSchema<"&mut", undefined>], undefined>, never>;
            readonly body: GenericSchema<OpenMoveTypeSignatureBody, OpenMoveTypeSignatureBody, import("valibot").BaseIssue<unknown>>;
        }, undefined>, undefined>, never>, never>;
    }, undefined>;
    TransferObjects: import("valibot").ObjectSchema<{
        readonly objects: import("valibot").ArraySchema<GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, undefined>;
        readonly address: GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>;
    }, undefined>;
    SplitCoins: import("valibot").ObjectSchema<{
        readonly coin: GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>;
        readonly amounts: import("valibot").ArraySchema<GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, undefined>;
    }, undefined>;
    MergeCoins: import("valibot").ObjectSchema<{
        readonly destination: GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>;
        readonly sources: import("valibot").ArraySchema<GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, undefined>;
    }, undefined>;
    Publish: import("valibot").ObjectSchema<{
        readonly modules: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
        readonly dependencies: import("valibot").ArraySchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, undefined>;
    }, undefined>;
    MakeMoveVec: import("valibot").ObjectSchema<{
        readonly type: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, never>;
        readonly elements: import("valibot").ArraySchema<GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, undefined>;
    }, undefined>;
    Upgrade: import("valibot").ObjectSchema<{
        readonly modules: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
        readonly dependencies: import("valibot").ArraySchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, undefined>;
        readonly package: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly ticket: GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>;
    }, undefined>;
    $Intent: import("valibot").ObjectSchema<{
        readonly name: import("valibot").StringSchema<undefined>;
        readonly inputs: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").UnionSchema<[GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, import("valibot").ArraySchema<GenericSchema<{
            GasCoin: true;
        } | {
            Input: number;
            type?: "pure" | "object";
        } | {
            Result: number;
        } | {
            NestedResult: [number, number];
        }, {
            $kind: "GasCoin";
            GasCoin: true;
        } | {
            $kind: "Input";
            Input: number;
            type?: "pure";
        } | {
            $kind: "Input";
            Input: number;
            type?: "object";
        } | {
            $kind: "Result";
            Result: number;
        } | {
            $kind: "NestedResult";
            NestedResult: [number, number];
        }, import("valibot").BaseIssue<unknown>>, undefined>], undefined>, undefined>;
        readonly data: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").UnknownSchema, undefined>;
    }, undefined>;
}>;
export type Command<Arg = Argument> = EnumOutputShape<{
    MoveCall: {
        package: string;
        module: string;
        function: string;
        typeArguments: string[];
        arguments: Arg[];
        _argumentTypes?: OpenMoveTypeSignature[] | null;
    };
    TransferObjects: {
        objects: Arg[];
        address: Arg;
    };
    SplitCoins: {
        coin: Arg;
        amounts: Arg[];
    };
    MergeCoins: {
        destination: Arg;
        sources: Arg[];
    };
    Publish: {
        modules: string[];
        dependencies: string[];
    };
    MakeMoveVec: {
        type: string | null;
        elements: Arg[];
    };
    Upgrade: {
        modules: string[];
        dependencies: string[];
        package: string;
        ticket: Arg;
    };
    $Intent: {
        name: string;
        inputs: Record<string, Argument | Argument[]>;
        data: Record<string, unknown>;
    };
}>;
export declare const ObjectArg: EnumSchema<{
    ImmOrOwnedObject: import("valibot").ObjectSchema<{
        readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
        readonly digest: import("valibot").StringSchema<undefined>;
    }, undefined>;
    SharedObject: import("valibot").ObjectSchema<{
        readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly initialSharedVersion: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
        readonly mutable: import("valibot").BooleanSchema<undefined>;
    }, undefined>;
    Receiving: import("valibot").ObjectSchema<{
        readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
        readonly digest: import("valibot").StringSchema<undefined>;
    }, undefined>;
}>;
declare const CallArg: EnumSchema<{
    Object: EnumSchema<{
        ImmOrOwnedObject: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly digest: import("valibot").StringSchema<undefined>;
        }, undefined>;
        SharedObject: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly initialSharedVersion: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly mutable: import("valibot").BooleanSchema<undefined>;
        }, undefined>;
        Receiving: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly digest: import("valibot").StringSchema<undefined>;
        }, undefined>;
    }>;
    Pure: import("valibot").ObjectSchema<{
        readonly bytes: import("valibot").StringSchema<undefined>;
    }, undefined>;
    UnresolvedPure: import("valibot").ObjectSchema<{
        readonly value: import("valibot").UnknownSchema;
    }, undefined>;
    UnresolvedObject: import("valibot").ObjectSchema<{
        readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
        readonly version: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>, never>;
        readonly digest: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, never>, never>;
        readonly initialSharedVersion: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>, never>;
    }, undefined>;
}>;
export type CallArg = InferOutput<typeof CallArg>;
export declare const NormalizedCallArg: EnumSchema<{
    Object: EnumSchema<{
        ImmOrOwnedObject: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly digest: import("valibot").StringSchema<undefined>;
        }, undefined>;
        SharedObject: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly initialSharedVersion: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly mutable: import("valibot").BooleanSchema<undefined>;
        }, undefined>;
        Receiving: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
            readonly digest: import("valibot").StringSchema<undefined>;
        }, undefined>;
    }>;
    Pure: import("valibot").ObjectSchema<{
        readonly bytes: import("valibot").StringSchema<undefined>;
    }, undefined>;
}>;
export declare const TransactionExpiration: EnumSchema<{
    None: import("valibot").LiteralSchema<true, undefined>;
    Epoch: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
}>;
export type TransactionExpiration = InferOutput<typeof TransactionExpiration>;
export declare const TransactionData: import("valibot").ObjectSchema<{
    readonly version: import("valibot").LiteralSchema<2, undefined>;
    readonly sender: import("valibot").NullishSchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, never>;
    readonly expiration: import("valibot").NullishSchema<EnumSchema<{
        None: import("valibot").LiteralSchema<true, undefined>;
        Epoch: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
    }>, never>;
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
    readonly inputs: import("valibot").ArraySchema<EnumSchema<{
        Object: EnumSchema<{
            ImmOrOwnedObject: import("valibot").ObjectSchema<{
                readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
                readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
                readonly digest: import("valibot").StringSchema<undefined>;
            }, undefined>;
            SharedObject: import("valibot").ObjectSchema<{
                readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
                readonly initialSharedVersion: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
                readonly mutable: import("valibot").BooleanSchema<undefined>;
            }, undefined>;
            Receiving: import("valibot").ObjectSchema<{
                readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
                readonly version: import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>;
                readonly digest: import("valibot").StringSchema<undefined>;
            }, undefined>;
        }>;
        Pure: import("valibot").ObjectSchema<{
            readonly bytes: import("valibot").StringSchema<undefined>;
        }, undefined>;
        UnresolvedPure: import("valibot").ObjectSchema<{
            readonly value: import("valibot").UnknownSchema;
        }, undefined>;
        UnresolvedObject: import("valibot").ObjectSchema<{
            readonly objectId: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly version: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>, never>;
            readonly digest: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, never>, never>;
            readonly initialSharedVersion: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").SchemaWithPipe<[import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").SchemaWithPipe<[import("valibot").NumberSchema<undefined>, import("valibot").IntegerAction<number, undefined>]>], undefined>, import("valibot").CheckAction<string | number, "Invalid u64">]>, never>, never>;
        }, undefined>;
    }>, undefined>;
    readonly commands: import("valibot").ArraySchema<EnumSchema<{
        MoveCall: import("valibot").ObjectSchema<{
            readonly package: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly module: import("valibot").StringSchema<undefined>;
            readonly function: import("valibot").StringSchema<undefined>;
            readonly typeArguments: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
            readonly arguments: import("valibot").ArraySchema<GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, undefined>;
            readonly _argumentTypes: import("valibot").OptionalSchema<import("valibot").NullableSchema<import("valibot").ArraySchema<import("valibot").ObjectSchema<{
                readonly ref: import("valibot").NullableSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"&", undefined>, import("valibot").LiteralSchema<"&mut", undefined>], undefined>, never>;
                readonly body: GenericSchema<OpenMoveTypeSignatureBody, OpenMoveTypeSignatureBody, import("valibot").BaseIssue<unknown>>;
            }, undefined>, undefined>, never>, never>;
        }, undefined>;
        TransferObjects: import("valibot").ObjectSchema<{
            readonly objects: import("valibot").ArraySchema<GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, undefined>;
            readonly address: GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>;
        }, undefined>;
        SplitCoins: import("valibot").ObjectSchema<{
            readonly coin: GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>;
            readonly amounts: import("valibot").ArraySchema<GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, undefined>;
        }, undefined>;
        MergeCoins: import("valibot").ObjectSchema<{
            readonly destination: GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>;
            readonly sources: import("valibot").ArraySchema<GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, undefined>;
        }, undefined>;
        Publish: import("valibot").ObjectSchema<{
            readonly modules: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
            readonly dependencies: import("valibot").ArraySchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, undefined>;
        }, undefined>;
        MakeMoveVec: import("valibot").ObjectSchema<{
            readonly type: import("valibot").NullableSchema<import("valibot").StringSchema<undefined>, never>;
            readonly elements: import("valibot").ArraySchema<GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, undefined>;
        }, undefined>;
        Upgrade: import("valibot").ObjectSchema<{
            readonly modules: import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>;
            readonly dependencies: import("valibot").ArraySchema<import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>, undefined>;
            readonly package: import("valibot").SchemaWithPipe<[import("valibot").StringSchema<undefined>, import("valibot").TransformAction<string, string>, import("valibot").CheckAction<string, undefined>]>;
            readonly ticket: GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>;
        }, undefined>;
        $Intent: import("valibot").ObjectSchema<{
            readonly name: import("valibot").StringSchema<undefined>;
            readonly inputs: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").UnionSchema<[GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, import("valibot").ArraySchema<GenericSchema<{
                GasCoin: true;
            } | {
                Input: number;
                type?: "pure" | "object";
            } | {
                Result: number;
            } | {
                NestedResult: [number, number];
            }, {
                $kind: "GasCoin";
                GasCoin: true;
            } | {
                $kind: "Input";
                Input: number;
                type?: "pure";
            } | {
                $kind: "Input";
                Input: number;
                type?: "object";
            } | {
                $kind: "Result";
                Result: number;
            } | {
                $kind: "NestedResult";
                NestedResult: [number, number];
            }, import("valibot").BaseIssue<unknown>>, undefined>], undefined>, undefined>;
            readonly data: import("valibot").RecordSchema<import("valibot").StringSchema<undefined>, import("valibot").UnknownSchema, undefined>;
        }, undefined>;
    }>, undefined>;
}, undefined>;
export type TransactionData = InferOutput<typeof TransactionData>;
export {};
