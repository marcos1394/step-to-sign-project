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
var cryptography_exports = {};
__export(cryptography_exports, {
  Keypair: () => import_keypair.Keypair,
  LEGACY_PRIVATE_KEY_SIZE: () => import_keypair.LEGACY_PRIVATE_KEY_SIZE,
  PRIVATE_KEY_SIZE: () => import_keypair.PRIVATE_KEY_SIZE,
  PublicKey: () => import_publickey.PublicKey,
  SIGNATURE_FLAG_TO_SCHEME: () => import_signature_scheme.SIGNATURE_FLAG_TO_SCHEME,
  SIGNATURE_SCHEME_TO_FLAG: () => import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG,
  SIGNATURE_SCHEME_TO_SIZE: () => import_signature_scheme.SIGNATURE_SCHEME_TO_SIZE,
  SUI_PRIVATE_KEY_PREFIX: () => import_keypair.SUI_PRIVATE_KEY_PREFIX,
  Signer: () => import_keypair.Signer,
  decodeSuiPrivateKey: () => import_keypair.decodeSuiPrivateKey,
  encodeSuiPrivateKey: () => import_keypair.encodeSuiPrivateKey,
  isValidBIP32Path: () => import_mnemonics.isValidBIP32Path,
  isValidHardenedPath: () => import_mnemonics.isValidHardenedPath,
  messageWithIntent: () => import_intent.messageWithIntent,
  mnemonicToSeed: () => import_mnemonics.mnemonicToSeed,
  mnemonicToSeedHex: () => import_mnemonics.mnemonicToSeedHex,
  parseSerializedSignature: () => import_signature.parseSerializedSignature,
  toSerializedSignature: () => import_signature.toSerializedSignature
});
module.exports = __toCommonJS(cryptography_exports);
var import_signature = require("./signature.js");
var import_signature_scheme = require("./signature-scheme.js");
var import_mnemonics = require("./mnemonics.js");
var import_intent = require("./intent.js");
var import_keypair = require("./keypair.js");
var import_publickey = require("./publickey.js");
//# sourceMappingURL=index.js.map
