import { createObjectMethods } from "./object.js";
import { createPure } from "./pure.js";
const Arguments = {
  pure: createPure((value) => (tx) => tx.pure(value)),
  object: createObjectMethods((value) => (tx) => tx.object(value)),
  sharedObjectRef: (...args) => (tx) => tx.sharedObjectRef(...args),
  objectRef: (...args) => (tx) => tx.objectRef(...args),
  receivingRef: (...args) => (tx) => tx.receivingRef(...args)
};
export {
  Arguments
};
//# sourceMappingURL=Arguments.js.map
