import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WalletConnection } from "@/components";
import { ConnectionSteps } from "@/types/connection";

export default {
  title: "molecules/WalletConnection",
  component: WalletConnection,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof WalletConnection>;

const Template: ComponentStory<typeof WalletConnection> = (args) => (
  <WalletConnection {...args} />
);

export const ConnectStart = Template.bind({});
ConnectStart.args = {
  step: ConnectionSteps.Start,
};

export const UnsupportedNetwork = Template.bind({});
UnsupportedNetwork.args = {
  step: ConnectionSteps.UnsupportedNetwork,
};

export const ConnectWallet = Template.bind({});
ConnectWallet.args = {
  step: ConnectionSteps.ConnectWallet,
};

export const ConfirmPermission = Template.bind({});
ConfirmPermission.args = {
  step: ConnectionSteps.ConfirmPermission,
};

export const ConnectWalletError = Template.bind({});
ConnectWalletError.args = {
  step: ConnectionSteps.ConnectWalletError,
};
