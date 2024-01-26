import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "@mui/material";

import { DesktopFooter, Header } from "../Organisms";
import { BackgroundEffects } from "./BackgroundEffects";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  minHeight: "100vh",
} as const;

const contentStyle = (theme: Theme) =>
  ({
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    mt: "7.5rem",
    mb: "5rem",
    [theme.breakpoints.down("md")]: {
      mt: "5rem",
    },
  } as const);

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => (
  <>
    <BackgroundEffects />

    <Box sx={containerStyle}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={contentStyle}>
        {children}
      </Box>
      <DesktopFooter />
    </Box>
  </>
);

export default DefaultLayout;
