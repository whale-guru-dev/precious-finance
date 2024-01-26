import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const buttonOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: {
    root: {
      textTransform: "none",
      boxShadow: "none",
      whiteSpace: "no-wrap",
      minWidth: "maxContent",
      "&:hover": {
        boxShadow: "none",
      },
      color: theme.palette.common.white,
      fontFamily: theme.custom.fontFamily.primary,
      lineHeight: theme.custom.lineHeight.small,
    },
    sizeMedium: {
      fontSize: "1rem",
      padding: "1rem",
      fontWeight: 600,
      height: "3.75rem",
      lineHeight: "160%",
      borderRadius: "0.5rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0.75rem",
        fontSize: "0.875rem",
        height: "3rem",
      },
    },
    sizeSmall: {
      fontSize: "0.875rem",
      padding: "0.875rem",
      fontWeight: "normal",
      height: "1.75rem",
      lineHeight: "160%",
      borderRadius: "0.25rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0.5rem",
        fontSize: "0.75rem",
        height: "1.75rem",
      },
    },
    containedPrimary: {
      background: `linear-gradient(to bottom, ${theme.palette.links.light} 0%, ${theme.palette.links.main} 71%, ${theme.palette.links.dark} 100%)`,
      border: `1px solid transparent`,
      borderTopColor: theme.palette.links.light,
      borderBottomColor: theme.palette.links.dark,
      "&:hover": {
        background: `linear-gradient(to bottom, ${theme.palette.links.lighter} 0%, ${theme.palette.primary.purple} 70%, ${theme.palette.links.dark} 95%)`,
        border: `1px solid transparent`,
        borderTopColor: theme.palette.links.lighter,
        borderBottomColor: theme.palette.links.dark,
        boxShadow: `0 0 0.75rem 0 ${theme.palette.primary.purple}`,
      },
      "&:disabled": {
        background: "none",
        color: theme.palette.secondary.midblue,
        borderColor: theme.palette.secondary.midblue,
      },
    },
    outlinedPrimary: {
      borderColor: theme.palette.secondary.pearl,
      color: theme.palette.secondary.pearl,
      "&:hover": {
        color: theme.palette.secondary.blue,
        backgroundColor: alpha(
          theme.palette.secondary.blue,
          theme.custom.opacity.main
        ),
        borderColor: theme.palette.secondary.blue,
        boxShadow: `0 0 0.5rem 0 ${theme.palette.secondary.blue}80`,
      },
      "&:disabled": {
        borderColor: alpha(
          theme.palette.common.white,
          theme.custom.opacity.main
        ),
        color: alpha(theme.palette.common.white, theme.custom.opacity.main),
      },
    },
    outlinedSecondary: {
      borderColor: theme.palette.primary.gold,
      color: theme.palette.primary.gold,
      "&:hover": {
        color: theme.palette.secondary.blue,
        backgroundColor: alpha(
          theme.palette.secondary.blue,
          theme.custom.opacity.main
        ),
        borderColor: theme.palette.secondary.blue,
        boxShadow: `0 0 0.5rem 0 ${theme.palette.secondary.blue}80`,
      },
      "&:disabled": {
        borderColor: alpha(
          theme.palette.common.white,
          theme.custom.opacity.main
        ),
        color: alpha(theme.palette.common.white, theme.custom.opacity.main),
      },
    },
    textPrimary: {
      color: theme.palette.links.main,
      backgroundColor: alpha(
        theme.palette.links.main,
        theme.custom.opacity.light
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.links.main,
          theme.custom.opacity.main
        ),
      },
      "&:disabled": {
        color: alpha(theme.palette.common.black, theme.custom.opacity.main),
      },
    },
  },
});
