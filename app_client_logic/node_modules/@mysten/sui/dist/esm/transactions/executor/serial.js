var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _queue, _signer, _cache, _defaultGasBudget, _cacheGasCoin, _buildTransaction;
import { toBase64 } from "@mysten/bcs";
import { isTransaction, Transaction } from "../Transaction.js";
import { CachingTransactionExecutor } from "./caching.js";
import { SerialQueue } from "./queue.js";
class SerialTransactionExecutor {
  constructor({
    signer,
    defaultGasBudget = 50000000n,
    ...options
  }) {
    __privateAdd(this, _queue, new SerialQueue());
    __privateAdd(this, _signer);
    __privateAdd(this, _cache);
    __privateAdd(this, _defaultGasBudget);
    __privateAdd(this, _cacheGasCoin, async (effects) => {
      if (!effects.V2) {
        return;
      }
      const gasCoin = getGasCoinFromEffects(effects).ref;
      if (gasCoin) {
        __privateGet(this, _cache).cache.setCustom("gasCoin", gasCoin);
      } else {
        __privateGet(this, _cache).cache.deleteCustom("gasCoin");
      }
    });
    __privateAdd(this, _buildTransaction, async (transaction) => {
      const gasCoin = await __privateGet(this, _cache).cache.getCustom("gasCoin");
      const copy = Transaction.from(transaction);
      if (gasCoin) {
        copy.setGasPayment([gasCoin]);
      }
      copy.setGasBudgetIfNotSet(__privateGet(this, _defaultGasBudget));
      copy.setSenderIfNotSet(__privateGet(this, _signer).toSuiAddress());
      return __privateGet(this, _cache).buildTransaction({ transaction: copy });
    });
    __privateSet(this, _signer, signer);
    __privateSet(this, _defaultGasBudget, defaultGasBudget);
    __privateSet(this, _cache, new CachingTransactionExecutor({
      client: options.client,
      cache: options.cache,
      onEffects: (effects) => __privateGet(this, _cacheGasCoin).call(this, effects)
    }));
  }
  async applyEffects(effects) {
    return __privateGet(this, _cache).applyEffects(effects);
  }
  async buildTransaction(transaction) {
    return __privateGet(this, _queue).runTask(() => __privateGet(this, _buildTransaction).call(this, transaction));
  }
  resetCache() {
    return __privateGet(this, _cache).reset();
  }
  waitForLastTransaction() {
    return __privateGet(this, _cache).waitForLastTransaction();
  }
  executeTransaction(transaction, options, additionalSignatures = []) {
    return __privateGet(this, _queue).runTask(async () => {
      const bytes = isTransaction(transaction) ? await __privateGet(this, _buildTransaction).call(this, transaction) : transaction;
      const { signature } = await __privateGet(this, _signer).signTransaction(bytes);
      const results = await __privateGet(this, _cache).executeTransaction({
        signature: [signature, ...additionalSignatures],
        transaction: bytes,
        options
      }).catch(async (error) => {
        await this.resetCache();
        throw error;
      });
      const effectsBytes = Uint8Array.from(results.rawEffects);
      return {
        digest: results.digest,
        effects: toBase64(effectsBytes),
        data: results
      };
    });
  }
}
_queue = new WeakMap();
_signer = new WeakMap();
_cache = new WeakMap();
_defaultGasBudget = new WeakMap();
_cacheGasCoin = new WeakMap();
_buildTransaction = new WeakMap();
function getGasCoinFromEffects(effects) {
  if (!effects.V2) {
    throw new Error("Unexpected effects version");
  }
  const gasObjectChange = effects.V2.changedObjects[effects.V2.gasObjectIndex];
  if (!gasObjectChange) {
    throw new Error("Gas object not found in effects");
  }
  const [objectId, { outputState }] = gasObjectChange;
  if (!outputState.ObjectWrite) {
    throw new Error("Unexpected gas object state");
  }
  const [digest, owner] = outputState.ObjectWrite;
  return {
    ref: {
      objectId,
      digest,
      version: effects.V2.lamportVersion
    },
    owner: owner.AddressOwner || owner.ObjectOwner
  };
}
export {
  SerialTransactionExecutor,
  getGasCoinFromEffects
};
//# sourceMappingURL=serial.js.map
