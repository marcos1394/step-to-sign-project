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
var move_registry_exports = {};
__export(move_registry_exports, {
  isValidNamedPackage: () => isValidNamedPackage,
  isValidNamedType: () => isValidNamedType
});
module.exports = __toCommonJS(move_registry_exports);
var import_suins = require("./suins.js");
const NAME_PATTERN = /^([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const VERSION_REGEX = /^\d+$/;
const MAX_APP_SIZE = 64;
const NAME_SEPARATOR = "/";
const isValidNamedPackage = (name) => {
  const parts = name.split(NAME_SEPARATOR);
  if (parts.length < 2 || parts.length > 3) return false;
  const [org, app, version] = parts;
  if (version !== void 0 && !VERSION_REGEX.test(version)) return false;
  if (!(0, import_suins.isValidSuiNSName)(org)) return false;
  return NAME_PATTERN.test(app) && app.length < MAX_APP_SIZE;
};
const isValidNamedType = (type) => {
  const splitType = type.split(/::|<|>|,/);
  for (const t of splitType) {
    if (t.includes(NAME_SEPARATOR) && !isValidNamedPackage(t)) return false;
  }
  return true;
};
//# sourceMappingURL=move-registry.js.map
