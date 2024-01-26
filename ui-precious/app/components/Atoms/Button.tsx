import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  Box,
  Button as MuiButton,
  ButtonPropsVariantOverrides,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export interface ButtonProps extends MuiButtonProps {
  children?: React.ReactNode;
  inactive?: boolean;
  variant?: OverridableStringUnion<
    "text" | "outlined" | "contained",
    ButtonPropsVariantOverrides
  >;
  sx?: SxProps<Theme>;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onInactiveClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonStyleFactory = (theme: Theme, width: number) =>
  ({
    position: "relative",
    overflow: "hidden",

    "& .mask": {
      position: "absolute",
      backgroundColor: alpha(
        theme.palette.common.white,
        theme.custom.opacity.main
      ),
      height: width / 2,
      transform: `translate3d(-100%, 50px, 0) rotate3d(0, 0, 1, 45deg)`,
      transition: "all 1.1s cubic-bezier(0.19, 1, 0.22, 1)",
      width: width,
    },

    "&:hover .mask": {
      backgroundColor: alpha(
        theme.palette.common.white,
        theme.custom.opacity.darker
      ),
      transform: `translate3d(100%, -50px, 0) rotate3d(0, 0, 1, 90deg)`,
    },
  } as const);

export const Button: React.FC<ButtonProps> = ({
  children,
  inactive = false,
  variant = "contained",
  sx = [],
  onClick,
  onInactiveClick = () => {},
  ...rest
}) => {
  const theme = useTheme();
  const buttonElement = useRef<HTMLButtonElement>(null);
  const [buttonStyle, setButtonStyle] = useState(
    buttonStyleFactory(theme, 1000)
  );
  const calculatedVariant = inactive ? "outlined" : variant;
  const combinedButtonStyles = [
    buttonStyle,
    ...(Array.isArray(sx) ? sx : [sx]),
  ];

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      buttonElement.current &&
        setButtonStyle(
          buttonStyleFactory(theme, buttonElement.current.offsetWidth)
        );
    });
    buttonElement.current && resizeObserver.observe(buttonElement.current);

    return () => resizeObserver.disconnect();
  }, [buttonElement]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    inactive ? onInactiveClick(event) : onClick(event);
  };

  return (
    <MuiButton
      sx={combinedButtonStyles}
      variant={calculatedVariant}
      ref={buttonElement}
      onClick={handleClick}
      {...rest}
    >
      {children}
      <Box className="mask"></Box>
    </MuiButton>
  );
};
