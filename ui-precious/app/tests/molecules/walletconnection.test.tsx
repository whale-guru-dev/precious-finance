import { render, screen, fireEvent } from "@/tests/utils/base";
import { ConnectionSteps, StepActions } from "@/types/connection";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/molecules/walletconnection.stories";

const {
  ConnectStart,
  UnsupportedNetwork,
  ConnectWallet,
  ConfirmPermission,
  ConnectWalletError,
} = composeStories(stories);

describe("<WalletConnection />", () => {
  describe("render", () => {
    test("renders component with the initial state correctly", () => {
      render(<ConnectStart />);

      expect(
        screen.getByText("Wallet connection to Arbitrum required.")
      ).toBeInTheDocument();
      expect(screen.getByText("Connect to wallet")).toBeInTheDocument();
      expect(
        screen.getByText(
          "You may need to manually switch network via your wallet."
        )
      ).toBeInTheDocument();
    });

    test("renders component with the unsupported network state correctly", () => {
      render(<UnsupportedNetwork />);

      expect(
        screen.getByText(
          "This app supports Arbitrum. You are currently connected to an unsupported network."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("Switch to Arbitrum network")
      ).toBeInTheDocument();
      expect(screen.getByText("Disconnect wallet")).toBeInTheDocument();
      expect(
        screen.getByText(
          "You may need to manually switch network via your wallet."
        )
      ).toBeInTheDocument();
    });

    test("renders component with the connect wallet state correctly", () => {
      render(<ConnectWallet />);

      expect(screen.getByText("Connect wallet")).toBeInTheDocument();
      expect(screen.getByText("Metamask")).toBeInTheDocument();
      expect(screen.getByText("WalletConnect")).toBeInTheDocument();
      expect(screen.getByText("Go back")).toBeInTheDocument();
    });

    test("renders component with the confirm permission state correctly", () => {
      render(<ConfirmPermission />);

      expect(screen.getByText("Confirm permission")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm the permission in your wallet")
      ).toBeInTheDocument();
      expect(screen.getByText("Go back")).toBeInTheDocument();
    });

    test("renders component with the connect wallet error state correctly", () => {
      render(<ConnectWalletError />);

      expect(screen.getByText("Connect wallet")).toBeInTheDocument();
      expect(
        screen.getByText(
          "There was an error trying to connect to your wallet please try again."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Metamask")).toBeInTheDocument();
      expect(screen.getByText("WalletConnect")).toBeInTheDocument();
    });
  });

  describe("fire events", () => {
    test("fires event from ConnectStart state", () => {
      const props = { onClick: jest.fn() } as any;
      render(<ConnectStart {...props} />);

      const button = screen.getByText("Connect to wallet");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.Connect);
    });

    test("fires events from UnsupportedNetwork state", () => {
      const props = { onClick: jest.fn() } as any;
      render(<UnsupportedNetwork {...props} />);

      let button = screen.getByText("Switch to Arbitrum network");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.Switch);

      button = screen.getByText("Disconnect wallet");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.Disconnect);
    });

    test("fires events from ConnectWallet state", () => {
      const props = { onClick: jest.fn(), onBackClick: jest.fn() } as any;
      render(<ConnectWallet {...props} />);

      let button = screen.getByText("Metamask");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.Metamask);

      button = screen.getByText("WalletConnect");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.WalletConnect);

      button = screen.getByText("Go back");
      fireEvent.click(button);

      expect(props.onBackClick).toHaveBeenCalledWith(
        ConnectionSteps.ConnectWallet
      );
    });

    test("fires event from ConfirmPermission state", () => {
      const props = { onBackClick: jest.fn() } as any;
      render(<ConfirmPermission {...props} />);

      const button = screen.getByText("Go back");
      fireEvent.click(button);

      expect(props.onBackClick).toHaveBeenCalledWith(
        ConnectionSteps.ConfirmPermission
      );
    });

    test("fires events from ConnectWalletError state", () => {
      const props = { onClick: jest.fn() } as any;
      render(<ConnectWalletError {...props} />);

      let button = screen.getByText("Metamask");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.Metamask);

      button = screen.getByText("WalletConnect");
      fireEvent.click(button);

      expect(props.onClick).toHaveBeenCalledWith(StepActions.WalletConnect);
    });
  });
});
