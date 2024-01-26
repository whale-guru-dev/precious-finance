import { FC } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { keyframes } from "@mui/system";
import {
  AlertColor,
  Grid,
  IconButton,
  Slide,
  SlideProps,
  Snackbar as MuiSnackbar,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/Info";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const DEFAULT_COLORS = {
  color: "primary.purple",
  backgroundColor: "backdrop.toasts",
  borderColor: "secondary",
};

const DEFAULT_ICON_STYLE = {
  color: "secondary",
  width: "2rem",
  height: "2rem",
};

const progress = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const boxStyle = (theme: Theme) => ({
  maxWidth: "30.75rem",
  backdropFilter: "blur(0.5rem)",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
  },
});

const SEVERITIES = {
  success: {
    ...DEFAULT_COLORS,
    icon: <CheckCircleRoundedIcon sx={DEFAULT_ICON_STYLE} />,
  },
  error: {
    ...DEFAULT_COLORS,
    icon: <ErrorRoundedIcon sx={DEFAULT_ICON_STYLE} />,
  },
  info: {
    ...DEFAULT_COLORS,
    icon: <InfoRoundedIcon sx={DEFAULT_ICON_STYLE} />,
  },
  warning: {
    ...DEFAULT_COLORS,
    icon: <WarningAmberRoundedIcon sx={DEFAULT_ICON_STYLE} />,
  },
};

export type SnackbarProps = {
  severity: AlertColor;
  alertText: string;
  href: string;
  show: boolean;
  noAction?: boolean;
  delay?: number;
  onClose?: () => void;
};

const SlideTransition: FC<SlideProps> = (props) => {
  return <Slide {...props} direction="left" />;
};

export const Snackbar: FC<Partial<SnackbarProps>> = ({
  alertText = "",
  severity = "success",
  href = "",
  show = false,
  noAction = false,
  delay = 6000,
  onClose = () => {},
}) => {
  const theme = useTheme();

  const handleClose = () => {
    onClose();
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      open={show}
      onClose={handleClose}
      autoHideDuration={delay}
    >
      <Box
        display="flex"
        flexDirection="column"
        borderRadius="0.5rem"
        overflow="hidden"
        border={1}
        borderColor={SEVERITIES[severity].borderColor}
        bgcolor={SEVERITIES[severity].backgroundColor}
        sx={boxStyle}
      >
        <Grid
          container
          alignItems="center"
          padding={theme.spacing(2.5, 1, 2.5, 2.5)}
          flexWrap="nowrap"
        >
          <Grid item display="flex" color="secondary">
            {SEVERITIES[severity].icon}
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1.5}
            paddingLeft="0.75rem"
          >
            <Typography variant="body2" fontWeight="bold" lineHeight="unset">
              {alertText}
            </Typography>
            <Link variant="caption" href={href} target="_blank" rel="noopener">
              View in Explorer
            </Link>
          </Grid>
          {!noAction && (
            <Grid item alignSelf="flex-start" marginLeft="auto">
              <IconButton
                onClick={handleClose}
                disableRipple
                sx={{ py: 0, marginLeft: theme.spacing(2) }}
              >
                <CloseRoundedIcon color="secondary" />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <Box
          height="0.5rem"
          mt="-0.5rem"
          width="0"
          bgcolor={SEVERITIES[severity].color}
          sx={{
            animation: `${progress} ${delay}ms linear`,
          }}
        />
      </Box>
    </MuiSnackbar>
  );
};
