import BigNumber from "bignumber.js";

import { formatAmount } from "@/utils/formatters";
import { Grid, Box, Typography, Theme, Tooltip, SxProps } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

export enum PortfolioTypes {
  value,
  percentage,
  locked,
}

interface PortfolioEntryProps {
  label: string;
  value: BigNumber | number;
  type: PortfolioTypes;
  hint?: string;
}

export interface PortfolioBalanceProps {
  sx?: SxProps<Theme>;
  balances: PortfolioEntryProps[];
}

const containerStyle = (theme: Theme) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    rowGap: 2,
    justifyContent: "flex-start",
  },
});

const iconStyle = (theme: Theme) => ({
  color: "secondary.pearl",
  width: "1.25rem",
  height: "1.25rem",
  marginLeft: theme.spacing(1),
});

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({
  label,
  value,
  type,
  hint,
}) => {
  const valueText = {
    [PortfolioTypes.value]: formatAmount(value),
    [PortfolioTypes.percentage]: `${formatAmount(value)}%`,
    [PortfolioTypes.locked]: `$${formatAmount(value, 1)}`,
  }[type];

  return (
    <Grid item display="flex" flexDirection="column" sm={2} xs={5}>
      <Typography variant="caption" color="secondary.pearl">
        {label}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h3" fontWeight="bold" color="secondary.pearl">
          {valueText}
        </Typography>
        {hint && (
          <Tooltip title={hint} arrow>
            <InfoRoundedIcon sx={iconStyle} />
          </Tooltip>
        )}
      </Box>
    </Grid>
  );
};

export const PortfolioBalance: React.FC<PortfolioBalanceProps> = ({
  sx = [],
  balances,
}) => {
  const calculatedStyle = [containerStyle, ...(Array.isArray(sx) ? sx : [sx])];

  return (
    <Grid sx={calculatedStyle} container justifyContent="space-between">
      {balances.map((config) => (
        <PortfolioEntry {...config} key={config.label + config.value} />
      ))}
    </Grid>
  );
};
