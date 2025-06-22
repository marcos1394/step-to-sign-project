type Hex = string;
type Path = string;
type Keys = {
    key: Uint8Array;
    chainCode: Uint8Array;
};
export declare const derivePath: (path: Path, seed: Hex, offset?: number) => Keys;
export {};
