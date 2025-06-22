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
var nonce_exports = {};
__export(nonce_exports, {
  NONCE_LENGTH: () => NONCE_LENGTH,
  generateNonce: () => generateNonce,
  generateRandomness: () => generateRandomness
});
module.exports = __toCommonJS(nonce_exports);
var import_bcs = require("@mysten/bcs");
var import_utils = require("@noble/hashes/utils");
var import_base = require("@scure/base");
var import_poseidon = require("./poseidon.js");
var import_utils2 = require("./utils.js");
const NONCE_LENGTH = 27;
function toBigIntBE(bytes) {
  const hex = (0, import_bcs.toHex)(bytes);
  if (hex.length === 0) {
    return BigInt(0);
  }
  return BigInt(`0x${hex}`);
}
function generateRandomness() {
  return String(toBigIntBE((0, import_utils.randomBytes)(16)));
}
function generateNonce(publicKey, maxEpoch, randomness) {
  const publicKeyBytes = toBigIntBE(publicKey.toSuiBytes());
  const eph_public_key_0 = publicKeyBytes / 2n ** 128n;
  const eph_public_key_1 = publicKeyBytes % 2n ** 128n;
  const bigNum = (0, import_poseidon.poseidonHash)([eph_public_key_0, eph_public_key_1, maxEpoch, BigInt(randomness)]);
  const Z = (0, import_utils2.toPaddedBigEndianBytes)(bigNum, 20);
  const nonce = import_base.base64urlnopad.encode(Z);
  if (nonce.length !== NONCE_LENGTH) {
    throw new Error(`Length of nonce ${nonce} (${nonce.length}) is not equal to ${NONCE_LENGTH}`);
  }
  return nonce;
}
//# sourceMappingURL=nonce.js.map
