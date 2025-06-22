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
var ObjectCache_exports = {};
__export(ObjectCache_exports, {
  AsyncCache: () => AsyncCache,
  InMemoryCache: () => InMemoryCache,
  ObjectCache: () => ObjectCache
});
module.exports = __toCommonJS(ObjectCache_exports);
var import_sui_types = require("../utils/sui-types.js");
var _caches, _cache, _onEffects;
class AsyncCache {
  async getObject(id) {
    const [owned, shared] = await Promise.all([
      this.get("OwnedObject", id),
      this.get("SharedOrImmutableObject", id)
    ]);
    return owned ?? shared ?? null;
  }
  async getObjects(ids) {
    return Promise.all([...ids.map((id) => this.getObject(id))]);
  }
  async addObject(object) {
    if (object.owner) {
      await this.set("OwnedObject", object.objectId, object);
    } else {
      await this.set("SharedOrImmutableObject", object.objectId, object);
    }
    return object;
  }
  async addObjects(objects) {
    await Promise.all(objects.map(async (object) => this.addObject(object)));
  }
  async deleteObject(id) {
    await Promise.all([this.delete("OwnedObject", id), this.delete("SharedOrImmutableObject", id)]);
  }
  async deleteObjects(ids) {
    await Promise.all(ids.map((id) => this.deleteObject(id)));
  }
  async getMoveFunctionDefinition(ref) {
    const functionName = `${(0, import_sui_types.normalizeSuiAddress)(ref.package)}::${ref.module}::${ref.function}`;
    return this.get("MoveFunction", functionName);
  }
  async addMoveFunctionDefinition(functionEntry) {
    const pkg = (0, import_sui_types.normalizeSuiAddress)(functionEntry.package);
    const functionName = `${pkg}::${functionEntry.module}::${functionEntry.function}`;
    const entry = {
      ...functionEntry,
      package: pkg
    };
    await this.set("MoveFunction", functionName, entry);
    return entry;
  }
  async deleteMoveFunctionDefinition(ref) {
    const functionName = `${(0, import_sui_types.normalizeSuiAddress)(ref.package)}::${ref.module}::${ref.function}`;
    await this.delete("MoveFunction", functionName);
  }
  async getCustom(key) {
    return this.get("Custom", key);
  }
  async setCustom(key, value) {
    return this.set("Custom", key, value);
  }
  async deleteCustom(key) {
    return this.delete("Custom", key);
  }
}
class InMemoryCache extends AsyncCache {
  constructor() {
    super(...arguments);
    __privateAdd(this, _caches, {
      OwnedObject: /* @__PURE__ */ new Map(),
      SharedOrImmutableObject: /* @__PURE__ */ new Map(),
      MoveFunction: /* @__PURE__ */ new Map(),
      Custom: /* @__PURE__ */ new Map()
    });
  }
  async get(type, key) {
    return __privateGet(this, _caches)[type].get(key) ?? null;
  }
  async set(type, key, value) {
    __privateGet(this, _caches)[type].set(key, value);
  }
  async delete(type, key) {
    __privateGet(this, _caches)[type].delete(key);
  }
  async clear(type) {
    if (type) {
      __privateGet(this, _caches)[type].clear();
    } else {
      for (const cache of Object.values(__privateGet(this, _caches))) {
        cache.clear();
      }
    }
  }
}
_caches = new WeakMap();
class ObjectCache {
  constructor({ cache = new InMemoryCache(), onEffects }) {
    __privateAdd(this, _cache);
    __privateAdd(this, _onEffects);
    __privateSet(this, _cache, cache);
    __privateSet(this, _onEffects, onEffects);
  }
  asPlugin() {
    return async (transactionData, _options, next) => {
      const unresolvedObjects = transactionData.inputs.filter((input) => input.UnresolvedObject).map((input) => input.UnresolvedObject.objectId);
      const cached = (await __privateGet(this, _cache).getObjects(unresolvedObjects)).filter(
        (obj) => obj !== null
      );
      const byId = new Map(cached.map((obj) => [obj.objectId, obj]));
      for (const input of transactionData.inputs) {
        if (!input.UnresolvedObject) {
          continue;
        }
        const cached2 = byId.get(input.UnresolvedObject.objectId);
        if (!cached2) {
          continue;
        }
        if (cached2.initialSharedVersion && !input.UnresolvedObject.initialSharedVersion) {
          input.UnresolvedObject.initialSharedVersion = cached2.initialSharedVersion;
        } else {
          if (cached2.version && !input.UnresolvedObject.version) {
            input.UnresolvedObject.version = cached2.version;
          }
          if (cached2.digest && !input.UnresolvedObject.digest) {
            input.UnresolvedObject.digest = cached2.digest;
          }
        }
      }
      await Promise.all(
        transactionData.commands.map(async (commands) => {
          if (commands.MoveCall) {
            const def = await this.getMoveFunctionDefinition({
              package: commands.MoveCall.package,
              module: commands.MoveCall.module,
              function: commands.MoveCall.function
            });
            if (def) {
              commands.MoveCall._argumentTypes = def.parameters;
            }
          }
        })
      );
      await next();
      await Promise.all(
        transactionData.commands.map(async (commands) => {
          if (commands.MoveCall?._argumentTypes) {
            await __privateGet(this, _cache).addMoveFunctionDefinition({
              package: commands.MoveCall.package,
              module: commands.MoveCall.module,
              function: commands.MoveCall.function,
              parameters: commands.MoveCall._argumentTypes
            });
          }
        })
      );
    };
  }
  async clear() {
    await __privateGet(this, _cache).clear();
  }
  async getMoveFunctionDefinition(ref) {
    return __privateGet(this, _cache).getMoveFunctionDefinition(ref);
  }
  async getObjects(ids) {
    return __privateGet(this, _cache).getObjects(ids);
  }
  async deleteObjects(ids) {
    return __privateGet(this, _cache).deleteObjects(ids);
  }
  async clearOwnedObjects() {
    await __privateGet(this, _cache).clear("OwnedObject");
  }
  async clearCustom() {
    await __privateGet(this, _cache).clear("Custom");
  }
  async getCustom(key) {
    return __privateGet(this, _cache).getCustom(key);
  }
  async setCustom(key, value) {
    return __privateGet(this, _cache).setCustom(key, value);
  }
  async deleteCustom(key) {
    return __privateGet(this, _cache).deleteCustom(key);
  }
  async applyEffects(effects) {
    var _a;
    if (!effects.V2) {
      throw new Error(`Unsupported transaction effects version ${effects.$kind}`);
    }
    const { lamportVersion, changedObjects } = effects.V2;
    const deletedIds = [];
    const addedObjects = [];
    changedObjects.forEach(([id, change]) => {
      if (change.outputState.NotExist) {
        deletedIds.push(id);
      } else if (change.outputState.ObjectWrite) {
        const [digest, owner] = change.outputState.ObjectWrite;
        addedObjects.push({
          objectId: id,
          digest,
          version: lamportVersion,
          owner: owner.AddressOwner ?? owner.ObjectOwner ?? null,
          initialSharedVersion: owner.Shared?.initialSharedVersion ?? null
        });
      }
    });
    await Promise.all([
      __privateGet(this, _cache).addObjects(addedObjects),
      __privateGet(this, _cache).deleteObjects(deletedIds),
      (_a = __privateGet(this, _onEffects)) == null ? void 0 : _a.call(this, effects)
    ]);
  }
}
_cache = new WeakMap();
_onEffects = new WeakMap();
//# sourceMappingURL=ObjectCache.js.map
