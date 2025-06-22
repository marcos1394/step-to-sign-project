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
var faucet_exports = {};
__export(faucet_exports, {
  FaucetRateLimitError: () => FaucetRateLimitError,
  getFaucetHost: () => getFaucetHost,
  getFaucetRequestStatus: () => getFaucetRequestStatus,
  requestSuiFromFaucetV0: () => requestSuiFromFaucetV0,
  requestSuiFromFaucetV1: () => requestSuiFromFaucetV1,
  requestSuiFromFaucetV2: () => requestSuiFromFaucetV2
});
module.exports = __toCommonJS(faucet_exports);
class FaucetRateLimitError extends Error {
}
async function faucetRequest({ host, path, body, headers, method }) {
  const endpoint = new URL(path, host).toString();
  const res = await fetch(endpoint, {
    method,
    body: body ? JSON.stringify(body) : void 0,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
  if (res.status === 429) {
    throw new FaucetRateLimitError(
      `Too many requests from this client have been sent to the faucet. Please retry later`
    );
  }
  try {
    const parsed = await res.json();
    return parsed;
  } catch (e) {
    throw new Error(
      `Encountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`
    );
  }
}
async function requestSuiFromFaucetV0(input) {
  const response = await faucetRequest({
    host: input.host,
    path: "/gas",
    body: {
      FixedAmountRequest: {
        recipient: input.recipient
      }
    },
    headers: input.headers,
    method: "POST"
  });
  if (response.error) {
    throw new Error(`Faucet request failed: ${response.error}`);
  }
  return response;
}
async function requestSuiFromFaucetV1(input) {
  const response = await faucetRequest({
    host: input.host,
    path: "/v1/gas",
    body: {
      FixedAmountRequest: {
        recipient: input.recipient
      }
    },
    headers: input.headers,
    method: "POST"
  });
  if (response.error) {
    throw new Error(`Faucet request failed: ${response.error}`);
  }
  return response;
}
async function requestSuiFromFaucetV2(input) {
  const response = await faucetRequest({
    host: input.host,
    path: "/v2/gas",
    body: {
      FixedAmountRequest: {
        recipient: input.recipient
      }
    },
    headers: input.headers,
    method: "POST"
  });
  if (response.status !== "Success") {
    throw new Error(`Faucet request failed: ${response.status.Failure.internal}`);
  }
  return response;
}
async function getFaucetRequestStatus(input) {
  const response = await faucetRequest({
    host: input.host,
    path: `/v1/status/${input.taskId}`,
    headers: input.headers,
    method: "GET"
  });
  if (response.error) {
    throw new Error(`Faucet request failed: ${response.error}`);
  }
  return response;
}
function getFaucetHost(network) {
  switch (network) {
    case "testnet":
      return "https://faucet.testnet.sui.io";
    case "devnet":
      return "https://faucet.devnet.sui.io";
    case "localnet":
      return "http://127.0.0.1:9123";
    default:
      throw new Error(`Unknown network: ${network}`);
  }
}
//# sourceMappingURL=faucet.js.map
