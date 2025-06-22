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
var zklogin_exports = {};
__export(zklogin_exports, {
  ZkLoginPublicIdentifier: () => import_publickey.ZkLoginPublicIdentifier,
  computeZkLoginAddress: () => import_address.computeZkLoginAddress,
  computeZkLoginAddressFromSeed: () => import_address.computeZkLoginAddressFromSeed,
  decodeJwt: () => import_jwt_utils.decodeJwt,
  genAddressSeed: () => import_utils.genAddressSeed,
  generateNonce: () => import_nonce.generateNonce,
  generateRandomness: () => import_nonce.generateRandomness,
  getExtendedEphemeralPublicKey: () => import_utils.getExtendedEphemeralPublicKey,
  getZkLoginSignature: () => import_signature.getZkLoginSignature,
  hashASCIIStrToField: () => import_utils.hashASCIIStrToField,
  jwtToAddress: () => import_address.jwtToAddress,
  parseZkLoginSignature: () => import_signature.parseZkLoginSignature,
  poseidonHash: () => import_poseidon.poseidonHash,
  toBigEndianBytes: () => import_utils.toBigEndianBytes,
  toPaddedBigEndianBytes: () => import_utils.toPaddedBigEndianBytes,
  toZkLoginPublicIdentifier: () => import_publickey.toZkLoginPublicIdentifier
});
module.exports = __toCommonJS(zklogin_exports);
var import_signature = require("./signature.js");
var import_utils = require("./utils.js");
var import_address = require("./address.js");
var import_publickey = require("./publickey.js");
var import_poseidon = require("./poseidon.js");
var import_nonce = require("./nonce.js");
var import_jwt_utils = require("./jwt-utils.js");
//# sourceMappingURL=index.js.map
