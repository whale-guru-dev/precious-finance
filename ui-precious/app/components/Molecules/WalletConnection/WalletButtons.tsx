import Image from "next/image";

import { Button } from "@/components/Atoms";
import { StepActions, ConnectionSteps } from "@/types/connection";
import { Theme } from "@mui/material";

interface WalletButtonProps {
  label: string;
  icon?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface WalletButtonsProps {
  step: ConnectionSteps;
  onClick: (type: StepActions) => void;
}

const buttonStyle = (theme: Theme) => ({
  width: "calc(100% - 6.5rem)",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

const WalletButton: React.FC<WalletButtonProps> = ({
  label,
  icon,
  onClick,
}) => (
  <Button
    sx={buttonStyle}
    variant="outlined"
    startIcon={
      icon && <Image src={icon} alt="Button icon" width="24" height="24" />
    }
    onClick={onClick}
  >
    {label}
  </Button>
);

export const WalletButtons: React.FC<WalletButtonsProps> = ({
  step,
  onClick,
}) => {
  const buttons = {
    [ConnectionSteps.Start]: (
      <WalletButton
        label="Connect to wallet"
        onClick={() => onClick(StepActions.Connect)}
      />
    ),
    [ConnectionSteps.UnsupportedNetwork]: (
      <>
        <WalletButton
          label="Switch to Arbitrum network"
          onClick={() => onClick(StepActions.Switch)}
        />
        <WalletButton
          label="Disconnect wallet"
          onClick={() => onClick(StepActions.Disconnect)}
        />
      </>
    ),
    [ConnectionSteps.ConnectWallet]: (
      <>
        <WalletButton
          label="Metamask"
          icon="/icons/wallet-metamask.svg"
          onClick={() => onClick(StepActions.Metamask)}
        />
        <WalletButton
          label="WalletConnect"
          icon="/icons/wallet-walletconnect.svg"
          onClick={() => onClick(StepActions.WalletConnect)}
        />
      </>
    ),
    [ConnectionSteps.ConnectWalletError]: (
      <>
        <WalletButton
          label="Metamask"
          icon="/icons/wallet-metamask.svg"
          onClick={() => onClick(StepActions.Metamask)}
        />
        <WalletButton
          label="WalletConnect"
          icon="/icons/wallet-walletconnect.svg"
          onClick={() => onClick(StepActions.WalletConnect)}
        />
      </>
    ),
    [ConnectionSteps.ConfirmPermission]: null,
    [ConnectionSteps.Confirmed]: null,
  };

  return buttons[step];
};
