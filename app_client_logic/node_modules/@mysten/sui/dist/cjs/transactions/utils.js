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
  extractMutableReference: () => extractMutableReference,
  extractReference: () => extractReference,
  extractStructTag: () => extractStructTag,
  getIdFromCallArg: () => getIdFromCallArg,
  isArgument: () => isArgument
});
module.exports = __toCommonJS(utils_exports);
var import_valibot = require("valibot");
var import_sui_types = require("../utils/sui-types.js");
var import_internal = require("./data/internal.js");
function extractMutableReference(normalizedType) {
  return typeof normalizedType === "object" && "MutableReference" in normalizedType ? normalizedType.MutableReference : void 0;
}
function extractReference(normalizedType) {
  return typeof normalizedType === "object" && "Reference" in normalizedType ? normalizedType.Reference : void 0;
}
function extractStructTag(normalizedType) {
  if (typeof normalizedType === "object" && "Struct" in normalizedType) {
    return normalizedType;
  }
  const ref = extractReference(normalizedType);
  const mutRef = extractMutableReference(normalizedType);
  if (typeof ref === "object" && "Struct" in ref) {
    return ref;
  }
  if (typeof mutRef === "object" && "Struct" in mutRef) {
    return mutRef;
  }
  return void 0;
}
function getIdFromCallArg(arg) {
  if (typeof arg === "string") {
    return (0, import_sui_types.normalizeSuiAddress)(arg);
  }
  if (arg.Object) {
    if (arg.Object.ImmOrOwnedObject) {
      return (0, import_sui_types.normalizeSuiAddress)(arg.Object.ImmOrOwnedObject.objectId);
    }
    if (arg.Object.Receiving) {
      return (0, import_sui_types.normalizeSuiAddress)(arg.Object.Receiving.objectId);
    }
    return (0, import_sui_types.normalizeSuiAddress)(arg.Object.SharedObject.objectId);
  }
  if (arg.UnresolvedObject) {
    return (0, import_sui_types.normalizeSuiAddress)(arg.UnresolvedObject.objectId);
  }
  return void 0;
}
function isArgument(value) {
  return (0, import_valibot.is)(import_internal.Argument, value);
}
//# sourceMappingURL=utils.js.map
