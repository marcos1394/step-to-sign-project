import type { Experimental_SuiClientTypes } from '../types.js';
export declare function parseTransactionBcs(bytes: Uint8Array): Experimental_SuiClientTypes.TransactionResponse['transaction'];
export declare function parseTransactionEffectsBcs(effects: Uint8Array): Experimental_SuiClientTypes.TransactionEffects;
