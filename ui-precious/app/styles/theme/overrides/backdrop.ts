import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const backdropOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      backdropFilter: "blur(1rem)",
      backgroundColor: theme.palette.backdrop.navblur,
    },
  },
});
