import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

export enum LogoVariants {
  large = "large",
  medium = "medium",
  small = "small",
}
export interface LogoProps {
  responsive?: boolean;
  variant?: LogoVariants;
}

export const Logo: React.FC<LogoProps> = ({ responsive = true, variant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const shouldShowLarge =
    (responsive && isDesktop) ||
    (!responsive && variant === LogoVariants.large);
  const shouldShowMedium =
    (responsive && isTablet) ||
    (!responsive && variant === LogoVariants.medium);
  const shouldShowSmall =
    (responsive && isMobile) || (!responsive && variant === LogoVariants.small);

  if (shouldShowSmall) {
    return <Image src="/logo/logo-sm.svg" alt="logo" width="100" height="30" />;
  } else if (shouldShowMedium) {
    return <Image src="/logo/logo-md.svg" alt="logo" width="158" height="44" />;
  } else if (shouldShowLarge) {
    return <Image src="/logo/logo-lg.svg" alt="logo" width="230" height="64" />;
  }

  return null;
};
