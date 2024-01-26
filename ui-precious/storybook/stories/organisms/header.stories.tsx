import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Header } from "@/components/Organisms/Header";

export default {
  title: "organisms/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
