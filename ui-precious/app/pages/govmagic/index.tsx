import { useEffect } from "react";
import { NextPage } from "next";
import { Container, Theme } from "@mui/material";

import Default from "@/components/Templates/Default";
import { useRedirect } from "@/hooks/navigation";
import ClaimFormWithTitle from "./ClaimFormWithTitle";
import PageContents from "./PageContents";
import { useStore } from "@/stores/root";

const containerStyle = (theme: Theme) => ({
  mb: theme.spacing(30),
  [theme.breakpoints.down("md")]: {
    mb: theme.spacing(0),
  },
});

const GovMagicPage: NextPage = () => {
  const connectedAndConfirmed = useRedirect();
  const { fetchClaimTotals } = useStore(({ claim }) => claim);
  const { fetchDetails } = useStore(({ govmagic }) => govmagic);

  useEffect(() => {
    fetchDetails();
    fetchClaimTotals();
  }, []);

  if (!connectedAndConfirmed) return null;

  return (
    <Default>
      <Container sx={containerStyle} maxWidth="lg">
        <ClaimFormWithTitle />
        <PageContents />
      </Container>
    </Default>
  );
};

export default GovMagicPage;
