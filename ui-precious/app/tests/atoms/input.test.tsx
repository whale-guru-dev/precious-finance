import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/atoms/input.stories"; // import all stories from the stories file

const {
  TextOnly,
  TextAndButton,
  TextAndReference,
  TextWithBalance,
  TextWithSingleIcon,
  TextWithMultipleIcons,
  TextWithAllAssets,
} = composeStories(stories);

test("renders Input/Text Only Inputs", () => {
  render(<TextOnly />);
  expect(screen.getByDisplayValue("Input text")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Placeholder text")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Disabled text")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Error text")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Alert text")).toBeInTheDocument();
});

test("renders Input/Text with Button", () => {
  render(<TextAndButton />);

  expect(screen.getAllByText("Max")[0]).toBeInTheDocument();
});

test("renders Input/Text with reference text", () => {
  render(<TextAndReference />);

  expect(screen.getAllByText("Reference Text")[0]).toBeInTheDocument();
});

test("renders Input/Text with balance text", () => {
  render(<TextWithBalance />);

  expect(screen.getAllByText("435.00")[0]).toBeInTheDocument();
});

test("renders Input/Text with one icon", () => {
  render(<TextWithSingleIcon />);

  expect(screen.getAllByAltText("Token logo")[0]).toBeInTheDocument();
});

test("renders Input/Text with two icons", () => {
  render(<TextWithMultipleIcons />);

  expect(screen.getAllByAltText("Token logo").length).toBe(10);
});

test("renders Input/Text with all assets", () => {
  render(<TextWithAllAssets />);

  expect(screen.getAllByText("Max")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Reference Text")[0]).toBeInTheDocument();
  expect(screen.getAllByText("435.00")[0]).toBeInTheDocument();
  expect(screen.getAllByAltText("Token logo")[0]).toBeInTheDocument();
});
