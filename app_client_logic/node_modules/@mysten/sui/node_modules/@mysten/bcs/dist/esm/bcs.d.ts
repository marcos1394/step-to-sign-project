import type { BcsTypeOptions } from './bcs-type.js';
import { BcsType } from './bcs-type.js';
import type { EnumInputShape, EnumOutputShape } from './types.js';
export declare const bcs: {
    /**
     * Creates a BcsType that can be used to read and write an 8-bit unsigned integer.
     * @example
     * bcs.u8().serialize(255).toBytes() // Uint8Array [ 255 ]
     */
    u8(options?: BcsTypeOptions<number>): BcsType<number, number>;
    /**
     * Creates a BcsType that can be used to read and write a 16-bit unsigned integer.
     * @example
     * bcs.u16().serialize(65535).toBytes() // Uint8Array [ 255, 255 ]
     */
    u16(options?: BcsTypeOptions<number>): BcsType<number, number>;
    /**
     * Creates a BcsType that can be used to read and write a 32-bit unsigned integer.
     * @example
     * bcs.u32().serialize(4294967295).toBytes() // Uint8Array [ 255, 255, 255, 255 ]
     */
    u32(options?: BcsTypeOptions<number>): BcsType<number, number>;
    /**
     * Creates a BcsType that can be used to read and write a 64-bit unsigned integer.
     * @example
     * bcs.u64().serialize(1).toBytes() // Uint8Array [ 1, 0, 0, 0, 0, 0, 0, 0 ]
     */
    u64(options?: BcsTypeOptions<string, number | bigint | string>): BcsType<string, string | number | bigint>;
    /**
     * Creates a BcsType that can be used to read and write a 128-bit unsigned integer.
     * @example
     * bcs.u128().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
     */
    u128(options?: BcsTypeOptions<string, number | bigint | string>): BcsType<string, string | number | bigint>;
    /**
     * Creates a BcsType that can be used to read and write a 256-bit unsigned integer.
     * @example
     * bcs.u256().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
     */
    u256(options?: BcsTypeOptions<string, number | bigint | string>): BcsType<string, string | number | bigint>;
    /**
     * Creates a BcsType that can be used to read and write boolean values.
     * @example
     * bcs.bool().serialize(true).toBytes() // Uint8Array [ 1 ]
     */
    bool(options?: BcsTypeOptions<boolean>): BcsType<boolean, boolean>;
    /**
     * Creates a BcsType that can be used to read and write unsigned LEB encoded integers
     * @example
     *
     */
    uleb128(options?: BcsTypeOptions<number>): BcsType<number, number>;
    /**
     * Creates a BcsType representing a fixed length byte array
     * @param size The number of bytes this types represents
     * @example
     * bcs.bytes(3).serialize(new Uint8Array([1, 2, 3])).toBytes() // Uint8Array [1, 2, 3]
     */
    bytes<T extends number>(size: T, options?: BcsTypeOptions<Uint8Array, Iterable<number>>): BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>>;
    /**
     * Creates a BcsType representing a variable length byte array
     *
     * @example
     * bcs.byteVector().serialize([1, 2, 3]).toBytes() // Uint8Array [3, 1, 2, 3]
     */
    byteVector(options?: BcsTypeOptions<Uint8Array, Iterable<number>>): BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>>;
    /**
     * Creates a BcsType that can ser/de string values.  Strings will be UTF-8 encoded
     * @example
     * bcs.string().serialize('a').toBytes() // Uint8Array [ 1, 97 ]
     */
    string(options?: BcsTypeOptions<string>): BcsType<string, string>;
    /**
     * Creates a BcsType that represents a fixed length array of a given type
     * @param size The number of elements in the array
     * @param type The BcsType of each element in the array
     * @example
     * bcs.fixedArray(3, bcs.u8()).serialize([1, 2, 3]).toBytes() // Uint8Array [ 1, 2, 3 ]
     */
    fixedArray<T, Input>(size: number, type: BcsType<T, Input>, options?: BcsTypeOptions<T[], Iterable<Input> & {
        length: number;
    }>): BcsType<T[], Iterable<Input> & {
        length: number;
    }>;
    /**
     * Creates a BcsType representing an optional value
     * @param type The BcsType of the optional value
     * @example
     * bcs.option(bcs.u8()).serialize(null).toBytes() // Uint8Array [ 0 ]
     * bcs.option(bcs.u8()).serialize(1).toBytes() // Uint8Array [ 1, 1 ]
     */
    option<T, Input>(type: BcsType<T, Input>): BcsType<T | null, Input | null | undefined>;
    /**
     * Creates a BcsType representing a variable length vector of a given type
     * @param type The BcsType of each element in the vector
     *
     * @example
     * bcs.vector(bcs.u8()).toBytes([1, 2, 3]) // Uint8Array [ 3, 1, 2, 3 ]
     */
    vector<T, Input>(type: BcsType<T, Input>, options?: BcsTypeOptions<T[], Iterable<Input> & {
        length: number;
    }>): BcsType<T[], Iterable<Input> & {
        length: number;
    }>;
    /**
     * Creates a BcsType representing a tuple of a given set of types
     * @param types The BcsTypes for each element in the tuple
     *
     * @example
     * const tuple = bcs.tuple([bcs.u8(), bcs.string(), bcs.bool()])
     * tuple.serialize([1, 'a', true]).toBytes() // Uint8Array [ 1, 1, 97, 1 ]
     */
    tuple<const Types extends readonly BcsType<any>[]>(types: Types, options?: BcsTypeOptions<{ -readonly [K in keyof Types]: Types[K] extends BcsType<infer T, any> ? T : never; }, { [K in keyof Types]: Types[K] extends BcsType<any, infer T> ? T : never; }>): BcsType<{ -readonly [K in keyof Types]: Types[K] extends BcsType<infer T, any> ? T : never; }, { [K_1 in keyof Types]: Types[K_1] extends BcsType<any, infer T_1> ? T_1 : never; }>;
    /**
     * Creates a BcsType representing a struct of a given set of fields
     * @param name The name of the struct
     * @param fields The fields of the struct. The order of the fields affects how data is serialized and deserialized
     *
     * @example
     * const struct = bcs.struct('MyStruct', {
     *  a: bcs.u8(),
     *  b: bcs.string(),
     * })
     * struct.serialize({ a: 1, b: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
     */
    struct<T extends Record<string, BcsType<any>>>(name: string, fields: T, options?: Omit<BcsTypeOptions<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : never; }, { [K in keyof T]: T[K] extends BcsType<any, infer U> ? U : never; }>, "name">): BcsType<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : never; }, { [K_1 in keyof T]: T[K_1] extends BcsType<any, infer U_1> ? U_1 : never; }>;
    /**
     * Creates a BcsType representing an enum of a given set of options
     * @param name The name of the enum
     * @param values The values of the enum. The order of the values affects how data is serialized and deserialized.
     * null can be used to represent a variant with no data.
     *
     * @example
     * const enum = bcs.enum('MyEnum', {
     *   A: bcs.u8(),
     *   B: bcs.string(),
     *   C: null,
     * })
     * enum.serialize({ A: 1 }).toBytes() // Uint8Array [ 0, 1 ]
     * enum.serialize({ B: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
     * enum.serialize({ C: true }).toBytes() // Uint8Array [ 2 ]
     */
    enum<T extends Record<string, BcsType<any> | null>>(name: string, values: T, options?: Omit<BcsTypeOptions<EnumOutputShape<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : true; }>, EnumInputShape<{ [K in keyof T]: T[K] extends BcsType<any, infer U> ? U : boolean | object | null; }>>, "name">): BcsType<EnumOutputShape<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : true; }>, EnumInputShape<{ [K_1 in keyof T]: T[K_1] extends BcsType<any, infer U_1> ? U_1 : boolean | object | null; }>>;
    /**
     * Creates a BcsType representing a map of a given key and value type
     * @param keyType The BcsType of the key
     * @param valueType The BcsType of the value
     * @example
     * const map = bcs.map(bcs.u8(), bcs.string())
     * map.serialize(new Map([[2, 'a']])).toBytes() // Uint8Array [ 1, 2, 1, 97 ]
     */
    map<K, V, InputK = K, InputV = V>(keyType: BcsType<K, InputK>, valueType: BcsType<V, InputV>): BcsType<Map<K, V>, Map<InputK, InputV>>;
    /**
     * Creates a BcsType that wraps another BcsType which is lazily evaluated. This is useful for creating recursive types.
     * @param cb A callback that returns the BcsType
     */
    lazy<T extends BcsType<any>>(cb: () => T): T;
};
