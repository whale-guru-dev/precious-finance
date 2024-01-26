import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Container, Theme, Typography } from "@mui/material";

import Default from "@/components/Templates/Default";
import { useRedirect } from "@/hooks/navigation";
import { ClaimForm, ModalVariants, PreciousModal, Rewards } from "@/components";
import { ExtendedOperations } from "@/types/tokenOperations";
import { useStore } from "@/stores/root";
import { TransactionKind } from "@/stores/defi/claim";
import { useSnackbarStore } from "@/components/Atoms/Snackbar/snackbar.store";

const containerStyle = (theme: Theme) => ({
  mb: theme.spacing(30),
  [theme.breakpoints.down("md")]: {
    mb: theme.spacing(0),
  },
});

const Claim: NextPage = () => {
  const [transactionKind, setTransactionKind] =
    useState<TransactionKind | null>(null);
  const connectedAndConfirmed = useRedirect();
  const { showSnackbar } = useSnackbarStore((state) => state);
  const {
    totals,
    rewards,
    fetchClaimTotals,
    fetchClaimRewards,
    confirmTransaction,
    claimSuccess,
  } = useStore(({ claim }) => claim);
  const transactionCompleted =
    transactionKind === TransactionKind.totals
      ? totals.confirmed
      : rewards.confirmed;
  const modalVariant = transactionCompleted
    ? ModalVariants.success
    : ModalVariants.confirmTransaction;

  useEffect(() => {
    if (!connectedAndConfirmed) return;

    fetchClaimTotals();
    fetchClaimRewards();
  }, [connectedAndConfirmed]);

  useEffect(() => {
    if (!totals.confirmed) return;

    setTransactionKind(TransactionKind.totals);
  }, [totals]);

  useEffect(() => {
    if (!rewards.confirmed) return;

    setTransactionKind(TransactionKind.rewards);
  }, [rewards]);

  const handleClaimClick = () => {
    setTransactionKind(TransactionKind.totals);
  };

  const handleClaimAllClick = () => {
    setTransactionKind(TransactionKind.rewards);
  };

  const handleModalClose = () => {
    if (transactionCompleted) {
      showSnackbar({
        severity: "success",
        alertText: "Claim of rewards successfull",
        href: "https://etherscan.io/",
      });
      claimSuccess(transactionKind!);
    } else {
      confirmTransaction(transactionKind!);
    }

    setTransactionKind(null);
  };

  if (!connectedAndConfirmed) return null;

  return (
    <Default>
      <Container maxWidth="md" sx={containerStyle}>
        <ClaimForm {...totals} onClick={handleClaimClick} />

        <Typography variant="h1" component="h1" align="center">
          Claim Tokens
        </Typography>
        <Typography variant="h2" component="h1" align="center">
          Claim Magic or gMagic⚱️
        </Typography>

        <Rewards {...rewards} onClaimAllClick={handleClaimAllClick} />
      </Container>

      <PreciousModal
        variant={modalVariant}
        operation={ExtendedOperations.claim}
        tokens={{
          tokenId1: "magic",
          value1:
            transactionKind === TransactionKind.totals
              ? totals.claimable
              : rewards.earned,
        }}
        opened={Boolean(transactionKind)}
        onClose={handleModalClose}
      />
    </Default>
  );
};

export default Claim;
