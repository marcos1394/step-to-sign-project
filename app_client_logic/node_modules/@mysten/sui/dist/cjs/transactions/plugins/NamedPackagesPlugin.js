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
var NamedPackagesPlugin_exports = {};
__export(NamedPackagesPlugin_exports, {
  getClient: () => getClient,
  namedPackagesPlugin: () => namedPackagesPlugin
});
module.exports = __toCommonJS(NamedPackagesPlugin_exports);
var import_cache = require("../../experimental/cache.js");
var import_mvr = require("../../experimental/mvr.js");
var import_mvr2 = require("../../experimental/mvr.js");
const cacheMap = /* @__PURE__ */ new WeakMap();
const namedPackagesPlugin = (options) => {
  let mvrClient;
  if (options) {
    const overrides = options.overrides ?? {
      packages: {},
      types: {}
    };
    if (!cacheMap.has(overrides)) {
      cacheMap.set(overrides, new import_cache.ClientCache());
    }
    mvrClient = new import_mvr.MvrClient({
      cache: cacheMap.get(overrides),
      url: options.url,
      pageSize: options.pageSize,
      overrides
    });
  }
  return async (transactionData, buildOptions, next) => {
    const names = (0, import_mvr2.findNamesInTransaction)(transactionData);
    if (names.types.length === 0 && names.packages.length === 0) {
      return next();
    }
    const resolved = await (mvrClient || getClient(buildOptions).core.mvr).resolve({
      types: names.types,
      packages: names.packages
    });
    (0, import_mvr2.replaceNames)(transactionData, resolved);
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
//# sourceMappingURL=NamedPackagesPlugin.js.map
