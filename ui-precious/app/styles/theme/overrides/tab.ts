import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const tabOverrides = (theme: Theme): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      textTransform: "none",
      color: theme.palette.secondary.pearl,
      padding: theme.spacing(2, 5),
      lineHeight: 1.45,
      [theme.breakpoints.down("sm")]: {
        width: "50%",
        gap: theme.spacing(1.5),
        padding: theme.spacing(1.875, 0),
      },
      borderBottom: `2px solid transparent`,
      "&:hover": {
        background: alpha(
          theme.palette.secondary.pearl,
          theme.custom.opacity.light
        ),
        borderBottom: `2px solid ${alpha(
          theme.palette.secondary.pearl,
          theme.custom.opacity.light
        )}`,
      },
      "&.Mui-selected": {
        color: theme.palette.secondary.pearl,
        borderBottom: `2px solid ${theme.palette.secondary.pearl}`,
      },
      "&.Mui-disabled": {
        color: alpha(theme.palette.secondary.pearl, theme.custom.opacity.light),
        borderBottom: `2px solid ${alpha(
          theme.palette.secondary.pearl,
          theme.custom.opacity.light
        )}`,
      },
      "&.MuiTab-labelIcon": {
        minHeight: "auto",
      },
    },
  },
});
