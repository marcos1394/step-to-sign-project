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
var secp256r1_exports = {};
__export(secp256r1_exports, {
  DEFAULT_SECP256R1_DERIVATION_PATH: () => import_keypair.DEFAULT_SECP256R1_DERIVATION_PATH,
  Secp256r1Keypair: () => import_keypair.Secp256r1Keypair,
  Secp256r1PublicKey: () => import_publickey.Secp256r1PublicKey
});
module.exports = __toCommonJS(secp256r1_exports);
var import_keypair = require("./keypair.js");
var import_publickey = require("./publickey.js");
//# sourceMappingURL=index.js.map
