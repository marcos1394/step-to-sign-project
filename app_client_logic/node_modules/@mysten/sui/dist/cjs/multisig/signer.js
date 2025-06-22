"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var signer_exports = {};
__export(signer_exports, {
  MultiSigSigner: () => MultiSigSigner
});
module.exports = __toCommonJS(signer_exports);
var import_bcs = require("@mysten/bcs");
var import_cryptography = require("../cryptography/index.js");
var _pubkey, _signers;
class MultiSigSigner extends import_cryptography.Signer {
  constructor(pubkey, signers = []) {
    super();
    __privateAdd(this, _pubkey);
    __privateAdd(this, _signers);
    __privateSet(this, _pubkey, pubkey);
    __privateSet(this, _signers, signers);
    const uniqueKeys = /* @__PURE__ */ new Set();
    let combinedWeight = 0;
    const weights = pubkey.getPublicKeys().map(({ weight, publicKey }) => ({
      weight,
      address: publicKey.toSuiAddress()
    }));
    for (const signer of signers) {
      const address = signer.toSuiAddress();
      if (uniqueKeys.has(address)) {
        throw new Error(`Can't create MultiSigSigner with duplicate signers`);
      }
      uniqueKeys.add(address);
      const weight = weights.find((w) => w.address === address)?.weight;
      if (!weight) {
        throw new Error(`Signer ${address} is not part of the MultiSig public key`);
      }
      combinedWeight += weight;
    }
    if (combinedWeight < pubkey.getThreshold()) {
      throw new Error(`Combined weight of signers is less than threshold`);
    }
  }
  getKeyScheme() {
    return "MultiSig";
  }
  getPublicKey() {
    return __privateGet(this, _pubkey);
  }
  sign(_data) {
    throw new Error(
      "MultiSigSigner does not support signing directly. Use signTransaction or signPersonalMessage instead"
    );
  }
  signData(_data) {
    throw new Error(
      "MultiSigSigner does not support signing directly. Use signTransaction or signPersonalMessage instead"
    );
  }
  async signTransaction(bytes) {
    const signature = __privateGet(this, _pubkey).combinePartialSignatures(
      await Promise.all(
        __privateGet(this, _signers).map(async (signer) => (await signer.signTransaction(bytes)).signature)
      )
    );
    return {
      signature,
      bytes: (0, import_bcs.toBase64)(bytes)
    };
  }
  async signPersonalMessage(bytes) {
    const signature = __privateGet(this, _pubkey).combinePartialSignatures(
      await Promise.all(
        __privateGet(this, _signers).map(async (signer) => (await signer.signPersonalMessage(bytes)).signature)
      )
    );
    return {
      signature,
      bytes: (0, import_bcs.toBase64)(bytes)
    };
  }
}
_pubkey = new WeakMap();
_signers = new WeakMap();
//# sourceMappingURL=signer.js.map
