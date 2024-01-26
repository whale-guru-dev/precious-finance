import { Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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

const PortfolioAndText = () => {
  const theme = useTheme();
  const portfolio = useStore(({ magic }) => magic.portfolio);

  return (
    <>
      <UIPortfolioBalance
        sx={portfolioBalanceStyle}
        balances={balances(portfolio)}
      />

      <Typography
        variant="body2"
        color="secondary.pearl"
        mt={theme.spacing(6)}
        textAlign="left"
      >
        IMPORTANT: Converting Magic to stMagic is irreversible. You may stake
        and unstake stMagic, but not convert them back to Magic. <br />
        Secondary markets may however exist to allow the exchange of stMagic to
        Magic
      </Typography>
      <Typography
        variant="body2"
        color="secondary.pearl"
        mt={theme.spacing(6)}
        textAlign="left"
      >
        Explanatory text Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Ut turpis purus, feugiat et efficitur ut, ornare non augue.
        Suspendisse venenatis, urna eu porttitor sodales.
      </Typography>
    </>
  );
};

export default PortfolioAndText;
