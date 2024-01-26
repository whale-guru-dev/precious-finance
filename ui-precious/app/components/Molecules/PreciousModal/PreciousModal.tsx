import { Theme } from "@mui/material";
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BigNumber from "bignumber.js";
import Image from "next/image";

import { MagicModal } from "../MagicModal";
import { ExtendedOperations, TokenOperations } from "@/types/tokenOperations";
import { TokenId } from "@/defi/types";
import { getToken } from "@/defi/Tokens";
import {
  ModalVariants,
  staticCaptions,
  staticTitles,
  subtitles,
  titles,
  TokenConfig,
} from "./modalConfig";
import { Button } from "@/components/Atoms";

export interface TokenProps {
  tokenId1?: TokenId;
  tokenId2?: TokenId;
  value1?: BigNumber | number;
  value2?: BigNumber | number;
}
export interface PreciousModalProps {
  variant: ModalVariants | null;
  operation: TokenOperations | ExtendedOperations | null;
  opened: boolean;
  tokens: TokenProps;
  onClose: () => void;
  onApprove?: () => void;
}

const IconComponents = {
  [ModalVariants.confirmPermission]: () => (
    <Image
      src="/icons/cogwheel.svg"
      alt="Loading indicator"
      width="96"
      height="96"
    />
  ),
  [ModalVariants.confirmTransaction]: SwapHorizRoundedIcon,
  [ModalVariants.approve]: SwapHorizRoundedIcon,
  [ModalVariants.success]: CheckCircleOutlineRoundedIcon,
};

const iconStyle = { width: "6rem", height: "6rem" };

const buttonStyle = (theme: Theme) => ({
  width: theme.spacing(40),
  mt: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

export const PreciousModal: React.FC<PreciousModalProps> = ({
  variant,
  operation,
  opened,
  tokens,
  onClose,
  onApprove = () => {},
}) => {
  if (!variant) return null;

  const tokenConfig: TokenConfig = {
    ...tokens,
    token1: tokens?.tokenId1 ? getToken(tokens.tokenId1).label : null,
    token2: tokens?.tokenId2 ? getToken(tokens.tokenId2).label : null,
  };
  const title =
    ModalVariants.approve === variant
      ? titles[operation!](tokenConfig)
      : staticTitles[variant];
  const subtitle =
    ModalVariants.confirmPermission === variant
      ? null
      : subtitles[operation!](tokenConfig);
  const caption = staticCaptions[variant];
  const IconComponent = IconComponents[variant];

  const approveButton =
    ModalVariants.approve === variant ? (
      <Button
        sx={buttonStyle}
        variant="outlined"
        data-testid="approveButton"
        onClick={onApprove}
      >
        Approve
      </Button>
    ) : null;

  return (
    <MagicModal
      open={opened}
      onClick={onClose}
      icon={<IconComponent sx={iconStyle} />}
      title={title}
      subtitle={subtitle}
      subtitleVariant="body2"
      caption={caption}
      button={approveButton}
    />
  );
};
