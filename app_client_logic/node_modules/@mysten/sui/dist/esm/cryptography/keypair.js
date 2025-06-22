import { bcs, toBase64 } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2b";
import { bech32 } from "@scure/base";
import { messageWithIntent } from "./intent.js";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_FLAG } from "./signature-scheme.js";
import { toSerializedSignature } from "./signature.js";
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
class Signer {
  /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */
  async signWithIntent(bytes, intent) {
    const intentMessage = messageWithIntent(intent, bytes);
    const digest = blake2b(intentMessage, { dkLen: 32 });
    const signature = toSerializedSignature({
      signature: await this.sign(digest),
      signatureScheme: this.getKeyScheme(),
      publicKey: this.getPublicKey()
    });
    return {
      signature,
      bytes: toBase64(bytes)
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
      bcs.vector(bcs.u8()).serialize(bytes).toBytes(),
      "PersonalMessage"
    );
    return {
      bytes: toBase64(bytes),
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
  const { prefix, words } = bech32.decode(value);
  if (prefix !== SUI_PRIVATE_KEY_PREFIX) {
    throw new Error("invalid private key prefix");
  }
  const extendedSecretKey = new Uint8Array(bech32.fromWords(words));
  const secretKey = extendedSecretKey.slice(1);
  const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[extendedSecretKey[0]];
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
  const flag = SIGNATURE_SCHEME_TO_FLAG[scheme];
  const privKeyBytes = new Uint8Array(bytes.length + 1);
  privKeyBytes.set([flag]);
  privKeyBytes.set(bytes, 1);
  return bech32.encode(SUI_PRIVATE_KEY_PREFIX, bech32.toWords(privKeyBytes));
}
export {
  Keypair,
  LEGACY_PRIVATE_KEY_SIZE,
  PRIVATE_KEY_SIZE,
  SUI_PRIVATE_KEY_PREFIX,
  Signer,
  decodeSuiPrivateKey,
  encodeSuiPrivateKey
};
//# sourceMappingURL=keypair.js.map
