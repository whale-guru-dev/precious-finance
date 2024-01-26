import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const listItemOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      width: "unset",
      "&.Mui-selected": {
        backgroundColor: "transparent",
        "& .MuiTypography-root": {
          fontWeight: "600",
        },
      },
    },
  },
});
