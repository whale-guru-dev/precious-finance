import { AppBar, Box, Dialog, IconButton, List, Theme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

import { ConnectWalletButton, Logo, SocialMedia } from "@/components/Atoms";
import { MenuItem } from "./MenuItem";
import { MENU_ITEMS } from "./menuItems";
import { shortenAddress } from "@/utils/formatters";
import { useStore } from "@/stores/root";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const dialogStyle = (theme: Theme) =>
  ({
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
    },
  } as const);

const mobileAppBarStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0 1.5rem",
  background: "transparent",
} as const;

const mobileListStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "8rem",
} as const;

const footerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "fixed",
  right: 0,
  left: 0,
  bottom: "2rem",
} as const;

const connectButtonStyle = {
  marginBottom: "3.5rem",
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { connected, account, connectWallet } = useStore(
    ({ connection }) => connection
  );
  const connectWalletButtonLabel = connected
    ? shortenAddress(account.address)
    : "Connect to a wallet";

  const handleConnectClick = () => {
    if (connected) {
      return;
    }

    connectWallet();
  };

  return (
    <Dialog sx={dialogStyle} open={open} fullScreen>
      <AppBar sx={mobileAppBarStyle}>
        <Logo />

        <IconButton
          aria-label="open mobile menu"
          size="small"
          onClick={onClose}
        >
          <Image
            src="/icons/menu-close.svg"
            alt="Close icon"
            width="52"
            height="52"
          />
        </IconButton>
      </AppBar>
      <List sx={mobileListStyle}>
        {Object.entries(MENU_ITEMS).map(([key, config]) => {
          return config.visible ? (
            <MenuItem router={router} config={config} key={key} />
          ) : null;
        })}
      </List>
      <Box component="footer" sx={footerStyle}>
        <Box sx={connectButtonStyle}>
          <ConnectWalletButton
            connected={connected}
            label={connectWalletButtonLabel}
            onClick={handleConnectClick}
          />
        </Box>
        <SocialMedia
          onTwitterClick={() => {}}
          onMediumClick={() => {}}
          onDiscordClick={() => {}}
          onGitBookClick={() => {}}
        />
      </Box>
    </Dialog>
  );
};
