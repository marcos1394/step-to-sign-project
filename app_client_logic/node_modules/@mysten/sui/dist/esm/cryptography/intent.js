import { bcs } from "../bcs/index.js";
function messageWithIntent(scope, message) {
  return bcs.IntentMessage(bcs.fixedArray(message.length, bcs.u8())).serialize({
    intent: {
      scope: { [scope]: true },
      version: { V0: true },
      appId: { Sui: true }
    },
    value: message
  }).toBytes();
}
export {
  messageWithIntent
};
//# sourceMappingURL=intent.js.map
