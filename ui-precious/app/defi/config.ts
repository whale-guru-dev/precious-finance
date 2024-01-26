export const DEFI_CONFIG = {
  networkIds: [1, 137, 42161, 43114, 1285, 250] as const, // important
  tokenIds: [
    "magic",
    "stmagic",
    "govmagic",
    "eth",
    "matic",
    "avax",
    "weth",
    "usdc",
    "dot",
    "uni",
    "ftm",
    "pica",
    "movr",
    "ksm",
    "chaos",
  ] as const, // important
  ammIds: ["uniswap", "sushiswap", "quickiswap"] as const,
};

export const getTokenIconURL = (
  chainId: number, address: string
) => `https://s3.eu-central-1.amazonaws.com/static.chain/tokens/evm/${chainId}/${address}.png`

export const getChainIconURL = (chainId: number) => getTokenIconURL(chainId, "0x0000000000000000000000000000000000000000")

const NATIVE_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ETHERIUM_MAINNET_NETWORK = {
  chainId: 1,
  name: "Mainnet",
  rpcUrl: process.env.RPC_URL_1!,
  nativeToken: {
    address: NATIVE_ADDRESS,
    imageURL: getChainIconURL(1),
    symbol: "ETH",
    decimals: 18,
    crossChainId: "-1",
  },
} as const;

const KOVAN_NETWORK = {
  chainId: 42,
  name: "Kovan",
  rpcUrl: process.env.RPC_URL_42!,
  nativeToken: {
    address: NATIVE_ADDRESS,
    imageURL: getChainIconURL(42),
    symbol: "ETH",
    decimals: 18,
    crossChainId: "-1",
  },
} as const;

const RINKEBY_NETWORK = {
  chainId: 4,
  name: "Rinkeby",
  rpcUrl: process.env.RPC_URL_4!,
  nativeToken: {
    address: NATIVE_ADDRESS,
    imageURL: getChainIconURL(4),
    symbol: "ETH",
    decimals: 18,
    crossChainId: "-1",
  },
} as const;

export const ARBITRUM_NETWORK = {
  chainId: 42161,
    name: "Arbitrum",
    rpcUrl: process.env.RPC_URL_42161!,
    nativeToken: {
      address: NATIVE_ADDRESS,
      imageURL: getChainIconURL(42161),
      symbol: "ETH",
      decimals: 18,
      crossChainId: "-1",
    },
} as const;

export const SUPPORTED_NETWORKS = {
  1: ETHERIUM_MAINNET_NETWORK,
  4: RINKEBY_NETWORK,
  42: KOVAN_NETWORK,
  137: {
    chainId: 137,
    name: "Polygon",
    rpcUrl: process.env.RPC_URL_137!,
    nativeToken: {
      address: NATIVE_ADDRESS,
      imageURL: getChainIconURL(137),
      symbol: "MATIC",
      decimals: 18,
      crossChainId: "-137",
    },
  },
  250: {
    chainId: 250,
    name: "Fantom",
    rpcUrl: process.env.RPC_URL_250!,
    nativeToken: {
      address: NATIVE_ADDRESS,
      imageURL: getChainIconURL(250),
      symbol: "FTM",
      decimals: 18,
      crossChainId: "-250",
    },
  },
  1285: {
    chainId: 1285,
    name: "Moonriver",
    rpcUrl: process.env.RPC_URL_1285!,
    nativeToken: {
      address: NATIVE_ADDRESS,
      imageURL: getChainIconURL(1285),
      symbol: "MOVR",
      decimals: 18,
      crossChainId: "-1285",
    },
  },
  42161: ARBITRUM_NETWORK,
  43114: {
    chainId: 43114,
    name: "Avalanche",
    rpcUrl: process.env.RPC_URL_43114!,
    nativeToken: {
      address: NATIVE_ADDRESS,
      imageURL: getChainIconURL(43114),
      symbol: "AVAX",
      decimals: 8,
      crossChainId: "-43114",
    },
  },
 } as const;

export type SupportedNetworkId = keyof typeof SUPPORTED_NETWORKS;

export type SupportedNetwork = typeof SUPPORTED_NETWORKS[SupportedNetworkId];

export const SUPPORTED_NETWORKS_IDS: Array<SupportedNetworkId> = Object.keys(
  SUPPORTED_NETWORKS
).map(Number) as SupportedNetworkId[];

type SupportedNetworksSubset = Partial<{
  [key in SupportedNetworkId]: SupportedNetwork;
}>

export const TEST_SUPPORTED_NETWORKS: SupportedNetworksSubset = {
  4: RINKEBY_NETWORK,
  42: KOVAN_NETWORK,
  42161: ARBITRUM_NETWORK,
} as const;

export type TestSupportedNetworkId = keyof typeof TEST_SUPPORTED_NETWORKS;

export const TEST_SUPPORTED_NETWORKS_IDS: Array<TestSupportedNetworkId> = Object.keys(
  TEST_SUPPORTED_NETWORKS
).map(Number) as TestSupportedNetworkId[];