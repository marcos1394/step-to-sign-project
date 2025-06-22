import type { Signer } from '../cryptography/index.js';
import { Experimental_BaseClient } from '../experimental/client.js';
import { JSONRpcTransport } from '../experimental/transports/jsonRPC.js';
import type { Experimental_SuiClientTypes, SelfRegisteringClientExtension } from '../experimental/types.js';
import type { Transaction } from '../transactions/Transaction.js';
import type { SuiTransport } from './http-transport.js';
import type { AddressMetrics, AllEpochsAddressMetrics, Checkpoint, CheckpointPage, CoinBalance, CoinMetadata, CoinSupply, CommitteeInfo, DelegatedStake, DevInspectResults, DevInspectTransactionBlockParams, DryRunTransactionBlockParams, DryRunTransactionBlockResponse, DynamicFieldPage, EpochInfo, EpochMetricsPage, EpochPage, ExecuteTransactionBlockParams, GetAllBalancesParams, GetAllCoinsParams, GetBalanceParams, GetCheckpointParams, GetCheckpointsParams, GetCoinMetadataParams, GetCoinsParams, GetCommitteeInfoParams, GetDynamicFieldObjectParams, GetDynamicFieldsParams, GetLatestCheckpointSequenceNumberParams, GetLatestSuiSystemStateParams, GetMoveFunctionArgTypesParams, GetNormalizedMoveFunctionParams, GetNormalizedMoveModuleParams, GetNormalizedMoveModulesByPackageParams, GetNormalizedMoveStructParams, GetObjectParams, GetOwnedObjectsParams, GetProtocolConfigParams, GetReferenceGasPriceParams, GetStakesByIdsParams, GetStakesParams, GetTotalSupplyParams, GetTransactionBlockParams, MoveCallMetrics, MultiGetObjectsParams, MultiGetTransactionBlocksParams, NetworkMetrics, ObjectRead, Order, PaginatedCoins, PaginatedEvents, PaginatedObjectsResponse, PaginatedTransactionResponse, ProtocolConfig, QueryEventsParams, QueryTransactionBlocksParams, ResolvedNameServiceNames, ResolveNameServiceAddressParams, ResolveNameServiceNamesParams, SubscribeEventParams, SubscribeTransactionParams, SuiEvent, SuiMoveFunctionArgType, SuiMoveNormalizedFunction, SuiMoveNormalizedModule, SuiMoveNormalizedModules, SuiMoveNormalizedStruct, SuiObjectResponse, SuiSystemStateSummary, SuiTransactionBlockResponse, TransactionEffects, TryGetPastObjectParams, Unsubscribe, ValidatorsApy, VerifyZkLoginSignatureParams, ZkLoginVerifyResult } from './types/index.js';
export interface PaginationArguments<Cursor> {
    /** Optional paging cursor */
    cursor?: Cursor;
    /** Maximum item returned per page */
    limit?: number | null;
}
export interface OrderArguments {
    order?: Order | null;
}
/**
 * Configuration options for the SuiClient
 * You must provide either a `url` or a `transport`
 */
