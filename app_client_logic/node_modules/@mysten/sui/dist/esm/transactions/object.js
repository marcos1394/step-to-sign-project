function createObjectMethods(makeObject) {
  function object(value) {
    return makeObject(value);
  }
  object.system = () => object("0x5");
  object.clock = () => object("0x6");
  object.random = () => object("0x8");
  object.denyList = () => object("0x403");
  object.option = ({ type, value }) => (tx) => tx.moveCall({
    typeArguments: [type],
    target: `0x1::option::${value === null ? "none" : "some"}`,
    arguments: value === null ? [] : [tx.object(value)]
  });
  return object;
}
export {
  createObjectMethods
};
//# sourceMappingURL=object.js.map
