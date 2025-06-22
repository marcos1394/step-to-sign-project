import { fromBase64, toBase64 } from "@mysten/bcs";
import { bcs } from "../bcs/index.js";
import { parseSerializedPasskeySignature } from "../keypairs/passkey/publickey.js";
import { parseSerializedZkLoginSignature } from "../zklogin/publickey.js";
import { parseSerializedKeypairSignature } from "./publickey.js";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_FLAG } from "./signature-scheme.js";
function toSerializedSignature({
  signature,
  signatureScheme,
  publicKey
}) {
  if (!publicKey) {
    throw new Error("`publicKey` is required");
  }
  const pubKeyBytes = publicKey.toRawBytes();
  const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
  serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
  serializedSignature.set(signature, 1);
  serializedSignature.set(pubKeyBytes, 1 + signature.length);
  return toBase64(serializedSignature);
}
function parseSerializedSignature(serializedSignature) {
  const bytes = fromBase64(serializedSignature);
  const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
  switch (signatureScheme) {
    case "Passkey":
      return parseSerializedPasskeySignature(serializedSignature);
    case "MultiSig":
      const multisig = bcs.MultiSig.parse(bytes.slice(1));
      return {
        serializedSignature,
        signatureScheme,
        multisig,
        bytes,
        signature: void 0
      };
    case "ZkLogin":
      return parseSerializedZkLoginSignature(serializedSignature);
    case "ED25519":
    case "Secp256k1":
    case "Secp256r1":
      return parseSerializedKeypairSignature(serializedSignature);
    default:
      throw new Error("Unsupported signature scheme");
  }
}
export {
  parseSerializedSignature,
  toSerializedSignature
};
//# sourceMappingURL=signature.js.map
