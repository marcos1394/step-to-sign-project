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
var pure_exports = {};
__export(pure_exports, {
  pureBcsSchemaFromTypeName: () => pureBcsSchemaFromTypeName
});
module.exports = __toCommonJS(pure_exports);
var import_bcs = require("@mysten/bcs");
var import_bcs2 = require("./bcs.js");
function pureBcsSchemaFromTypeName(name) {
  switch (name) {
    case "u8":
      return import_bcs.bcs.u8();
    case "u16":
      return import_bcs.bcs.u16();
    case "u32":
      return import_bcs.bcs.u32();
    case "u64":
      return import_bcs.bcs.u64();
    case "u128":
      return import_bcs.bcs.u128();
    case "u256":
      return import_bcs.bcs.u256();
    case "bool":
      return import_bcs.bcs.bool();
    case "string":
      return import_bcs.bcs.string();
    case "id":
    case "address":
      return import_bcs2.Address;
  }
  const generic = name.match(/^(vector|option)<(.+)>$/);
  if (generic) {
    const [kind, inner] = generic.slice(1);
    if (kind === "vector") {
      return import_bcs.bcs.vector(pureBcsSchemaFromTypeName(inner));
    } else {
      return import_bcs.bcs.option(pureBcsSchemaFromTypeName(inner));
    }
  }
  throw new Error(`Invalid Pure type name: ${name}`);
}
//# sourceMappingURL=pure.js.map
