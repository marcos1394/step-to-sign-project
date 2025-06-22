"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var client_exports = {};
__export(client_exports, {
  SuiGraphQLClient: () => SuiGraphQLClient,
  SuiGraphQLRequestError: () => SuiGraphQLRequestError
});
module.exports = __toCommonJS(client_exports);
var import_graphql = require("graphql");
var import_experimental = require("../experimental/index.js");
var import_graphql2 = require("../experimental/transports/graphql.js");
var _url, _queries, _headers, _fetch;
class SuiGraphQLRequestError extends Error {
}
class SuiGraphQLClient extends import_experimental.Experimental_BaseClient {
  constructor({
    url,
    fetch: fetchFn = fetch,
    headers = {},
    queries = {},
    network = "unknown",
    mvr
  }) {
    super({
      network
    });
    __privateAdd(this, _url);
    __privateAdd(this, _queries);
    __privateAdd(this, _headers);
    __privateAdd(this, _fetch);
    __privateSet(this, _url, url);
    __privateSet(this, _queries, queries);
    __privateSet(this, _headers, headers);
    __privateSet(this, _fetch, (...args) => fetchFn(...args));
    this.core = new import_graphql2.GraphQLTransport({
      graphqlClient: this,
      mvr
    });
  }
  async query(options) {
    const res = await __privateGet(this, _fetch).call(this, __privateGet(this, _url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...__privateGet(this, _headers)
      },
      body: JSON.stringify({
        query: typeof options.query === "string" || options.query instanceof String ? String(options.query) : (0, import_graphql.print)(options.query),
        variables: options.variables,
        extensions: options.extensions,
        operationName: options.operationName
      }),
      signal: options.signal
    });
    if (!res.ok) {
      throw new SuiGraphQLRequestError(`GraphQL request failed: ${res.statusText} (${res.status})`);
    }
    return await res.json();
  }
  async execute(query, options) {
    return this.query({
      ...options,
      query: __privateGet(this, _queries)[query]
    });
  }
}
_url = new WeakMap();
_queries = new WeakMap();
_headers = new WeakMap();
_fetch = new WeakMap();
//# sourceMappingURL=client.js.map
