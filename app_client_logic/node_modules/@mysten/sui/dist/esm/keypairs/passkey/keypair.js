var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _name, _options;
import { toBase64 } from "@mysten/bcs";
import { secp256r1 } from "@noble/curves/p256";
import { blake2b } from "@noble/hashes/blake2b";
import { sha256 } from "@noble/hashes/sha256";
import { randomBytes } from "@noble/hashes/utils";
import { PasskeyAuthenticator } from "../../bcs/bcs.js";
import { messageWithIntent, SIGNATURE_SCHEME_TO_FLAG, Signer } from "../../cryptography/index.js";
import {
  parseDerSPKI,
  PASSKEY_PUBLIC_KEY_SIZE,
  PASSKEY_SIGNATURE_SIZE,
  PasskeyPublicKey
} from "./publickey.js";
class BrowserPasskeyProvider {
  constructor(name, options) {
    __privateAdd(this, _name);
    __privateAdd(this, _options);
    __privateSet(this, _name, name);
    __privateSet(this, _options, options);
  }
  async create() {
    return await navigator.credentials.create({
      publicKey: {
        timeout: __privateGet(this, _options).timeout ?? 6e4,
        ...__privateGet(this, _options),
        rp: {
          name: __privateGet(this, _name),
          ...__privateGet(this, _options).rp
        },
        user: {
          name: __privateGet(this, _name),
          displayName: __privateGet(this, _name),
          ...__privateGet(this, _options).user,
          id: randomBytes(10)
        },
        challenge: new TextEncoder().encode("Create passkey wallet on Sui"),
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "cross-platform",
          residentKey: "required",
          requireResidentKey: true,
          userVerification: "required",
          ...__privateGet(this, _options).authenticatorSelection
        }
      }
    });
  }
  async get(challenge) {
    return await navigator.credentials.get({
      publicKey: {
        challenge,
        userVerification: __privateGet(this, _options).authenticatorSelection?.userVerification || "required",
        timeout: __privateGet(this, _options).timeout ?? 6e4
      }
    });
  }
}
_name = new WeakMap();
_options = new WeakMap();
class PasskeyKeypair extends Signer {
  /**
   * Get the key scheme of passkey,
   */
  getKeyScheme() {
    return "Passkey";
  }
  /**
   * Creates an instance of Passkey signer. If no passkey wallet had created before,
   * use `getPasskeyInstance`. For example:
   * ```
   * let provider = new BrowserPasskeyProvider('Sui Passkey Example',{
   * 	  rpName: 'Sui Passkey Example',
   * 	  rpId: window.location.hostname,
   * } as BrowserPasswordProviderOptions);
   * const signer = await PasskeyKeypair.getPasskeyInstance(provider);
   * ```
   *
   * If there are existing passkey wallet, use `signAndRecover` to identify the correct
   * public key and then initialize the instance. See usage in `signAndRecover`.
   */
  constructor(publicKey, provider) {
    super();
    this.publicKey = publicKey;
    this.provider = provider;
  }
  /**
   * Creates an instance of Passkey signer invoking the passkey from navigator.
   * Note that this will invoke the passkey device to create a fresh credential.
   * Should only be called if passkey wallet is created for the first time.
   *
   * @param provider - the passkey provider.
   * @returns the passkey instance.
   */
  static async getPasskeyInstance(provider) {
    const credential = await provider.create();
    if (!credential.response.getPublicKey()) {
      throw new Error("Invalid credential create response");
    } else {
      const derSPKI = credential.response.getPublicKey();
      const pubkeyUncompressed = parseDerSPKI(new Uint8Array(derSPKI));
      const pubkey = secp256r1.ProjectivePoint.fromHex(pubkeyUncompressed);
      const pubkeyCompressed = pubkey.toRawBytes(true);
      return new PasskeyKeypair(pubkeyCompressed, provider);
    }
  }
  /**
   * Return the public key for this passkey.
   */
  getPublicKey() {
    return new PasskeyPublicKey(this.publicKey);
  }
  /**
   * Return the signature for the provided data (i.e. blake2b(intent_message)).
   * This is sent to passkey as the challenge field.
   */
  async sign(data) {
    const credential = await this.provider.get(data);
    const authenticatorData = new Uint8Array(credential.response.authenticatorData);
    const clientDataJSON = new Uint8Array(credential.response.clientDataJSON);
    const decoder = new TextDecoder();
    const clientDataJSONString = decoder.decode(clientDataJSON);
    const sig = secp256r1.Signature.fromDER(new Uint8Array(credential.response.signature));
    const normalized = sig.normalizeS().toCompactRawBytes();
    if (normalized.length !== PASSKEY_SIGNATURE_SIZE || this.publicKey.length !== PASSKEY_PUBLIC_KEY_SIZE) {
      throw new Error("Invalid signature or public key length");
    }
    const arr = new Uint8Array(1 + normalized.length + this.publicKey.length);
    arr.set([SIGNATURE_SCHEME_TO_FLAG["Secp256r1"]]);
    arr.set(normalized, 1);
    arr.set(this.publicKey, 1 + normalized.length);
    return PasskeyAuthenticator.serialize({
      authenticatorData,
      clientDataJson: clientDataJSONString,
      userSignature: arr
    }).toBytes();
  }
  /**
   * This overrides the base class implementation that accepts the raw bytes and signs its
   * digest of the intent message, then serialize it with the passkey flag.
   */
  async signWithIntent(bytes, intent) {
    const intentMessage = messageWithIntent(intent, bytes);
    const digest = blake2b(intentMessage, { dkLen: 32 });
    const signature = await this.sign(digest);
    const serializedSignature = new Uint8Array(1 + signature.length);
    serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[this.getKeyScheme()]]);
    serializedSignature.set(signature, 1);
    return {
      signature: toBase64(serializedSignature),
      bytes: toBase64(bytes)
    };
  }
  /**
   * Given a message, asks the passkey device to sign it and return all (up to 4) possible public keys.
   * See: https://bitcoin.stackexchange.com/questions/81232/how-is-public-key-extracted-from-message-digital-signature-address
   *
   * This is useful if the user previously created passkey wallet with the origin, but the wallet session
   * does not have the public key / address. By calling this method twice with two different messages, the
   * wallet can compare the returned public keys and uniquely identify the previously created passkey wallet
   * using `findCommonPublicKey`.
   *
   * Alternatively, one call can be made and all possible public keys should be checked onchain to see if
   * there is any assets.
   *
   * Once the correct public key is identified, a passkey instance can then be initialized with this public key.
   *
   * Example usage to recover wallet with two signing calls:
   * ```
   * let provider = new BrowserPasskeyProvider('Sui Passkey Example',{
   *     rpName: 'Sui Passkey Example',
   * 	   rpId: window.location.hostname,
   * } as BrowserPasswordProviderOptions);
   * const testMessage = new TextEncoder().encode('Hello world!');
   * const possiblePks = await PasskeyKeypair.signAndRecover(provider, testMessage);
   * const testMessage2 = new TextEncoder().encode('Hello world 2!');
   * const possiblePks2 = await PasskeyKeypair.signAndRecover(provider, testMessage2);
   * const commonPk = findCommonPublicKey(possiblePks, possiblePks2);
   * const signer = new PasskeyKeypair(provider, commonPk.toRawBytes());
   * ```
   *
   * @param provider - the passkey provider.
   * @param message - the message to sign.
   * @returns all possible public keys.
   */
  static async signAndRecover(provider, message) {
    const credential = await provider.get(message);
    const fullMessage = messageFromAssertionResponse(credential.response);
    const sig = secp256r1.Signature.fromDER(new Uint8Array(credential.response.signature));
    const res = [];
    for (let i = 0; i < 4; i++) {
      const s = sig.addRecoveryBit(i);
      try {
        const pubkey = s.recoverPublicKey(sha256(fullMessage));
        const pk = new PasskeyPublicKey(pubkey.toRawBytes(true));
        res.push(pk);
      } catch {
        continue;
      }
    }
    return res;
  }
}
function findCommonPublicKey(arr1, arr2) {
  const matchingPubkeys = [];
  for (const pubkey1 of arr1) {
    for (const pubkey2 of arr2) {
      if (pubkey1.equals(pubkey2)) {
        matchingPubkeys.push(pubkey1);
      }
    }
  }
  if (matchingPubkeys.length !== 1) {
    throw new Error("No unique public key found");
  }
  return matchingPubkeys[0];
}
function messageFromAssertionResponse(response) {
  const authenticatorData = new Uint8Array(response.authenticatorData);
  const clientDataJSON = new Uint8Array(response.clientDataJSON);
  const clientDataJSONDigest = sha256(clientDataJSON);
  return new Uint8Array([...authenticatorData, ...clientDataJSONDigest]);
}
export {
  BrowserPasskeyProvider,
  PasskeyKeypair,
  findCommonPublicKey
};
//# sourceMappingURL=keypair.js.map
