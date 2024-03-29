import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Box, Typography as Typo } from "@mui/material";

const TypeGuide: React.FC = () => {
  const boxStyles = {
    display: "flex",
    gap: 3,
    alignItems: "center",
    border: "1px dotted gray",
    borderRadius: "5px",
    p: 2,
    m: 1,
  };

  return (
    <>
      <h1>Styleguide</h1>
      <h2>Typography</h2>
      <Box>
        <Box sx={boxStyles}>
          <p>h1</p>
          <Typo variant="h1">The quick brown fox jumps over the lazy dog</Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>h2</p>
          <Typo variant="h2">The quick brown fox jumps over the lazy dog</Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>h3</p>
          <Typo variant="h3">The quick brown fox jumps over the lazy dog</Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>h3 bold</p>
          <Typo variant="h3" fontWeight="bold">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>h4</p>
          <Typo variant="h4">The quick brown fox jumps over the lazy dog</Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>h4 bold</p>
          <Typo variant="h4" fontWeight="bold">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>h4</p>
          <Typo variant="h4">The quick brown fox jumps over the lazy dog</Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>body2</p>
          <Typo variant="body2">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>body2 bold</p>
          <Typo variant="body2" fontWeight="bold">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>body2</p>
          <Typo variant="body2">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>body3</p>
          <Typo variant="body3">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>button</p>
          <Typo variant="button">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
        <Box sx={boxStyles}>
          <p>caption</p>
          <Typo variant="caption">
            The quick brown fox jumps over the lazy dog
          </Typo>
        </Box>
      </Box>
    </>
  );
};

export default {
  title: "Style/Typography",
  component: TypeGuide,
} as ComponentMeta<typeof TypeGuide>;

const Template: ComponentStory<typeof TypeGuide> = (args) => (
  <TypeGuide {...args} />
);

export const Typography = Template.bind({});
Typography.args = {};
