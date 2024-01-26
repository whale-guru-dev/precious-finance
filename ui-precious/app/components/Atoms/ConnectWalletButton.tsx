import { Box, Typography, Theme } from "@mui/material";
import { Button } from "./Button";

export interface ConnectWalletButtonProps {
  connected: boolean;
  label: string;
  onClick: () => void;
}

const indicatorStyle = (theme: Theme) => ({
  width: "1rem",
  height: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: theme.palette.backdrop.connect,
  marginRight: "0.5rem",
});

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  connected,
  label,
  onClick,
}) => {
  return (
    <Button variant="outlined" color="secondary" onClick={onClick}>
      {connected && <Box sx={indicatorStyle} data-testid="connectIndicator" />}
      <Typography variant="button">{label}</Typography>
    </Button>
  );
};
