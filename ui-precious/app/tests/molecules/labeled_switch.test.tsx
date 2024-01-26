import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/molecules/labeledSwitch.stories";

const { LabeledSwitches } = composeStories(stories);

test("render <LabeledSwitches /> without icon properly", () => {
  const { container } = render(<LabeledSwitches />);

  expect(screen.getByText("Text element")).toBeInTheDocument();
  expect(container.getElementsByClassName("MuiSwitch-root").length).toBe(1);
});
