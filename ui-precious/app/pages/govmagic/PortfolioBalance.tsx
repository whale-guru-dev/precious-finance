import { Theme } from "@mui/material";

import {
  PortfolioBalance as UIPortfolioBalance,
  PortfolioTypes,
} from "@/components";
import { useStore } from "@/stores/root";
import { Portfolio } from "@/stores/defi/types";

const portfolioBalanceStyle = (theme: Theme) => ({
  mt: theme.spacing(4),
});

const balances = (portfolio: Portfolio) => [
  {
    label: "Earned Magic",
    value: portfolio.earnedMagic,
    type: PortfolioTypes.value,
  },
  {
    label: "Earned govMagic",
    value: portfolio.earnedGovMagic,
    type: PortfolioTypes.value,
  },
  {
    label: "stMagic staked",
    value: portfolio.stakedStMagic,
    type: PortfolioTypes.value,
  },
  {
    label: "vAPR",
    value: portfolio.vApr,
    type: PortfolioTypes.percentage,
    hint: "Variable Annual Percentage Rate",
  },
  {
    label: "TVL",
    value: portfolio.tvl,
    type: PortfolioTypes.locked,
  },
];

const PortfolioBalance = () => {
  const portfolio = useStore(({ govmagic }) => govmagic.portfolio);

  return (
    <UIPortfolioBalance
      sx={portfolioBalanceStyle}
      balances={balances(portfolio)}
    />
  );
};

export default PortfolioBalance;
