import { useEffect } from "react";
import { NextPage } from "next";
import { Container, useTheme } from "@mui/material";

import Default from "@/components/Templates/Default";
import { useRedirect } from "@/hooks/navigation";
import ClaimFormWithTitle from "./ClaimFormWithTitle";
import PageContents from "./PageContents";
import { useStore } from "@/stores/root";

const MagicPage: NextPage = () => {
  const theme = useTheme();
  const connectedAndConfirmed = useRedirect();
  const { fetchClaimTotals } = useStore(({ claim }) => claim);
  const { fetchDetails } = useStore(({ magic }) => magic);

  useEffect(() => {
    fetchDetails();
    fetchClaimTotals();
  }, []);

  if (!connectedAndConfirmed) return null;

  return (
    <Default>
      <Container sx={{ mb: theme.spacing(30) }} maxWidth="lg">
        <ClaimFormWithTitle />
        <PageContents />
      </Container>
    </Default>
  );
};

export default MagicPage;
