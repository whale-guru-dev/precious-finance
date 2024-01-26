import { useEffect, useState } from "react";
import { useConnector } from "@integrations-lib/core";
import { AppBar, Box, IconButton, Theme, Toolbar } from "@mui/material";
import Image from "next/image";

import {
  ConnectWalletButton,
  Logo,
  SnackbarConnected,
} from "@/components/Atoms";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileMenu } from "./MobileMenu";
import { shortenAddress } from "@/utils/formatters";
import { useStore } from "@/stores/root";

import { ConnectionSteps } from "@/types/connection";
import { ARBITRUM_NETWORK } from "@/defi/config";

const toolbarStyle = { justifyContent: "space-between" };

const walletButtonStyle = (theme: Theme) => ({
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
});

const menuButtonStyle = (theme: Theme) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
});

export const Header = () => {
  // const { chainId, account, isActive: connected, activate } = useConnector('metamask');

  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [shouldShowBackground, setShouldShowBackground] = useState(false);
  const { connected, account, connectWallet } = useStore(
    ({ connection }) => connection
  );
  const connectWalletButtonLabel = connected
    ? shortenAddress(account.address)
    : "Connect to a wallet";

  const handleScroll = () => {
    setShouldShowBackground(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpened(!mobileMenuOpened);
  };

  const handleConnectClick = () => {
    if (connected) {
      return;
    }

    connectWallet();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: shouldShowBackground
            ? "backdrop.navblur"
            : "transparent",
        }}
      >
        <Toolbar sx={toolbarStyle}>
          <Logo />
          <DesktopNavBar />
          <Box sx={walletButtonStyle}>
            <ConnectWalletButton
              connected={connected}
              label={connectWalletButtonLabel}
              onClick={handleConnectClick}
            />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileMenuToggle}
            sx={menuButtonStyle}
          >
            <Image
              src="/icons/haburger-menu.svg"
              alt="Open menu icon"
              width="52"
              height="52"
            />
          </IconButton>
          <MobileMenu
            open={mobileMenuOpened}
            onClose={handleMobileMenuToggle}
          />
        </Toolbar>
      </AppBar>
      <SnackbarConnected />
    </>
  );
};
