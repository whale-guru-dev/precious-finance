import React from "react";
import BigNumber from "bignumber.js";
import { Card, Container, Divider, Theme, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { formatAmount } from "@/utils/formatters";
import { Button } from "../Atoms";

export interface RewardsProps {
  earned: BigNumber | number;
  magic: BigNumber | number;
  govMagic: BigNumber | number;
  onClaimAllClick: () => void;
}

interface RewardLine {
  label: string;
  value: BigNumber | number;
  summary?: boolean;
}

const containerStyle = (theme: Theme) => ({
  my: "3.5rem",
  px: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
});

const contentStyle = (theme: Theme) =>
  ({
    display: "flex",
    flexDirection: "column",
    padding: "3rem",
    border: 1,
    borderColor: "transparent",
    backgroundColor: "backdrop.cardsclaim",
    [theme.breakpoints.down("sm")]: {
      padding: "1.25rem",
    },
    "& > .MuiDivider-root": {
      margin: "1.5rem 0",
    },
    "& > .MuiTypography-root": {
      mb: "1.5rem",
    },
  } as const);

const lineStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
};

const claimButtonStyle = {
  alignSelf: "center",
  mt: "2rem",
  px: "3.5rem",
};

export const RewardLine: React.FC<RewardLine> = ({
  label,
  value,
  summary = false,
}) => {
  return (
    <Box sx={lineStyle}>
      <Typography variant="body3" color="secondary.pearl">
        {label}
      </Typography>
      <Typography
        variant={summary ? "h4" : "body3"}
        fontWeight={summary ? "bold" : "normal"}
        color="secondary.pearl"
      >
        ${formatAmount(value)}
      </Typography>
    </Box>
  );
};

export const Rewards: React.FC<RewardsProps> = ({
  earned,
  magic,
  govMagic,
  onClaimAllClick,
}) => {
  const claimAllDisabled = !earned && !magic && !govMagic;

  return (
    <Container sx={containerStyle} maxWidth="md" disableGutters>
      <Card
        sx={[
          contentStyle,
          { borderColor: !claimAllDisabled ? "primary.gold" : "transparent" },
        ]}
      >
        <Typography variant="h3" fontWeight="bold">
          Rewards
        </Typography>

        <RewardLine label="Earned (USD)" value={earned} summary />
        <Divider />
        <RewardLine label="Magic" value={magic} />
        <RewardLine label="govMagic" value={govMagic} />

        <Button
          sx={claimButtonStyle}
          variant="contained"
          disabled={claimAllDisabled}
          onClick={onClaimAllClick}
        >
          Claim all
        </Button>
      </Card>
    </Container>
  );
};
