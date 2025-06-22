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
var index_exports = {};
__export(index_exports, {
  BcsReader: () => import_reader.BcsReader,
  BcsType: () => import_bcs_type.BcsType,
  BcsWriter: () => import_writer.BcsWriter,
  SerializedBcs: () => import_bcs_type.SerializedBcs,
  bcs: () => import_bcs.bcs,
  decodeStr: () => import_utils2.decodeStr,
  encodeStr: () => import_utils2.encodeStr,
  fromB58: () => fromB58,
  fromB64: () => fromB64,
  fromBase58: () => import_utils.fromBase58,
  fromBase64: () => import_utils.fromBase64,
  fromHEX: () => fromHEX,
  fromHex: () => import_utils.fromHex,
  isSerializedBcs: () => import_bcs_type.isSerializedBcs,
  splitGenericParameters: () => import_utils2.splitGenericParameters,
  toB58: () => toB58,
  toB64: () => toB64,
  toBase58: () => import_utils.toBase58,
  toBase64: () => import_utils.toBase64,
  toHEX: () => toHEX,
  toHex: () => import_utils.toHex
});
module.exports = __toCommonJS(index_exports);
var import_utils = require("@mysten/utils");
var import_bcs_type = require("./bcs-type.js");
var import_bcs = require("./bcs.js");
var import_reader = require("./reader.js");
var import_utils2 = require("./utils.js");
var import_writer = require("./writer.js");
const toB58 = import_utils.toBase58;
const fromB58 = import_utils.fromBase58;
const toB64 = import_utils.toBase64;
const fromB64 = import_utils.fromBase64;
const toHEX = import_utils.toHex;
const fromHEX = import_utils.fromHex;
//# sourceMappingURL=index.js.map
