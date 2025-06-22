import { isSerializedBcs } from "@mysten/bcs";
import { bcs } from "../bcs/index.js";
import { pureBcsSchemaFromTypeName } from "../bcs/pure.js";
function createPure(makePure) {
  function pure(typeOrSerializedValue, value) {
    if (typeof typeOrSerializedValue === "string") {
      return makePure(pureBcsSchemaFromTypeName(typeOrSerializedValue).serialize(value));
    }
    if (typeOrSerializedValue instanceof Uint8Array || isSerializedBcs(typeOrSerializedValue)) {
      return makePure(typeOrSerializedValue);
    }
    throw new Error("tx.pure must be called either a bcs type name, or a serialized bcs value");
  }
  pure.u8 = (value) => makePure(bcs.U8.serialize(value));
  pure.u16 = (value) => makePure(bcs.U16.serialize(value));
  pure.u32 = (value) => makePure(bcs.U32.serialize(value));
  pure.u64 = (value) => makePure(bcs.U64.serialize(value));
  pure.u128 = (value) => makePure(bcs.U128.serialize(value));
  pure.u256 = (value) => makePure(bcs.U256.serialize(value));
  pure.bool = (value) => makePure(bcs.Bool.serialize(value));
  pure.string = (value) => makePure(bcs.String.serialize(value));
  pure.address = (value) => makePure(bcs.Address.serialize(value));
  pure.id = pure.address;
  pure.vector = (type, value) => {
    return makePure(
      bcs.vector(pureBcsSchemaFromTypeName(type)).serialize(value)
    );
  };
  pure.option = (type, value) => {
    return makePure(bcs.option(pureBcsSchemaFromTypeName(type)).serialize(value));
  };
  return pure;
}
export {
  createPure
};
//# sourceMappingURL=pure.js.map
