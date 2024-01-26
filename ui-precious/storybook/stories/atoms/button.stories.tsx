import { ComponentStory, Story } from "@storybook/react";
import { Typography, Box, SxProps } from "@mui/material";

import { Button } from "@/components";

export default {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    onClick: { action: "active clicked" },
    onInactiveClick: { action: "inactive clicked" },
  },
};

type Size = "large" | "medium" | "small";
type Variant = "contained" | "outlined" | "text";
const ButtonGuide: React.FC = () => {
  const sizes: Size[] = ["medium", "small"];
  const variants: Variant[] = ["contained", "outlined", "text"];

  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Styleguide
      </Typography>
      <Typography variant="h4">Buttons (Active)</Typography>
      <Box
        sx={{
          display: "grid",
          width: "80%",
          gridTemplateColumns: "repeat(2, minmax(15rem, 1fr))",
          gridGap: "1rem",
          margin: "2rem 0",
        }}
      >
        {variants.map((variant) => {
          return sizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              onClick={() => {}}
            >
              {variant}-{size}
            </Button>
          ));
        })}
      </Box>

      <Typography variant="h4">Buttons (Disabled)</Typography>
      <Box
        sx={{
          display: "grid",
          width: "80%",
          gridTemplateColumns: "repeat(2, minmax(15rem, 1fr))",
          gridGap: "1rem",
          margin: "2rem 0",
        }}
      >
        {variants.map((variant) => {
          return sizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              disabled
              onClick={() => {}}
            >
              {variant}-{size}
            </Button>
          ));
        })}
      </Box>
    </>
  );
};

const DefaultTemplate: ComponentStory<typeof ButtonGuide> = (args) => (
  <ButtonGuide {...args} />
);

const boxStyle: Partial<SxProps> = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
};

const Template: Story<typeof Button> = (args) => (
  <Box sx={boxStyle}>
    <Button {...args}>{args.variant} active</Button>
    <Button {...args} inactive>
      {args.variant} inactive
    </Button>
    <Button {...args} disabled>
      {args.variant} disabled
    </Button>
  </Box>
);

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const ContainedWithInactive = Template.bind({});
ContainedWithInactive.args = {
  variant: "contained",
};

export const OutlinedWithInactive = Template.bind({});
OutlinedWithInactive.args = {
  variant: "outlined",
};
