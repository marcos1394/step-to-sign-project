import { toHex } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2b";
import { bcs } from "../bcs/index.js";
function deriveDynamicFieldID(parentId, typeTag, key) {
  const address = bcs.Address.serialize(parentId).toBytes();
  const tag = bcs.TypeTag.serialize(typeTag).toBytes();
  const keyLength = bcs.u64().serialize(key.length).toBytes();
  const hash = blake2b.create({
    dkLen: 32
  });
  hash.update(new Uint8Array([240]));
  hash.update(address);
  hash.update(keyLength);
  hash.update(key);
  hash.update(tag);
  return `0x${toHex(hash.digest().slice(0, 32))}`;
}
export {
  deriveDynamicFieldID
};
//# sourceMappingURL=dynamic-fields.js.map
