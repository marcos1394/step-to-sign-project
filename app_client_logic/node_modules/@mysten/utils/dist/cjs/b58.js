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
var b58_exports = {};
__export(b58_exports, {
  fromBase58: () => fromBase58,
  toBase58: () => toBase58
});
module.exports = __toCommonJS(b58_exports);
var import_base = require("@scure/base");
const toBase58 = (buffer) => import_base.base58.encode(buffer);
const fromBase58 = (str) => import_base.base58.decode(str);
//# sourceMappingURL=b58.js.map
