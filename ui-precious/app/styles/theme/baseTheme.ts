import { darkScrollbar, PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Shadows } from "@mui/material/styles/shadows";
import { paletteOptions } from "./options";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      opacity: {
        lightest: number;
        lighter: number;
        light: number;
        main: number;
        dark: number;
        darker: number;
        darkest: number;
      };
      lineHeight: {
        larger: string;
        large: string;
        medium: string;
        small: string;
        smaller: string;
      };
      fontFamily: {
        primary: string;
        secondary: string;
        other: string;
      };
      drawerWidth: {
        desktop: number;
        tablet: number;
        mobile: number;
      };
    };
  }

  interface ThemeOptions {
    custom: {
      opacity?: {
        lightest?: number;
        lighter?: number;
        light?: number;
        main?: number;
        dark?: number;
        darker?: number;
        darkest?: number;
      };
      lineHeight?: {
        larger?: string;
        large?: string;
        medium?: string;
        small?: string;
        smaller?: string;
      };
      fontFamily?: {
        primary?: string;
        secondary?: string;
        other?: string;
      };
      drawerWidth?: {
        desktop?: number;
        tablet?: number;
        mobile?: number;
      };
    };
  }

  interface Palette {
    backdrop: {
      toasts: string;
      navblur: string;
      modal: string;
      light: string;
      dark: string;
      connect: string;
      success: string;
      magic: string;
      govmagic: string;
      claim: string;
      liquidity: string;
      cardsmagic: string;
      cardsgovmagic: string;
      cardsclaim: string;
      cardsliquidity: string;
    };
    links: {
      main: string;
      dark: string;
      light: string;
      lighter: string;
    };
    gradient: {
      primary: string;
      secondary: string;
      other: string;
    };
  }

  interface PaletteOptions {
    backdrop?: {
      toasts?: string;
      navblur?: string;
      modal?: string;
      light?: string;
      dark?: string;
      connect?: string;
      success?: string;
      magic?: string;
      govmagic?: string;
      claim?: string;
      liquidity?: string;
      cardsmagic?: string;
      cardsgovmagic?: string;
      cardsclaim?: string;
      cardsliquidity?: string;
    };
    links?: {
      main?: string;
      dark?: string;
      light?: string;
      lighter?: string;
    };
    gradient?: {
      primary?: string;
      secondary?: string;
      other?: string;
    };
  }

  interface PaletteColor {
    purple: string;
    precious: string;
    gold: string;
    blue: string;
    midblue: string;
    darkblue: string;
    pearl: string;
    toasts: string;
    navblur: string;
    modal: string;
    magic: string;
    govmagic: string;
    claim: string;
    liquidity: string;
    cardsmagic: string;
    cardsgovmagic: string;
    cardsclaim: string;
    cardsliquidity: string;
  }

  interface SimplePaletteColorOptions {
    purple: string;
    precious: string;
    gold: string;
    blue: string;
    midblue: string;
    darkblue: string;
    pearl: string;
    govmagic: string;
    cardsmagic: string;
    toasts: string;
    navblur: string;
    liquidity: string;
    claim: string;
    modal: string;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inputLabel: true;
  }
}

// create basic theme with basic design options
export const createBaseTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...paletteOptions[mode],
    },
    spacing: 8,
    mixins: {
      toolbar: {},
    },
    shape: {
      borderRadius: 8,
    },
    zIndex: {
      drawer: 1200,
    },
    shadows: Array(25).fill("none") as Shadows,
    custom: {
      opacity: {
        lightest: 0.02,
        lighter: 0.05,
        light: 0.1,
        main: 0.3,
        dark: 0.5,
        darker: 0.6,
        darkest: 0.8,
      },
      lineHeight: {
        smaller: "110%",
        small: "120%",
        medium: "130%",
        large: "140%",
        larger: "160%",
      },
      fontFamily: {
        primary: "Sofia Pro",
        secondary: "Kingthings Foundation",
        other: "Sofia Pro",
      },
      drawerWidth: {
        desktop: 320,
        tablet: 240,
        mobile: 240,
      },
    },
  });
