import type { JwtPayload } from './jwt-decode.js';
export type Claim = {
    value: string;
    indexMod4: number;
};
export declare function extractClaimValue<R>(claim: Claim, claimName: string): R;
export declare function decodeJwt(jwt: string): Omit<JwtPayload, 'iss' | 'aud' | 'sub'> & {
    iss: string;
    aud: string;
    sub: string;
    rawIss: string;
};
