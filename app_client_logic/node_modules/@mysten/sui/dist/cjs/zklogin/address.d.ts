export declare function computeZkLoginAddressFromSeed(addressSeed: bigint, iss: string, 
/** TODO: This default should be changed in the next major release */
legacyAddress?: boolean): string;
export declare const MAX_HEADER_LEN_B64 = 248;
export declare const MAX_PADDED_UNSIGNED_JWT_LEN: number;
export declare function lengthChecks(jwt: string): void;
export declare function jwtToAddress(jwt: string, userSalt: string | bigint, legacyAddress?: boolean): string;
export interface ComputeZkLoginAddressOptions {
    claimName: string;
    claimValue: string;
    userSalt: string | bigint;
    iss: string;
    aud: string;
    legacyAddress?: boolean;
}
export declare function computeZkLoginAddress({ claimName, claimValue, iss, aud, userSalt, legacyAddress, }: ComputeZkLoginAddressOptions): string;
