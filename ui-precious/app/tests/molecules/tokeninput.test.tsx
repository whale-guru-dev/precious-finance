import { render, screen, fireEvent } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/molecules/tokeninput.stories";

const { SingleStake, MultipleStake, SingleConvertAndStake, MultipleUnstake } =
  composeStories(stories);

describe("TokenInput", () => {
  test("renders single token with stake text", () => {
    render(<SingleStake />);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByText("Amount of Magic to stake")).toBeInTheDocument();
    expect(screen.getByText("435.00")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByTestId("referenceText")).toBeInTheDocument();
  });

  test("renders multiple tokens with stake text", () => {
    render(<MultipleStake />);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(
      screen.getByText("Amount of Magic/stMagic to stake")
    ).toBeInTheDocument();
    expect(screen.getByText("435.00")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.queryByTestId("referenceText")).not.toBeInTheDocument();
  });

  test("renders single token with convert and stake text", () => {
    render(<SingleConvertAndStake />);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(
      screen.getByText("Amount of Magic to convert & stake")
    ).toBeInTheDocument();
    expect(screen.getByText("435.00")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByTestId("referenceText")).toBeInTheDocument();
  });

  test("renders single token with unstake text", () => {
    render(<MultipleUnstake />);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(
      screen.getByText("Amount of stMagic to unstake")
    ).toBeInTheDocument();
    expect(screen.getByText("435.00")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByTestId("referenceText")).toBeInTheDocument();
  });

  test("renders the component and updates the value with balance if Max is clicked", () => {
    render(<SingleStake />);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();

    const button = screen.getByText("Max");
    fireEvent.click(button);

    expect(screen.getByDisplayValue("435")).toBeInTheDocument();
  });
});
