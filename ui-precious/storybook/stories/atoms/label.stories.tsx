import { Label, LabelProps } from "@/components";
import { ComponentStory, Story } from "@storybook/react";

export default {
  title: "atoms/Label",
  component: Label,
};

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const LabelOnly = Template.bind({});

LabelOnly.args = {
  label: "Label master here",
  TypographyProps: {},
};

export const LabelWithBalance = Template.bind({});

LabelWithBalance.args = {
  label: "Amount of Magic to convert and Stake",
  BalanceProps: {
    balance: "435.00",
  },
};
