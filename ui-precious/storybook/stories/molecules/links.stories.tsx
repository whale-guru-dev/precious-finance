import { Box, SxProps } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Links } from "@/components";

export default {
  title: "molecules/Links",
  component: Links,
} as ComponentMeta<typeof Links>;

const Template: ComponentStory<typeof Links> = (args) => <Links {...args} />;

export const DefaultLinks = Template.bind({});
DefaultLinks.args = {};

export const CustomLinks = Template.bind({});
CustomLinks.args = {
  links: [
    {
      label: "CoinMarketCap",
      src: "https://coinmarketcap.com/",
    },
    {
      label: "Exchanges",
      src: "https://coinmarketcap.com/rankings/exchanges/",
    },
  ],
};
