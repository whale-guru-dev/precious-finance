import React from "react";
import { Story } from "@storybook/react";

import { TabsProps, TabItem, Tabs } from "@/components";
import { Box, SxProps } from "@mui/material";

const TabsStories = (props: TabsProps) => {
  const boxStyle: Partial<SxProps> = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    resize: "both",
    overflow: "auto",
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={boxStyle}>
      <Tabs {...props} value={value} onChange={handleChange} />
    </Box>
  );
};
export default {
  title: "atoms/Tabs",
  component: Tabs,
};

const items: TabItem[] = [
  {
    label: "Tab 1",
  },
  {
    label: "Tab 2",
  },
  {
    label: "Tab 3",
  },
  {
    label: "Tab 4",
    disabled: true,
  },
];

const Template: Story<typeof TabsStories> = (args) => <TabsStories {...args} />;

export const DefaultSize = Template.bind({});
DefaultSize.args = {
  items,
  variant: "standard",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  items,
  variant: "fullWidth",
};
