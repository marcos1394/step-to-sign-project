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
var keypair_exports = {};
__export(keypair_exports, {
  Keypair: () => Keypair,
  LEGACY_PRIVATE_KEY_SIZE: () => LEGACY_PRIVATE_KEY_SIZE,
  PRIVATE_KEY_SIZE: () => PRIVATE_KEY_SIZE,
  SUI_PRIVATE_KEY_PREFIX: () => SUI_PRIVATE_KEY_PREFIX,
  Signer: () => Signer,
  decodeSuiPrivateKey: () => decodeSuiPrivateKey,
  encodeSuiPrivateKey: () => encodeSuiPrivateKey
});
module.exports = __toCommonJS(keypair_exports);
var import_bcs = require("@mysten/bcs");
var import_blake2b = require("@noble/hashes/blake2b");
var import_base = require("@scure/base");
var import_intent = require("./intent.js");
var import_signature_scheme = require("./signature-scheme.js");
var import_signature = require("./signature.js");
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
class Signer {
  /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */
  async signWithIntent(bytes, intent) {
    const intentMessage = (0, import_intent.messageWithIntent)(intent, bytes);
    const digest = (0, import_blake2b.blake2b)(intentMessage, { dkLen: 32 });
    const signature = (0, import_signature.toSerializedSignature)({
      signature: await this.sign(digest),
      signatureScheme: this.getKeyScheme(),
      publicKey: this.getPublicKey()
    });
    return {
      signature,
      bytes: (0, import_bcs.toBase64)(bytes)
    };
  }
  /**
   * Signs provided transaction by calling `signWithIntent()` with a `TransactionData` provided as intent scope
   */
  async signTransaction(bytes) {
    return this.signWithIntent(bytes, "TransactionData");
  }
  /**
   * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
   */
  async signPersonalMessage(bytes) {
    const { signature } = await this.signWithIntent(
      import_bcs.bcs.vector(import_bcs.bcs.u8()).serialize(bytes).toBytes(),
      "PersonalMessage"
    );
    return {
      bytes: (0, import_bcs.toBase64)(bytes),
      signature
    };
  }
  async signAndExecuteTransaction({
    transaction,
    client
  }) {
    const bytes = await transaction.build({ client });
    const { signature } = await this.signTransaction(bytes);
    const response = await client.core.executeTransaction({
      transaction: bytes,
      signatures: [signature]
    });
    return response.transaction;
  }
  toSuiAddress() {
    return this.getPublicKey().toSuiAddress();
  }
}
class Keypair extends Signer {
}
function decodeSuiPrivateKey(value) {
  const { prefix, words } = import_base.bech32.decode(value);
  if (prefix !== SUI_PRIVATE_KEY_PREFIX) {
    throw new Error("invalid private key prefix");
  }
  const extendedSecretKey = new Uint8Array(import_base.bech32.fromWords(words));
  const secretKey = extendedSecretKey.slice(1);
  const signatureScheme = import_signature_scheme.SIGNATURE_FLAG_TO_SCHEME[extendedSecretKey[0]];
  return {
    scheme: signatureScheme,
    schema: signatureScheme,
    secretKey
  };
}
function encodeSuiPrivateKey(bytes, scheme) {
  if (bytes.length !== PRIVATE_KEY_SIZE) {
    throw new Error("Invalid bytes length");
  }
  const flag = import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG[scheme];
  const privKeyBytes = new Uint8Array(bytes.length + 1);
  privKeyBytes.set([flag]);
  privKeyBytes.set(bytes, 1);
  return import_base.bech32.encode(SUI_PRIVATE_KEY_PREFIX, import_base.bech32.toWords(privKeyBytes));
}
//# sourceMappingURL=keypair.js.map
