import { Input, InputProps } from "@/components";
import { Box, SxProps } from "@mui/material";
import { Story } from "@storybook/react";

const InputsStories = (props: InputProps) => {
  const boxStyle: Partial<SxProps> = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    resize: "both",
    overflow: "auto",
    padding: 2,
  };

  return (
    <Box sx={boxStyle}>
      <Input value="Input text" {...props} />
      <Input placeholder="Placeholder text" {...props} />
      <Input value="Disabled text" {...props} disabled />
      <Input value="Error text" {...props} error />
      <Input value="Alert text" {...props} alert />
    </Box>
  );
};
export default {
  title: "atoms/Input",
  component: Input,
};

const Template: Story<typeof InputsStories> = (args) => (
  <InputsStories {...args} />
);

const labelProps = {
  label: "Label master here",
  TypographyProps: {},
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  LabelProps: labelProps,
};

export const TextAndButton = Template.bind({});
TextAndButton.args = {
  buttonLabel: "Max",
  LabelProps: labelProps,
};

export const TextAndReference = Template.bind({});
TextAndReference.args = {
  referenceText: "Reference Text",
  LabelProps: labelProps,
};

export const TextWithBalance = Template.bind({});
TextWithBalance.args = {
  LabelProps: {
    ...labelProps,
    BalanceProps: {
      balance: "435.00",
      BalanceTypographyProps: {},
    },
  },
};

export const TextWithSingleIcon = Template.bind({});
TextWithSingleIcon.args = {
  icons: ["/tokens/govmagic.svg"],
  LabelProps: {
    ...labelProps,
  },
};

export const TextWithMultipleIcons = Template.bind({});
TextWithMultipleIcons.args = {
  icons: ["/tokens/govmagic.svg", "/tokens/magic.svg"],
  LabelProps: {
    ...labelProps,
  },
};

export const TextWithAllAssets = Template.bind({});
TextWithAllAssets.args = {
  referenceText: "Reference Text",
  buttonLabel: "Max",
  icons: ["/tokens/govmagic.svg", "/tokens/magic.svg"],
  LabelProps: {
    ...labelProps,
    BalanceProps: {
      balance: "435.00",
      BalanceTypographyProps: {},
    },
  },
};
