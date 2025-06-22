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
var Commands_exports = {};
__export(Commands_exports, {
  Commands: () => Commands,
  UpgradePolicy: () => UpgradePolicy
});
module.exports = __toCommonJS(Commands_exports);
var import_bcs = require("@mysten/bcs");
var import_valibot = require("valibot");
var import_sui_types = require("../utils/sui-types.js");
var import_internal = require("./data/internal.js");
var UpgradePolicy = /* @__PURE__ */ ((UpgradePolicy2) => {
  UpgradePolicy2[UpgradePolicy2["COMPATIBLE"] = 0] = "COMPATIBLE";
  UpgradePolicy2[UpgradePolicy2["ADDITIVE"] = 128] = "ADDITIVE";
  UpgradePolicy2[UpgradePolicy2["DEP_ONLY"] = 192] = "DEP_ONLY";
  return UpgradePolicy2;
})(UpgradePolicy || {});
const Commands = {
  MoveCall(input) {
    const [pkg, mod = "", fn = ""] = "target" in input ? input.target.split("::") : [input.package, input.module, input.function];
    return {
      $kind: "MoveCall",
      MoveCall: {
        package: pkg,
        module: mod,
        function: fn,
        typeArguments: input.typeArguments ?? [],
        arguments: input.arguments ?? []
      }
    };
  },
  TransferObjects(objects, address) {
    return {
      $kind: "TransferObjects",
      TransferObjects: {
        objects: objects.map((o) => (0, import_valibot.parse)(import_internal.Argument, o)),
        address: (0, import_valibot.parse)(import_internal.Argument, address)
      }
    };
  },
  SplitCoins(coin, amounts) {
    return {
      $kind: "SplitCoins",
      SplitCoins: {
        coin: (0, import_valibot.parse)(import_internal.Argument, coin),
        amounts: amounts.map((o) => (0, import_valibot.parse)(import_internal.Argument, o))
      }
    };
  },
  MergeCoins(destination, sources) {
    return {
      $kind: "MergeCoins",
      MergeCoins: {
        destination: (0, import_valibot.parse)(import_internal.Argument, destination),
        sources: sources.map((o) => (0, import_valibot.parse)(import_internal.Argument, o))
      }
    };
  },
  Publish({
    modules,
    dependencies
  }) {
    return {
      $kind: "Publish",
      Publish: {
        modules: modules.map(
          (module2) => typeof module2 === "string" ? module2 : (0, import_bcs.toBase64)(new Uint8Array(module2))
        ),
        dependencies: dependencies.map((dep) => (0, import_sui_types.normalizeSuiObjectId)(dep))
      }
    };
  },
  Upgrade({
    modules,
    dependencies,
    package: packageId,
    ticket
  }) {
    return {
      $kind: "Upgrade",
      Upgrade: {
        modules: modules.map(
          (module2) => typeof module2 === "string" ? module2 : (0, import_bcs.toBase64)(new Uint8Array(module2))
        ),
        dependencies: dependencies.map((dep) => (0, import_sui_types.normalizeSuiObjectId)(dep)),
        package: packageId,
        ticket: (0, import_valibot.parse)(import_internal.Argument, ticket)
      }
    };
  },
  MakeMoveVec({
    type,
    elements
  }) {
    return {
      $kind: "MakeMoveVec",
      MakeMoveVec: {
        type: type ?? null,
        elements: elements.map((o) => (0, import_valibot.parse)(import_internal.Argument, o))
      }
    };
  },
  Intent({
    name,
    inputs = {},
    data = {}
  }) {
    return {
      $kind: "$Intent",
      $Intent: {
        name,
        inputs: Object.fromEntries(
          Object.entries(inputs).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.map((o) => (0, import_valibot.parse)(import_internal.Argument, o)) : (0, import_valibot.parse)(import_internal.Argument, value)
          ])
        ),
        data
      }
    };
  }
};
//# sourceMappingURL=Commands.js.map
