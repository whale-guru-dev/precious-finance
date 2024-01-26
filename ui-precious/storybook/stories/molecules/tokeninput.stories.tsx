import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TokenInput } from "@/components";
import { TokenOperations } from "@/types/tokenOperations";

export default {
  title: "molecules/TokenInput",
  component: TokenInput,
  argTypes: { onChange: { action: "change" } },
} as ComponentMeta<typeof TokenInput>;

const Template: ComponentStory<typeof TokenInput> = (args) => <TokenInput {...args} />;

export const SingleStake = Template.bind({});
SingleStake.args = {
  tokenId1: "magic",
  value: 100,
  balance: 435,
  operation: TokenOperations.stake,
};

export const MultipleStake = Template.bind({});
MultipleStake.args = {
  tokenId1: "magic",
  value: 100,
  balance: 435,
  tokenId2: "stmagic",
  operation: TokenOperations.stake,
};

export const SingleConvertAndStake = Template.bind({});
SingleConvertAndStake.args = {
  tokenId1: "magic",
  value: 100,
  balance: 435,
  operation: TokenOperations.convertAndStake,
};

export const MultipleUnstake = Template.bind({});
MultipleUnstake.args = {
  tokenId1: "magic",
  value: 100,
  balance: 435,
  tokenId2: "stmagic",
  operation: TokenOperations.unstake,
};

export const SingleUnstake = Template.bind({});
SingleUnstake.args = {
  tokenId1: "magic",
  value: 100,
  balance: 435,
  operation: TokenOperations.unstake,
};

export const SingleStakeWithHelperText = Template.bind({});
SingleStakeWithHelperText.args = {
  tokenId1: "magic",
  value: 100,
  balance: 435,
  helperText: "This is the helper text",
  error: true,
  operation: TokenOperations.stake,
};
