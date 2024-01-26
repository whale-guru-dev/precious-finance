import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const outlinedInputOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  defaultProps: {
    notched: false,
  },
  styleOverrides: {
    root: {
      background: theme.palette.secondary.pearl,
      color: theme.palette.links.main,
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          boxShadow: `0 0 0.625rem 0 ${theme.palette.links.main}`,
        },
      },
      "&.Mui-error": {
        color: theme.palette.error.main,
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          boxShadow: `0 0 0.625rem 0 ${theme.palette.links.main}`,
        },
      },
      "&.Mui-disabled": {
        "& input": {
          textFillColor: `${theme.palette.common.black}40`,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          boxShadow: "none",
        },
      },
      "& .MuiSelect-icon": {
        right: theme.spacing(3),
        transform: "none",
        [theme.breakpoints.down("sm")]: {
          right: theme.spacing(2),
        },
      },
      "&.MuiInputBase-adornedStart": {
        paddingLeft: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
          paddingLeft: theme.spacing(2),
        },
      },
      "& .MuiSelect-select": {
        "&.MuiOutlinedInput-input.MuiInputBase-input": {
          paddingRight: theme.spacing(6),
        },
        "& .MuiBox-root": {
          overflow: "hidden",
        },
      },
      "& + .MuiFormHelperText-root": {
        fontSize: "1rem",
        margin: `${theme.spacing(0.5)} 0 0`,

        [theme.breakpoints.down("sm")]: {
          fontSize: "0.75rem",
          margin: `${theme.spacing(0.25)} 0 0`,
        },
      },
    },
    input: {
      fontSize: "1.25rem",
      fontWeight: "600",
      lineHeight: "160%",
      padding: theme.spacing(0, 1.5),
      height: "3.75rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        height: "3rem",
      },
    },
    notchedOutline: {
      borderColor: `${alpha(
        theme.palette.common.white,
        theme.custom.opacity.main
      )}`,
    },
  },
});
