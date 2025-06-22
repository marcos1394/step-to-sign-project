import { secp256r1 } from "@noble/curves/p256";
import { blake2b } from "@noble/hashes/blake2b";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";
import { HDKey } from "@scure/bip32";
import { decodeSuiPrivateKey, encodeSuiPrivateKey, Keypair } from "../../cryptography/keypair.js";
import { isValidBIP32Path, mnemonicToSeed } from "../../cryptography/mnemonics.js";
import { Secp256r1PublicKey } from "./publickey.js";
const DEFAULT_SECP256R1_DERIVATION_PATH = "m/74'/784'/0'/0/0";
class Secp256r1Keypair extends Keypair {
  /**
   * Create a new keypair instance.
   * Generate random keypair if no {@link Secp256r1Keypair} is provided.
   *
   * @param keypair Secp256r1 keypair
   */
  constructor(keypair) {
    super();
    if (keypair) {
      this.keypair = keypair;
    } else {
      const secretKey = secp256r1.utils.randomPrivateKey();
      const publicKey = secp256r1.getPublicKey(secretKey, true);
      this.keypair = { publicKey, secretKey };
    }
  }
  /**
   * Get the key scheme of the keypair Secp256r1
   */
  getKeyScheme() {
    return "Secp256r1";
  }
  /**
   * Generate a new random keypair
   */
  static generate() {
    return new Secp256r1Keypair();
  }
  /**
   * Create a keypair from a raw secret key byte array.
   *
   * This method should only be used to recreate a keypair from a previously
   * generated secret key. Generating keypairs from a random seed should be done
   * with the {@link Keypair.fromSeed} method.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array or Bech32 secret key string
   * @param options: skip secret key validation
   */
  static fromSecretKey(secretKey, options) {
    if (typeof secretKey === "string") {
      const decoded = decodeSuiPrivateKey(secretKey);
      if (decoded.schema !== "Secp256r1") {
        throw new Error(`Expected a Secp256r1 keypair, got ${decoded.schema}`);
      }
      return this.fromSecretKey(decoded.secretKey, options);
    }
    const publicKey = secp256r1.getPublicKey(secretKey, true);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const msgHash = bytesToHex(blake2b(signData, { dkLen: 32 }));
      const signature = secp256r1.sign(msgHash, secretKey, { lowS: true });
      if (!secp256r1.verify(signature, msgHash, publicKey, { lowS: true })) {
        throw new Error("Provided secretKey is invalid");
      }
    }
    return new Secp256r1Keypair({ publicKey, secretKey });
  }
  /**
   * Generate a keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */
  static fromSeed(seed) {
    const publicKey = secp256r1.getPublicKey(seed, true);
    return new Secp256r1Keypair({ publicKey, secretKey: seed });
  }
  /**
   * The public key for this keypair
   */
  getPublicKey() {
    return new Secp256r1PublicKey(this.keypair.publicKey);
  }
  /**
   * The Bech32 secret key string for this Secp256r1 keypair
   */
  getSecretKey() {
    return encodeSuiPrivateKey(this.keypair.secretKey, this.getKeyScheme());
  }
  /**
   * Return the signature for the provided data.
   */
  async sign(data) {
    const msgHash = sha256(data);
    const sig = secp256r1.sign(msgHash, this.keypair.secretKey, {
      lowS: true
    });
    return sig.toCompactRawBytes();
  }
  /**
   * Derive Secp256r1 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/74'/784'/0'/0/0, otherwise the path must
   * be compliant to BIP-32 in form m/74'/784'/{account_index}'/{change_index}/{address_index}.
   */
  static deriveKeypair(mnemonics, path) {
    if (path == null) {
      path = DEFAULT_SECP256R1_DERIVATION_PATH;
    }
    if (!isValidBIP32Path(path)) {
      throw new Error("Invalid derivation path");
    }
    const privateKey = HDKey.fromMasterSeed(mnemonicToSeed(mnemonics)).derive(path).privateKey;
    return Secp256r1Keypair.fromSecretKey(privateKey);
  }
}
export {
  DEFAULT_SECP256R1_DERIVATION_PATH,
  Secp256r1Keypair
};
//# sourceMappingURL=keypair.js.map
