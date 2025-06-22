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
var errors_exports = {};
__export(errors_exports, {
  ObjectError: () => ObjectError,
  SuiClientError: () => SuiClientError
});
module.exports = __toCommonJS(errors_exports);
class SuiClientError extends Error {
}
class ObjectError extends SuiClientError {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
  static fromResponse(response, objectId) {
    switch (response.code) {
      case "notExists":
        return new ObjectError(response.code, `Object ${response.object_id} does not exist`);
      case "dynamicFieldNotFound":
        return new ObjectError(
          response.code,
          `Dynamic field not found for object ${response.parent_object_id}`
        );
      case "deleted":
        return new ObjectError(response.code, `Object ${response.object_id} has been deleted`);
      case "displayError":
        return new ObjectError(response.code, `Display error: ${response.error}`);
      case "unknown":
      default:
        return new ObjectError(
          response.code,
          `Unknown error while loading object${objectId ? ` ${objectId}` : ""}`
        );
    }
  }
}
//# sourceMappingURL=errors.js.map
