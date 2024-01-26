import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@/../storybook/stories/molecules/portfoliobalance.stories";

const { Default } = composeStories(stories);

describe("<PortfolioBalance />", () => {
  describe("Default view", () => {
    test("renders icon to be present only once", () => {
      render(<Default />);

      expect(screen.getByTestId("InfoRoundedIcon")).toBeInTheDocument();
    });

    test("renders magic column properly", () => {
      render(<Default />);

      expect(screen.getByText("Earned Magic")).toBeInTheDocument();
      expect(screen.getByText("10.00")).toBeInTheDocument();
    });

    test("renders govMagic column properly", () => {
      render(<Default />);

      expect(screen.getByText("Earned govMagic")).toBeInTheDocument();
      expect(screen.getByText("20.00")).toBeInTheDocument();
    });

    test("renders stMagic column properly", () => {
      render(<Default />);

      expect(screen.getByText("stMagic staked")).toBeInTheDocument();
      expect(screen.getByText("30.00")).toBeInTheDocument();
    });

    test("renders vAPR column properly", () => {
      render(<Default />);

      expect(screen.getByText("vAPR")).toBeInTheDocument();
      expect(screen.getByText("40.23%")).toBeInTheDocument();
    });

    test("renders TVL column properly", () => {
      render(<Default />);

      expect(screen.getByText("TVL")).toBeInTheDocument();
      expect(screen.getByText("$5.3m")).toBeInTheDocument();
    });
  });
});
