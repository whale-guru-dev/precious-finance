import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PreciousModal, ModalVariants } from "@/components";
import { TokenOperations, ExtendedOperations } from "@/types/tokenOperations";

export default {
  title: "molecules/PreciousModal",
  component: PreciousModal,
  argTypes: { onClose: { action: "close" }, onApprove: { action: "approve" } },
} as ComponentMeta<typeof PreciousModal>;

const Template: ComponentStory<typeof PreciousModal> = (args) => (
  <PreciousModal {...args} />
);

/* Confirm Permission */
export const ConfirmPermission = Template.bind({});
ConfirmPermission.args = {
  variant: ModalVariants.confirmPermission,
  operation: null,
  opened: true,
};

/* Approve */
export const ApproveConvertAndStake = Template.bind({});
ApproveConvertAndStake.args = {
  variant: ModalVariants.approve,
  operation: TokenOperations.convertAndStake,
  tokens: {
    tokenId1: "magic",
    tokenId2: "govmagic",
    value1: 100,
    value2: 200,
  },
  opened: true,
};

export const ApproveConvert = Template.bind({});
ApproveConvert.args = {
  variant: ModalVariants.approve,
  operation: TokenOperations.convert,
  tokens: {
    tokenId1: "magic",
    tokenId2: "govmagic",
    value1: 100,
    value2: 200,
  },
  opened: true,
};

export const ApproveStake = Template.bind({});
ApproveStake.args = {
  variant: ModalVariants.approve,
  operation: TokenOperations.stake,
  tokens: {
    tokenId1: "magic",
    value1: 100,
  },
  opened: true,
};

export const ApproveUnstake = Template.bind({});
ApproveUnstake.args = {
  variant: ModalVariants.approve,
  operation: TokenOperations.unstake,
  tokens: {
    tokenId1: "magic",
    value1: 100,
  },
  opened: true,
};

export const ApproveLiquidity = Template.bind({});
ApproveLiquidity.args = {
  variant: ModalVariants.approve,
  operation: ExtendedOperations.liquidity,
  tokens: {
    tokenId1: "magic",
    value1: 100,
  },
  opened: true,
};

export const ApproveLiquidityTokens = Template.bind({});
ApproveLiquidityTokens.args = {
  variant: ModalVariants.approve,
  operation: ExtendedOperations.liquidity,
  tokens: {
    tokenId1: "govmagic",
    tokenId2: "magic",
    value1: 100,
  },
  opened: true,
};

/* Confirm Transaction */
export const ConfirmConvertAndStake = Template.bind({});
ConfirmConvertAndStake.args = {
  variant: ModalVariants.confirmTransaction,
  operation: TokenOperations.convertAndStake,
  tokens: {
    tokenId1: "magic",
    tokenId2: "govmagic",
    value1: 100,
    value2: 200,
  },
  opened: true,
};

export const ConfirmConvert = Template.bind({});
ConfirmConvert.args = {
  variant: ModalVariants.confirmTransaction,
  operation: TokenOperations.convert,
  tokens: {
    tokenId1: "magic",
    tokenId2: "govmagic",
    value1: 100,
    value2: 200,
  },
  opened: true,
};

export const ConfirmStake = Template.bind({});
ConfirmStake.args = {
  variant: ModalVariants.confirmTransaction,
  operation: TokenOperations.stake,
  tokens: {
    tokenId1: "magic",
    value1: 100,
  },
  opened: true,
};

export const ConfirmUnstake = Template.bind({});
ConfirmUnstake.args = {
  variant: ModalVariants.confirmTransaction,
  operation: TokenOperations.unstake,
  tokens: {
    tokenId1: "stmagic",
    tokenId2: "magic",
    value1: 100,
  },
  opened: true,
};

export const ConfirmClaim = Template.bind({});
ConfirmClaim.args = {
  variant: ModalVariants.confirmTransaction,
  operation: ExtendedOperations.claim,
  tokens: {
    tokenId1: "magic",
    value1: 100,
  },
  opened: true,
};

/* Success */
export const SuccessConvertAndStake = Template.bind({});
SuccessConvertAndStake.args = {
  variant: ModalVariants.success,
  operation: TokenOperations.convertAndStake,
  tokens: {
    tokenId1: "magic",
    tokenId2: "govmagic",
    value1: 100,
    value2: 200,
  },
  opened: true,
};

export const SuccessConvert = Template.bind({});
SuccessConvert.args = {
  variant: ModalVariants.success,
  operation: TokenOperations.convert,
  tokens: {
    tokenId1: "magic",
    tokenId2: "govmagic",
    value1: 100,
    value2: 200,
  },
  opened: true,
};

export const SuccessStake = Template.bind({});
SuccessStake.args = {
  variant: ModalVariants.success,
  operation: TokenOperations.stake,
  tokens: {
    tokenId1: "govmagic",
    tokenId2: "magic",
    value1: 100,
  },
  opened: true,
};

export const SuccessUnstake = Template.bind({});
SuccessUnstake.args = {
  variant: ModalVariants.success,
  operation: TokenOperations.unstake,
  tokens: {
    tokenId1: "govmagic",
    tokenId2: "magic",
    value1: 100,
  },
  opened: true,
};

export const SuccessClaim = Template.bind({});
SuccessClaim.args = {
  variant: ModalVariants.success,
  operation: ExtendedOperations.claim,
  tokens: {
    tokenId1: "magic",
    value1: 100,
  },
  opened: true,
};
