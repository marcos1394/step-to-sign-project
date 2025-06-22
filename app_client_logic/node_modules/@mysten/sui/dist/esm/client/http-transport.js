var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _requestId, _options, _websocketClient, _SuiHTTPTransport_instances, getWebsocketClient_fn;
import { PACKAGE_VERSION, TARGETED_RPC_VERSION } from "../version.js";
import { JsonRpcError, SuiHTTPStatusError } from "./errors.js";
import { WebsocketClient } from "./rpc-websocket-client.js";
class SuiHTTPTransport {
  constructor(options) {
    __privateAdd(this, _SuiHTTPTransport_instances);
    __privateAdd(this, _requestId, 0);
    __privateAdd(this, _options);
    __privateAdd(this, _websocketClient);
    __privateSet(this, _options, options);
  }
  fetch(input, init) {
    const fetchFn = __privateGet(this, _options).fetch ?? fetch;
    if (!fetchFn) {
      throw new Error(
        "The current environment does not support fetch, you can provide a fetch implementation in the options for SuiHTTPTransport."
      );
    }
    return fetchFn(input, init);
  }
  async request(input) {
    __privateSet(this, _requestId, __privateGet(this, _requestId) + 1);
    const res = await this.fetch(__privateGet(this, _options).rpc?.url ?? __privateGet(this, _options).url, {
      method: "POST",
      signal: input.signal,
      headers: {
        "Content-Type": "application/json",
        "Client-Sdk-Type": "typescript",
        "Client-Sdk-Version": PACKAGE_VERSION,
        "Client-Target-Api-Version": TARGETED_RPC_VERSION,
        "Client-Request-Method": input.method,
        ...__privateGet(this, _options).rpc?.headers
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: __privateGet(this, _requestId),
        method: input.method,
        params: input.params
      })
    });
    if (!res.ok) {
      throw new SuiHTTPStatusError(
        `Unexpected status code: ${res.status}`,
        res.status,
        res.statusText
      );
    }
    const data = await res.json();
    if ("error" in data && data.error != null) {
      throw new JsonRpcError(data.error.message, data.error.code);
    }
    return data.result;
  }
  async subscribe(input) {
    const unsubscribe = await __privateMethod(this, _SuiHTTPTransport_instances, getWebsocketClient_fn).call(this).subscribe(input);
    if (input.signal) {
      input.signal.throwIfAborted();
      input.signal.addEventListener("abort", () => {
        unsubscribe();
      });
    }
    return async () => !!await unsubscribe();
  }
}
_requestId = new WeakMap();
_options = new WeakMap();
_websocketClient = new WeakMap();
_SuiHTTPTransport_instances = new WeakSet();
getWebsocketClient_fn = function() {
  if (!__privateGet(this, _websocketClient)) {
    const WebSocketConstructor = __privateGet(this, _options).WebSocketConstructor ?? WebSocket;
    if (!WebSocketConstructor) {
      throw new Error(
        "The current environment does not support WebSocket, you can provide a WebSocketConstructor in the options for SuiHTTPTransport."
      );
    }
    __privateSet(this, _websocketClient, new WebsocketClient(
      __privateGet(this, _options).websocket?.url ?? __privateGet(this, _options).url,
      {
        WebSocketConstructor,
        ...__privateGet(this, _options).websocket
      }
    ));
  }
  return __privateGet(this, _websocketClient);
};
export {
  SuiHTTPTransport
};
//# sourceMappingURL=http-transport.js.map
