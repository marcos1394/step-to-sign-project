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
var cache_exports = {};
__export(cache_exports, {
  ClientCache: () => ClientCache
});
module.exports = __toCommonJS(cache_exports);
var _prefix, _cache;
const _ClientCache = class _ClientCache {
  constructor({ prefix, cache } = {}) {
    __privateAdd(this, _prefix);
    __privateAdd(this, _cache);
    __privateSet(this, _prefix, prefix ?? []);
    __privateSet(this, _cache, cache ?? /* @__PURE__ */ new Map());
  }
  read(key, load) {
    const cacheKey = [__privateGet(this, _prefix), ...key].join(":");
    if (__privateGet(this, _cache).has(cacheKey)) {
      return __privateGet(this, _cache).get(cacheKey);
    }
    const result = load();
    __privateGet(this, _cache).set(cacheKey, result);
    if (typeof result === "object" && result !== null && "then" in result) {
      return Promise.resolve(result).then((v) => {
        __privateGet(this, _cache).set(cacheKey, v);
        return v;
      }).catch((err) => {
        __privateGet(this, _cache).delete(cacheKey);
        throw err;
      });
    }
    return result;
  }
  readSync(key, load) {
    const cacheKey = [__privateGet(this, _prefix), ...key].join(":");
    if (__privateGet(this, _cache).has(cacheKey)) {
      return __privateGet(this, _cache).get(cacheKey);
    }
    const result = load();
    __privateGet(this, _cache).set(cacheKey, result);
    return result;
  }
  clear(prefix) {
    const prefixKey = [...__privateGet(this, _prefix), ...prefix ?? []].join(":");
    if (!prefixKey) {
      __privateGet(this, _cache).clear();
      return;
    }
    for (const key of __privateGet(this, _cache).keys()) {
      if (key.startsWith(prefixKey)) {
        __privateGet(this, _cache).delete(key);
      }
    }
  }
  scope(prefix) {
    return new _ClientCache({
      prefix: [...__privateGet(this, _prefix), ...Array.isArray(prefix) ? prefix : [prefix]],
      cache: __privateGet(this, _cache)
    });
  }
};
_prefix = new WeakMap();
_cache = new WeakMap();
let ClientCache = _ClientCache;
//# sourceMappingURL=cache.js.map
