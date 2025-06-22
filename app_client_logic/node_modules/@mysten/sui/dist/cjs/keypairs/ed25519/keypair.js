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
  DEFAULT_ED25519_DERIVATION_PATH: () => DEFAULT_ED25519_DERIVATION_PATH,
  Ed25519Keypair: () => Ed25519Keypair
});
module.exports = __toCommonJS(keypair_exports);
var import_ed25519 = require("@noble/curves/ed25519");
var import_keypair = require("../../cryptography/keypair.js");
var import_mnemonics = require("../../cryptography/mnemonics.js");
var import_ed25519_hd_key = require("./ed25519-hd-key.js");
var import_publickey = require("./publickey.js");
const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
class Ed25519Keypair extends import_keypair.Keypair {
  /**
   * Create a new Ed25519 keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair Ed25519 keypair
   */
  constructor(keypair) {
    super();
    if (keypair) {
      this.keypair = {
        publicKey: keypair.publicKey,
        secretKey: keypair.secretKey.slice(0, 32)
      };
    } else {
      const privateKey = import_ed25519.ed25519.utils.randomPrivateKey();
      this.keypair = {
        publicKey: import_ed25519.ed25519.getPublicKey(privateKey),
        secretKey: privateKey
      };
    }
  }
  /**
   * Get the key scheme of the keypair ED25519
   */
  getKeyScheme() {
    return "ED25519";
  }
  /**
   * Generate a new random Ed25519 keypair
   */
  static generate() {
    const secretKey = import_ed25519.ed25519.utils.randomPrivateKey();
    return new Ed25519Keypair({
      publicKey: import_ed25519.ed25519.getPublicKey(secretKey),
      secretKey
    });
  }
  /**
   * Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
   * This is NOT the private scalar which is result of hashing and bit clamping of
   * the raw secret key.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key as a byte array or Bech32 secret key string
   * @param options: skip secret key validation
   */
  static fromSecretKey(secretKey, options) {
    if (typeof secretKey === "string") {
      const decoded = (0, import_keypair.decodeSuiPrivateKey)(secretKey);
      if (decoded.schema !== "ED25519") {
        throw new Error(`Expected a ED25519 keypair, got ${decoded.schema}`);
      }
      return this.fromSecretKey(decoded.secretKey, options);
    }
    const secretKeyLength = secretKey.length;
    if (secretKeyLength !== import_keypair.PRIVATE_KEY_SIZE) {
      throw new Error(
        `Wrong secretKey size. Expected ${import_keypair.PRIVATE_KEY_SIZE} bytes, got ${secretKeyLength}.`
      );
    }
    const keypair = {
      publicKey: import_ed25519.ed25519.getPublicKey(secretKey),
      secretKey
    };
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const signature = import_ed25519.ed25519.sign(signData, secretKey);
      if (!import_ed25519.ed25519.verify(signature, signData, keypair.publicKey)) {
        throw new Error("provided secretKey is invalid");
      }
    }
    return new Ed25519Keypair(keypair);
  }
  /**
   * The public key for this Ed25519 keypair
   */
  getPublicKey() {
    return new import_publickey.Ed25519PublicKey(this.keypair.publicKey);
  }
  /**
   * The Bech32 secret key string for this Ed25519 keypair
   */
  getSecretKey() {
    return (0, import_keypair.encodeSuiPrivateKey)(
      this.keypair.secretKey.slice(0, import_keypair.PRIVATE_KEY_SIZE),
      this.getKeyScheme()
    );
  }
  /**
   * Return the signature for the provided data using Ed25519.
   */
  async sign(data) {
    return import_ed25519.ed25519.sign(data, this.keypair.secretKey);
  }
  /**
   * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */
  static deriveKeypair(mnemonics, path) {
    if (path == null) {
      path = DEFAULT_ED25519_DERIVATION_PATH;
    }
    if (!(0, import_mnemonics.isValidHardenedPath)(path)) {
      throw new Error("Invalid derivation path");
    }
    const { key } = (0, import_ed25519_hd_key.derivePath)(path, (0, import_mnemonics.mnemonicToSeedHex)(mnemonics));
    return Ed25519Keypair.fromSecretKey(key);
  }
  /**
   * Derive Ed25519 keypair from mnemonicSeed and path.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */
  static deriveKeypairFromSeed(seedHex, path) {
    if (path == null) {
      path = DEFAULT_ED25519_DERIVATION_PATH;
    }
    if (!(0, import_mnemonics.isValidHardenedPath)(path)) {
      throw new Error("Invalid derivation path");
    }
    const { key } = (0, import_ed25519_hd_key.derivePath)(path, seedHex);
    return Ed25519Keypair.fromSecretKey(key);
  }
}
//# sourceMappingURL=keypair.js.map
