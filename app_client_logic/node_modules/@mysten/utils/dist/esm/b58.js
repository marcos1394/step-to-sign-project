import { base58 } from "@scure/base";
const toBase58 = (buffer) => base58.encode(buffer);
const fromBase58 = (str) => base58.decode(str);
export {
  fromBase58,
  toBase58
};
//# sourceMappingURL=b58.js.map
