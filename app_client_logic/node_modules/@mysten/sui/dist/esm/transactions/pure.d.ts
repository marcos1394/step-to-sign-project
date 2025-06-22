import type { SerializedBcs } from '@mysten/bcs';
import type { PureTypeName, ShapeFromPureTypeName, ValidPureTypeName } from '../bcs/pure.js';
export declare function createPure<T>(makePure: (value: SerializedBcs<any, any> | Uint8Array) => T): {
    <T_1 extends PureTypeName>(type: T_1 extends PureTypeName ? ValidPureTypeName<T_1> : T_1, value: ShapeFromPureTypeName<T_1>): T_1;
    (value: SerializedBcs<any, any> | Uint8Array): T;
    u8(value: number): T;
    u16(value: number): T;
    u32(value: number): T;
    u64(value: bigint | number | string): T;
    u128(value: bigint | number | string): T;
    u256(value: bigint | number | string): T;
    bool(value: boolean): T;
    string(value: string): T;
    address(value: string): T;
    id: (value: string) => T;
    vector<Type extends PureTypeName>(type: T extends PureTypeName ? ValidPureTypeName<Type> : Type, value: Iterable<ShapeFromPureTypeName<Type>> & {
        length: number;
    }): T;
    option<Type extends PureTypeName>(type: T extends PureTypeName ? ValidPureTypeName<Type> : Type, value: ShapeFromPureTypeName<Type> | null | undefined): T;
};
