import { Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const stepperOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      "& .MuiStepIcon-root": {
        color: theme.palette.secondary.pearl,
        "&.Mui-active": {
          color: theme.palette.primary.gold,
        },
        "&.Mui-completed": {
          color: theme.palette.backdrop.success,
        },
        "& > text": {
          display: "none",
        },
      },

      "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        marginTop: theme.spacing(1),
      },

      "& .MuiStepConnector-root": {
        left: `calc(-50% + ${theme.spacing(1.5)})`,
        right: `calc(50% + ${theme.spacing(1.5)})`,
        "& > .MuiStepConnector-line": {
          borderColor: theme.palette.secondary.pearl,
        },
      },

      "& .MuiSvgIcon-root": {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.secondary.pearl,
        width: theme.spacing(3.25),
        height: theme.spacing(3.25),
        padding: theme.spacing(0.625),
      },
    },
  },
});
