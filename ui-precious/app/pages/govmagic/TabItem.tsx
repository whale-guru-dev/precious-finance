import { useState } from "react";
import { Box, Theme } from "@mui/material";
import BigNumber from "bignumber.js";

import { TokenManager } from "@/components/Organisms";
import { TokenOperations } from "@/types/tokenOperations";
import { ModalVariants, PreciousModal } from "@/components";
import { formatConfirmationMessage } from "@/utils/formatters";
import { useStore } from "@/stores/root";
import { useSnackbarStore } from "@/components/Atoms/Snackbar/snackbar.store";

const containerStyle = (theme: Theme) => ({
  display: "flex",
  justifyContent: "center",
  mt: theme.spacing(6),
  mb: theme.spacing(10),
  [theme.breakpoints.down("xl")]: {
    my: theme.spacing(4),
  },
});

interface TabItemProps {
  operation: TokenOperations.stake | TokenOperations.unstake;
}

const TabItem: React.FC<TabItemProps> = ({
  operation = TokenOperations.stake,
}) => {
  const [modalVariant, setModalVariant] = useState<ModalVariants | null>(null);
  const { showSnackbar } = useSnackbarStore((state) => state);
  const { value, balance, approved, confirmed } = useStore(
    ({ govmagic }) => govmagic[operation]
  );
  const { changeAmount, approve, confirm, operationSuccess } = useStore(
    ({ govmagic }) => govmagic
  );

  const handleInputChange = (value: BigNumber | number) => {
    changeAmount(operation, value);
  };

  const handleActionButtonClick = () => {
    setModalVariant(
      !approved && TokenOperations.stake === operation
        ? ModalVariants.confirmPermission
        : ModalVariants.approve
    );
  };

  const handleModalClose = () => {
    if (ModalVariants.confirmPermission === modalVariant) {
      approve();
    } else if (ModalVariants.confirmTransaction === modalVariant) {
      setModalVariant(ModalVariants.success);
      confirm(operation);
      return;
    } else if (ModalVariants.success === modalVariant) {
      showSnackbar({
        severity: "success",
        alertText: formatConfirmationMessage({
          operation,
          ...(operation === TokenOperations.stake ? { amount1: value } : {}),
          tokenId1: "govmagic",
        }),
        href: "https://etherscan.io/",
      });
      operationSuccess(operation);
    }

    setModalVariant(null);
  };

  const onApproveOperationClick = () => {
    setModalVariant(ModalVariants.confirmTransaction);
  };

  return (
    <Box sx={containerStyle}>
      <TokenManager
        approved={approved}
        multiStep={TokenOperations.stake === operation}
        InputProps={{
          tokenId1: "govmagic",
          value,
          balance,
          operation,
        }}
        onInputChange={handleInputChange}
        onButtonClick={handleActionButtonClick}
      />

      <PreciousModal
        variant={modalVariant}
        operation={operation}
        tokens={{
          tokenId1: "govmagic",
          value1: value,
        }}
        opened={Boolean(modalVariant)}
        onClose={handleModalClose}
        onApprove={onApproveOperationClick}
      />
    </Box>
  );
};

export default TabItem;
