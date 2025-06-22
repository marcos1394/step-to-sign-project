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
  PASSKEY_PUBLIC_KEY_SIZE: () => PASSKEY_PUBLIC_KEY_SIZE,
  PASSKEY_SIGNATURE_SIZE: () => PASSKEY_SIGNATURE_SIZE,
  PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE: () => PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE,
  PasskeyPublicKey: () => PasskeyPublicKey,
  SECP256R1_SPKI_HEADER: () => SECP256R1_SPKI_HEADER,
  parseDerSPKI: () => parseDerSPKI,
  parseSerializedPasskeySignature: () => parseSerializedPasskeySignature
});
module.exports = __toCommonJS(publickey_exports);
var import_bcs = require("@mysten/bcs");
var import_p256 = require("@noble/curves/p256");
var import_sha256 = require("@noble/hashes/sha256");
var import_bcs2 = require("../../bcs/bcs.js");
var import_publickey = require("../../cryptography/publickey.js");
var import_signature_scheme = require("../../cryptography/signature-scheme.js");
const PASSKEY_PUBLIC_KEY_SIZE = 33;
const PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
const PASSKEY_SIGNATURE_SIZE = 64;
const SECP256R1_SPKI_HEADER = new Uint8Array([
  48,
  89,
  // SEQUENCE, length 89
  48,
  19,
  // SEQUENCE, length 19
  6,
  7,
  // OID, length 7
  42,
  134,
  72,
  206,
  61,
  2,
  1,
  // OID: 1.2.840.10045.2.1 (ecPublicKey)
  6,
  8,
  // OID, length 8
  42,
  134,
  72,
  206,
  61,
  3,
  1,
  7,
  // OID: 1.2.840.10045.3.1.7 (prime256v1/secp256r1)
  3,
  66,
  // BIT STRING, length 66
  0
  // no unused bits
]);
class PasskeyPublicKey extends import_publickey.PublicKey {
  /**
   * Create a new PasskeyPublicKey object
   * @param value passkey public key as buffer or base-64 encoded string
   */
  constructor(value) {
    super();
    if (typeof value === "string") {
      this.data = (0, import_bcs.fromBase64)(value);
    } else if (value instanceof Uint8Array) {
      this.data = value;
    } else {
      this.data = Uint8Array.from(value);
    }
    if (this.data.length !== PASSKEY_PUBLIC_KEY_SIZE) {
      throw new Error(
        `Invalid public key input. Expected ${PASSKEY_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
      );
    }
  }
  /**
   * Checks if two passkey public keys are equal
   */
  equals(publicKey) {
    return super.equals(publicKey);
  }
  /**
   * Return the byte array representation of the Secp256r1 public key
   */
  toRawBytes() {
    return this.data;
  }
  /**
   * Return the Sui address associated with this Secp256r1 public key
   */
  flag() {
    return import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG["Passkey"];
  }
  /**
   * Verifies that the signature is valid for for the provided message
   */
  async verify(message, signature) {
    const parsed = parseSerializedPasskeySignature(signature);
    const clientDataJSON = JSON.parse(parsed.clientDataJson);
    if (clientDataJSON.type !== "webauthn.get") {
      return false;
    }
    const parsedChallenge = (0, import_bcs.fromBase64)(
      clientDataJSON.challenge.replace(/-/g, "+").replace(/_/g, "/")
    );
    if (!(0, import_publickey.bytesEqual)(message, parsedChallenge)) {
      return false;
    }
    const pk = parsed.userSignature.slice(1 + PASSKEY_SIGNATURE_SIZE);
    if (!(0, import_publickey.bytesEqual)(this.toRawBytes(), pk)) {
      return false;
    }
    const payload = new Uint8Array([...parsed.authenticatorData, ...(0, import_sha256.sha256)(parsed.clientDataJson)]);
    const sig = parsed.userSignature.slice(1, PASSKEY_SIGNATURE_SIZE + 1);
    return import_p256.secp256r1.verify(sig, (0, import_sha256.sha256)(payload), pk);
  }
}
PasskeyPublicKey.SIZE = PASSKEY_PUBLIC_KEY_SIZE;
function parseDerSPKI(derBytes) {
  if (derBytes.length !== SECP256R1_SPKI_HEADER.length + PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE) {
    throw new Error("Invalid DER length");
  }
  for (let i = 0; i < SECP256R1_SPKI_HEADER.length; i++) {
    if (derBytes[i] !== SECP256R1_SPKI_HEADER[i]) {
      throw new Error("Invalid spki header");
    }
  }
  if (derBytes[SECP256R1_SPKI_HEADER.length] !== 4) {
    throw new Error("Invalid point marker");
  }
  return derBytes.slice(SECP256R1_SPKI_HEADER.length);
}
function parseSerializedPasskeySignature(signature) {
  const bytes = typeof signature === "string" ? (0, import_bcs.fromBase64)(signature) : signature;
  if (bytes[0] !== import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG.Passkey) {
    throw new Error("Invalid signature scheme");
  }
  const dec = import_bcs2.PasskeyAuthenticator.parse(bytes.slice(1));
  return {
    signatureScheme: "Passkey",
    serializedSignature: (0, import_bcs.toBase64)(bytes),
    signature: bytes,
    authenticatorData: dec.authenticatorData,
    clientDataJson: dec.clientDataJson,
    userSignature: new Uint8Array(dec.userSignature),
    publicKey: new Uint8Array(dec.userSignature.slice(1 + PASSKEY_SIGNATURE_SIZE))
  };
}
//# sourceMappingURL=publickey.js.map
