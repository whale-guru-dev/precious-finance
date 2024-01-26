import { FC, ReactNode } from "react";
import { Box, IconButton, Theme, Typography, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Modal } from "@/components/Molecules";

export type MagicModalProps = {
  open: boolean;
  onClick: () => void;
  icon: ReactNode;
  title?: string | null;
  subtitle?: string | null;
  subtitleVariant?: any;
  caption?: string | null;
  button?: ReactNode;
};

const modalStyle = (theme: Theme) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiPaper-root > .MuiBox-root": {
      padding: 0.5,
      "& > .MuiBox-root": {
        maxWidth: "100%",
      },
    },
  },
});

export const MagicModal: FC<MagicModalProps> = ({
  open,
  onClick,
  icon,
  title = null,
  subtitle = null,
  subtitleVariant = "body2",
  caption = null,
  button,
}) => {
  const theme = useTheme();

  return (
    <Modal sx={modalStyle} open={open}>
      <Box
        sx={{
          display: "grid",
          gap: theme.spacing(2),
          mx: theme.spacing(11.25),
          padding: theme.spacing(2.5, 2.5, 5),
          backgroundColor: "backdrop.modal",
          borderRadius: 1,
          border: "solid 1px",
          borderColor: "primary.gold",
          justifyItems: "center",
          [theme.breakpoints.down("sm")]: {
            mx: 0,
          },
        }}
      >
        <Box textAlign="right" width="100%">
          <IconButton sx={{ padding: 0 }} onClick={onClick}>
            <CloseRoundedIcon
              sx={{
                textAlign: "right",
                color: "secondary.pearl",
                "&.MuiSvgIcon-fontSizeLarge": {
                  margin: 0,
                },
              }}
              fontSize="large"
            />
          </IconButton>
        </Box>
        {icon}
        {title && (
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant={subtitleVariant}
            color="secondary.pearl"
            textAlign="center"
          >
            {subtitle}
          </Typography>
        )}
        {caption && (
          <Typography
            variant="caption"
            color="secondary.pearl"
            textAlign="center"
          >
            {caption}
          </Typography>
        )}
        {button}
      </Box>
    </Modal>
  );
};
