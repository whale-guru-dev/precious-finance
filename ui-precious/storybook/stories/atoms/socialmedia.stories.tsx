import { ComponentStory } from "@storybook/react";

import { SocialMedia } from "@/components";

export default {
  title: "atoms/SocialMedia",
  component: SocialMedia,
  argTypes: {
    onTwitterClick: { action: "twitter clicked" },
    onMediumClick: { action: "medium clicked" },
    onDiscordClick: { action: "discord clicked" },
    onGitBookClick: { action: "gitbook clicked" },
  },
};

const Template: ComponentStory<typeof SocialMedia> = (args) => (
  <SocialMedia {...args} />
);

export const Default = Template.bind({});
Default.args = {};
