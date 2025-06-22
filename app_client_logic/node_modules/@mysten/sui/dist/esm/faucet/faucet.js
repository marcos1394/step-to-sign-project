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
export {
  FaucetRateLimitError,
  getFaucetHost,
  getFaucetRequestStatus,
  requestSuiFromFaucetV0,
  requestSuiFromFaucetV1,
  requestSuiFromFaucetV2
};
//# sourceMappingURL=faucet.js.map
