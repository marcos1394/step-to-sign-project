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
var serializer_exports = {};
__export(serializer_exports, {
  getPureBcsSchema: () => getPureBcsSchema,
  isTxContext: () => isTxContext,
  normalizedTypeToMoveTypeSignature: () => normalizedTypeToMoveTypeSignature,
  pureBcsSchemaFromOpenMoveTypeSignatureBody: () => pureBcsSchemaFromOpenMoveTypeSignatureBody
});
module.exports = __toCommonJS(serializer_exports);
var import_bcs = require("../bcs/index.js");
var import_utils = require("../utils/index.js");
var import_sui_types = require("../utils/sui-types.js");
const OBJECT_MODULE_NAME = "object";
const ID_STRUCT_NAME = "ID";
const STD_ASCII_MODULE_NAME = "ascii";
const STD_ASCII_STRUCT_NAME = "String";
const STD_UTF8_MODULE_NAME = "string";
const STD_UTF8_STRUCT_NAME = "String";
const STD_OPTION_MODULE_NAME = "option";
const STD_OPTION_STRUCT_NAME = "Option";
function isTxContext(param) {
  const struct = typeof param.body === "object" && "datatype" in param.body ? param.body.datatype : null;
  return !!struct && (0, import_sui_types.normalizeSuiAddress)(struct.package) === (0, import_sui_types.normalizeSuiAddress)("0x2") && struct.module === "tx_context" && struct.type === "TxContext";
}
function getPureBcsSchema(typeSignature) {
  if (typeof typeSignature === "string") {
    switch (typeSignature) {
      case "address":
        return import_bcs.bcs.Address;
      case "bool":
        return import_bcs.bcs.Bool;
      case "u8":
        return import_bcs.bcs.U8;
      case "u16":
        return import_bcs.bcs.U16;
      case "u32":
        return import_bcs.bcs.U32;
      case "u64":
        return import_bcs.bcs.U64;
      case "u128":
        return import_bcs.bcs.U128;
      case "u256":
        return import_bcs.bcs.U256;
      default:
        throw new Error(`Unknown type signature ${typeSignature}`);
    }
  }
  if ("vector" in typeSignature) {
    if (typeSignature.vector === "u8") {
      return import_bcs.bcs.vector(import_bcs.bcs.U8).transform({
        input: (val) => typeof val === "string" ? new TextEncoder().encode(val) : val,
        output: (val) => val
      });
    }
    const type = getPureBcsSchema(typeSignature.vector);
    return type ? import_bcs.bcs.vector(type) : null;
  }
  if ("datatype" in typeSignature) {
    const pkg = (0, import_sui_types.normalizeSuiAddress)(typeSignature.datatype.package);
    if (pkg === (0, import_sui_types.normalizeSuiAddress)(import_utils.MOVE_STDLIB_ADDRESS)) {
      if (typeSignature.datatype.module === STD_ASCII_MODULE_NAME && typeSignature.datatype.type === STD_ASCII_STRUCT_NAME) {
        return import_bcs.bcs.String;
      }
      if (typeSignature.datatype.module === STD_UTF8_MODULE_NAME && typeSignature.datatype.type === STD_UTF8_STRUCT_NAME) {
        return import_bcs.bcs.String;
      }
      if (typeSignature.datatype.module === STD_OPTION_MODULE_NAME && typeSignature.datatype.type === STD_OPTION_STRUCT_NAME) {
        const type = getPureBcsSchema(typeSignature.datatype.typeParameters[0]);
        return type ? import_bcs.bcs.vector(type) : null;
      }
    }
    if (pkg === (0, import_sui_types.normalizeSuiAddress)(import_utils.SUI_FRAMEWORK_ADDRESS) && typeSignature.datatype.module === OBJECT_MODULE_NAME && typeSignature.datatype.type === ID_STRUCT_NAME) {
      return import_bcs.bcs.Address;
    }
  }
  return null;
}
function normalizedTypeToMoveTypeSignature(type) {
  if (typeof type === "object" && "Reference" in type) {
    return {
      ref: "&",
      body: normalizedTypeToMoveTypeSignatureBody(type.Reference)
    };
  }
  if (typeof type === "object" && "MutableReference" in type) {
    return {
      ref: "&mut",
      body: normalizedTypeToMoveTypeSignatureBody(type.MutableReference)
    };
  }
  return {
    ref: null,
    body: normalizedTypeToMoveTypeSignatureBody(type)
  };
}
function normalizedTypeToMoveTypeSignatureBody(type) {
  if (typeof type === "string") {
    switch (type) {
      case "Address":
        return "address";
      case "Bool":
        return "bool";
      case "U8":
        return "u8";
      case "U16":
        return "u16";
      case "U32":
        return "u32";
      case "U64":
        return "u64";
      case "U128":
        return "u128";
      case "U256":
        return "u256";
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  }
  if ("Vector" in type) {
    return { vector: normalizedTypeToMoveTypeSignatureBody(type.Vector) };
  }
  if ("Struct" in type) {
    return {
      datatype: {
        package: type.Struct.address,
        module: type.Struct.module,
        type: type.Struct.name,
        typeParameters: type.Struct.typeArguments.map(normalizedTypeToMoveTypeSignatureBody)
      }
    };
  }
  if ("TypeParameter" in type) {
    return { typeParameter: type.TypeParameter };
  }
  throw new Error(`Unexpected type ${JSON.stringify(type)}`);
}
function pureBcsSchemaFromOpenMoveTypeSignatureBody(typeSignature) {
  if (typeof typeSignature === "string") {
    switch (typeSignature) {
      case "address":
        return import_bcs.bcs.Address;
      case "bool":
        return import_bcs.bcs.Bool;
      case "u8":
        return import_bcs.bcs.U8;
      case "u16":
        return import_bcs.bcs.U16;
      case "u32":
        return import_bcs.bcs.U32;
      case "u64":
        return import_bcs.bcs.U64;
      case "u128":
        return import_bcs.bcs.U128;
      case "u256":
        return import_bcs.bcs.U256;
      default:
        throw new Error(`Unknown type signature ${typeSignature}`);
    }
  }
  if ("vector" in typeSignature) {
    return import_bcs.bcs.vector(pureBcsSchemaFromOpenMoveTypeSignatureBody(typeSignature.vector));
  }
  throw new Error(`Expected pure typeSignature, but got ${JSON.stringify(typeSignature)}`);
}
//# sourceMappingURL=serializer.js.map
