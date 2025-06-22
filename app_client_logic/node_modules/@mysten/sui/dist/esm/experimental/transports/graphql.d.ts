import { Experimental_CoreClient } from '../core.js';
import type { Experimental_SuiClientTypes } from '../types.js';
import type { SuiGraphQLClient } from '../../graphql/client.js';
export declare class GraphQLTransport extends Experimental_CoreClient {
    #private;
    constructor({ graphqlClient, mvr, }: {
        graphqlClient: SuiGraphQLClient;
        mvr?: Experimental_SuiClientTypes.MvrOptions;
    });
    getObjects(options: Experimental_SuiClientTypes.GetObjectsOptions): Promise<Experimental_SuiClientTypes.GetObjectsResponse>;
    getOwnedObjects(options: Experimental_SuiClientTypes.GetOwnedObjectsOptions): Promise<Experimental_SuiClientTypes.GetOwnedObjectsResponse>;
    getCoins(options: Experimental_SuiClientTypes.GetCoinsOptions): Promise<Experimental_SuiClientTypes.GetCoinsResponse>;
    getBalance(options: Experimental_SuiClientTypes.GetBalanceOptions): Promise<Experimental_SuiClientTypes.GetBalanceResponse>;
    getAllBalances(options: Experimental_SuiClientTypes.GetAllBalancesOptions): Promise<Experimental_SuiClientTypes.GetAllBalancesResponse>;
    getTransaction(options: Experimental_SuiClientTypes.GetTransactionOptions): Promise<Experimental_SuiClientTypes.GetTransactionResponse>;
    executeTransaction(options: Experimental_SuiClientTypes.ExecuteTransactionOptions): Promise<Experimental_SuiClientTypes.ExecuteTransactionResponse>;
    dryRunTransaction(options: Experimental_SuiClientTypes.DryRunTransactionOptions): Promise<Experimental_SuiClientTypes.DryRunTransactionResponse>;
    getReferenceGasPrice(): Promise<Experimental_SuiClientTypes.GetReferenceGasPriceResponse>;
    getDynamicFields(options: Experimental_SuiClientTypes.GetDynamicFieldsOptions): Promise<Experimental_SuiClientTypes.GetDynamicFieldsResponse>;
    verifyZkLoginSignature(options: Experimental_SuiClientTypes.VerifyZkLoginSignatureOptions): Promise<Experimental_SuiClientTypes.ZkLoginVerifyResponse>;
    resolveNameServiceNames(options: Experimental_SuiClientTypes.ResolveNameServiceNamesOptions): Promise<Experimental_SuiClientTypes.ResolveNameServiceNamesResponse>;
    resolveTransactionPlugin(): never;
}
export type GraphQLResponseErrors = Array<{
    message: string;
    locations?: {
        line: number;
        column: number;
    }[];
    path?: (string | number)[];
}>;
