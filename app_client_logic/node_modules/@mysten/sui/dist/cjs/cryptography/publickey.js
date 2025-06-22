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
var publickey_exports = {};
__export(publickey_exports, {
  PublicKey: () => PublicKey,
  bytesEqual: () => bytesEqual,
  parseSerializedKeypairSignature: () => parseSerializedKeypairSignature
});
module.exports = __toCommonJS(publickey_exports);
var import_bcs = require("@mysten/bcs");
var import_blake2b = require("@noble/hashes/blake2b");
var import_utils = require("@noble/hashes/utils");
var import_bcs2 = require("../bcs/index.js");
var import_sui_types = require("../utils/sui-types.js");
var import_intent = require("./intent.js");
var import_signature_scheme = require("./signature-scheme.js");
function bytesEqual(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
class PublicKey {
  /**
   * Checks if two public keys are equal
   */
  equals(publicKey) {
    return bytesEqual(this.toRawBytes(), publicKey.toRawBytes());
  }
  /**
   * Return the base-64 representation of the public key
   */
  toBase64() {
    return (0, import_bcs.toBase64)(this.toRawBytes());
  }
  toString() {
    throw new Error(
      "`toString` is not implemented on public keys. Use `toBase64()` or `toRawBytes()` instead."
    );
  }
  /**
   * Return the Sui representation of the public key encoded in
   * base-64. A Sui public key is formed by the concatenation
   * of the scheme flag with the raw bytes of the public key
   */
  toSuiPublicKey() {
    const bytes = this.toSuiBytes();
    return (0, import_bcs.toBase64)(bytes);
  }
  verifyWithIntent(bytes, signature, intent) {
    const intentMessage = (0, import_intent.messageWithIntent)(intent, bytes);
    const digest = (0, import_blake2b.blake2b)(intentMessage, { dkLen: 32 });
    return this.verify(digest, signature);
  }
  /**
   * Verifies that the signature is valid for for the provided PersonalMessage
   */
  verifyPersonalMessage(message, signature) {
    return this.verifyWithIntent(
      import_bcs2.bcs.vector(import_bcs2.bcs.u8()).serialize(message).toBytes(),
      signature,
      "PersonalMessage"
    );
  }
  /**
   * Verifies that the signature is valid for for the provided Transaction
   */
  verifyTransaction(transaction, signature) {
    return this.verifyWithIntent(transaction, signature, "TransactionData");
  }
  /**
   * Verifies that the public key is associated with the provided address
   */
  verifyAddress(address) {
    return this.toSuiAddress() === address;
  }
  /**
   * Returns the bytes representation of the public key
   * prefixed with the signature scheme flag
   */
  toSuiBytes() {
    const rawBytes = this.toRawBytes();
    const suiBytes = new Uint8Array(rawBytes.length + 1);
    suiBytes.set([this.flag()]);
    suiBytes.set(rawBytes, 1);
    return suiBytes;
  }
  /**
   * Return the Sui address associated with this Ed25519 public key
   */
  toSuiAddress() {
    return (0, import_sui_types.normalizeSuiAddress)(
      (0, import_utils.bytesToHex)((0, import_blake2b.blake2b)(this.toSuiBytes(), { dkLen: 32 })).slice(0, import_sui_types.SUI_ADDRESS_LENGTH * 2)
    );
  }
}
function parseSerializedKeypairSignature(serializedSignature) {
  const bytes = (0, import_bcs.fromBase64)(serializedSignature);
  const signatureScheme = import_signature_scheme.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
  switch (signatureScheme) {
    case "ED25519":
    case "Secp256k1":
    case "Secp256r1":
      const size = import_signature_scheme.SIGNATURE_SCHEME_TO_SIZE[signatureScheme];
      const signature = bytes.slice(1, bytes.length - size);
      const publicKey = bytes.slice(1 + signature.length);
      return {
        serializedSignature,
        signatureScheme,
        signature,
        publicKey,
        bytes
      };
    default:
      throw new Error("Unsupported signature scheme");
  }
}
//# sourceMappingURL=publickey.js.map
