var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _client, _lastDigest;
import { bcs } from "../../bcs/index.js";
import { ObjectCache } from "../ObjectCache.js";
import { isTransaction } from "../Transaction.js";
class CachingTransactionExecutor {
  constructor({
    client,
    ...options
  }) {
    __privateAdd(this, _client);
    __privateAdd(this, _lastDigest, null);
    __privateSet(this, _client, client);
    this.cache = new ObjectCache(options);
  }
  /**
   * Clears all Owned objects
   * Immutable objects, Shared objects, and Move function definitions will be preserved
   */
  async reset() {
    await Promise.all([
      this.cache.clearOwnedObjects(),
      this.cache.clearCustom(),
      this.waitForLastTransaction()
    ]);
  }
  async buildTransaction({
    transaction,
    ...options
  }) {
    transaction.addBuildPlugin(this.cache.asPlugin());
    return transaction.build({
      client: __privateGet(this, _client),
      ...options
    });
  }
  async executeTransaction({
    transaction,
    options,
    ...input
  }) {
    const bytes = isTransaction(transaction) ? await this.buildTransaction({ transaction }) : transaction;
    const results = await __privateGet(this, _client).executeTransactionBlock({
      ...input,
      transactionBlock: bytes,
      options: {
        ...options,
        showRawEffects: true
      }
    });
    if (results.rawEffects) {
      const effects = bcs.TransactionEffects.parse(Uint8Array.from(results.rawEffects));
      await this.applyEffects(effects);
    }
    return results;
  }
  async signAndExecuteTransaction({
    options,
    transaction,
    ...input
  }) {
    transaction.setSenderIfNotSet(input.signer.toSuiAddress());
    const bytes = await this.buildTransaction({ transaction });
    const { signature } = await input.signer.signTransaction(bytes);
    const results = await this.executeTransaction({
      transaction: bytes,
      signature,
      options
    });
    return results;
  }
  async applyEffects(effects) {
    __privateSet(this, _lastDigest, effects.V2?.transactionDigest ?? null);
    await this.cache.applyEffects(effects);
  }
  async waitForLastTransaction() {
    if (__privateGet(this, _lastDigest)) {
      await __privateGet(this, _client).waitForTransaction({ digest: __privateGet(this, _lastDigest) });
      __privateSet(this, _lastDigest, null);
    }
  }
}
_client = new WeakMap();
_lastDigest = new WeakMap();
export {
  CachingTransactionExecutor
};
//# sourceMappingURL=caching.js.map
