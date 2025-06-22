"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var dataloader_exports = {};
__export(dataloader_exports, {
  DataLoader: () => DataLoader
});
module.exports = __toCommonJS(dataloader_exports);
class DataLoader {
  constructor(batchLoadFn, options) {
    if (typeof batchLoadFn !== "function") {
      throw new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but got: ${batchLoadFn}.`
      );
    }
    this._batchLoadFn = batchLoadFn;
    this._maxBatchSize = getValidMaxBatchSize(options);
    this._batchScheduleFn = getValidBatchScheduleFn(options);
    this._cacheKeyFn = getValidCacheKeyFn(options);
    this._cacheMap = getValidCacheMap(options);
    this._batch = null;
    this.name = getValidName(options);
  }
  /**
   * Loads a key, returning a `Promise` for the value represented by that key.
   */
  load(key) {
    if (key === null || key === void 0) {
      throw new TypeError(
        `The loader.load() function must be called with a value, but got: ${String(key)}.`
      );
    }
    const batch = getCurrentBatch(this);
    const cacheMap = this._cacheMap;
    let cacheKey;
    if (cacheMap) {
      cacheKey = this._cacheKeyFn(key);
      const cachedPromise = cacheMap.get(cacheKey);
      if (cachedPromise) {
        const cacheHits = batch.cacheHits || (batch.cacheHits = []);
        return new Promise((resolve) => {
          cacheHits.push(() => {
            resolve(cachedPromise);
          });
        });
      }
    }
    batch.keys.push(key);
    const promise = new Promise((resolve, reject) => {
      batch.callbacks.push({ resolve, reject });
    });
    if (cacheMap) {
      cacheMap.set(cacheKey, promise);
    }
    return promise;
  }
  /**
   * Loads multiple keys, promising an array of values:
   *
   *     var [ a, b ] = await myLoader.loadMany([ 'a', 'b' ]);
   *
   * This is similar to the more verbose:
   *
   *     var [ a, b ] = await Promise.all([
   *       myLoader.load('a'),
   *       myLoader.load('b')
   *     ]);
   *
   * However it is different in the case where any load fails. Where
   * Promise.all() would reject, loadMany() always resolves, however each result
   * is either a value or an Error instance.
   *
   *     var [ a, b, c ] = await myLoader.loadMany([ 'a', 'b', 'badkey' ]);
   *     // c instanceof Error
   *
   */
  loadMany(keys) {
    if (!isArrayLike(keys)) {
      throw new TypeError(
        `The loader.loadMany() function must be called with Array<key>, but got: ${keys}.`
      );
    }
    const loadPromises = [];
    for (let i = 0; i < keys.length; i++) {
      loadPromises.push(this.load(keys[i]).catch((error) => error));
    }
    return Promise.all(loadPromises);
  }
  /**
   * Clears the value at `key` from the cache, if it exists. Returns itself for
   * method chaining.
   */
  clear(key) {
    const cacheMap = this._cacheMap;
    if (cacheMap) {
      const cacheKey = this._cacheKeyFn(key);
      cacheMap.delete(cacheKey);
    }
    return this;
  }
  /**
   * Clears the entire cache. To be used when some event results in unknown
   * invalidations across this particular `DataLoader`. Returns itself for
   * method chaining.
   */
  clearAll() {
    const cacheMap = this._cacheMap;
    if (cacheMap) {
      cacheMap.clear();
    }
    return this;
  }
  /**
   * Adds the provided key and value to the cache. If the key already
   * exists, no change is made. Returns itself for method chaining.
   *
   * To prime the cache with an error at a key, provide an Error instance.
   */
  prime(key, value) {
    const cacheMap = this._cacheMap;
    if (cacheMap) {
      const cacheKey = this._cacheKeyFn(key);
      if (cacheMap.get(cacheKey) === void 0) {
        let promise;
        if (value instanceof Error) {
          promise = Promise.reject(value);
          promise.catch(() => {
          });
        } else {
          promise = Promise.resolve(value);
        }
        cacheMap.set(cacheKey, promise);
      }
    }
    return this;
  }
}
const enqueuePostPromiseJob = (
  /** @ts-ignore */
  typeof process === "object" && typeof process.nextTick === "function" ? function(fn) {
    if (!resolvedPromise) {
      resolvedPromise = Promise.resolve();
    }
    resolvedPromise.then(() => {
      process.nextTick(fn);
    });
  } : (
    // @ts-ignore
    typeof setImmediate === "function" ? function(fn) {
      setImmediate(fn);
    } : function(fn) {
      setTimeout(fn);
    }
  )
);
let resolvedPromise;
function getCurrentBatch(loader) {
  const existingBatch = loader._batch;
  if (existingBatch !== null && !existingBatch.hasDispatched && existingBatch.keys.length < loader._maxBatchSize) {
    return existingBatch;
  }
  const newBatch = { hasDispatched: false, keys: [], callbacks: [] };
  loader._batch = newBatch;
  loader._batchScheduleFn(() => {
    dispatchBatch(loader, newBatch);
  });
  return newBatch;
}
function dispatchBatch(loader, batch) {
  batch.hasDispatched = true;
  if (batch.keys.length === 0) {
    resolveCacheHits(batch);
    return;
  }
  let batchPromise;
  try {
    batchPromise = loader._batchLoadFn(batch.keys);
  } catch (e) {
    return failedDispatch(
      loader,
      batch,
      new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function errored synchronously: ${String(e)}.`
      )
    );
  }
  if (!batchPromise || typeof batchPromise.then !== "function") {
    return failedDispatch(
      loader,
      batch,
      new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise: ${String(batchPromise)}.`
      )
    );
  }
  Promise.resolve(batchPromise).then((values) => {
    if (!isArrayLike(values)) {
      throw new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array: ${String(values)}.`
      );
    }
    if (values.length !== batch.keys.length) {
      throw new TypeError(
        `DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys.

Keys:
${String(batch.keys)}

Values:
${String(values)}`
      );
    }
    resolveCacheHits(batch);
    for (let i = 0; i < batch.callbacks.length; i++) {
      const value = values[i];
      if (value instanceof Error) {
        batch.callbacks[i].reject(value);
      } else {
        batch.callbacks[i].resolve(value);
      }
    }
  }).catch((error) => {
    failedDispatch(loader, batch, error);
  });
}
function failedDispatch(loader, batch, error) {
  resolveCacheHits(batch);
  for (let i = 0; i < batch.keys.length; i++) {
    loader.clear(batch.keys[i]);
    batch.callbacks[i].reject(error);
  }
}
function resolveCacheHits(batch) {
  if (batch.cacheHits) {
    for (let i = 0; i < batch.cacheHits.length; i++) {
      batch.cacheHits[i]();
    }
  }
}
function getValidMaxBatchSize(options) {
  const shouldBatch = !options || options.batch !== false;
  if (!shouldBatch) {
    return 1;
  }
  const maxBatchSize = options && options.maxBatchSize;
  if (maxBatchSize === void 0) {
    return Infinity;
  }
  if (typeof maxBatchSize !== "number" || maxBatchSize < 1) {
    throw new TypeError(`maxBatchSize must be a positive number: ${maxBatchSize}`);
  }
  return maxBatchSize;
}
function getValidBatchScheduleFn(options) {
  const batchScheduleFn = options && options.batchScheduleFn;
  if (batchScheduleFn === void 0) {
    return enqueuePostPromiseJob;
  }
  if (typeof batchScheduleFn !== "function") {
    throw new TypeError(`batchScheduleFn must be a function: ${batchScheduleFn}`);
  }
  return batchScheduleFn;
}
function getValidCacheKeyFn(options) {
  const cacheKeyFn = options && options.cacheKeyFn;
  if (cacheKeyFn === void 0) {
    return (key) => key;
  }
  if (typeof cacheKeyFn !== "function") {
    throw new TypeError(`cacheKeyFn must be a function: ${cacheKeyFn}`);
  }
  return cacheKeyFn;
}
function getValidCacheMap(options) {
  const shouldCache = !options || options.cache !== false;
  if (!shouldCache) {
    return null;
  }
  const cacheMap = options && options.cacheMap;
  if (cacheMap === void 0) {
    return /* @__PURE__ */ new Map();
  }
  if (cacheMap !== null) {
    const cacheFunctions = ["get", "set", "delete", "clear"];
    const missingFunctions = cacheFunctions.filter(
      (fnName) => cacheMap && typeof cacheMap[fnName] !== "function"
    );
    if (missingFunctions.length !== 0) {
      throw new TypeError("Custom cacheMap missing methods: " + missingFunctions.join(", "));
    }
  }
  return cacheMap;
}
function getValidName(options) {
  if (options && options.name) {
    return options.name;
  }
  return null;
}
function isArrayLike(x) {
  return typeof x === "object" && x !== null && "length" in x && typeof x.length === "number" && (x.length === 0 || x.length > 0 && Object.prototype.hasOwnProperty.call(x, x.length - 1));
}
//# sourceMappingURL=dataloader.js.map
