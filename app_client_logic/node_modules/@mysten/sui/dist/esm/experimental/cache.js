var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
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
export {
  ClientCache
};
//# sourceMappingURL=cache.js.map
