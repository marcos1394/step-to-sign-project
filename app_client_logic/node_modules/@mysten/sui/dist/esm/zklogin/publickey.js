var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _data, _client, _legacyAddress, _ZkLoginPublicIdentifier_instances, toLegacyAddress_fn;
import { fromBase64, toBase64, toHex } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2b";
import { bytesToHex } from "@noble/hashes/utils";
import { PublicKey } from "../cryptography/publickey.js";
import { SIGNATURE_SCHEME_TO_FLAG } from "../cryptography/signature-scheme.js";
import { SuiGraphQLClient } from "../graphql/client.js";
import { normalizeSuiAddress, SUI_ADDRESS_LENGTH } from "../utils/sui-types.js";
import { extractClaimValue } from "./jwt-utils.js";
import { parseZkLoginSignature } from "./signature.js";
import { normalizeZkLoginIssuer, toBigEndianBytes, toPaddedBigEndianBytes } from "./utils.js";
const _ZkLoginPublicIdentifier = class _ZkLoginPublicIdentifier extends PublicKey {
  /**
   * Create a new ZkLoginPublicIdentifier object
   * @param value zkLogin public identifier as buffer or base-64 encoded string
   */
  constructor(value, { client } = {}) {
    super();
    __privateAdd(this, _ZkLoginPublicIdentifier_instances);
    __privateAdd(this, _data);
    __privateAdd(this, _client);
    __privateAdd(this, _legacyAddress);
    __privateSet(this, _client, client);
    if (typeof value === "string") {
      __privateSet(this, _data, fromBase64(value));
    } else if (value instanceof Uint8Array) {
      __privateSet(this, _data, value);
    } else {
      __privateSet(this, _data, Uint8Array.from(value));
    }
    __privateSet(this, _legacyAddress, __privateGet(this, _data).length !== __privateGet(this, _data)[0] + 1 + 32);
    if (__privateGet(this, _legacyAddress)) {
      __privateSet(this, _data, normalizeZkLoginPublicKeyBytes(__privateGet(this, _data)));
    }
  }
  static fromBytes(bytes, {
    client,
    address,
    legacyAddress
  } = {}) {
    let publicKey;
    if (legacyAddress === true) {
      publicKey = new _ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, true), {
        client
      });
    } else if (legacyAddress === false) {
      publicKey = new _ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, false), {
        client
      });
    } else if (address) {
      publicKey = new _ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, false), {
        client
      });
      if (publicKey.toSuiAddress() !== address) {
        publicKey = new _ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, true), {
          client
        });
      }
    } else {
      publicKey = new _ZkLoginPublicIdentifier(bytes, {
        client
      });
    }
    if (address && publicKey.toSuiAddress() !== address) {
      throw new Error("Public key bytes do not match the provided address");
    }
    return publicKey;
  }
  static fromProof(address, proof) {
    const { issBase64Details, addressSeed } = proof;
    const iss = extractClaimValue(issBase64Details, "iss");
    const legacyPublicKey = toZkLoginPublicIdentifier(BigInt(addressSeed), iss, {
      legacyAddress: true
    });
    if (legacyPublicKey.toSuiAddress() === address) {
      return legacyPublicKey;
    }
    const publicKey = toZkLoginPublicIdentifier(BigInt(addressSeed), iss, {
      legacyAddress: false
    });
    if (publicKey.toSuiAddress() !== address) {
      throw new Error("Proof does not match address");
    }
    return publicKey;
  }
  /**
   * Checks if two zkLogin public identifiers are equal
   */
  equals(publicKey) {
    return super.equals(publicKey);
  }
  toSuiAddress() {
    if (__privateGet(this, _legacyAddress)) {
      return __privateMethod(this, _ZkLoginPublicIdentifier_instances, toLegacyAddress_fn).call(this);
    }
    return super.toSuiAddress();
  }
  /**
   * Return the byte array representation of the zkLogin public identifier
   */
  toRawBytes() {
    return __privateGet(this, _data);
  }
  /**
   * Return the Sui address associated with this ZkLogin public identifier
   */
  flag() {
    return SIGNATURE_SCHEME_TO_FLAG["ZkLogin"];
  }
  /**
   * Verifies that the signature is valid for for the provided message
   */
  async verify(_message, _signature) {
    throw Error("does not support");
  }
  /**
   * Verifies that the signature is valid for for the provided PersonalMessage
   */
  verifyPersonalMessage(message, signature) {
    const parsedSignature = parseSerializedZkLoginSignature(signature);
    const address = new _ZkLoginPublicIdentifier(parsedSignature.publicKey).toSuiAddress();
    return graphqlVerifyZkLoginSignature({
      address,
      bytes: toBase64(message),
      signature: parsedSignature.serializedSignature,
      intentScope: "PersonalMessage",
      client: __privateGet(this, _client)
    });
  }
  /**
   * Verifies that the signature is valid for for the provided Transaction
   */
  verifyTransaction(transaction, signature) {
    const parsedSignature = parseSerializedZkLoginSignature(signature);
    const address = new _ZkLoginPublicIdentifier(parsedSignature.publicKey).toSuiAddress();
    return graphqlVerifyZkLoginSignature({
      address,
      bytes: toBase64(transaction),
      signature: parsedSignature.serializedSignature,
      intentScope: "TransactionData",
      client: __privateGet(this, _client)
    });
  }
  /**
   * Verifies that the public key is associated with the provided address
   */
  verifyAddress(address) {
    return address === super.toSuiAddress() || address === __privateMethod(this, _ZkLoginPublicIdentifier_instances, toLegacyAddress_fn).call(this);
  }
};
_data = new WeakMap();
_client = new WeakMap();
_legacyAddress = new WeakMap();
_ZkLoginPublicIdentifier_instances = new WeakSet();
toLegacyAddress_fn = function() {
  const legacyBytes = normalizeZkLoginPublicKeyBytes(__privateGet(this, _data), true);
  const addressBytes = new Uint8Array(legacyBytes.length + 1);
  addressBytes[0] = this.flag();
  addressBytes.set(legacyBytes, 1);
  return normalizeSuiAddress(
    bytesToHex(blake2b(addressBytes, { dkLen: 32 })).slice(0, SUI_ADDRESS_LENGTH * 2)
  );
};
let ZkLoginPublicIdentifier = _ZkLoginPublicIdentifier;
function toZkLoginPublicIdentifier(addressSeed, iss, options) {
  const addressSeedBytesBigEndian = options?.legacyAddress ? toBigEndianBytes(addressSeed, 32) : toPaddedBigEndianBytes(addressSeed, 32);
  const issBytes = new TextEncoder().encode(normalizeZkLoginIssuer(iss));
  const tmp = new Uint8Array(1 + issBytes.length + addressSeedBytesBigEndian.length);
  tmp.set([issBytes.length], 0);
  tmp.set(issBytes, 1);
  tmp.set(addressSeedBytesBigEndian, 1 + issBytes.length);
  return new ZkLoginPublicIdentifier(tmp, options);
}
function normalizeZkLoginPublicKeyBytes(bytes, legacyAddress = false) {
  const issByteLength = bytes[0] + 1;
  const addressSeed = BigInt(`0x${toHex(bytes.slice(issByteLength))}`);
  const seedBytes = legacyAddress ? toBigEndianBytes(addressSeed, 32) : toPaddedBigEndianBytes(addressSeed, 32);
  const data = new Uint8Array(issByteLength + seedBytes.length);
  data.set(bytes.slice(0, issByteLength), 0);
  data.set(seedBytes, issByteLength);
  return data;
}
async function graphqlVerifyZkLoginSignature({
  address,
  bytes,
  signature,
  intentScope,
  client = new SuiGraphQLClient({
    url: "https://sui-mainnet.mystenlabs.com/graphql"
  })
}) {
  const resp = await client.core.verifyZkLoginSignature({
    bytes,
    signature,
    intentScope,
    author: address
  });
  return resp.success === true && resp.errors.length === 0;
}
function parseSerializedZkLoginSignature(signature) {
  const bytes = typeof signature === "string" ? fromBase64(signature) : signature;
  if (bytes[0] !== SIGNATURE_SCHEME_TO_FLAG.ZkLogin) {
    throw new Error("Invalid signature scheme");
  }
  const signatureBytes = bytes.slice(1);
  const { inputs, maxEpoch, userSignature } = parseZkLoginSignature(signatureBytes);
  const { issBase64Details, addressSeed } = inputs;
  const iss = extractClaimValue(issBase64Details, "iss");
  const publicIdentifer = toZkLoginPublicIdentifier(BigInt(addressSeed), iss);
  return {
    serializedSignature: toBase64(bytes),
    signatureScheme: "ZkLogin",
    zkLogin: {
      inputs,
      maxEpoch,
      userSignature,
      iss,
      addressSeed: BigInt(addressSeed)
    },
    signature: bytes,
    publicKey: publicIdentifer.toRawBytes()
  };
}
export {
  ZkLoginPublicIdentifier,
  parseSerializedZkLoginSignature,
  toZkLoginPublicIdentifier
};
//# sourceMappingURL=publickey.js.map
