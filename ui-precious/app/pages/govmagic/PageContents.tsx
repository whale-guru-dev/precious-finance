import { useState } from "react";
import { Card, Container, Theme, Typography } from "@mui/material";

import { Links, Tabs } from "@/components";
import { TokenOperations } from "@/types/tokenOperations";
import TabItem from "./TabItem";
import PortfolioBalance from "./PortfolioBalance";
import { useStore } from "@/stores/root";
import { getIsInputPopulated } from "@/stores/defi/govMagic";

const containerStyle = (theme: Theme) => ({
  my: theme.spacing(7),
  maxWidth: "lg",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "md",
  },
  [theme.breakpoints.down("md")]: {
    px: 0,
  },
});

const contentStyle = (theme: Theme) => ({
  mx: theme.spacing(4),
  padding: theme.spacing(6),
  border: "1px solid transparent",
  backgroundColor: "backdrop.cardsgovmagic",
  [theme.breakpoints.down("xl")]: {
    mx: 0,
  },
  [theme.breakpoints.down("md")]: {
    mx: 0,
    padding: theme.spacing(2.5),
  },
});

const tabsStyle = (theme: Theme) => ({
  mt: theme.spacing(7),
  [theme.breakpoints.down("xl")]: {
    mt: theme.spacing(5),
  },
});

const tabItems = [{ label: "Stake" }, { label: "Unstake" }];

const PageContents = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const inputPopulated = useStore(getIsInputPopulated);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={containerStyle}>
      <Card
        sx={[
          contentStyle,
          { borderColor: inputPopulated ? "primary.gold" : "transparent" },
        ]}
      >
        <Typography variant="h3" fontWeight="bold">
          GovMagic
        </Typography>

        <PortfolioBalance />

        <Tabs
          sx={tabsStyle}
          items={tabItems}
          value={tabIndex}
          onChange={handleTabChange}
        />
        {tabIndex === 0 && <TabItem operation={TokenOperations.stake} />}
        {tabIndex === 1 && <TabItem operation={TokenOperations.unstake} />}

        <Links />
      </Card>
    </Container>
  );
};

export default PageContents;
