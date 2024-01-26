import { Box } from "@mui/material";
import { ComponentStory } from "@storybook/react";

import { ConnectWalletButton } from "@/components";

export default {
  title: "atoms/ConnectWalletButton",
  component: ConnectWalletButton,
  argTypes: { onClick: { action: "clicked" } },
};

const Template: ComponentStory<typeof ConnectWalletButton> = (args) => (
  <ConnectWalletButton {...args} />
);

export const NotConnected = Template.bind({});
NotConnected.args = {
  connected: false,
  label: "Connect to a wallet",
};

export const Connected = Template.bind({});
Connected.args = {
  connected: true,
  label: "0x4d2183f...v76a",
};
