import React from "react";
import { Box, Theme, Typography, useTheme } from "@mui/material";

import { formatAmount } from "@/utils/formatters";
import BigNumber from "bignumber.js";
import { Button } from "../Atoms";

export type ClaimBoxProps = {
  label: string;
  value: BigNumber | number;
};

export type ClaimFormProps = {
  claimable: BigNumber | number;
  deposits: BigNumber | number;
  onClick: () => void;
};

const claimBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "backdrop.toasts",
  padding: "1.25rem",
  width: "100%",
  borderRadius: 1,
  gap: 1,
};

const claimContainerStyle = (theme: Theme) => ({
  display: "grid",
  mt: theme.spacing(10),
  mb: theme.spacing(15),
  mx: "auto",
  gap: 2.5,
  maxWidth: "30rem",
  [theme.breakpoints.down("md")]: {
    mt: theme.spacing(5),
    mb: theme.spacing(10),
  },
});

const boxContainerStyle = (theme: Theme) =>
  ({
    display: "flex",
    flexDirection: "row",
    gap: 2,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  } as const);

export const ClaimBox: React.FC<ClaimBoxProps> = ({ label, value }) => {
  const theme = useTheme();

  return (
    <Box sx={claimBoxStyle}>
      <Typography variant="body1" component="h1">
        {label}
      </Typography>
      <Typography
        variant="body1"
        component="h1"
        color={theme.palette.common.white}
      >
        {`$${formatAmount(value)}`}
      </Typography>
    </Box>
  );
};

export const ClaimForm: React.FC<ClaimFormProps> = ({
  claimable,
  deposits,
  onClick,
}) => {
  return (
    <Box sx={claimContainerStyle}>
      <Box sx={boxContainerStyle}>
        <ClaimBox label="Total Claimable" value={claimable} />
        <ClaimBox label="Total Deposits" value={deposits} />
      </Box>
      <Button
        variant="contained"
        onClick={onClick}
        fullWidth
        disabled={claimable <= 0}
      >
        Claim
      </Button>
    </Box>
  );
};
