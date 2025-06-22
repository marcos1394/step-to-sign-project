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
var verify_exports = {};
__export(verify_exports, {
  publicKeyFromRawBytes: () => publicKeyFromRawBytes,
  publicKeyFromSuiBytes: () => publicKeyFromSuiBytes,
  verifyPersonalMessageSignature: () => verifyPersonalMessageSignature,
  verifySignature: () => verifySignature,
  verifyTransactionSignature: () => verifyTransactionSignature
});
module.exports = __toCommonJS(verify_exports);
var import_bcs = require("@mysten/bcs");
var import_cryptography = require("../cryptography/index.js");
var import_publickey = require("../keypairs/ed25519/publickey.js");
var import_publickey2 = require("../keypairs/passkey/publickey.js");
var import_publickey3 = require("../keypairs/secp256k1/publickey.js");
var import_publickey4 = require("../keypairs/secp256r1/publickey.js");
var import_publickey5 = require("../multisig/publickey.js");
var import_publickey6 = require("../zklogin/publickey.js");
async function verifySignature(bytes, signature, options) {
  const parsedSignature = parseSignature(signature);
  if (!await parsedSignature.publicKey.verify(bytes, parsedSignature.serializedSignature)) {
    throw new Error(`Signature is not valid for the provided data`);
  }
  if (options?.address && !parsedSignature.publicKey.verifyAddress(options.address)) {
    throw new Error(`Signature is not valid for the provided address`);
  }
  return parsedSignature.publicKey;
}
async function verifyPersonalMessageSignature(message, signature, options = {}) {
  const parsedSignature = parseSignature(signature, options);
  if (!await parsedSignature.publicKey.verifyPersonalMessage(
    message,
    parsedSignature.serializedSignature
  )) {
    throw new Error(`Signature is not valid for the provided message`);
  }
  if (options?.address && !parsedSignature.publicKey.verifyAddress(options.address)) {
    throw new Error(`Signature is not valid for the provided address`);
  }
  return parsedSignature.publicKey;
}
async function verifyTransactionSignature(transaction, signature, options = {}) {
  const parsedSignature = parseSignature(signature, options);
  if (!await parsedSignature.publicKey.verifyTransaction(
    transaction,
    parsedSignature.serializedSignature
  )) {
    throw new Error(`Signature is not valid for the provided Transaction`);
  }
  if (options?.address && !parsedSignature.publicKey.verifyAddress(options.address)) {
    throw new Error(`Signature is not valid for the provided address`);
  }
  return parsedSignature.publicKey;
}
function parseSignature(signature, options = {}) {
  const parsedSignature = (0, import_cryptography.parseSerializedSignature)(signature);
  if (parsedSignature.signatureScheme === "MultiSig") {
    return {
      ...parsedSignature,
      publicKey: new import_publickey5.MultiSigPublicKey(parsedSignature.multisig.multisig_pk)
    };
  }
  const publicKey = publicKeyFromRawBytes(
    parsedSignature.signatureScheme,
    parsedSignature.publicKey,
    options
  );
  return {
    ...parsedSignature,
    publicKey
  };
}
function publicKeyFromRawBytes(signatureScheme, bytes, options = {}) {
  let publicKey;
  switch (signatureScheme) {
    case "ED25519":
      publicKey = new import_publickey.Ed25519PublicKey(bytes);
      break;
    case "Secp256k1":
      publicKey = new import_publickey3.Secp256k1PublicKey(bytes);
      break;
    case "Secp256r1":
      publicKey = new import_publickey4.Secp256r1PublicKey(bytes);
      break;
    case "MultiSig":
      publicKey = new import_publickey5.MultiSigPublicKey(bytes);
      break;
    case "ZkLogin":
      publicKey = import_publickey6.ZkLoginPublicIdentifier.fromBytes(bytes, options);
      break;
    case "Passkey":
      publicKey = new import_publickey2.PasskeyPublicKey(bytes);
      break;
    default:
      throw new Error(`Unsupported signature scheme ${signatureScheme}`);
  }
  if (options.address && publicKey.toSuiAddress() !== options.address) {
    throw new Error(`Public key bytes do not match the provided address`);
  }
  return publicKey;
}
function publicKeyFromSuiBytes(publicKey, options = {}) {
  const bytes = typeof publicKey === "string" ? (0, import_bcs.fromBase64)(publicKey) : publicKey;
  const signatureScheme = import_cryptography.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
  return publicKeyFromRawBytes(signatureScheme, bytes.slice(1), options);
}
//# sourceMappingURL=verify.js.map
