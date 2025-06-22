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
  decodeStr: () => decodeStr,
  encodeStr: () => encodeStr,
  splitGenericParameters: () => splitGenericParameters
});
module.exports = __toCommonJS(utils_exports);
var import_utils = require("@mysten/utils");
function encodeStr(data, encoding) {
  switch (encoding) {
    case "base58":
      return (0, import_utils.toBase58)(data);
    case "base64":
      return (0, import_utils.toBase64)(data);
    case "hex":
      return (0, import_utils.toHex)(data);
    default:
      throw new Error("Unsupported encoding, supported values are: base64, hex");
  }
}
function decodeStr(data, encoding) {
  switch (encoding) {
    case "base58":
      return (0, import_utils.fromBase58)(data);
    case "base64":
      return (0, import_utils.fromBase64)(data);
    case "hex":
      return (0, import_utils.fromHex)(data);
    default:
      throw new Error("Unsupported encoding, supported values are: base64, hex");
  }
}
function splitGenericParameters(str, genericSeparators = ["<", ">"]) {
  const [left, right] = genericSeparators;
  const tok = [];
  let word = "";
  let nestedAngleBrackets = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === left) {
      nestedAngleBrackets++;
    }
    if (char === right) {
      nestedAngleBrackets--;
    }
    if (nestedAngleBrackets === 0 && char === ",") {
      tok.push(word.trim());
      word = "";
      continue;
    }
    word += char;
  }
  tok.push(word.trim());
  return tok;
}
//# sourceMappingURL=utils.js.map
