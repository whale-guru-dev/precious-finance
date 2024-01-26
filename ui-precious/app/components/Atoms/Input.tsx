import React from "react";
import {
  Button,
  ButtonProps as MuiButtonProps,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import Image from "next/image";

import { Label, LabelProps } from "./Label";

export type InputProps = {
  LabelProps?: LabelProps;
  alert?: boolean;
  buttonLabel?: string;
  ButtonProps?: MuiButtonProps;
  referenceText?: string;
  icons?: string[];
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  noBorder?: boolean;
} & Omit<TextFieldProps, "label" | "variant">;

const buttonStyle = {
  minWidth: 0,
  padding: "0.25rem",
  textTransform: "uppercase",
} as const;

const endAdornmentStyle = {
  display: "flex",
  flex: "none",
  "& .MuiBox-root": {
    marginLeft: "1.25rem",
  },
  "& .MuiTypography-root": {
    marginLeft: "0.5rem",
    textTransform: "uppercase",
  },
};

const iconsStyle = {
  "& > span:not(:first-of-type)": {
    marginLeft: "-0.25rem !important",
  },
};

export const Input: React.FC<InputProps> = ({
  LabelProps,
  alert,
  buttonLabel,
  ButtonProps,
  referenceText,
  icons,
  setValue,
  children,
  noBorder,
  InputProps,
  ...rest
}) => {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {LabelProps && <Label {...LabelProps} />}
      <TextField
        fullWidth
        onChange={handleChange}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <Box sx={endAdornmentStyle}>
              {buttonLabel && (
                <Button
                  sx={buttonStyle}
                  size="small"
                  disabled={rest.disabled}
                  {...ButtonProps}
                >
                  {buttonLabel}
                </Button>
              )}
              {icons && (
                <Box display="flex" sx={iconsStyle}>
                  {icons.map((icon) => (
                    <Image
                      key={icon}
                      src={icon}
                      alt="Token logo"
                      width="24"
                      height="24"
                    />
                  ))}
                </Box>
              )}
              {referenceText && (
                <Typography
                  data-testid="referenceText"
                  variant="body3"
                  alignSelf="center"
                  color={
                    rest.disabled
                      ? `${theme.palette.common.black}40`
                      : "primary.purple"
                  }
                  whiteSpace="nowrap"
                >
                  {referenceText}
                </Typography>
              )}
            </Box>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: alert ? theme.palette.warning.main : undefined,
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: noBorder ? 0 : 1,
              borderColor: alert ? `${theme.palette.warning.main}` : undefined,
            },
          },
        }}
        {...rest}
      >
        {children}
      </TextField>
    </Box>
  );
};
