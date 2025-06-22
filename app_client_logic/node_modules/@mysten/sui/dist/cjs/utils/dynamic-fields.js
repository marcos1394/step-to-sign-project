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
var dynamic_fields_exports = {};
__export(dynamic_fields_exports, {
  deriveDynamicFieldID: () => deriveDynamicFieldID
});
module.exports = __toCommonJS(dynamic_fields_exports);
var import_bcs = require("@mysten/bcs");
var import_blake2b = require("@noble/hashes/blake2b");
var import_bcs2 = require("../bcs/index.js");
function deriveDynamicFieldID(parentId, typeTag, key) {
  const address = import_bcs2.bcs.Address.serialize(parentId).toBytes();
  const tag = import_bcs2.bcs.TypeTag.serialize(typeTag).toBytes();
  const keyLength = import_bcs2.bcs.u64().serialize(key.length).toBytes();
  const hash = import_blake2b.blake2b.create({
    dkLen: 32
  });
  hash.update(new Uint8Array([240]));
  hash.update(address);
  hash.update(keyLength);
  hash.update(key);
  hash.update(tag);
  return `0x${(0, import_bcs.toHex)(hash.digest().slice(0, 32))}`;
}
//# sourceMappingURL=dynamic-fields.js.map
