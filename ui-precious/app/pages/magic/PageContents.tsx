import { useState, VoidFunctionComponent } from "react";
import { Box, Card, Container, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Links, SwitchButton, Tabs } from "@/components";
import { TokenOperations } from "@/types/tokenOperations";
import TabItem from "./TabItem";
import PortfolioAndText from "./PortfolioAndText";
import { useStore } from "@/stores/root";
import { useMobile } from "@/hooks/responsive";
import { getIsInputPopulated } from "@/stores/defi/magic";

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
  [theme.breakpoints.down("xl")]: {
    mx: 0,
  },
  [theme.breakpoints.down("md")]: {
    mx: 0,
    padding: theme.spacing(2.5),
  },
});

const advancedStyle = (theme: Theme) => ({
  borderTop: `1px solid ${theme.palette.secondary.pearl}`,
  pt: theme.spacing(6),
});

const tabsStyle = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: theme.spacing(2.5),
});

const switchStyle = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1.5,
  [theme.breakpoints.down("sm")]: {
    mt: theme.spacing(-6),
    mb: theme.spacing(4),
  },
});

const simpleTabItems = [{ label: "Convert & Stake" }, { label: "Unstake" }];
const advancedTabItems = [{ label: "Convert" }, { label: "Stake" }];

const PageContents = () => {
  const theme = useTheme();
  const mobile = useMobile();
  const [simpleTabIndex, setSimpleTabIndex] = useState(0);
  const [advancedTabIndex, setAdvancedTabIndex] = useState(0);
  const isInputPopulated = useStore(getIsInputPopulated);
  const [advanced, setAdvanced] = useState(false);

  const handleSimpleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSimpleTabIndex(newValue);
  };

  const handleAdvancedTabChange = (
    _: React.SyntheticEvent,
    newValue: number
  ) => {
    setAdvancedTabIndex(newValue);
  };

  const Switch: VoidFunctionComponent = () => {
    return (
      <Box sx={switchStyle}>
        <Typography variant="body3" color={theme.palette.common.white}>
          Advanced
        </Typography>
        <SwitchButton
          checked={advanced}
          onChange={() => setAdvanced(advanced => !advanced)}
        />
      </Box>
    );
  };

  return (
    <Container sx={containerStyle}>
      <Card
        sx={[
          contentStyle,
          { borderColor: isInputPopulated ? "primary.gold" : "transparent" },
        ]}
      >
        <Typography variant="h3" fontWeight="bold">
          stMagic
        </Typography>

        <PortfolioAndText />

        <Box sx={tabsStyle}>
          <Tabs
            items={simpleTabItems}
            value={simpleTabIndex}
            onChange={handleSimpleTabChange}
          />
          {!mobile && <Switch />}
        </Box>
        
        {simpleTabIndex === 0 && <TabItem operation={TokenOperations.convertAndStake} />}
        {simpleTabIndex === 1 && <TabItem operation={TokenOperations.unstake} />}

        {mobile && <Switch />}

        {advanced && (
          <Box sx={advancedStyle}>
            <Typography
              variant="body2"
              color="secondary.pearl"
              fontWeight="bold"
            >
              Only Convert or Stake
            </Typography>
            <Box sx={tabsStyle}>
              <Tabs
                items={advancedTabItems}
                value={advancedTabIndex}
                onChange={handleAdvancedTabChange}
              />
            </Box>
            {advancedTabIndex === 0 && (
              <TabItem operation={TokenOperations.convert} advanced />
            )}
            {advancedTabIndex === 1 && (
              <TabItem operation={TokenOperations.stake} advanced />
            )}
          </Box>
        )}

        <Links />
      </Card>
    </Container>
  );
};

export default PageContents;
