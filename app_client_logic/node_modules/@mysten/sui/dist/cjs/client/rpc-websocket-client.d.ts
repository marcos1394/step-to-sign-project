type SubscriptionRequest<T = any> = {
    method: string;
    unsubscribe: string;
    params: any[];
    onMessage: (event: T) => void;
    signal?: AbortSignal;
};
/**
 * Configuration options for the websocket connection
 */
export type WebsocketClientOptions = {
    /**
     * Custom WebSocket class to use. Defaults to the global WebSocket class, if available.
     */
    WebSocketConstructor?: typeof WebSocket;
    /**
     * Milliseconds before timing out while calling an RPC method
     */
    callTimeout?: number;
    /**
     * Milliseconds between attempts to connect
     */
    reconnectTimeout?: number;
    /**
     * Maximum number of times to try connecting before giving up
     */
    maxReconnects?: number;
};
export declare const DEFAULT_CLIENT_OPTIONS: {
    WebSocketConstructor: typeof WebSocket;
    callTimeout: number;
    reconnectTimeout: number;
    maxReconnects: number;
};
export declare class WebsocketClient {
    #private;
    endpoint: string;
    options: Required<WebsocketClientOptions>;
    constructor(endpoint: string, options?: WebsocketClientOptions);
    makeRequest<T>(method: string, params: any[], signal?: AbortSignal): Promise<T>;
    subscribe<T>(input: SubscriptionRequest<T>): Promise<() => Promise<unknown>>;
}
export {};
