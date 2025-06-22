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
var utils_exports = {};
__export(utils_exports, {
  MIST_PER_SUI: () => import_constants.MIST_PER_SUI,
  MOVE_STDLIB_ADDRESS: () => import_constants.MOVE_STDLIB_ADDRESS,
  SUI_ADDRESS_LENGTH: () => import_sui_types.SUI_ADDRESS_LENGTH,
  SUI_CLOCK_OBJECT_ID: () => import_constants.SUI_CLOCK_OBJECT_ID,
  SUI_DECIMALS: () => import_constants.SUI_DECIMALS,
  SUI_FRAMEWORK_ADDRESS: () => import_constants.SUI_FRAMEWORK_ADDRESS,
  SUI_SYSTEM_ADDRESS: () => import_constants.SUI_SYSTEM_ADDRESS,
  SUI_SYSTEM_MODULE_NAME: () => import_constants.SUI_SYSTEM_MODULE_NAME,
  SUI_SYSTEM_STATE_OBJECT_ID: () => import_constants.SUI_SYSTEM_STATE_OBJECT_ID,
  SUI_TYPE_ARG: () => import_constants.SUI_TYPE_ARG,
  deriveDynamicFieldID: () => import_dynamic_fields.deriveDynamicFieldID,
  formatAddress: () => import_format.formatAddress,
  formatDigest: () => import_format.formatDigest,
  fromB64: () => import_bcs.fromB64,
  fromBase58: () => import_bcs.fromBase58,
  fromBase64: () => import_bcs.fromBase64,
  fromHEX: () => import_bcs.fromHEX,
  fromHex: () => import_bcs.fromHex,
  isValidNamedPackage: () => import_move_registry.isValidNamedPackage,
  isValidNamedType: () => import_move_registry.isValidNamedType,
  isValidSuiAddress: () => import_sui_types.isValidSuiAddress,
  isValidSuiNSName: () => import_suins.isValidSuiNSName,
  isValidSuiObjectId: () => import_sui_types.isValidSuiObjectId,
  isValidTransactionDigest: () => import_sui_types.isValidTransactionDigest,
  normalizeStructTag: () => import_sui_types.normalizeStructTag,
  normalizeSuiAddress: () => import_sui_types.normalizeSuiAddress,
  normalizeSuiNSName: () => import_suins.normalizeSuiNSName,
  normalizeSuiObjectId: () => import_sui_types.normalizeSuiObjectId,
  parseStructTag: () => import_sui_types.parseStructTag,
  toB64: () => import_bcs.toB64,
  toBase58: () => import_bcs.toBase58,
  toBase64: () => import_bcs.toBase64,
  toHEX: () => import_bcs.toHEX,
  toHex: () => import_bcs.toHex
});
module.exports = __toCommonJS(utils_exports);
var import_format = require("./format.js");
var import_sui_types = require("./sui-types.js");
var import_bcs = require("@mysten/bcs");
var import_suins = require("./suins.js");
var import_constants = require("./constants.js");
var import_move_registry = require("./move-registry.js");
var import_dynamic_fields = require("./dynamic-fields.js");
//# sourceMappingURL=index.js.map
