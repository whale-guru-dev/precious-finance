import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/atoms/snackbar.stories";

const {
  SnackbarSuccess,
  SnackbarError,
  SnackbarInfo,
  SnackbarWarning,
  SnackbarSuccessNoAction,
} = composeStories(stories);

describe("<Snackbar />", () => {
  test("renders <SnackbarSuccess /> properly", () => {
    render(<SnackbarSuccess />);

    expect(
      screen.getByText("I will close in 6 seconds...")
    ).toBeInTheDocument();
    expect(screen.getByText("View in Explorer")).toBeInTheDocument();
    expect(screen.getByTestId("CloseRoundedIcon")).toBeInTheDocument();
  });

  test("renders <SnackbarSuccess /> icon properly", () => {
    render(<SnackbarSuccess />);

    expect(screen.getByTestId("CheckCircleRoundedIcon")).toBeInTheDocument();
  });

  test("renders <SnackbarError /> icon properly", () => {
    render(<SnackbarError />);

    expect(screen.getByTestId("ErrorRoundedIcon")).toBeInTheDocument();
  });

  test("renders <SnackbarInfo /> icon properly", () => {
    render(<SnackbarInfo />);

    expect(screen.getByTestId("InfoIcon")).toBeInTheDocument();
  });

  test("renders <SnackbarWarning /> icon properly", () => {
    render(<SnackbarWarning />);

    expect(screen.getByTestId("WarningAmberRoundedIcon")).toBeInTheDocument();
  });

  test("renders <SnackbarSuccessNoAction /> without the close button", () => {
    render(<SnackbarSuccessNoAction />);

    expect(screen.queryByTestId("CloseRoundedIcon")).not.toBeInTheDocument();
  });
});
