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
  chunkArray: () => chunkArray,
  genAddressSeed: () => genAddressSeed,
  getExtendedEphemeralPublicKey: () => getExtendedEphemeralPublicKey,
  hashASCIIStrToField: () => hashASCIIStrToField,
  normalizeZkLoginIssuer: () => normalizeZkLoginIssuer,
  toBigEndianBytes: () => toBigEndianBytes,
  toPaddedBigEndianBytes: () => toPaddedBigEndianBytes
});
module.exports = __toCommonJS(utils_exports);
var import_utils = require("@noble/hashes/utils");
var import_poseidon = require("./poseidon.js");
const MAX_KEY_CLAIM_NAME_LENGTH = 32;
const MAX_KEY_CLAIM_VALUE_LENGTH = 115;
const MAX_AUD_VALUE_LENGTH = 145;
const PACK_WIDTH = 248;
function findFirstNonZeroIndex(bytes) {
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] !== 0) {
      return i;
    }
  }
  return -1;
}
function toPaddedBigEndianBytes(num, width) {
  const hex = num.toString(16);
  return (0, import_utils.hexToBytes)(hex.padStart(width * 2, "0").slice(-width * 2));
}
function toBigEndianBytes(num, width) {
  const bytes = toPaddedBigEndianBytes(num, width);
  const firstNonZeroIndex = findFirstNonZeroIndex(bytes);
  if (firstNonZeroIndex === -1) {
    return new Uint8Array([0]);
  }
  return bytes.slice(firstNonZeroIndex);
}
function getExtendedEphemeralPublicKey(publicKey) {
  return publicKey.toSuiPublicKey();
}
function chunkArray(array, chunk_size) {
  const chunks = Array(Math.ceil(array.length / chunk_size));
  const revArray = array.reverse();
  for (let i = 0; i < chunks.length; i++) {
    chunks[i] = revArray.slice(i * chunk_size, (i + 1) * chunk_size).reverse();
  }
  return chunks.reverse();
}
function bytesBEToBigInt(bytes) {
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex.length === 0) {
    return BigInt(0);
  }
  return BigInt("0x" + hex);
}
function hashASCIIStrToField(str, maxSize) {
  if (str.length > maxSize) {
    throw new Error(`String ${str} is longer than ${maxSize} chars`);
  }
  const strPadded = str.padEnd(maxSize, String.fromCharCode(0)).split("").map((c) => c.charCodeAt(0));
  const chunkSize = PACK_WIDTH / 8;
  const packed = chunkArray(strPadded, chunkSize).map((chunk) => bytesBEToBigInt(chunk));
  return (0, import_poseidon.poseidonHash)(packed);
}
function genAddressSeed(salt, name, value, aud, max_name_length = MAX_KEY_CLAIM_NAME_LENGTH, max_value_length = MAX_KEY_CLAIM_VALUE_LENGTH, max_aud_length = MAX_AUD_VALUE_LENGTH) {
  return (0, import_poseidon.poseidonHash)([
    hashASCIIStrToField(name, max_name_length),
    hashASCIIStrToField(value, max_value_length),
    hashASCIIStrToField(aud, max_aud_length),
    (0, import_poseidon.poseidonHash)([BigInt(salt)])
  ]);
}
function normalizeZkLoginIssuer(iss) {
  if (iss === "accounts.google.com") {
    return "https://accounts.google.com";
  }
  return iss;
}
//# sourceMappingURL=utils.js.map
