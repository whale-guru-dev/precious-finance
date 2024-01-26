import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const tooltipOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    popper: {
      background: "transparent",
    },
    tooltip: {
      background: theme.palette.common.white,
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: theme.spacing(1),
      fontFamily: theme.custom.fontFamily.primary,
      color: theme.palette.secondary.darkblue,
      fontSize: "1rem",
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
    },
    arrow: {
      color: theme.palette.common.white,
    },
  },
});
