import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const linkOverrides = (theme: Theme): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      color: theme.palette.secondary.pearl,
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        color: alpha(
          theme.palette.secondary.pearl,
          theme.custom.opacity.darker
        ),
      },
    },
  },
});
