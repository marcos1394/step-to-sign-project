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
var signature_exports = {};
__export(signature_exports, {
  parseSerializedSignature: () => parseSerializedSignature,
  toSerializedSignature: () => toSerializedSignature
});
module.exports = __toCommonJS(signature_exports);
var import_bcs = require("@mysten/bcs");
var import_bcs2 = require("../bcs/index.js");
var import_publickey = require("../keypairs/passkey/publickey.js");
var import_publickey2 = require("../zklogin/publickey.js");
var import_publickey3 = require("./publickey.js");
var import_signature_scheme = require("./signature-scheme.js");
function toSerializedSignature({
  signature,
  signatureScheme,
  publicKey
}) {
  if (!publicKey) {
    throw new Error("`publicKey` is required");
  }
  const pubKeyBytes = publicKey.toRawBytes();
  const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
  serializedSignature.set([import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
  serializedSignature.set(signature, 1);
  serializedSignature.set(pubKeyBytes, 1 + signature.length);
  return (0, import_bcs.toBase64)(serializedSignature);
}
function parseSerializedSignature(serializedSignature) {
  const bytes = (0, import_bcs.fromBase64)(serializedSignature);
  const signatureScheme = import_signature_scheme.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
  switch (signatureScheme) {
    case "Passkey":
      return (0, import_publickey.parseSerializedPasskeySignature)(serializedSignature);
    case "MultiSig":
      const multisig = import_bcs2.bcs.MultiSig.parse(bytes.slice(1));
      return {
        serializedSignature,
        signatureScheme,
        multisig,
        bytes,
        signature: void 0
      };
    case "ZkLogin":
      return (0, import_publickey2.parseSerializedZkLoginSignature)(serializedSignature);
    case "ED25519":
    case "Secp256k1":
    case "Secp256r1":
      return (0, import_publickey3.parseSerializedKeypairSignature)(serializedSignature);
    default:
      throw new Error("Unsupported signature scheme");
  }
}
//# sourceMappingURL=signature.js.map
