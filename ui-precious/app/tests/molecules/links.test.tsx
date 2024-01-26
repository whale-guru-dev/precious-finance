import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@/../storybook/stories/molecules/links.stories";

const { DefaultLinks, CustomLinks } = composeStories(stories);

describe("<Links />", () => {
  test("renders <DefaultLinks /> properly", () => {
    render(<DefaultLinks />);

    expect(screen.getAllByText("MAGIC token")).toHaveLength(2);
    expect(screen.getAllByTestId("OpenInNewRoundedIcon")).toHaveLength(4);
  });

  test("renders <CustomLinks /> properly", () => {
    render(<CustomLinks />);

    expect(screen.getByText("CoinMarketCap")).toBeInTheDocument();
    expect(screen.getAllByTestId("OpenInNewRoundedIcon")).toHaveLength(2);
  });
});
