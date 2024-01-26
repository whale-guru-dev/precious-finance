import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box } from "@mui/material";

import { DesktopFooter } from "@/components/Organisms/DesktopFooter";

export default {
  title: "organisms/DesktopFooter",
  component: DesktopFooter,
} as ComponentMeta<typeof DesktopFooter>;

const Template: ComponentStory<typeof DesktopFooter> = (args) => (
  <Box sx={{ height: "calc(100vh - 2rem)" }}>
    <DesktopFooter {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
