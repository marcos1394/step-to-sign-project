import type { SerializedBcs } from '@mysten/bcs';
import type { CallArg, ObjectRef } from './data/internal.js';
declare function Pure(data: Uint8Array | SerializedBcs<any>): Extract<CallArg, {
    Pure: unknown;
}>;
export declare const Inputs: {
    Pure: typeof Pure;
    ObjectRef({ objectId, digest, version }: ObjectRef): Extract<CallArg, {
        Object: unknown;
    }>;
    SharedObjectRef({ objectId, mutable, initialSharedVersion, }: {
        objectId: string;
        mutable: boolean;
        initialSharedVersion: number | string;
    }): Extract<CallArg, {
        Object: unknown;
    }>;
    ReceivingRef({ objectId, digest, version }: ObjectRef): Extract<CallArg, {
        Object: unknown;
    }>;
};
export {};
