import { alpha, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const cssBaselineOverrides = (
  theme: Theme
): Partial<OverridesStyleRules> => ({
  styleOverrides: `
    @font-face {
      font-family: "Kingthings Foundation";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local('Kingthings Foundation'), url("/static/Kingthings Foundation.ttf") format('truetype');
    };
    @font-face {
      font-family: "Sofia Pro";
      font-style: normal;
      font-display: swap;
      font-weight: 600;
      src: local('Sofia Pro'), url("/static/Sofia Pro Bold.otf") format('opentype');
    };
    @font-face {
      font-family: "Sofia Pro";
      font-style: normal;
      font-display: swap;
      font-weight: 500;
      src: local('Sofia Pro'), url("/static/Sofia Pro Regular.otf") format('opentype');
    };
    @font-face {
      font-family: "Sofia Pro";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local('Sofia Pro'), url("/static/Sofia Pro Light.otf") format('opentype');
    };
    @font-face {
      font-family: "Sofia Pro";
      font-style: normal;
      font-display: swap;
      font-weight: 300;
      src: local('Sofia Pro'), url("/static/Sofia Pro Extra Light.otf") format('opentype');
    };
    body {
      background: linear-gradient(to bottom, ${theme.palette.backdrop.light} 28%, ${theme.palette.backdrop.dark} 100%);
      min-height: 100vh;
    }
  `,
});
