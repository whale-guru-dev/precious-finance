import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/atoms/label.stories"; // import all stories from the stories file

const { LabelOnly, LabelWithBalance } = composeStories(stories);

test("renders Text Only Selects", () => {
  render(<LabelOnly />);
  expect(screen.getByText("Label master here")).toBeInTheDocument();
});

test("Render <TooltipLabelsWithBalance />", () => {
  render(<LabelWithBalance />);
  expect(
    screen.getByText("Amount of Magic to convert and Stake")
  ).toBeInTheDocument();
  expect(screen.getByText("435.00")).toBeInTheDocument();
});
