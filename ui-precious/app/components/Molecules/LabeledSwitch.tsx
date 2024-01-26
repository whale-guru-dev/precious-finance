import React from "react";
import { Label } from "../Atoms";
import { Box, BoxProps, Switch, SwitchProps } from "@mui/material";

export type LabeledSwitchProps = {
  label: string;
  textFirst?: boolean;
  SwitchProps: SwitchProps;
} & BoxProps;

export const LabeledSwitch: React.FC<LabeledSwitchProps> = ({
  label,
  textFirst = true,
  SwitchProps,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={textFirst ? "row" : "row-reverse"}
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "fit-content" }}
      component="div"
      gap={1.5}
    >
      <Label label={label} mb={0} TypographyProps={{ fontSize: "0.875rem" }} />
      <Switch {...SwitchProps} />
    </Box>
  );
};
