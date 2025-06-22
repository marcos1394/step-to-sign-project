export interface PromiseWithResolvers<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (error: unknown) => void;
}
export declare function promiseWithResolvers<T>(): PromiseWithResolvers<T>;
