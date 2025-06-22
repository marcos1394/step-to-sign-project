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
var v1_exports = {};
__export(v1_exports, {
  NormalizedCallArg: () => NormalizedCallArg,
  ObjectRef: () => ObjectRef,
  SerializedTransactionDataV1: () => SerializedTransactionDataV1,
  StructTag: () => StructTag,
  TransactionArgument: () => TransactionArgument,
  TypeTag: () => TypeTag,
  serializeV1TransactionData: () => serializeV1TransactionData,
  transactionDataFromV1: () => transactionDataFromV1
});
module.exports = __toCommonJS(v1_exports);
var import_bcs = require("@mysten/bcs");
var import_valibot = require("valibot");
var import_bcs2 = require("../../bcs/index.js");
var import_internal = require("./internal.js");
const ObjectRef = (0, import_valibot.object)({
  digest: (0, import_valibot.string)(),
  objectId: (0, import_valibot.string)(),
  version: (0, import_valibot.union)([(0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()), (0, import_valibot.string)(), (0, import_valibot.bigint)()])
});
const ObjectArg = (0, import_internal.safeEnum)({
  ImmOrOwned: ObjectRef,
  Shared: (0, import_valibot.object)({
    objectId: import_internal.ObjectID,
    initialSharedVersion: import_internal.JsonU64,
    mutable: (0, import_valibot.boolean)()
  }),
  Receiving: ObjectRef
});
const NormalizedCallArg = (0, import_internal.safeEnum)({
  Object: ObjectArg,
  Pure: (0, import_valibot.array)((0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()))
});
const TransactionInput = (0, import_valibot.union)([
  (0, import_valibot.object)({
    kind: (0, import_valibot.literal)("Input"),
    index: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()),
    value: (0, import_valibot.unknown)(),
    type: (0, import_valibot.optional)((0, import_valibot.literal)("object"))
  }),
  (0, import_valibot.object)({
    kind: (0, import_valibot.literal)("Input"),
    index: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()),
    value: (0, import_valibot.unknown)(),
    type: (0, import_valibot.literal)("pure")
  })
]);
const TransactionExpiration = (0, import_valibot.union)([
  (0, import_valibot.object)({ Epoch: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()) }),
  (0, import_valibot.object)({ None: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) })
]);
const StringEncodedBigint = (0, import_valibot.pipe)(
  (0, import_valibot.union)([(0, import_valibot.number)(), (0, import_valibot.string)(), (0, import_valibot.bigint)()]),
  (0, import_valibot.check)((val) => {
    if (!["string", "number", "bigint"].includes(typeof val)) return false;
    try {
      BigInt(val);
      return true;
    } catch {
      return false;
    }
  })
);
const TypeTag = (0, import_valibot.union)([
  (0, import_valibot.object)({ bool: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ u8: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ u64: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ u128: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ address: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ signer: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ vector: (0, import_valibot.lazy)(() => TypeTag) }),
  (0, import_valibot.object)({ struct: (0, import_valibot.lazy)(() => StructTag) }),
  (0, import_valibot.object)({ u16: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ u32: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) }),
  (0, import_valibot.object)({ u256: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) })
]);
const StructTag = (0, import_valibot.object)({
  address: (0, import_valibot.string)(),
  module: (0, import_valibot.string)(),
  name: (0, import_valibot.string)(),
  typeParams: (0, import_valibot.array)(TypeTag)
});
const GasConfig = (0, import_valibot.object)({
  budget: (0, import_valibot.optional)(StringEncodedBigint),
  price: (0, import_valibot.optional)(StringEncodedBigint),
  payment: (0, import_valibot.optional)((0, import_valibot.array)(ObjectRef)),
  owner: (0, import_valibot.optional)((0, import_valibot.string)())
});
const TransactionArgumentTypes = [
  TransactionInput,
  (0, import_valibot.object)({ kind: (0, import_valibot.literal)("GasCoin") }),
  (0, import_valibot.object)({ kind: (0, import_valibot.literal)("Result"), index: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()) }),
  (0, import_valibot.object)({
    kind: (0, import_valibot.literal)("NestedResult"),
    index: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()),
    resultIndex: (0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)())
  })
];
const TransactionArgument = (0, import_valibot.union)([...TransactionArgumentTypes]);
const MoveCallTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("MoveCall"),
  target: (0, import_valibot.pipe)(
    (0, import_valibot.string)(),
    (0, import_valibot.check)((target) => target.split("::").length === 3)
  ),
  typeArguments: (0, import_valibot.array)((0, import_valibot.string)()),
  arguments: (0, import_valibot.array)(TransactionArgument)
});
const TransferObjectsTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("TransferObjects"),
  objects: (0, import_valibot.array)(TransactionArgument),
  address: TransactionArgument
});
const SplitCoinsTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("SplitCoins"),
  coin: TransactionArgument,
  amounts: (0, import_valibot.array)(TransactionArgument)
});
const MergeCoinsTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("MergeCoins"),
  destination: TransactionArgument,
  sources: (0, import_valibot.array)(TransactionArgument)
});
const MakeMoveVecTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("MakeMoveVec"),
  type: (0, import_valibot.union)([(0, import_valibot.object)({ Some: TypeTag }), (0, import_valibot.object)({ None: (0, import_valibot.nullable)((0, import_valibot.literal)(true)) })]),
  objects: (0, import_valibot.array)(TransactionArgument)
});
const PublishTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("Publish"),
  modules: (0, import_valibot.array)((0, import_valibot.array)((0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()))),
  dependencies: (0, import_valibot.array)((0, import_valibot.string)())
});
const UpgradeTransaction = (0, import_valibot.object)({
  kind: (0, import_valibot.literal)("Upgrade"),
  modules: (0, import_valibot.array)((0, import_valibot.array)((0, import_valibot.pipe)((0, import_valibot.number)(), (0, import_valibot.integer)()))),
  dependencies: (0, import_valibot.array)((0, import_valibot.string)()),
  packageId: (0, import_valibot.string)(),
  ticket: TransactionArgument
});
const TransactionTypes = [
  MoveCallTransaction,
  TransferObjectsTransaction,
  SplitCoinsTransaction,
  MergeCoinsTransaction,
  PublishTransaction,
  UpgradeTransaction,
  MakeMoveVecTransaction
];
const TransactionType = (0, import_valibot.union)([...TransactionTypes]);
const SerializedTransactionDataV1 = (0, import_valibot.object)({
  version: (0, import_valibot.literal)(1),
  sender: (0, import_valibot.optional)((0, import_valibot.string)()),
  expiration: (0, import_valibot.nullish)(TransactionExpiration),
  gasConfig: GasConfig,
  inputs: (0, import_valibot.array)(TransactionInput),
  transactions: (0, import_valibot.array)(TransactionType)
});
function serializeV1TransactionData(transactionData) {
  const inputs = transactionData.inputs.map(
    (input, index) => {
      if (input.Object) {
        return {
          kind: "Input",
          index,
          value: {
            Object: input.Object.ImmOrOwnedObject ? {
              ImmOrOwned: input.Object.ImmOrOwnedObject
            } : input.Object.Receiving ? {
              Receiving: {
                digest: input.Object.Receiving.digest,
                version: input.Object.Receiving.version,
                objectId: input.Object.Receiving.objectId
              }
            } : {
              Shared: {
                mutable: input.Object.SharedObject.mutable,
                initialSharedVersion: input.Object.SharedObject.initialSharedVersion,
                objectId: input.Object.SharedObject.objectId
              }
            }
          },
          type: "object"
        };
      }
      if (input.Pure) {
        return {
          kind: "Input",
          index,
          value: {
            Pure: Array.from((0, import_bcs.fromBase64)(input.Pure.bytes))
          },
          type: "pure"
        };
      }
      if (input.UnresolvedPure) {
        return {
          kind: "Input",
          type: "pure",
          index,
          value: input.UnresolvedPure.value
        };
      }
      if (input.UnresolvedObject) {
        return {
          kind: "Input",
          type: "object",
          index,
          value: input.UnresolvedObject.objectId
        };
      }
      throw new Error("Invalid input");
    }
  );
  return {
    version: 1,
    sender: transactionData.sender ?? void 0,
    expiration: transactionData.expiration?.$kind === "Epoch" ? { Epoch: Number(transactionData.expiration.Epoch) } : transactionData.expiration ? { None: true } : null,
    gasConfig: {
      owner: transactionData.gasData.owner ?? void 0,
      budget: transactionData.gasData.budget ?? void 0,
      price: transactionData.gasData.price ?? void 0,
      payment: transactionData.gasData.payment ?? void 0
    },
    inputs,
    transactions: transactionData.commands.map((command) => {
      if (command.MakeMoveVec) {
        return {
          kind: "MakeMoveVec",
          type: command.MakeMoveVec.type === null ? { None: true } : { Some: import_bcs2.TypeTagSerializer.parseFromStr(command.MakeMoveVec.type) },
          objects: command.MakeMoveVec.elements.map(
            (arg) => convertTransactionArgument(arg, inputs)
          )
        };
      }
      if (command.MergeCoins) {
        return {
          kind: "MergeCoins",
          destination: convertTransactionArgument(command.MergeCoins.destination, inputs),
          sources: command.MergeCoins.sources.map((arg) => convertTransactionArgument(arg, inputs))
        };
      }
      if (command.MoveCall) {
        return {
          kind: "MoveCall",
          target: `${command.MoveCall.package}::${command.MoveCall.module}::${command.MoveCall.function}`,
          typeArguments: command.MoveCall.typeArguments,
          arguments: command.MoveCall.arguments.map(
            (arg) => convertTransactionArgument(arg, inputs)
          )
        };
      }
      if (command.Publish) {
        return {
          kind: "Publish",
          modules: command.Publish.modules.map((mod) => Array.from((0, import_bcs.fromBase64)(mod))),
          dependencies: command.Publish.dependencies
        };
      }
      if (command.SplitCoins) {
        return {
          kind: "SplitCoins",
          coin: convertTransactionArgument(command.SplitCoins.coin, inputs),
          amounts: command.SplitCoins.amounts.map((arg) => convertTransactionArgument(arg, inputs))
        };
      }
      if (command.TransferObjects) {
        return {
          kind: "TransferObjects",
          objects: command.TransferObjects.objects.map(
            (arg) => convertTransactionArgument(arg, inputs)
          ),
          address: convertTransactionArgument(command.TransferObjects.address, inputs)
        };
      }
      if (command.Upgrade) {
        return {
          kind: "Upgrade",
          modules: command.Upgrade.modules.map((mod) => Array.from((0, import_bcs.fromBase64)(mod))),
          dependencies: command.Upgrade.dependencies,
          packageId: command.Upgrade.package,
          ticket: convertTransactionArgument(command.Upgrade.ticket, inputs)
        };
      }
      throw new Error(`Unknown transaction ${Object.keys(command)}`);
    })
  };
}
function convertTransactionArgument(arg, inputs) {
  if (arg.$kind === "GasCoin") {
    return { kind: "GasCoin" };
  }
  if (arg.$kind === "Result") {
    return { kind: "Result", index: arg.Result };
  }
  if (arg.$kind === "NestedResult") {
    return { kind: "NestedResult", index: arg.NestedResult[0], resultIndex: arg.NestedResult[1] };
  }
  if (arg.$kind === "Input") {
    return inputs[arg.Input];
  }
  throw new Error(`Invalid argument ${Object.keys(arg)}`);
}
function transactionDataFromV1(data) {
  return (0, import_valibot.parse)(import_internal.TransactionData, {
    version: 2,
    sender: data.sender ?? null,
    expiration: data.expiration ? "Epoch" in data.expiration ? { Epoch: data.expiration.Epoch } : { None: true } : null,
    gasData: {
      owner: data.gasConfig.owner ?? null,
      budget: data.gasConfig.budget?.toString() ?? null,
      price: data.gasConfig.price?.toString() ?? null,
      payment: data.gasConfig.payment?.map((ref) => ({
        digest: ref.digest,
        objectId: ref.objectId,
        version: ref.version.toString()
      })) ?? null
    },
    inputs: data.inputs.map((input) => {
      if (input.kind === "Input") {
        if ((0, import_valibot.is)(NormalizedCallArg, input.value)) {
          const value = (0, import_valibot.parse)(NormalizedCallArg, input.value);
          if (value.Object) {
            if (value.Object.ImmOrOwned) {
              return {
                Object: {
                  ImmOrOwnedObject: {
                    objectId: value.Object.ImmOrOwned.objectId,
                    version: String(value.Object.ImmOrOwned.version),
                    digest: value.Object.ImmOrOwned.digest
                  }
                }
              };
            }
            if (value.Object.Shared) {
              return {
                Object: {
                  SharedObject: {
                    mutable: value.Object.Shared.mutable ?? null,
                    initialSharedVersion: value.Object.Shared.initialSharedVersion,
                    objectId: value.Object.Shared.objectId
                  }
                }
              };
            }
            if (value.Object.Receiving) {
              return {
                Object: {
                  Receiving: {
                    digest: value.Object.Receiving.digest,
                    version: String(value.Object.Receiving.version),
                    objectId: value.Object.Receiving.objectId
                  }
                }
              };
            }
            throw new Error("Invalid object input");
          }
          return {
            Pure: {
              bytes: (0, import_bcs.toBase64)(new Uint8Array(value.Pure))
            }
          };
        }
        if (input.type === "object") {
          return {
            UnresolvedObject: {
              objectId: input.value
            }
          };
        }
        return {
          UnresolvedPure: {
            value: input.value
          }
        };
      }
      throw new Error("Invalid input");
    }),
    commands: data.transactions.map((transaction) => {
      switch (transaction.kind) {
        case "MakeMoveVec":
          return {
            MakeMoveVec: {
              type: "Some" in transaction.type ? import_bcs2.TypeTagSerializer.tagToString(transaction.type.Some) : null,
              elements: transaction.objects.map((arg) => parseV1TransactionArgument(arg))
            }
          };
        case "MergeCoins": {
          return {
            MergeCoins: {
              destination: parseV1TransactionArgument(transaction.destination),
              sources: transaction.sources.map((arg) => parseV1TransactionArgument(arg))
            }
          };
        }
        case "MoveCall": {
          const [pkg, mod, fn] = transaction.target.split("::");
          return {
            MoveCall: {
              package: pkg,
              module: mod,
              function: fn,
              typeArguments: transaction.typeArguments,
              arguments: transaction.arguments.map((arg) => parseV1TransactionArgument(arg))
            }
          };
        }
        case "Publish": {
          return {
            Publish: {
              modules: transaction.modules.map((mod) => (0, import_bcs.toBase64)(Uint8Array.from(mod))),
              dependencies: transaction.dependencies
            }
          };
        }
        case "SplitCoins": {
          return {
            SplitCoins: {
              coin: parseV1TransactionArgument(transaction.coin),
              amounts: transaction.amounts.map((arg) => parseV1TransactionArgument(arg))
            }
          };
        }
        case "TransferObjects": {
          return {
            TransferObjects: {
              objects: transaction.objects.map((arg) => parseV1TransactionArgument(arg)),
              address: parseV1TransactionArgument(transaction.address)
            }
          };
        }
        case "Upgrade": {
          return {
            Upgrade: {
              modules: transaction.modules.map((mod) => (0, import_bcs.toBase64)(Uint8Array.from(mod))),
              dependencies: transaction.dependencies,
              package: transaction.packageId,
              ticket: parseV1TransactionArgument(transaction.ticket)
            }
          };
        }
      }
      throw new Error(`Unknown transaction ${Object.keys(transaction)}`);
    })
  });
}
function parseV1TransactionArgument(arg) {
  switch (arg.kind) {
    case "GasCoin": {
      return { GasCoin: true };
    }
    case "Result":
      return { Result: arg.index };
    case "NestedResult": {
      return { NestedResult: [arg.index, arg.resultIndex] };
    }
    case "Input": {
      return { Input: arg.index };
    }
  }
}
//# sourceMappingURL=v1.js.map