export type SuiClientOptions = NetworkOrTransport & {
    network?: Experimental_SuiClientTypes.Network;
    mvr?: Experimental_SuiClientTypes.MvrOptions;
};
type NetworkOrTransport = {
    url: string;
    transport?: never;
} | {
    transport: SuiTransport;
    url?: never;
};
declare const SUI_CLIENT_BRAND: never;
export declare function isSuiClient(client: unknown): client is SuiClient;
export declare class SuiClient extends Experimental_BaseClient implements SelfRegisteringClientExtension {
    [SUI_CLIENT_BRAND]: boolean;
    core: JSONRpcTransport;
    jsonRpc: this;
    protected transport: SuiTransport;
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param options configuration options for the API Client
     */
    constructor(options: SuiClientOptions);
    getRpcApiVersion({ signal }?: {
        signal?: AbortSignal;
    }): Promise<string | undefined>;
    /**
     * Get all Coin<`coin_type`> objects owned by an address.
     */
    getCoins({ coinType, owner, cursor, limit, signal, }: GetCoinsParams): Promise<PaginatedCoins>;
    /**
     * Get all Coin objects owned by an address.
     */
    getAllCoins(input: GetAllCoinsParams): Promise<PaginatedCoins>;
    /**
     * Get the total coin balance for one coin type, owned by the address owner.
     */
    getBalance({ owner, coinType, signal }: GetBalanceParams): Promise<CoinBalance>;
    /**
     * Get the total coin balance for all coin types, owned by the address owner.
     */
    getAllBalances(input: GetAllBalancesParams): Promise<CoinBalance[]>;
    /**
     * Fetch CoinMetadata for a given coin type
     */
    getCoinMetadata({ coinType, signal }: GetCoinMetadataParams): Promise<CoinMetadata | null>;
    /**
     *  Fetch total supply for a coin
     */
    getTotalSupply({ coinType, signal }: GetTotalSupplyParams): Promise<CoinSupply>;
    /**
     * Invoke any RPC method
     * @param method the method to be invoked
     * @param args the arguments to be passed to the RPC request
     */
    call<T = unknown>(method: string, params: unknown[], { signal }?: {
        signal?: AbortSignal;
    }): Promise<T>;
    /**
     * Get Move function argument types like read, write and full access
     */
    getMoveFunctionArgTypes({ package: pkg, module, function: fn, signal, }: GetMoveFunctionArgTypesParams): Promise<SuiMoveFunctionArgType[]>;
    /**
     * Get a map from module name to
     * structured representations of Move modules
     */
    getNormalizedMoveModulesByPackage({ package: pkg, signal, }: GetNormalizedMoveModulesByPackageParams): Promise<SuiMoveNormalizedModules>;
    /**
     * Get a structured representation of Move module
     */
    getNormalizedMoveModule({ package: pkg, module, signal, }: GetNormalizedMoveModuleParams): Promise<SuiMoveNormalizedModule>;
    /**
     * Get a structured representation of Move function
     */
    getNormalizedMoveFunction({ package: pkg, module, function: fn, signal, }: GetNormalizedMoveFunctionParams): Promise<SuiMoveNormalizedFunction>;
    /**
     * Get a structured representation of Move struct
     */
    getNormalizedMoveStruct({ package: pkg, module, struct, signal, }: GetNormalizedMoveStructParams): Promise<SuiMoveNormalizedStruct>;
    /**
     * Get all objects owned by an address
     */
    getOwnedObjects(input: GetOwnedObjectsParams): Promise<PaginatedObjectsResponse>;
    /**
     * Get details about an object
     */
    getObject(input: GetObjectParams): Promise<SuiObjectResponse>;
    tryGetPastObject(input: TryGetPastObjectParams): Promise<ObjectRead>;
    /**
     * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
     */
    multiGetObjects(input: MultiGetObjectsParams): Promise<SuiObjectResponse[]>;
    /**
     * Get transaction blocks for a given query criteria
     */
    queryTransactionBlocks({ filter, options, cursor, limit, order, signal, }: QueryTransactionBlocksParams): Promise<PaginatedTransactionResponse>;
    getTransactionBlock(input: GetTransactionBlockParams): Promise<SuiTransactionBlockResponse>;
    multiGetTransactionBlocks(input: MultiGetTransactionBlocksParams): Promise<SuiTransactionBlockResponse[]>;
    executeTransactionBlock({ transactionBlock, signature, options, requestType, signal, }: ExecuteTransactionBlockParams): Promise<SuiTransactionBlockResponse>;
    signAndExecuteTransaction({ transaction, signer, ...input }: {
        transaction: Uint8Array | Transaction;
        signer: Signer;
    } & Omit<ExecuteTransactionBlockParams, 'transactionBlock' | 'signature'>): Promise<SuiTransactionBlockResponse>;
    /**
     * Get total number of transactions
     */
    getTotalTransactionBlocks({ signal }?: {
        signal?: AbortSignal;
    }): Promise<bigint>;
    /**
     * Getting the reference gas price for the network
     */
    getReferenceGasPrice({ signal }?: GetReferenceGasPriceParams): Promise<bigint>;
    /**
     * Return the delegated stakes for an address
     */
    getStakes(input: GetStakesParams): Promise<DelegatedStake[]>;
    /**
     * Return the delegated stakes queried by id.
     */
    getStakesByIds(input: GetStakesByIdsParams): Promise<DelegatedStake[]>;
    /**
     * Return the latest system state content.
     */
    getLatestSuiSystemState({ signal, }?: GetLatestSuiSystemStateParams): Promise<SuiSystemStateSummary>;
    /**
     * Get events for a given query criteria
     */
    queryEvents({ query, cursor, limit, order, signal, }: QueryEventsParams): Promise<PaginatedEvents>;
    /**
     * Subscribe to get notifications whenever an event matching the filter occurs
     *
     * @deprecated
     */
    subscribeEvent(input: SubscribeEventParams & {
        /** function to run when we receive a notification of a new event matching the filter */
        onMessage: (event: SuiEvent) => void;
    }): Promise<Unsubscribe>;
    /**
     * @deprecated
     */
    subscribeTransaction(input: SubscribeTransactionParams & {
        /** function to run when we receive a notification of a new event matching the filter */
        onMessage: (event: TransactionEffects) => void;
    }): Promise<Unsubscribe>;
    /**
     * Runs the transaction block in dev-inspect mode. Which allows for nearly any
     * transaction (or Move call) with any arguments. Detailed results are
     * provided, including both the transaction effects and any return values.
     */
    devInspectTransactionBlock(input: DevInspectTransactionBlockParams): Promise<DevInspectResults>;
    /**
     * Dry run a transaction block and return the result.
     */
    dryRunTransactionBlock(input: DryRunTransactionBlockParams): Promise<DryRunTransactionBlockResponse>;
    /**
     * Return the list of dynamic field objects owned by an object
     */
    getDynamicFields(input: GetDynamicFieldsParams): Promise<DynamicFieldPage>;
    /**
     * Return the dynamic field object information for a specified object
     */
    getDynamicFieldObject(input: GetDynamicFieldObjectParams): Promise<SuiObjectResponse>;
    /**
     * Get the sequence number of the latest checkpoint that has been executed
     */
    getLatestCheckpointSequenceNumber({ signal, }?: GetLatestCheckpointSequenceNumberParams): Promise<string>;
    /**
     * Returns information about a given checkpoint
     */
    getCheckpoint(input: GetCheckpointParams): Promise<Checkpoint>;
    /**
     * Returns historical checkpoints paginated
     */
    getCheckpoints(input: PaginationArguments<CheckpointPage['nextCursor']> & GetCheckpointsParams): Promise<CheckpointPage>;
    /**
     * Return the committee information for the asked epoch
     */
    getCommitteeInfo(input?: GetCommitteeInfoParams): Promise<CommitteeInfo>;
    getNetworkMetrics({ signal }?: {
        signal?: AbortSignal;
    }): Promise<NetworkMetrics>;
    getAddressMetrics({ signal }?: {
        signal?: AbortSignal;
    }): Promise<AddressMetrics>;
    getEpochMetrics(input?: {
        descendingOrder?: boolean;
        signal?: AbortSignal;
    } & PaginationArguments<EpochMetricsPage['nextCursor']>): Promise<EpochMetricsPage>;
    getAllEpochAddressMetrics(input?: {
        descendingOrder?: boolean;
        signal?: AbortSignal;
    }): Promise<AllEpochsAddressMetrics>;
    /**
     * Return the committee information for the asked epoch
     */
    getEpochs(input?: {
        descendingOrder?: boolean;
        signal?: AbortSignal;
    } & PaginationArguments<EpochPage['nextCursor']>): Promise<EpochPage>;
    /**
     * Returns list of top move calls by usage
     */
    getMoveCallMetrics({ signal }?: {
        signal?: AbortSignal;
    }): Promise<MoveCallMetrics>;
    /**
     * Return the committee information for the asked epoch
     */
    getCurrentEpoch({ signal }?: {
        signal?: AbortSignal;
    }): Promise<EpochInfo>;
    /**
     * Return the Validators APYs
     */
    getValidatorsApy({ signal }?: {
        signal?: AbortSignal;
    }): Promise<ValidatorsApy>;
    getChainIdentifier({ signal }?: {
        signal?: AbortSignal;
    }): Promise<string>;
    resolveNameServiceAddress(input: ResolveNameServiceAddressParams): Promise<string | null>;
    resolveNameServiceNames({ format, ...input }: ResolveNameServiceNamesParams & {
        format?: 'at' | 'dot';
    }): Promise<ResolvedNameServiceNames>;
    getProtocolConfig(input?: GetProtocolConfigParams): Promise<ProtocolConfig>;
    verifyZkLoginSignature(input: VerifyZkLoginSignatureParams): Promise<ZkLoginVerifyResult>;
    /**
     * Wait for a transaction block result to be available over the API.
     * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
     * be available via the API.
     * This currently polls the `getTransactionBlock` API to check for the transaction.
     */
    waitForTransaction({ signal, timeout, pollInterval, ...input }: {
        /** An optional abort signal that can be used to cancel */
        signal?: AbortSignal;
        /** The amount of time to wait for a transaction block. Defaults to one minute. */
        timeout?: number;
        /** The amount of time to wait between checks for the transaction block. Defaults to 2 seconds. */
        pollInterval?: number;
    } & Parameters<SuiClient['getTransactionBlock']>[0]): Promise<SuiTransactionBlockResponse>;
    experimental_asClientExtension(this: SuiClient): {
        readonly name: "jsonRPC";
        readonly register: () => SuiClient;
    };
}
export {};
