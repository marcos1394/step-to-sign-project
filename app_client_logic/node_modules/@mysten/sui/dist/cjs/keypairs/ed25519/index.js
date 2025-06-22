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
var ed25519_exports = {};
__export(ed25519_exports, {
  DEFAULT_ED25519_DERIVATION_PATH: () => import_keypair.DEFAULT_ED25519_DERIVATION_PATH,
  Ed25519Keypair: () => import_keypair.Ed25519Keypair,
  Ed25519PublicKey: () => import_publickey.Ed25519PublicKey
});
module.exports = __toCommonJS(ed25519_exports);
var import_keypair = require("./keypair.js");
var import_publickey = require("./publickey.js");
//# sourceMappingURL=index.js.map
