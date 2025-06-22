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
var v2_exports = {};
__export(v2_exports, {
  SerializedTransactionDataV2: () => SerializedTransactionDataV2
});
module.exports = __toCommonJS(v2_exports);
var import_valibot = require("valibot");
var import_internal = require("./internal.js");
function enumUnion(options) {
  return (0, import_valibot.union)(
    Object.entries(options).map(([key, value]) => (0, import_valibot.object)({ [key]: value }))
  );
}
const Argument = enumUnion({
  GasCoin: (0, import_valibot.literal)(true),
  Input: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()),
  Result: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()),
  NestedResult: (0, import_valibot.tuple)([(0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()), (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)())])
});
const GasData = (0, import_valibot.object)({
  budget: (0, import_valibot.nullable)(import_internal.JsonU64),
  price: (0, import_valibot.nullable)(import_internal.JsonU64),
  owner: (0, import_valibot.nullable)(import_internal.SuiAddress),
  payment: (0, import_valibot.nullable)((0, import_valibot.array)(import_internal.ObjectRef))
});
const ProgrammableMoveCall = (0, import_valibot.object)({
  package: import_internal.ObjectID,
  module: (0, import_valibot.string)(),
  function: (0, import_valibot.string)(),
  // snake case in rust
  typeArguments: (0, import_valibot.array)((0, import_valibot.string)()),
  arguments: (0, import_valibot.array)(Argument)
});
const $Intent = (0, import_valibot.object)({
  name: (0, import_valibot.string)(),
  inputs: (0, import_valibot.record)((0, import_valibot.string)(), (0, import_valibot.union)([Argument, (0, import_valibot.array)(Argument)])),
  data: (0, import_valibot.record)((0, import_valibot.string)(), (0, import_valibot.unknown)())
});
const Command = enumUnion({
  MoveCall: ProgrammableMoveCall,
  TransferObjects: (0, import_valibot.object)({
    objects: (0, import_valibot.array)(Argument),
    address: Argument
  }),
  SplitCoins: (0, import_valibot.object)({
    coin: Argument,
    amounts: (0, import_valibot.array)(Argument)
  }),
  MergeCoins: (0, import_valibot.object)({
    destination: Argument,
    sources: (0, import_valibot.array)(Argument)
  }),
  Publish: (0, import_valibot.object)({
    modules: (0, import_valibot.array)(import_internal.BCSBytes),
    dependencies: (0, import_valibot.array)(import_internal.ObjectID)
  }),
  MakeMoveVec: (0, import_valibot.object)({
    type: (0, import_valibot.nullable)((0, import_valibot.string)()),
    elements: (0, import_valibot.array)(Argument)
  }),
  Upgrade: (0, import_valibot.object)({
    modules: (0, import_valibot.array)(import_internal.BCSBytes),
    dependencies: (0, import_valibot.array)(import_internal.ObjectID),
    package: import_internal.ObjectID,
    ticket: Argument
  }),
  $Intent
});
const ObjectArg = enumUnion({
  ImmOrOwnedObject: import_internal.ObjectRef,
  SharedObject: (0, import_valibot.object)({
    objectId: import_internal.ObjectID,
    // snake case in rust
    initialSharedVersion: import_internal.JsonU64,
    mutable: (0, import_valibot.boolean)()
  }),
  Receiving: import_internal.ObjectRef
});
const CallArg = enumUnion({
  Object: ObjectArg,
  Pure: (0, import_valibot.object)({
    bytes: import_internal.BCSBytes
  }),
  UnresolvedPure: (0, import_valibot.object)({
    value: (0, import_valibot.unknown)()
  }),
  UnresolvedObject: (0, import_valibot.object)({
    objectId: import_internal.ObjectID,
    version: (0, import_valibot.optional)((0, import_valibot.nullable)(import_internal.JsonU64)),
    digest: (0, import_valibot.optional)((0, import_valibot.nullable)((0, import_valibot.string)())),
    initialSharedVersion: (0, import_valibot.optional)((0, import_valibot.nullable)(import_internal.JsonU64))
  })
});
const TransactionExpiration = enumUnion({
  None: (0, import_valibot.literal)(true),
  Epoch: import_internal.JsonU64
});
const SerializedTransactionDataV2 = (0, import_valibot.object)({
  version: (0, import_valibot.literal)(2),
  sender: (0, import_valibot.nullish)(import_internal.SuiAddress),
  expiration: (0, import_valibot.nullish)(TransactionExpiration),
  gasData: GasData,
  inputs: (0, import_valibot.array)(CallArg),
  commands: (0, import_valibot.array)(Command),
  digest: (0, import_valibot.optional)((0, import_valibot.nullable)((0, import_valibot.string)()))
});
//# sourceMappingURL=v2.js.map
