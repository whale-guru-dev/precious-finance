import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Snackbar, SnackbarProps } from "@/components/Atoms";

const SnackbarStories = (props: SnackbarProps) => {
  return <Snackbar {...props} />;
} ;

export default {
  title: "atoms/Snackbar",
  component: SnackbarStories,
} as ComponentMeta<typeof Snackbar>;

const Template: ComponentStory<typeof SnackbarStories> = (args) => (
  <SnackbarStories {...args} />
);

export const SnackbarSuccess = Template.bind({});
SnackbarSuccess.args = {
  severity: "success",
  alertText: "I will close in 6 seconds...",
  href: "https://etherscan.io/",
  show: true,
};

export const SnackbarError = Template.bind({});
SnackbarError.args = {
  severity: "error",
  alertText: "I will close in 6 seconds...",
  href: "https://kovan.etherscan.io/",
  show: true,
};

export const SnackbarInfo = Template.bind({});
SnackbarInfo.args = {
  severity: "info",
  alertText: "I will close in 6 seconds...",
  href: "https://www.google.com/",
  show: true,
};

export const SnackbarWarning = Template.bind({});
SnackbarWarning.args = {
  severity: "warning",
  alertText: "I will close in 6 seconds...",
  href: "https://www.yahoo.com/",
  show: true,
};

export const SnackbarSuccessNoAction = Template.bind({});
SnackbarSuccessNoAction.args = {
  severity: "success",
  alertText: "I will close in 6 seconds...",
  href: "https://etherscan.io/",
  noAction: true,
  show: true,
};

export const SnackbarErrorNoAction = Template.bind({});
SnackbarErrorNoAction.args = {
  severity: "error",
  alertText: "I will close in 6 seconds...",
  href: "https://kovan.etherscan.io/",
  noAction: true,
  show: true,
};

export const SnackbarInfoNoAction = Template.bind({});
SnackbarInfoNoAction.args = {
  severity: "info",
  alertText: "I will close in 6 seconds...",
  href: "https://www.google.com/",
  noAction: true,
  show: true,
};

export const SnackbarWarningNoAction = Template.bind({});
SnackbarWarningNoAction.args = {
  severity: "warning",
  alertText: "I will close in 6 seconds...",
  href: "https://www.yahoo.com/",
  noAction: true,
  show: true,
};
