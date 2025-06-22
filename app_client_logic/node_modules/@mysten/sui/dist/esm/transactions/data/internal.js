import {
  array,
  boolean,
  check,
  integer,
  lazy,
  literal,
  nullable,
  nullish,
  number,
  object,
  optional,
  pipe,
  record,
  string,
  transform,
  tuple,
  union,
  unknown
} from "valibot";
import { isValidSuiAddress, normalizeSuiAddress } from "../../utils/sui-types.js";
function safeEnum(options) {
  const unionOptions = Object.entries(options).map(([key, value]) => object({ [key]: value }));
  return pipe(
    union(unionOptions),
    transform((value) => ({
      ...value,
      $kind: Object.keys(value)[0]
    }))
  );
}
const SuiAddress = pipe(
  string(),
  transform((value) => normalizeSuiAddress(value)),
  check(isValidSuiAddress)
);
const ObjectID = SuiAddress;
const BCSBytes = string();
const JsonU64 = pipe(
  union([string(), pipe(number(), integer())]),
  check((val) => {
    try {
      BigInt(val);
      return BigInt(val) >= 0 && BigInt(val) <= 18446744073709551615n;
    } catch {
      return false;
    }
  }, "Invalid u64")
);
const ObjectRef = object({
  objectId: SuiAddress,
  version: JsonU64,
  digest: string()
});
const Argument = pipe(
  union([
    object({ GasCoin: literal(true) }),
    object({ Input: pipe(number(), integer()), type: optional(literal("pure")) }),
    object({ Input: pipe(number(), integer()), type: optional(literal("object")) }),
    object({ Result: pipe(number(), integer()) }),
    object({ NestedResult: tuple([pipe(number(), integer()), pipe(number(), integer())]) })
  ]),
  transform((value) => ({
    ...value,
    $kind: Object.keys(value)[0]
  }))
  // Defined manually to add `type?: 'pure' | 'object'` to Input
);
const GasData = object({
  budget: nullable(JsonU64),
  price: nullable(JsonU64),
  owner: nullable(SuiAddress),
  payment: nullable(array(ObjectRef))
});
const StructTag = object({
  address: string(),
  module: string(),
  name: string(),
  // type_params in rust, should be updated to use camelCase
  typeParams: array(string())
});
const OpenMoveTypeSignatureBody = union([
  literal("address"),
  literal("bool"),
  literal("u8"),
  literal("u16"),
  literal("u32"),
  literal("u64"),
  literal("u128"),
  literal("u256"),
  object({ vector: lazy(() => OpenMoveTypeSignatureBody) }),
  object({
    datatype: object({
      package: string(),
      module: string(),
      type: string(),
      typeParameters: array(lazy(() => OpenMoveTypeSignatureBody))
    })
  }),
  object({ typeParameter: pipe(number(), integer()) })
]);
const OpenMoveTypeSignature = object({
  ref: nullable(union([literal("&"), literal("&mut")])),
  body: OpenMoveTypeSignatureBody
});
const ProgrammableMoveCall = object({
  package: ObjectID,
  module: string(),
  function: string(),
  // snake case in rust
  typeArguments: array(string()),
  arguments: array(Argument),
  _argumentTypes: optional(nullable(array(OpenMoveTypeSignature)))
});
const $Intent = object({
  name: string(),
  inputs: record(string(), union([Argument, array(Argument)])),
  data: record(string(), unknown())
});
const Command = safeEnum({
  MoveCall: ProgrammableMoveCall,
  TransferObjects: object({
    objects: array(Argument),
    address: Argument
  }),
  SplitCoins: object({
    coin: Argument,
    amounts: array(Argument)
  }),
  MergeCoins: object({
    destination: Argument,
    sources: array(Argument)
  }),
  Publish: object({
    modules: array(BCSBytes),
    dependencies: array(ObjectID)
  }),
  MakeMoveVec: object({
    type: nullable(string()),
    elements: array(Argument)
  }),
  Upgrade: object({
    modules: array(BCSBytes),
    dependencies: array(ObjectID),
    package: ObjectID,
    ticket: Argument
  }),
  $Intent
});
const ObjectArg = safeEnum({
  ImmOrOwnedObject: ObjectRef,
  SharedObject: object({
    objectId: ObjectID,
    // snake case in rust
    initialSharedVersion: JsonU64,
    mutable: boolean()
  }),
  Receiving: ObjectRef
});
const CallArg = safeEnum({
  Object: ObjectArg,
  Pure: object({
    bytes: BCSBytes
  }),
  UnresolvedPure: object({
    value: unknown()
  }),
  UnresolvedObject: object({
    objectId: ObjectID,
    version: optional(nullable(JsonU64)),
    digest: optional(nullable(string())),
    initialSharedVersion: optional(nullable(JsonU64))
  })
});
const NormalizedCallArg = safeEnum({
  Object: ObjectArg,
  Pure: object({
    bytes: BCSBytes
  })
});
const TransactionExpiration = safeEnum({
  None: literal(true),
  Epoch: JsonU64
});
const TransactionData = object({
  version: literal(2),
  sender: nullish(SuiAddress),
  expiration: nullish(TransactionExpiration),
  gasData: GasData,
  inputs: array(CallArg),
  commands: array(Command)
});
export {
  $Intent,
  Argument,
  BCSBytes,
  Command,
  GasData,
  JsonU64,
  NormalizedCallArg,
  ObjectArg,
  ObjectID,
  ObjectRef,
  OpenMoveTypeSignature,
  OpenMoveTypeSignatureBody,
  StructTag,
  SuiAddress,
  TransactionData,
  TransactionExpiration,
  safeEnum
};
//# sourceMappingURL=internal.js.map
