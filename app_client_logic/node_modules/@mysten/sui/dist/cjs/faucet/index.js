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
var faucet_exports = {};
__export(faucet_exports, {
  FaucetRateLimitError: () => import_faucet.FaucetRateLimitError,
  getFaucetHost: () => import_faucet.getFaucetHost,
  getFaucetRequestStatus: () => import_faucet.getFaucetRequestStatus,
  requestSuiFromFaucetV0: () => import_faucet.requestSuiFromFaucetV0,
  requestSuiFromFaucetV1: () => import_faucet.requestSuiFromFaucetV1,
  requestSuiFromFaucetV2: () => import_faucet.requestSuiFromFaucetV2
});
module.exports = __toCommonJS(faucet_exports);
var import_faucet = require("./faucet.js");
//# sourceMappingURL=index.js.map
