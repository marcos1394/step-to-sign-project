var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _pubkey, _signers;
import { toBase64 } from "@mysten/bcs";
import { Signer } from "../cryptography/index.js";
class MultiSigSigner extends Signer {
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
      bytes: toBase64(bytes)
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
      bytes: toBase64(bytes)
    };
  }
}
_pubkey = new WeakMap();
_signers = new WeakMap();
export {
  MultiSigSigner
};
//# sourceMappingURL=signer.js.map
