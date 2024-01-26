import { Card, Container, Link, Theme, Typography } from "@mui/material";
import Image from "next/image";

import { StepActions, ConnectionSteps } from "@/types/connection";
import { WalletButtons } from "./WalletButtons";

export interface WalletConnectionProps {
  step: ConnectionSteps;
  onClick: (type: StepActions) => void;
  onBackClick: (step: ConnectionSteps) => void;
}

const titles = {
  [ConnectionSteps.Start]: "Wallet connection to Arbitrum required.",
  [ConnectionSteps.UnsupportedNetwork]:
    "This app supports Arbitrum. You are currently connected to an unsupported network.",
  [ConnectionSteps.ConnectWallet]: "Connect wallet",
  [ConnectionSteps.ConnectWalletError]: "Connect wallet",
  [ConnectionSteps.ConfirmPermission]: "Confirm permission",
};

const secondaryTitles = {
  [ConnectionSteps.Start]: null,
  [ConnectionSteps.UnsupportedNetwork]: null,
  [ConnectionSteps.ConnectWallet]: "Select a wallet to connect to Precious:",
  [ConnectionSteps.ConnectWalletError]:
    "There was an error trying to connect to your wallet please try again.",
  [ConnectionSteps.ConfirmPermission]: null,
};

const captions = {
  [ConnectionSteps.Start]:
    "You may need to manually switch network via your wallet.",
  [ConnectionSteps.UnsupportedNetwork]:
    "You may need to manually switch network via your wallet.",
  [ConnectionSteps.ConnectWallet]: null,
  [ConnectionSteps.ConnectWalletError]: null,
  [ConnectionSteps.ConfirmPermission]: "Confirm the permission in your wallet",
};

const containerStyle = (theme: Theme) => ({
  px: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    padding: "0.625rem",
  },
});

const contentStyle = (theme: Theme) =>
  ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    padding: "3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.25rem",
    },
  } as const);

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  step,
  onClick,
  onBackClick,
}) => {
  const shouldShowLink = [
    ConnectionSteps.ConnectWallet,
    ConnectionSteps.ConfirmPermission,
  ].includes(step);

  const handleBackClick = () => {
    onBackClick(step);
  };

  if (ConnectionSteps.Confirmed === step) return null;

  return (
    <Container sx={containerStyle} maxWidth="sm" disableGutters>
      <Card sx={contentStyle}>
        {ConnectionSteps.ConfirmPermission === step && (
          <Image
            src="/icons/cogwheel.svg"
            alt="Loading indicator"
            width="96"
            height="96"
          />
        )}
        <Typography variant="h4" fontWeight="bold" align="center">
          {titles[step]}
        </Typography>
        {secondaryTitles[step] && (
          <Typography variant="body2" align="center" color="secondary">
            {secondaryTitles[step]}
          </Typography>
        )}
        <WalletButtons step={step} onClick={onClick} />
        {captions[step] && (
          <Typography variant="caption" align="center" color="secondary">
            {captions[step]}
          </Typography>
        )}
        {shouldShowLink && (
          <Link variant="caption" onClick={handleBackClick}>
            Go back
          </Link>
        )}
      </Card>
    </Container>
  );
};
