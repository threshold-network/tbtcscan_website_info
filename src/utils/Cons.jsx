const fallbackProxyBase =
  import.meta.env.MODE === "staging"
    ? "https://threshold-api-staging.ops-keep.workers.dev"
    : "https://api.threshold.network";

const SUBGRAPH_PROXY_BASE = (
  import.meta.env.VITE_SUBGRAPH_PROXY_BASE ?? fallbackProxyBase
).replace(/\/$/, "");

export const MAINNET_API =
  import.meta.env.VITE_SUBGRAPH_PROXY_MAINNET ??
  `${SUBGRAPH_PROXY_BASE}/subgraph/mainnet`;
export const TESTNET_API =
  import.meta.env.VITE_SUBGRAPH_PROXY_TESTNET ??
  `${SUBGRAPH_PROXY_BASE}/subgraph/testnet`;

export const RPC_ETH_MAINNET = import.meta.env.VITE_RPC_ETH_MAINNET;
export const RPC_ETH_GOERLI = "https://eth-goerli.g.alchemy.com/v2/BS3qcnNmATIAa9rI7xFMmpyB-RHg_dAm"

export const MAINNET_AP_BALANCE = import.meta.env.VITE_MAINNET_AP_BALANCE;
export const GOERLI_API_BALANCE =
    "https://api-goerli.etherscan.io/api?module=account&action=balance&tag=latest&apikey=BIRHCE1D6MEMBR9UN4QJSTNJ5WV58YH12Y&address=";

export const DECIMAL_ETH = 1000000000000000000;
export const SATOSHI_BITCOIN = 100000000;
export const NETWORK_MAINNET = "mainnet";
export const NETWORK_TESTNET = "testnet";
export const DEFAULT_NETWORK = NETWORK_MAINNET;
export const MAXIMUM_BATCH_SIZE = 1000;

export const TIME_LOCK_DEAUTHORIZATION = 45 * 24 * 60 * 60;//45 days

export const GROUP_LIFE_TIME = 259200; //~30days
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export default MAINNET_API;
