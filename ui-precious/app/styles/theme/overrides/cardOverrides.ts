import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const cardOverrides = (theme: Theme): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.backdrop.cardsmagic,
      borderRadius: "0.5rem",
      padding: "3rem",
    },
  },
});
