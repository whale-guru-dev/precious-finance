import { DEFI_CONFIG } from "./config";
import { Token, TokenId } from "./types";

export const TOKEN_IDS = DEFI_CONFIG.tokenIds;
export const TOKENS: { [key in TokenId]: Token } = {
  magic: {
    id: "magic",
    icon: "/tokens/magic.svg",
    symbol: "MAGIC",
    label: "Magic",
  },
  stmagic: {
    id: "stmagic",
    icon: "/tokens/stmagic.svg",
    symbol: "STMAGIC",
    label: "stMagic",
  },
  govmagic: {
    id: "govmagic",
    icon: "/tokens/govmagic.svg",
    symbol: "GOVMAGIC",
    label: "govMagic",
  },
  eth: {
    id: "eth",
    icon: "/tokens/eth-mainnet.svg",
    symbol: "ETH",
    label: "Eth",
  },
  matic: {
    id: "matic",
    icon: "/tokens/polygon-matic.svg",
    symbol: "MATIC",
    label: "Matic",
  },
  avax: {
    id: "avax",
    icon: "/tokens/avalanche.svg",
    symbol: "AVAX",
    label: "Avax",
  },
  weth: {
    id: "weth",
    icon: "/tokens/weth-mainnet.svg",
    symbol: "wETH",
    label: "wEth",
  },
  usdc: {
    id: "usdc",
    icon: "/tokens/usd-coin-usdc.svg",
    symbol: "USDC",
    label: "USDC",
  },
  dot: {
    id: "dot",
    icon: "/tokens/polkadot.svg",
    symbol: "DOT",
    label: "DOT",
  },
  uni: {
    id: "uni",
    icon: "/tokens/uniswap.svg",
    symbol: "UNI",
    label: "UNI",
  },
  ftm: {
    id: "ftm",
    icon: "/tokens/fantom.svg",
    symbol: "FTM",
    label: "FTM",
  },
  pica: {
    id: "pica",
    icon: "/tokens/picasso.svg",
    symbol: "PICA",
    label: "PICA",
  },
  movr: {
    id: "movr",
    icon: "/tokens/movr.svg",
    symbol: "MOVR",
    label: "MOVR",
  },
  ksm: {
    id: "ksm",
    icon: "/tokens/dotsama-kusama.svg",
    symbol: "KSM",
    label: "KSM",
  },
  chaos: {
    id: "chaos",
    icon: "/tokens/chaos.svg",
    symbol: "CHAOS",
    label: "CHAOS",
  },
};
export const getToken = (tokenId: TokenId): Token => TOKENS[tokenId];
