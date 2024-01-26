import { Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h5: false;
    h6: false;
    body3: true;
  }
}

export const typographyOptions = (theme: Theme) => ({
  fontFamily: `"${theme.custom.fontFamily.primary}", "${theme.custom.fontFamily.secondary}", sans-serif`,
  htmlFontSize: 16,
  h1: {
    fontFamily: `"${theme.custom.fontFamily.secondary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "4rem",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.375rem",
    },
  },
  h2: {
    fontFamily: `"${theme.custom.fontFamily.secondary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "2.25rem",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  h3: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.large,
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  h4: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.125rem",
    },
  },
  h5: undefined,
  h6: undefined,
  body1: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "1rem",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
  body2: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "1.25rem",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  body3: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "1rem",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
  },
  button: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.large,
    fontSize: "1rem",
    fontWeight: "600",
    width: "max-content",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
  caption: {
    fontFamily: `"${theme.custom.fontFamily.primary}"`,
    lineHeight: theme.custom.lineHeight.larger,
    fontSize: "0.875rem",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.625rem",
    },
  },
});
