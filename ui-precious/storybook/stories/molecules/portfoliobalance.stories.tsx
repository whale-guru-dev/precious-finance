import { Box, SxProps } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PortfolioBalance, PortfolioTypes } from "@/components";

export default {
  title: "molecules/PortfolioBalance",
  component: PortfolioBalance,
} as ComponentMeta<typeof PortfolioBalance>;

const Template: ComponentStory<typeof PortfolioBalance> = (args) => (
  <PortfolioBalance {...args} />
);

export const Default = Template.bind({});
Default.args = {
  balances: [
    {
      label: "Earned Magic",
      value: 10,
      type: PortfolioTypes.value,
    },
    {
      label: "Earned govMagic",
      value: 20,
      type: PortfolioTypes.value,
    },
    {
      label: "stMagic staked",
      value: 30,
      type: PortfolioTypes.value,
    },
    {
      label: "vAPR",
      value: 40.23,
      type: PortfolioTypes.percentage,
      hint: "Variable Annual Percentage Rate",
    },
    {
      label: "TVL",
      value: 5300000,
      type: PortfolioTypes.locked,
    },
  ],
};
