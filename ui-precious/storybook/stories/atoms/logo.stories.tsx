import { SxProps, Box } from "@mui/material";
import { ComponentStory } from "@storybook/react";

import { Logo } from "@/components";

export default {
  title: "atoms/Logo",
  component: Logo,
};

const ResponsiveTemplate: ComponentStory<typeof Logo> = (args) => (
  <Logo {...args} />
);

const NonResponsiveTemplate: ComponentStory<typeof Logo> = (args) => {
  const boxStyle: Partial<SxProps> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  };

  return (
    <Box sx={boxStyle}>
      <Logo variant="large" {...args} />
      <Logo variant="medium" {...args} />
      <Logo variant="small" {...args} />
    </Box>
  );
};

export const Responsive = ResponsiveTemplate.bind({});
Responsive.args = {};

export const NonResponsive = NonResponsiveTemplate.bind({});
NonResponsive.args = {
  responsive: false,
};
