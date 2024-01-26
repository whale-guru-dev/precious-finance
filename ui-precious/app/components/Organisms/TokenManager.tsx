import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from "@mui/material";

import { TokenOperations } from "@/types/tokenOperations";
import { Button } from "../Atoms";
import { TokenInput, TokenInputProps } from "../Molecules";
import { formatOperation } from "@/utils/formatters";

export interface TokenManagerProps {
  InputProps: TokenInputProps;
  multiStep?: boolean;
  approved: boolean;
  onInputChange: (value: BigNumber | number) => void;
  onButtonClick: (step: number) => void;
}

const containerStyle = (theme: Theme) =>
  ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "sm",
    gap: 2.5,
    [theme.breakpoints.down("xl")]: {
      gap: 0.5,
    },
    [theme.breakpoints.down("sm")]: {
      gap: 3,
    },
  } as const);

const rowStyle = (theme: Theme) =>
  ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    gap: 2.5,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 0.25,
    },
  } as const);

const buttonStyle = (theme: Theme) =>
  ({
    textTransform: "capitalize",
    minWidth: "10rem",
    mb: "1.875rem",
    alignSelf: "flex-end",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  } as const);

const validateInputValue = (
  value: BigNumber | number,
  max: BigNumber | number
) => {
  if (value <= 0) {
    return "Value should be greater than 0.";
  } else if (value > max) {
    return "Insufficient balance.";
  }

  return " ";
};

const strepperSteps = (approved: boolean, secondStep: TokenOperations) => {
  return [approved ? "Approved" : "Approve", secondStep];
};

export const TokenManager: React.FC<TokenManagerProps> = ({
  InputProps,
  multiStep = true,
  approved,
  onInputChange,
  onButtonClick,
}) => {
  const [isError, setIsError] = useState(false);
  const [validityMessage, setValidityMessage] = useState(
    validateInputValue(InputProps.value, InputProps.balance)
  );
  const steps = strepperSteps(approved, InputProps.operation);
  const currentStep = approved ? 1 : 0;

  useEffect(() => {
    setValidityMessage(
      validateInputValue(InputProps.value, InputProps.balance)
    );
  }, [InputProps.value, InputProps.balance]);

  const handleInactiveClick = () => {
    setIsError(true);
  };

  const handleInputChange = (value: BigNumber | number) => {
    setIsError(false);
    setValidityMessage(validateInputValue(value, InputProps.balance));
    onInputChange(value);
  };

  const handleButtonClick = () => {
    onButtonClick(currentStep);
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={rowStyle}>
        <TokenInput
          {...InputProps}
          error={isError}
          helperText={validityMessage}
          onChange={handleInputChange}
        />
        <Button
          sx={buttonStyle}
          inactive={Boolean(validityMessage.trim())}
          onClick={handleButtonClick}
          onInactiveClick={handleInactiveClick}
        >
          {multiStep ? formatOperation(steps[currentStep]) : InputProps.operation}
        </Button>
      </Box>
      {multiStep && (
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography
                  variant="body3"
                  color="common.white"
                  sx={{ textTransform: "capitalize" }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </Box>
  );
};
