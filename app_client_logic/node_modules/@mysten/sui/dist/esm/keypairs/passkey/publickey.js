import { fromBase64, toBase64 } from "@mysten/bcs";
import { secp256r1 } from "@noble/curves/p256";
import { sha256 } from "@noble/hashes/sha256";
import { PasskeyAuthenticator } from "../../bcs/bcs.js";
import { bytesEqual, PublicKey } from "../../cryptography/publickey.js";
import { SIGNATURE_SCHEME_TO_FLAG } from "../../cryptography/signature-scheme.js";
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
class PasskeyPublicKey extends PublicKey {
  /**
   * Create a new PasskeyPublicKey object
   * @param value passkey public key as buffer or base-64 encoded string
   */
  constructor(value) {
    super();
    if (typeof value === "string") {
      this.data = fromBase64(value);
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
    return SIGNATURE_SCHEME_TO_FLAG["Passkey"];
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
    const parsedChallenge = fromBase64(
      clientDataJSON.challenge.replace(/-/g, "+").replace(/_/g, "/")
    );
    if (!bytesEqual(message, parsedChallenge)) {
      return false;
    }
    const pk = parsed.userSignature.slice(1 + PASSKEY_SIGNATURE_SIZE);
    if (!bytesEqual(this.toRawBytes(), pk)) {
      return false;
    }
    const payload = new Uint8Array([...parsed.authenticatorData, ...sha256(parsed.clientDataJson)]);
    const sig = parsed.userSignature.slice(1, PASSKEY_SIGNATURE_SIZE + 1);
    return secp256r1.verify(sig, sha256(payload), pk);
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
  const bytes = typeof signature === "string" ? fromBase64(signature) : signature;
  if (bytes[0] !== SIGNATURE_SCHEME_TO_FLAG.Passkey) {
    throw new Error("Invalid signature scheme");
  }
  const dec = PasskeyAuthenticator.parse(bytes.slice(1));
  return {
    signatureScheme: "Passkey",
    serializedSignature: toBase64(bytes),
    signature: bytes,
    authenticatorData: dec.authenticatorData,
    clientDataJson: dec.clientDataJson,
    userSignature: new Uint8Array(dec.userSignature),
    publicKey: new Uint8Array(dec.userSignature.slice(1 + PASSKEY_SIGNATURE_SIZE))
  };
}
export {
  PASSKEY_PUBLIC_KEY_SIZE,
  PASSKEY_SIGNATURE_SIZE,
  PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE,
  PasskeyPublicKey,
  SECP256R1_SPKI_HEADER,
  parseDerSPKI,
  parseSerializedPasskeySignature
};
//# sourceMappingURL=publickey.js.map
