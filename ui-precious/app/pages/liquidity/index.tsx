import { NextPage } from "next";
import { Container, Typography } from "@mui/material";

import Default from "@/components/Templates/Default";
import { useRedirect } from "@/hooks/navigation";

const LiquidityPage: NextPage = () => {
  useRedirect();

  return (
    <Default>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          mt={4}
          gutterBottom
        >
          Welcome to Liquidity Page
        </Typography>
      </Container>
    </Default>
  );
};

export default LiquidityPage;
