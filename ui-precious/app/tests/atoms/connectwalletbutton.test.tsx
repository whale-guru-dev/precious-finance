import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/atoms/connectwalletbutton.stories";

const { NotConnected, Connected } = composeStories(stories);

describe("<ConnectWalletButton />", () => {
  test("renders not connected state properly", () => {
    render(<NotConnected />);

    expect(screen.getByText("Connect to a wallet")).toBeInTheDocument();
    expect(screen.queryByTestId("connectIndicator")).not.toBeInTheDocument();
  });

  test("renders connected state properly", () => {
    render(<Connected />);

    expect(screen.getByText("0x4d2183f...v76a")).toBeInTheDocument();
    expect(screen.queryByTestId("connectIndicator")).toBeInTheDocument();
  });
});
