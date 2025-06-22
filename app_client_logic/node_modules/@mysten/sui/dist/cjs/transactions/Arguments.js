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
var Arguments_exports = {};
__export(Arguments_exports, {
  Arguments: () => Arguments
});
module.exports = __toCommonJS(Arguments_exports);
var import_object = require("./object.js");
var import_pure = require("./pure.js");
const Arguments = {
  pure: (0, import_pure.createPure)((value) => (tx) => tx.pure(value)),
  object: (0, import_object.createObjectMethods)((value) => (tx) => tx.object(value)),
  sharedObjectRef: (...args) => (tx) => tx.sharedObjectRef(...args),
  objectRef: (...args) => (tx) => tx.objectRef(...args),
  receivingRef: (...args) => (tx) => tx.receivingRef(...args)
};
//# sourceMappingURL=Arguments.js.map
