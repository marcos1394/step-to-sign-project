export declare class FaucetRateLimitError extends Error {
}
type FaucetCoinInfo = {
    amount: number;
    id: string;
    transferTxDigest: string;
};
type FaucetResponse = {
    transferredGasObjects: FaucetCoinInfo[];
    error?: string | null;
};
type BatchFaucetResponse = {
    task?: string | null;
    error?: string | null;
};
type BatchSendStatusType = {
    status: 'INPROGRESS' | 'SUCCEEDED' | 'DISCARDED';
    transferred_gas_objects: {
        sent: FaucetCoinInfo[];
    };
};
type BatchStatusFaucetResponse = {
    status: BatchSendStatusType;
    error?: string | null;
};
type FaucetResponseV2 = {
    status: 'Success' | FaucetFailure;
    coins_sent: FaucetCoinInfo[] | null;
};
type FaucetFailure = {
    Failure: {
        internal: string;
    };
};
/**
 * @deprecated("Use requestSuiFromFaucetV2 instead")
 */
export declare function requestSuiFromFaucetV0(input: {
    host: string;
    recipient: string;
    headers?: HeadersInit;
}): Promise<FaucetResponse>;
/**
 * @deprecated("Use requestSuiFromFaucetV2 instead")
 */
export declare function requestSuiFromFaucetV1(input: {
    host: string;
    recipient: string;
    headers?: HeadersInit;
}): Promise<BatchFaucetResponse>;
export declare function requestSuiFromFaucetV2(input: {
    host: string;
    recipient: string;
    headers?: HeadersInit;
}): Promise<FaucetResponseV2>;
/**
 * @deprecated("Use requestSuiFromFaucetV2 which returns directly a success or failure status")
 */
export declare function getFaucetRequestStatus(input: {
    host: string;
    taskId: string;
    headers?: HeadersInit;
}): Promise<BatchStatusFaucetResponse>;
export declare function getFaucetHost(network: 'testnet' | 'devnet' | 'localnet'): "https://faucet.testnet.sui.io" | "https://faucet.devnet.sui.io" | "http://127.0.0.1:9123";
export {};
