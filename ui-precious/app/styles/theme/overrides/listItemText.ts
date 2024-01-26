import { Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const listItemTextOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    primary: {
      fontSize: "1.25rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "1.125rem",
      },
    },
  },
});
