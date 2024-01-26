import { render, screen } from "@/tests/utils/base";
import { composeStories } from "@storybook/testing-react";
import * as stories from "@ui-template/storybook/stories/molecules/preciousmodal.stories";

const {
  ConfirmPermission,
  ApproveConvertAndStake,
  ApproveConvert,
  ApproveStake,
  ApproveUnstake,
  ApproveLiquidity,
  ApproveLiquidityTokens,
  ConfirmConvertAndStake,
  ConfirmConvert,
  ConfirmStake,
  ConfirmUnstake,
  ConfirmClaim,
  SuccessConvertAndStake,
  SuccessConvert,
  SuccessStake,
  SuccessUnstake,
  SuccessClaim,
} = composeStories(stories);

describe("PreciousModal", () => {
  describe("confirm permission modal", () => {
    test("renders confirm permission modal", () => {
      render(<ConfirmPermission />);

      expect(screen.getByAltText("Loading indicator")).toBeInTheDocument();
      expect(screen.getByText("Confirm permission")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm the permission in your wallet")
      ).toBeInTheDocument();
    });
  });

  describe("approve modal", () => {
    test("renders approve modal, non changing fields", () => {
      render(<ApproveConvertAndStake />);

      expect(screen.getByTestId("SwapHorizRoundedIcon")).toBeInTheDocument();
      expect(screen.getByTestId("approveButton")).toBeInTheDocument();
    });

    test("renders approve modal with convert and stake operation", () => {
      render(<ApproveConvertAndStake />);

      expect(
        screen.getByText("Magic to govMagic and stake")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Converting & Staking 100.00 Magic to 200.00 govMagic")
      ).toBeInTheDocument();
    });

    test("renders approve modal with convert operation", () => {
      render(<ApproveConvert />);

      expect(screen.getByText("Magic to govMagic")).toBeInTheDocument();
      expect(
        screen.getByText("Convert 100.00 Magic to 200.00 govMagic")
      ).toBeInTheDocument();
    });

    test("renders approve modal with stake operation", () => {
      render(<ApproveStake />);

      expect(screen.getByText("Stake Magic")).toBeInTheDocument();
      expect(screen.getByText("Stake 100.00 Magic")).toBeInTheDocument();
    });

    test("renders approve modal with unstake operation", () => {
      render(<ApproveUnstake />);

      expect(screen.getByText("Unstake Magic")).toBeInTheDocument();
      expect(screen.getByText("Unstake 100.00 Magic")).toBeInTheDocument();
    });

    test("renders approve modal with provide liquidity operation", () => {
      render(<ApproveLiquidity />);

      expect(screen.getByText("Provide liquidity")).toBeInTheDocument();
      expect(screen.getByText("Stake 100.00 Magic")).toBeInTheDocument();
    });

    test("renders approve modal with provide liquidity operation, multiple tokens", () => {
      render(<ApproveLiquidityTokens />);

      expect(screen.getByText("Provide liquidity")).toBeInTheDocument();
      expect(
        screen.getByText("Stake 100.00 govMagic/Magic")
      ).toBeInTheDocument();
    });
  });

  describe("confirm modal", () => {
    test("renders confirm modal, non changing fields", () => {
      render(<ConfirmConvertAndStake />);

      expect(screen.getByTestId("SwapHorizRoundedIcon")).toBeInTheDocument();
      expect(screen.getByText("Confirm transaction")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm this transaction in your wallet")
      ).toBeInTheDocument();
    });

    test("renders confirm modal with convert and stake operation", () => {
      render(<ConfirmConvertAndStake />);

      expect(
        screen.getByText("Converting & Staking 100.00 Magic to 200.00 govMagic")
      ).toBeInTheDocument();
    });

    test("renders confirm modal with convert operation", () => {
      render(<ConfirmConvert />);

      expect(
        screen.getByText("Convert 100.00 Magic to 200.00 govMagic")
      ).toBeInTheDocument();
    });

    test("renders confirm modal with stake operation", () => {
      render(<ConfirmStake />);

      expect(screen.getByText("Stake 100.00 Magic")).toBeInTheDocument();
    });

    test("renders confirm modal with unstake operation", () => {
      render(<ConfirmUnstake />);

      expect(
        screen.getByText("Unstake 100.00 stMagic/Magic")
      ).toBeInTheDocument();
    });

    test("renders confirm modal with claim operation", () => {
      render(<ConfirmClaim />);

      expect(screen.getByText("Claim $100.00")).toBeInTheDocument();
    });
  });

  describe("success modal", () => {
    test("renders success modal, non changing fields", () => {
      render(<SuccessConvertAndStake />);

      expect(screen.getByTestId("CheckCircleOutlineRoundedIcon")).toBeInTheDocument();
      expect(screen.getByText("Transaction successful")).toBeInTheDocument();
    });

    test("renders success modal with convert and stake operation", () => {
      render(<SuccessConvertAndStake />);

      expect(
        screen.getByText("Converting & Staking 100.00 Magic to 200.00 govMagic")
      ).toBeInTheDocument();
    });

    test("renders success modal with convert operation", () => {
      render(<SuccessConvert />);

      expect(
        screen.getByText("Convert 100.00 Magic to 200.00 govMagic")
      ).toBeInTheDocument();
    });

    test("renders success modal with stake operation", () => {
      render(<SuccessStake />);

      expect(
        screen.getByText("Stake 100.00 govMagic/Magic")
      ).toBeInTheDocument();
    });

    test("renders success modal with unstake operation", () => {
      render(<SuccessUnstake />);

      expect(
        screen.getByText("Unstake 100.00 govMagic/Magic")
      ).toBeInTheDocument();
    });

    test("renders success modal with claim operation", () => {
      render(<SuccessClaim />);

      expect(screen.getByText("Claim $100.00")).toBeInTheDocument();
    });
  });
});
