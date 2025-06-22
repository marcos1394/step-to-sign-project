import type { SuiClient } from '../../client/index.js';
import { Experimental_CoreClient } from '../core.js';
import type { Experimental_SuiClientTypes } from '../types.js';
import { TransactionDataBuilder } from '../../transactions/TransactionData.js';
export declare class JSONRpcTransport extends Experimental_CoreClient {
    #private;
    constructor({ jsonRpcClient, mvr, }: {
        jsonRpcClient: SuiClient;
        mvr?: Experimental_SuiClientTypes.MvrOptions;
    });
    getObjects(options: Experimental_SuiClientTypes.GetObjectsOptions): Promise<{
        objects: (Error | Experimental_SuiClientTypes.ObjectResponse)[];
    }>;
    getOwnedObjects(options: Experimental_SuiClientTypes.GetOwnedObjectsOptions): Promise<{
        objects: Experimental_SuiClientTypes.ObjectResponse[];
        hasNextPage: boolean;
        cursor: string | null;
    }>;
    getCoins(options: Experimental_SuiClientTypes.GetCoinsOptions): Promise<{
        objects: {
            id: string;
            version: string;
            digest: string;
            balance: string;
            type: string;
            content: Promise<Uint8Array<ArrayBufferLike>>;
            owner: {
                $kind: "ObjectOwner";
                ObjectOwner: string;
            };
        }[];
        hasNextPage: boolean;
        cursor: string | null;
    }>;
    getBalance(options: Experimental_SuiClientTypes.GetBalanceOptions): Promise<{
        balance: {
            coinType: string;
            balance: string;
        };
    }>;
    getAllBalances(options: Experimental_SuiClientTypes.GetAllBalancesOptions): Promise<{
        balances: {
            coinType: string;
            balance: string;
        }[];
        hasNextPage: boolean;
        cursor: null;
    }>;
    getTransaction(options: Experimental_SuiClientTypes.GetTransactionOptions): Promise<{
        transaction: Experimental_SuiClientTypes.TransactionResponse;
    }>;
    executeTransaction(options: Experimental_SuiClientTypes.ExecuteTransactionOptions): Promise<{
        transaction: Experimental_SuiClientTypes.TransactionResponse;
    }>;
    dryRunTransaction(options: Experimental_SuiClientTypes.DryRunTransactionOptions): Promise<{
        transaction: {
            digest: string;
            epoch: null;
            effects: Experimental_SuiClientTypes.TransactionEffects;
            objectTypes: Promise<Record<string, string>>;
            signatures: never[];
            transaction: Experimental_SuiClientTypes.TransactionData;
        };
    }>;
    getReferenceGasPrice(options?: Experimental_SuiClientTypes.GetReferenceGasPriceOptions): Promise<{
        referenceGasPrice: string;
    }>;
    getDynamicFields(options: Experimental_SuiClientTypes.GetDynamicFieldsOptions): Promise<{
        dynamicFields: {
            id: string;
            type: string;
            name: {
                type: string;
                bcs: Uint8Array<ArrayBufferLike>;
            };
        }[];
        hasNextPage: boolean;
        cursor: string | null;
    }>;
    verifyZkLoginSignature(options: Experimental_SuiClientTypes.VerifyZkLoginSignatureOptions): Promise<{
        success: boolean;
        errors: string[];
    }>;
    resolveNameServiceNames(options: Experimental_SuiClientTypes.ResolveNameServiceNamesOptions): Promise<Experimental_SuiClientTypes.ResolveNameServiceNamesResponse>;
    resolveTransactionPlugin(): (transactionData: TransactionDataBuilder, options: import("../../transactions/resolve.js").BuildTransactionOptions, next: () => Promise<void>) => Promise<void>;
}
