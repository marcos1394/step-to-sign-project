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
var address_exports = {};
__export(address_exports, {
  MAX_HEADER_LEN_B64: () => MAX_HEADER_LEN_B64,
  MAX_PADDED_UNSIGNED_JWT_LEN: () => MAX_PADDED_UNSIGNED_JWT_LEN,
  computeZkLoginAddress: () => computeZkLoginAddress,
  computeZkLoginAddressFromSeed: () => computeZkLoginAddressFromSeed,
  jwtToAddress: () => jwtToAddress,
  lengthChecks: () => lengthChecks
});
module.exports = __toCommonJS(address_exports);
var import_blake2b = require("@noble/hashes/blake2b");
var import_utils = require("@noble/hashes/utils");
var import_signature_scheme = require("../cryptography/signature-scheme.js");
var import_utils2 = require("../utils/index.js");
var import_jwt_utils = require("./jwt-utils.js");
var import_utils3 = require("./utils.js");
function computeZkLoginAddressFromSeed(addressSeed, iss, legacyAddress = true) {
  const addressSeedBytesBigEndian = legacyAddress ? (0, import_utils3.toBigEndianBytes)(addressSeed, 32) : (0, import_utils3.toPaddedBigEndianBytes)(addressSeed, 32);
  const addressParamBytes = new TextEncoder().encode((0, import_utils3.normalizeZkLoginIssuer)(iss));
  const tmp = new Uint8Array(2 + addressSeedBytesBigEndian.length + addressParamBytes.length);
  tmp.set([import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG.ZkLogin]);
  tmp.set([addressParamBytes.length], 1);
  tmp.set(addressParamBytes, 2);
  tmp.set(addressSeedBytesBigEndian, 2 + addressParamBytes.length);
  return (0, import_utils2.normalizeSuiAddress)(
    (0, import_utils.bytesToHex)((0, import_blake2b.blake2b)(tmp, { dkLen: 32 })).slice(0, import_utils2.SUI_ADDRESS_LENGTH * 2)
  );
}
const MAX_HEADER_LEN_B64 = 248;
const MAX_PADDED_UNSIGNED_JWT_LEN = 64 * 25;
function lengthChecks(jwt) {
  const [header, payload] = jwt.split(".");
  if (header.length > MAX_HEADER_LEN_B64) {
    throw new Error(`Header is too long`);
  }
  const L = (header.length + 1 + payload.length) * 8;
  const K = (512 + 448 - (L % 512 + 1)) % 512;
  const padded_unsigned_jwt_len = (L + 1 + K + 64) / 8;
  if (padded_unsigned_jwt_len > MAX_PADDED_UNSIGNED_JWT_LEN) {
    throw new Error(`JWT is too long`);
  }
}
function jwtToAddress(jwt, userSalt, legacyAddress = false) {
  lengthChecks(jwt);
  const decodedJWT = (0, import_jwt_utils.decodeJwt)(jwt);
  return computeZkLoginAddress({
    userSalt,
    claimName: "sub",
    claimValue: decodedJWT.sub,
    aud: decodedJWT.aud,
    iss: decodedJWT.iss,
    legacyAddress
  });
}
function computeZkLoginAddress({
  claimName,
  claimValue,
  iss,
  aud,
  userSalt,
  legacyAddress = false
}) {
  return computeZkLoginAddressFromSeed(
    (0, import_utils3.genAddressSeed)(userSalt, claimName, claimValue, aud),
    iss,
    legacyAddress
  );
}
//# sourceMappingURL=address.js.map
