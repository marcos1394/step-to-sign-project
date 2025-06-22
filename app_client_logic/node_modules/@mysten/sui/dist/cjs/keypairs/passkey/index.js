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
var passkey_exports = {};
__export(passkey_exports, {
  BrowserPasskeyProvider: () => import_keypair.BrowserPasskeyProvider,
  PasskeyKeypair: () => import_keypair.PasskeyKeypair,
  PasskeyPublicKey: () => import_publickey.PasskeyPublicKey,
  findCommonPublicKey: () => import_keypair.findCommonPublicKey
});
module.exports = __toCommonJS(passkey_exports);
var import_keypair = require("./keypair.js");
var import_publickey = require("./publickey.js");
//# sourceMappingURL=index.js.map
