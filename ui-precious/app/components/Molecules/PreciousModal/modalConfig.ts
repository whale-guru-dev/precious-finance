import BigNumber from "bignumber.js";

import { ExtendedOperations, TokenOperations } from "@/types/tokenOperations";
import { formatAmount } from "@/utils/formatters";

export enum ModalVariants {
  confirmPermission = "confirmPermission",
  confirmTransaction = "confirmTransaction",
  approve = "approve",
  success = "success",
}

export interface TokenConfig {
  token1: string | null;
  token2: string | null;
  value1?: BigNumber | number;
  value2?: BigNumber | number;
}

export const staticCaptions = {
  [ModalVariants.confirmPermission]: "Confirm the permission in your wallet",
  [ModalVariants.confirmTransaction]: "Confirm this transaction in your wallet",
  [ModalVariants.approve]: null,
  [ModalVariants.success]: null,
};

export const staticTitles = {
  [ModalVariants.confirmPermission]: "Confirm permission",
  [ModalVariants.confirmTransaction]: "Confirm transaction",
  [ModalVariants.approve]: null,
  [ModalVariants.success]: "Transaction successful",
};

const formatTokens = (token1: string | null, token2: string | null) => {
  return token1 && token2 ? `${token1}/${token2}` : token1;
};

export const titles = {
  [TokenOperations.convertAndStake]: ({ token1, token2 }: TokenConfig) =>
    `${token1} to ${token2} and stake`,
  [TokenOperations.convert]: ({ token1, token2 }: TokenConfig) =>
    `${token1} to ${token2}`,
  [TokenOperations.stake]: ({ token1 }: TokenConfig) => `Stake ${token1}`,
  [TokenOperations.unstake]: ({ token1 }: TokenConfig) => `Unstake ${token1}`,
  [ExtendedOperations.claim]: () => null,
  [ExtendedOperations.liquidity]: () => "Provide liquidity",
};

export const subtitles = {
  [TokenOperations.convertAndStake]: ({
    value1,
    value2,
    token1,
    token2,
  }: TokenConfig) =>
    `Converting & Staking ${formatAmount(value1!)} ${token1} to ${formatAmount(
      value2!
    )} ${token2}`,
  [TokenOperations.convert]: ({
    value1,
    value2,
    token1,
    token2,
  }: TokenConfig) =>
    `Convert ${formatAmount(value1!)} ${token1} to ${formatAmount(
      value2!
    )} ${token2}`,
  [TokenOperations.stake]: ({ value1, token1, token2 }: TokenConfig) =>
    `Stake ${formatAmount(value1!)} ${formatTokens(token1, token2)}`,
  [TokenOperations.unstake]: ({ value1, token1, token2 }: TokenConfig) =>
    `Unstake ${formatAmount(value1!)} ${formatTokens(token1, token2)}`,
  [ExtendedOperations.claim]: ({ value1 }: TokenConfig) =>
    `Claim $${formatAmount(value1!)}`,
  [ExtendedOperations.liquidity]: ({ value1, token1, token2 }: TokenConfig) =>
    `Stake ${formatAmount(value1!)} ${formatTokens(token1, token2)}`,
};
