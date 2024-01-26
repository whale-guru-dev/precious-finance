import React from "react";
import {
  Typography,
  useTheme,
  TypographyProps,
  Box,
  BoxProps,
} from "@mui/material";
import Image from "next/image";

export type LabelProps = {
  label: string;
  TypographyProps?: TypographyProps;
  BalanceProps?: {
    balance?: string;
    BalanceTypographyProps?: TypographyProps;
  };
} & BoxProps;

export const Label: React.FC<LabelProps> = ({
  label,
  TypographyProps,
  BalanceProps,
  ...boxProps
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={0.5}
      {...boxProps}
    >
      <Typography variant="body3" color="text.secondary" {...TypographyProps}>
        {label}
      </Typography>
      {BalanceProps?.balance && (
        <Box display="flex">
          <Image
            src="/icons/wallet-rounded.svg"
            alt="Wallet logo"
            width="22"
            height="22"
          />
          <Typography
            variant="body3"
            color="text.secondary"
            ml={0.5}
            {...BalanceProps.BalanceTypographyProps}
          >
            {BalanceProps.balance}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
