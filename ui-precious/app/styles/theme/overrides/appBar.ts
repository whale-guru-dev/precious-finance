import { Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const appBarOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      background: theme.palette.backdrop.navblur,
      backdropFilter: "blur(0.5rem)",
      height: "7.5rem",
      justifyContent: "center",
      padding: 0,
      [theme.breakpoints.down("md")]: {
        height: "5rem",
      },
    },
  },
});
