import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box } from "@mui/material";

import { TokenManager } from "@/components/Organisms/TokenManager";
import { TokenOperations } from "@/types/tokenOperations";

export default {
  title: "organisms/TokenManager",
  component: TokenManager,
  argTypes: {
    onInputChange: { action: "input" },
    onButtonClick: { action: "click" },
  },
} as ComponentMeta<typeof TokenManager>;

const Template: ComponentStory<typeof TokenManager> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <TokenManager {...args} />
  </Box>
);

export const SingleStep = Template.bind({});
SingleStep.args = {
  approved: false,
  multiStep: false,
  InputProps: {
    tokenId1: "magic",
    value: 100,
    balance: 435,
    operation: TokenOperations.unstake,
  },
};

export const FirstStepValid = Template.bind({});
FirstStepValid.args = {
  approved: false,
  InputProps: {
    tokenId1: "magic",
    value: 100,
    balance: 435,
    operation: TokenOperations.convertAndStake,
  },
};

export const FirstStepInvalid = Template.bind({});
FirstStepInvalid.args = {
  approved: false,
  InputProps: {
    tokenId1: "magic",
    value: 0,
    balance: 435,
    operation: TokenOperations.convertAndStake,
  },
};

export const SecondStepValid = Template.bind({});
SecondStepValid.args = {
  approved: true,
  InputProps: {
    tokenId1: "magic",
    value: 100,
    balance: 435,
    operation: TokenOperations.convertAndStake,
  },
};

export const SecondStepInvalid = Template.bind({});
SecondStepInvalid.args = {
  approved: true,
  InputProps: {
    tokenId1: "magic",
    value: 0,
    balance: 435,
    operation: TokenOperations.convertAndStake,
  },
};

export const SecondStepBalance = Template.bind({});
SecondStepBalance.args = {
  approved: true,
  InputProps: {
    tokenId1: "magic",
    value: 436,
    balance: 435,
    operation: TokenOperations.convertAndStake,
  },
};
