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
var CoinWithBalance_exports = {};
__export(CoinWithBalance_exports, {
  coinWithBalance: () => coinWithBalance,
  getSuiClient: () => getSuiClient
});
module.exports = __toCommonJS(CoinWithBalance_exports);
var import_valibot = require("valibot");
var import_bcs = require("../../bcs/index.js");
var import_sui_types = require("../../utils/sui-types.js");
var import_Commands = require("../Commands.js");
var import_Inputs = require("../Inputs.js");
var import_resolve = require("../resolve.js");
const COIN_WITH_BALANCE = "CoinWithBalance";
const SUI_TYPE = (0, import_sui_types.normalizeStructTag)("0x2::sui::SUI");
function coinWithBalance({
  type = SUI_TYPE,
  balance,
  useGasCoin = true
}) {
  let coinResult = null;
  return (tx) => {
    if (coinResult) {
      return coinResult;
    }
    tx.addIntentResolver(COIN_WITH_BALANCE, resolveCoinBalance);
    const coinType = type === "gas" ? type : (0, import_sui_types.normalizeStructTag)(type);
    coinResult = tx.add(
      import_Commands.Commands.Intent({
        name: COIN_WITH_BALANCE,
        inputs: {},
        data: {
          type: coinType === SUI_TYPE && useGasCoin ? "gas" : coinType,
          balance: BigInt(balance)
        }
      })
    );
    return coinResult;
  };
}
const CoinWithBalanceData = (0, import_valibot.object)({
  type: (0, import_valibot.string)(),
  balance: (0, import_valibot.bigint)()
});
async function resolveCoinBalance(transactionData, buildOptions, next) {
  const coinTypes = /* @__PURE__ */ new Set();
  const totalByType = /* @__PURE__ */ new Map();
  if (!transactionData.sender) {
    throw new Error("Sender must be set to resolve CoinWithBalance");
  }
  for (const command of transactionData.commands) {
    if (command.$kind === "$Intent" && command.$Intent.name === COIN_WITH_BALANCE) {
      const { type, balance } = (0, import_valibot.parse)(CoinWithBalanceData, command.$Intent.data);
      if (type !== "gas" && balance > 0n) {
        coinTypes.add(type);
      }
      totalByType.set(type, (totalByType.get(type) ?? 0n) + balance);
    }
  }
  const usedIds = /* @__PURE__ */ new Set();
  for (const input of transactionData.inputs) {
    if (input.Object?.ImmOrOwnedObject) {
      usedIds.add(input.Object.ImmOrOwnedObject.objectId);
    }
    if (input.UnresolvedObject?.objectId) {
      usedIds.add(input.UnresolvedObject.objectId);
    }
  }
  const coinsByType = /* @__PURE__ */ new Map();
  const client = getSuiClient(buildOptions);
  await Promise.all(
    [...coinTypes].map(async (coinType) => {
      coinsByType.set(
        coinType,
        await getCoinsOfType({
          coinType,
          balance: totalByType.get(coinType),
          client,
          owner: transactionData.sender,
          usedIds
        })
      );
    })
  );
  const mergedCoins = /* @__PURE__ */ new Map();
  mergedCoins.set("gas", { $kind: "GasCoin", GasCoin: true });
  for (const [index, transaction] of transactionData.commands.entries()) {
    if (transaction.$kind !== "$Intent" || transaction.$Intent.name !== COIN_WITH_BALANCE) {
      continue;
    }
    const { type, balance } = transaction.$Intent.data;
    if (balance === 0n && type !== "gas") {
      transactionData.replaceCommand(
        index,
        import_Commands.Commands.MoveCall({ target: "0x2::coin::zero", typeArguments: [type] })
      );
      continue;
    }
    const commands = [];
    if (!mergedCoins.has(type)) {
      const [first, ...rest] = coinsByType.get(type).map(
        (coin) => transactionData.addInput(
          "object",
          import_Inputs.Inputs.ObjectRef({
            objectId: coin.coinObjectId,
            digest: coin.digest,
            version: coin.version
          })
        )
      );
      if (rest.length > 0) {
        commands.push(import_Commands.Commands.MergeCoins(first, rest));
      }
      mergedCoins.set(type, first);
    }
    commands.push(
      import_Commands.Commands.SplitCoins(mergedCoins.get(type), [
        transactionData.addInput("pure", import_Inputs.Inputs.Pure(import_bcs.bcs.u64().serialize(balance)))
      ])
    );
    transactionData.replaceCommand(index, commands);
    transactionData.mapArguments((arg) => {
      if (arg.$kind === "Result" && arg.Result === index) {
        return {
          $kind: "NestedResult",
          NestedResult: [index + commands.length - 1, 0]
        };
      }
      return arg;
    });
  }
  return next();
}
async function getCoinsOfType({
  coinType,
  balance,
  client,
  owner,
  usedIds
}) {
  let remainingBalance = balance;
  const coins = [];
  return loadMoreCoins();
  async function loadMoreCoins(cursor = null) {
    const { data, hasNextPage, nextCursor } = await client.getCoins({ owner, coinType, cursor });
    const sortedCoins = data.sort((a, b) => Number(BigInt(b.balance) - BigInt(a.balance)));
    for (const coin of sortedCoins) {
      if (usedIds.has(coin.coinObjectId)) {
        continue;
      }
      const coinBalance = BigInt(coin.balance);
      coins.push(coin);
      remainingBalance -= coinBalance;
      if (remainingBalance <= 0) {
        return coins;
      }
    }
    if (hasNextPage) {
      return loadMoreCoins(nextCursor);
    }
    throw new Error(`Not enough coins of type ${coinType} to satisfy requested balance`);
  }
}
function getSuiClient(options) {
  const client = (0, import_resolve.getClient)(options);
  if (!client.jsonRpc) {
    throw new Error(`CoinWithBalance intent currently only works with SuiClient`);
  }
  return client;
}
//# sourceMappingURL=CoinWithBalance.js.map
