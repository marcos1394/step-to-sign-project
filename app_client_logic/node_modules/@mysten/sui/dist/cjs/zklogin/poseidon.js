"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var poseidon_exports = {};
__export(poseidon_exports, {
  BN254_FIELD_SIZE: () => BN254_FIELD_SIZE,
  poseidonHash: () => poseidonHash
});
module.exports = __toCommonJS(poseidon_exports);
var import_poseidon_lite = require("poseidon-lite");
const poseidonNumToHashFN = [
  import_poseidon_lite.poseidon1,
  import_poseidon_lite.poseidon2,
  import_poseidon_lite.poseidon3,
  import_poseidon_lite.poseidon4,
  import_poseidon_lite.poseidon5,
  import_poseidon_lite.poseidon6,
  import_poseidon_lite.poseidon7,
  import_poseidon_lite.poseidon8,
  import_poseidon_lite.poseidon9,
  import_poseidon_lite.poseidon10,
  import_poseidon_lite.poseidon11,
  import_poseidon_lite.poseidon12,
  import_poseidon_lite.poseidon13,
  import_poseidon_lite.poseidon14,
  import_poseidon_lite.poseidon15,
  import_poseidon_lite.poseidon16
];
const BN254_FIELD_SIZE = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
function poseidonHash(inputs) {
  inputs.forEach((x) => {
    const b = BigInt(x);
    if (b < 0 || b >= BN254_FIELD_SIZE) {
      throw new Error(`Element ${b} not in the BN254 field`);
    }
  });
  const hashFN = poseidonNumToHashFN[inputs.length - 1];
  if (hashFN) {
    return hashFN(inputs);
  } else if (inputs.length <= 32) {
    const hash1 = poseidonHash(inputs.slice(0, 16));
    const hash2 = poseidonHash(inputs.slice(16));
    return poseidonHash([hash1, hash2]);
  } else {
    throw new Error(`Yet to implement: Unable to hash a vector of length ${inputs.length}`);
  }
}
//# sourceMappingURL=poseidon.js.map
