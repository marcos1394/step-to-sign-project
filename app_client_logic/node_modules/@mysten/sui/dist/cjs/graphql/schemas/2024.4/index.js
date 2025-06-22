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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __exports = {};
__export(__exports, {
  graphql: () => graphql,
  maskFragments: () => import_gql2.maskFragments,
  readFragment: () => import_gql2.readFragment
});
module.exports = __toCommonJS(__exports);
var import_gql = require("gql.tada");
__reExport(__exports, require("../../types.js"), module.exports);
var import_gql2 = require("gql.tada");
const graphql = (0, import_gql.initGraphQLTada)();
//# sourceMappingURL=index.js.map
