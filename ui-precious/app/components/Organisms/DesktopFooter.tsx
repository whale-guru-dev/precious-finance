import { Box, Theme } from "@mui/material";
import { Logo, LogoVariants, SocialMedia } from "../Atoms";

const containerStyle = (theme: Theme) =>
  ({
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(0, 18),
    height: "4.5rem",
    marginTop: "0rem",
    bottom: 0,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(0, 3),
    },
  } as const);

export const DesktopFooter = () => (
  <Box component="footer" sx={containerStyle}>
    <Logo responsive={false} variant={LogoVariants.medium} />
    <SocialMedia
      onTwitterClick={() => {}}
      onMediumClick={() => {}}
      onDiscordClick={() => {}}
      onGitBookClick={() => {}}
    />
  </Box>
);
