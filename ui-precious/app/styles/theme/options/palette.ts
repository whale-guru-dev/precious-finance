import { alpha, PaletteOptions } from "@mui/material";

export const paletteOptions = {
  dark: {
    primary: {
      main: "#c8b08f",
      purple: "#725db2",
      precious: "#f8ead6",
      gold: "#c8b08f",
    },
    secondary: {
      main: "#fffaf3",
      blue: "#bccef0",
      midblue: "#4b5871",
      darkblue: "#131d30",
      pearl: "#fffaf3",
    },
    info: {
      main: "#0286FF",
      light: "#004686",
      dark: "#001931",
    },
    success: {
      main: "#009B6D",
      light: "#005A3F",
      dark: "#002C1E",
    },
    error: {
      main: "#E10036",
      light: "#850020",
      dark: "#450011",
    },
    warning: {
      main: "#C59A04",
      light: "#846700",
      dark: "#2E2400",
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
      hover: "#bccef0",
    },
    links: {
      main: "#725db2",
      dark: "#57458e",
      light: "#8e7cc6",
      lighter: "#ad9ed9",
    },
    gradient: {
      primary:
        "linear-gradient(180deg, rgba(12, 6, 0, 0.8) 0%, rgba(21, 11, 0, 0.8) 82.99%)",
      secondary:
        "linear-gradient(180deg, rgba(12, 6, 0, 0) 63.64%, rgba(12, 6, 0, 0.8) 116.45%)",
    },
    backdrop: {
      toasts: "#2c303880",
      navblur: "#2c303880",
      modal: "#2c3038",
      light: "#1e283b",
      dark: "#05111f",
      connect: "#05902c",
      success: "#40bd35",
      magic: "linear-gradient(to bottom, #1e283b 28%, #05111f 100%)",
      govmagic: "linear-gradient(to bottom, #0c2828 28%, #011f17 100%)",
      claim: "linear-gradient(to bottom, #291c10 28%, #1f1e01 100%)",
      liquidity: "linear-gradient(to bottom, #1f153e 28%, #0f0728 100%)",
      cardsmagic: "#141f3080",
      cardsclaim: "#2b231180",
      cardsgovmagic: "#09262380",
      cardsliquidity: "#14092580",
    },
    background: {},
  } as PaletteOptions,
  light: {
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
  } as PaletteOptions,
};
