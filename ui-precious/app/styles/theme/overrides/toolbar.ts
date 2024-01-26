import { Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const toolbarOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      "&.MuiToolbar-root.MuiToolbar-regular": {
        padding: theme.spacing(0, 18),
      },
      [theme.breakpoints.down("lg")]: {
        "&.MuiToolbar-root.MuiToolbar-regular": {
          padding: theme.spacing(0, 3),
        },
      },
    },
  },
});
