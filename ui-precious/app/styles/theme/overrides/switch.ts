import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const switchOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      width: "2rem",
      height: "1rem",
      padding: 0,
      "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: theme.spacing(0.25),
        transitionDuration: "200ms",
        backgroundColor: theme.palette.primary.purple,
        "&.Mui-checked": {
          transform: `translateX(${theme.spacing(2)})`,
          "& + .MuiSwitch-track": {
            backgroundColor: theme.palette.secondary.main,
            opacity: 1,
            border: 0,
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            backgroundColor: alpha(
              theme.palette.primary.precious,
              theme.custom.opacity.dark
            ),
          },
        },
        "&.Mui-disabled + .MuiSwitch-track": {},
      },
      "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: "0.75rem",
        height: "0.75rem",
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.purple,
      },
      "& .MuiSwitch-track": {
        borderRadius: 16,
        backgroundColor: theme.palette.common.white,
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
          duration: 300,
        }),
      },
    },
  },
});
