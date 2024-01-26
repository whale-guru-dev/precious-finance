import { Box, Typography, Link as MuiLink, Grid, Theme } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

interface LinkProps {
  label: string;
  src: string;
}

export interface LinksProps {
  links?: LinkProps[];
}

const defaultLinks = [
  {
    label: "MAGIC token",
    src: "https://coinmarketcap.com/currencies/magic-token/",
  },
  {
    label: "MAGIC token",
    src: "https://www.coingecko.com/coins/magic",
  },
  {
    label: "Rewards contract address",
    src: "https://www.coinbase.com/price/magic-token",
  },
  {
    label: "Rewards contract address",
    src: "https://www.treasure.lol/",
  },
];

const containerStyle = (theme: Theme) => ({
  justifyContent: "space-around",
  borderTop: `1px solid ${theme.palette.secondary.pearl}`,
  pt: theme.spacing(2),
});

const Link: React.FC<LinkProps> = ({ label, src }) => {
  return (
    <Grid item display="flex" alignItems="center" gap={2}>
      <Typography variant="caption" color="secondary.pearl">
        {label}
      </Typography>
      <MuiLink display="flex" href={src} target="_blank" rel="noopener">
        <OpenInNewRoundedIcon sx={{ color: "links.main" }} />
      </MuiLink>
    </Grid>
  );
};

export const Links: React.FC<LinksProps> = ({ links = defaultLinks }) => {
  return (
    <Grid container sx={containerStyle}>
      {links.map(({ label, src }) => (
        <Link label={label} src={src} key={label + src} />
      ))}
    </Grid>
  );
};
