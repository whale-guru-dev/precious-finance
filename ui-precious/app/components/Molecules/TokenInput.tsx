import React, { useEffect, useState } from "react";

import { TokenId } from "@/defi/types";
import { InputProps, Input } from "../Atoms";
import { getToken } from "@/defi/Tokens";
import BigNumber from "bignumber.js";
import { formatAmount, formatOperation } from "@/utils/formatters";
import { TokenOperations } from "@/types/tokenOperations";

export interface TokenInputProps extends Omit<InputProps, "onChange"> {
  tokenId1: TokenId;
  tokenId2?: TokenId;
  value: BigNumber | number;
  balance: BigNumber | number;
  operation: TokenOperations;
  helperText?: string;
  error?: boolean;
  onChange?: (value: BigNumber | number) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  tokenId1,
  tokenId2,
  value,
  balance,
  operation,
  helperText = "",
  error = false,
  onChange = () => {},
  ...rest
}) => {
  const [calculatedValue, setCalculatedValue] = useState(value);
  const token1 = getToken(tokenId1);
  const token2 = tokenId2 ? getToken(tokenId2) : null;
  const refText =
    operation === TokenOperations.unstake || !tokenId2 ? token1.label : "";
  const icons =
    operation === TokenOperations.unstake || !token2
      ? [token1.icon]
      : [token1.icon, token2.icon];
  const defaultSymbol = !token2
    ? token1.label
    : `${token1.label}/${token2!.label}`;
  const unstakeSymbol = token2?.label ? token2.label : token1.label;
  const symbols =
    TokenOperations.unstake === operation ? unstakeSymbol : defaultSymbol;
  const label = `Amount of ${symbols} to ${formatOperation(operation, token2?.label)}`;

  useEffect(() => setCalculatedValue(value), [value]);

  const handleMaxClick = () => {
    setCalculatedValue(balance);
    onChange(balance);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;
    setCalculatedValue(newValue);
    onChange(newValue);
  };

  return (
    <Input
      referenceText={refText}
      buttonLabel="Max"
      icons={icons}
      value={calculatedValue}
      helperText={error ? helperText : " "}
      LabelProps={{
        label,
        BalanceProps: {
          balance: formatAmount(balance),
          BalanceTypographyProps: {},
        },
      }}
      ButtonProps={{
        onClick: handleMaxClick,
      }}
      onChange={handleAmountChange}
      {...rest}
    />
  );
};
