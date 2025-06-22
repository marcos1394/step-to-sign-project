import { ClientCache } from "../../experimental/cache.js";
import { MvrClient } from "../../experimental/mvr.js";
import { findNamesInTransaction, replaceNames } from "../../experimental/mvr.js";
const cacheMap = /* @__PURE__ */ new WeakMap();
const namedPackagesPlugin = (options) => {
  let mvrClient;
  if (options) {
    const overrides = options.overrides ?? {
      packages: {},
      types: {}
    };
    if (!cacheMap.has(overrides)) {
      cacheMap.set(overrides, new ClientCache());
    }
    mvrClient = new MvrClient({
      cache: cacheMap.get(overrides),
      url: options.url,
      pageSize: options.pageSize,
      overrides
    });
  }
  return async (transactionData, buildOptions, next) => {
    const names = findNamesInTransaction(transactionData);
    if (names.types.length === 0 && names.packages.length === 0) {
      return next();
    }
    const resolved = await (mvrClient || getClient(buildOptions).core.mvr).resolve({
      types: names.types,
      packages: names.packages
    });
    replaceNames(transactionData, resolved);
    await next();
  };
};
function getClient(options) {
  if (!options.client) {
    throw new Error(
      `No sui client passed to Transaction#build, but transaction data was not sufficient to build offline.`
    );
  }
  return options.client;
}
export {
  getClient,
  namedPackagesPlugin
};
//# sourceMappingURL=NamedPackagesPlugin.js.map
