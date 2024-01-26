import { render, screen, fireEvent } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/organisms/tokenmanager.stories";

const {
  SingleStep,
  FirstStepValid,
  FirstStepInvalid,
  SecondStepValid,
  SecondStepInvalid,
  SecondStepBalance,
} = composeStories(stories);

describe("<TokenManager />", () => {
  describe("render", () => {
    test("renders a single step manager", () => {
      render(<SingleStep />);

      expect(screen.getByText("unstake")).toBeInTheDocument();
    });

    test("renders first step with valid value", () => {
      const { container } = render(<FirstStepValid />);

      expect(screen.getAllByText("Approve").length).toBe(2);
      expect(screen.getByText("Amount of Magic to convert & stake")).toBeInTheDocument();
      expect(container.querySelector(".MuiButton-contained")).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-active")
      ).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-completed")
      ).toBeFalsy();
    });

    test("renders first step with invalid value", () => {
      const { container } = render(<FirstStepInvalid />);

      expect(container.querySelector(".MuiButton-outlined")).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-active")
      ).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-completed")
      ).toBeFalsy();
    });

    test("renders second step with valid value", () => {
      const { container } = render(<SecondStepValid />);

      expect(screen.getAllByText("Approved").length).toBe(1);
      expect(screen.getByText("Amount of Magic to convert & stake")).toBeInTheDocument();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-active")
      ).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-completed")
      ).toBeTruthy();
    });

    test("renders second step with invalid value", () => {
      const { container } = render(<SecondStepInvalid />);

      expect(container.querySelector(".MuiButton-outlined")).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-active")
      ).toBeTruthy();
      expect(
        container.querySelector(".MuiStepIcon-root.Mui-completed")
      ).toBeTruthy();
    });
  });

  describe("interaction with the button", () => {
    test("event handler is called then value is valid", () => {
      const props = { onButtonClick: jest.fn() } as any;
      render(<FirstStepValid {...props} />);

      const button = screen.getAllByText("Approve");
      fireEvent.click(button[0]);

      expect(props.onButtonClick).toHaveBeenCalledWith(0);
    });

    test("event handler is not called then value is invalid, a helper text is shown instead", () => {
      const props = { onButtonClick: jest.fn() } as any;
      render(<FirstStepInvalid {...props} />);

      const button = screen.getAllByText("Approve");
      fireEvent.click(button[0]);

      expect(props.onButtonClick).not.toHaveBeenCalledWith(0);
      expect(
        screen.getByText("Value should be greater than 0.")
      ).toBeInTheDocument();
    });

    test("event handler is not called then value is greater than balance, a helper text is shown instead", () => {
      const props = { onButtonClick: jest.fn() } as any;
      render(<SecondStepBalance {...props} />);

      const button = screen.getAllByText("convert & stake");
      fireEvent.click(button[0]);

      expect(props.onButtonClick).not.toHaveBeenCalledWith(1);
      expect(screen.getByText("Insufficient balance.")).toBeInTheDocument();
    });
  });
});
