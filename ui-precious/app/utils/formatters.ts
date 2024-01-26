import BigNumber from "bignumber.js";

import { TOKENS } from "@/defi/Tokens";
import { TokenId } from "@/defi/types";
import { TokenOperations } from "@/types/tokenOperations";

export const formatAmount = (
  amount: BigNumber | number,
  base: number = 2,
  tokenId?: TokenId
) => {
  const bigNumAmount = new BigNumber(amount);

  const formattedAmount = {
    [1]: bigNumAmount.toFixed(base),
    [+bigNumAmount.isGreaterThan(1000)]: `${bigNumAmount
      .dividedBy(1000)
      .toFixed(base)}k`,
    [+bigNumAmount.isGreaterThan(1000000)]: `${bigNumAmount
      .dividedBy(1000000)
      .toFixed(base)}m`,
  }[1];

  return tokenId
    ? `${formattedAmount} ${TOKENS[tokenId].symbol}`
    : formattedAmount;
};

export const shortenAddress = (address: string | null) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
};

export const formatOperation = (element: string, token2?: string) => {
  return {
    [element]: element,
    [TokenOperations.convert]: `${TokenOperations.convert} to ${
      token2 ? token2 : "stMagic"
    }`,
    [TokenOperations.convertAndStake]: "convert & stake",
  }[element];
};

export const formatConfirmationMessage = ({
  operation,
  tokenId1,
  tokenId2,
  amount1,
  amount2,
}: {
  operation: TokenOperations;
  tokenId1: TokenId;
  tokenId2?: TokenId;
  amount1?: BigNumber | number;
  amount2?: BigNumber | number;
}) => {
  const token1 = TOKENS[tokenId1].label;
  const token2 = tokenId2 && TOKENS[tokenId2].label;
  const amt1 = amount1 ? `${formatAmount(amount1)} ` : "";
  const amt2 = amount2 ? formatAmount(amount2) : "";
  const stakeUnstakeMessage = (operation: string) =>
    `${operation} of ${amt1}${
      tokenId2 ? `${token1}/${token2}` : token1
    } successfull`;
  const convertAndStakeMessage = (operation: string) =>
    `${operation} of ${amt1}${token1} to ${amt2} ${token2} successfull`;

  const formatter = {
    [TokenOperations.stake]: () => stakeUnstakeMessage("Staking"),
    [TokenOperations.unstake]: () => stakeUnstakeMessage("Unstaking"),
    [TokenOperations.convert]: () => convertAndStakeMessage("Converting"),
    [TokenOperations.convertAndStake]: () =>
      convertAndStakeMessage("Converting & Staking"),
  }[operation];

  return formatter();
};
