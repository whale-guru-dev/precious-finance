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
});

interface TabItemProps {
  operation: TokenOperations;
  advanced?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({
  operation = TokenOperations.convertAndStake,
  advanced = false,
}) => {
  const [modalVariant, setModalVariant] = useState<ModalVariants | null>(null);
  const { showSnackbar } = useSnackbarStore((state) => state);
  const { value, balance, approved, confirmed } = useStore(
    ({ magic }) => magic[operation]
  );
  const { changeAmount, approve, confirm, operationSuccess } = useStore(
    ({ magic }) => magic
  );

  const isMultiStepOperation = operation !== TokenOperations.unstake;
  const isStMagicToken = [
    TokenOperations.unstake,
    TokenOperations.stake,
  ].includes(operation);

  const handleInputChange = (value: BigNumber | number) => {
    changeAmount(operation, value);
  };

  const handleActionButtonClick = () => {
    setModalVariant(
      !approved && isMultiStepOperation
        ? ModalVariants.confirmPermission
        : ModalVariants.approve
    );
  };

  const handleModalClose = () => {
    if (ModalVariants.confirmPermission === modalVariant) {
      approve(operation);
      if (!advanced) {
        showSnackbar({
          severity: "success",
          alertText: "Approved permission of Magic",
          href: "https://etherscan.io/",
        });
      }
    } else if (ModalVariants.confirmTransaction === modalVariant) {
      if (operation === TokenOperations.unstake) {
        showSnackbar({
          severity: "success",
          alertText: formatConfirmationMessage({
            operation,
            tokenId1: "stmagic",
          }),
          href: "https://etherscan.io/",
        });
        setModalVariant(null);
      } else {
        setModalVariant(ModalVariants.success);
        confirm(operation);
      }
      return;
    } else if (ModalVariants.success === modalVariant) {
      operationSuccess(operation);
      showSnackbar({
        severity: "success",
        alertText: formatConfirmationMessage({
          operation,
          amount1: value,
          amount2: balance,
          ...(operation === TokenOperations.stake
            ? { tokenId1: "stmagic" }
            : { tokenId1: "magic", tokenId2: "stmagic" }),
        }),
        href: "https://etherscan.io/",
      });
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
        multiStep={isMultiStepOperation}
        InputProps={{
          tokenId1: isStMagicToken ? "stmagic" : "magic",
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
          tokenId1: "magic",
          tokenId2: "stmagic",
          value1: value,
          value2: balance,
        }}
        opened={Boolean(modalVariant)}
        onClose={handleModalClose}
        onApprove={onApproveOperationClick}
      />
    </Box>
  );
};

export default TabItem;
