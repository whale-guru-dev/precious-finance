import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { ClaimForm, ModalVariants, PreciousModal } from "@/components";
import { ExtendedOperations } from "@/types/tokenOperations";
import { useStore } from "@/stores/root";
import { TransactionKind } from "@/stores/defi/claim";
import { useSnackbarStore } from "@/components/Atoms/Snackbar/snackbar.store";

const ClaimFormWithTitle: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { showSnackbar } = useSnackbarStore((state) => state);
  const {
    totals: { claimable, deposits, confirmed },
    claimSuccess,
    confirmTransaction,
  } = useStore(({ claim }) => claim);

  const modalVariant = confirmed
    ? ModalVariants.success
    : ModalVariants.confirmTransaction;

  useEffect(() => {
    if (!confirmed) return;

    setModalOpened(true);
  }, [confirmed]);

  const handleClaimClick = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);

    if (confirmed) {
      showSnackbar({
        severity: "success",
        alertText: "Claim of rewards successfull",
        href: "https://etherscan.io/",
      });
      claimSuccess(TransactionKind.totals);
    } else {
      confirmTransaction(TransactionKind.totals);
    }
  };

  return (
    <>
      <ClaimForm
        claimable={claimable}
        deposits={deposits}
        onClick={handleClaimClick}
      />

      <Typography variant="h1" component="h1" align="center">
        Stake Tokens
      </Typography>
      <Typography variant="h2" component="h1" align="center">
        Convert Magic to stMagic, then stake
        <br />
        stMagic to accrue rewards 👑
      </Typography>

      <PreciousModal
        variant={modalVariant}
        operation={ExtendedOperations.claim}
        tokens={{
          tokenId1: "magic",
          value1: claimable,
        }}
        opened={modalOpened}
        onClose={handleModalClose}
      />
    </>
  );
};

export default ClaimFormWithTitle;
