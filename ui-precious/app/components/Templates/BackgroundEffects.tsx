import { useRouter } from "next/router";
import { Box, Theme, useTheme } from "@mui/material";

const containerStyleFactory = (theme: Theme, time: string, move: string) => ({
  height: "100%",
  width: "100%",
  position: "absolute",
  animation: `adjust-opacity ${time} linear infinite, ${move} ${time} linear infinite`,
  paddingTop: theme.spacing(37),
});

const imageStyleFactory = (src: string) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url('${src}')`,
  backgroundPosition: "0% center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
});

const containerStyle = (theme: Theme) =>
  ({
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    "& .container-1": {
      ...containerStyleFactory(theme, "25s", "move-1"),
    },

    "& .container-2": {
      ...containerStyleFactory(theme, "25s", "move-2"),
    },

    "& .container-3": {
      ...containerStyleFactory(theme, "35s", "move-1"),
    },

    "& .container-4": {
      ...containerStyleFactory(theme, "35s", "move-2"),
    },

    "& .img-1": {
      ...imageStyleFactory("/background/fog_1.png"),
    },

    "& .img-2": {
      ...imageStyleFactory("/background/fog_2.png"),
    },

    "@keyframes move-1": {
      "0%": {
        visibility: "visible",
        left: 0,
      },
      "50%": {
        visibility: "hidden",
        left: "-100%",
      },
      "51%": {
        visibility: "hidden",
        left: "100%",
      },
      "100%": {
        visibility: "visible",
        left: "0%",
      },
    },

    "@keyframes move-2": {
      "0%": {
        left: "100%",
      },
      "100%": {
        left: "-100%",
      },
    },

    "@keyframes adjust-opacity": {
      "0%": {
        opacity: 0.8,
      },
      "27%": {
        opacity: 0.2,
      },
      "52%": {
        opacity: 0.6,
      },
      "68%": {
        opacity: 0.3,
      },
      "100%": {
        opacity: 0.8,
      },
    },
  } as const);

export const BackgroundEffects = () => {
  const theme = useTheme();
  const router = useRouter();

  const background = {
    ["/"]: theme.palette.backdrop.magic,
    ["/magic"]: theme.palette.backdrop.magic,
    ["/govmagic"]: theme.palette.backdrop.govmagic,
    ["/claim"]: theme.palette.backdrop.claim,
    ["/liquidity"]: theme.palette.backdrop.liquidity,
  }[router.pathname];

  return (
    <Box sx={[containerStyle, { background }]}>
      {Array.from(Array(4).keys()).map((k) => (
        <Box key={k} className={`container-${k + 1}`}>
          <Box className={`img-${(k % 2) + 1}`} />
        </Box>
      ))}
    </Box>
  );
};
