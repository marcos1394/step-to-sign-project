import { toHex } from "@mysten/bcs";
import { randomBytes } from "@noble/hashes/utils";
import { base64urlnopad } from "@scure/base";
import { poseidonHash } from "./poseidon.js";
import { toPaddedBigEndianBytes } from "./utils.js";
const NONCE_LENGTH = 27;
function toBigIntBE(bytes) {
  const hex = toHex(bytes);
  if (hex.length === 0) {
    return BigInt(0);
  }
  return BigInt(`0x${hex}`);
}
function generateRandomness() {
  return String(toBigIntBE(randomBytes(16)));
}
function generateNonce(publicKey, maxEpoch, randomness) {
  const publicKeyBytes = toBigIntBE(publicKey.toSuiBytes());
  const eph_public_key_0 = publicKeyBytes / 2n ** 128n;
  const eph_public_key_1 = publicKeyBytes % 2n ** 128n;
  const bigNum = poseidonHash([eph_public_key_0, eph_public_key_1, maxEpoch, BigInt(randomness)]);
  const Z = toPaddedBigEndianBytes(bigNum, 20);
  const nonce = base64urlnopad.encode(Z);
  if (nonce.length !== NONCE_LENGTH) {
    throw new Error(`Length of nonce ${nonce} (${nonce.length}) is not equal to ${NONCE_LENGTH}`);
  }
  return nonce;
}
export {
  NONCE_LENGTH,
  generateNonce,
  generateRandomness
};
//# sourceMappingURL=nonce.js.map
