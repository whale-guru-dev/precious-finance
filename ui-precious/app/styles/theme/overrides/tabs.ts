import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const tabsOverrides = (theme: Theme): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: theme.palette.secondary.pearl,
      },
    },
  },
});
