import BigNumber from "bignumber.js";

import {
  formatAmount,
  shortenAddress,
  formatOperation,
  formatConfirmationMessage,
} from "@/utils/formatters";
import { TokenOperations } from "@/types/tokenOperations";

describe("formatters", () => {
  describe("formatAmount", () => {
    it("should format the amount with eth token", () => {
      const result = formatAmount(5.2, 2, "eth");
      expect(result).toBe("5.20 ETH");
    });

    it("should format the amount with usdc token", () => {
      const result = formatAmount(5.2, 2, "usdc");
      expect(result).toBe("5.20 USDC");
    });

    it("should format the amount without a token", () => {
      const result = formatAmount(5.2, 2);
      expect(result).toBe("5.20");
    });

    it("should format a bignumber amount correctly", () => {
      const result = formatAmount(new BigNumber(5.2), 2, "usdc");
      expect(result).toBe("5.20 USDC");
    });

    it("should format an amount greater than one thousand and less than one million", () => {
      const result = formatAmount(new BigNumber(24128.54), 2, "usdc");
      expect(result).toBe("24.13k USDC");
    });

    it("should format an amount greater than one million", () => {
      const result = formatAmount(new BigNumber(55412135.22), 2, "usdc");
      expect(result).toBe("55.41m USDC");
    });
  });

  describe("shortenAddress", () => {
    it("should format the given address", () => {
      const result = shortenAddress(
        "0x729e86ed5614348d66996f0E23f28012eaCb0D17"
      );
      expect(result).toBe("0x729e...0D17");
    });
  });

  describe("formatOperation", () => {
    it("should format the Convert & Stake operation", () => {
      const result = formatOperation(TokenOperations.convertAndStake);
      expect(result).toBe("convert & stake");
    });

    it("should format the Stake operation", () => {
      const result = formatOperation(TokenOperations.stake);
      expect(result).toBe("stake");
    });

    it("should format the Unstake operation", () => {
      const result = formatOperation(TokenOperations.unstake);
      expect(result).toBe("unstake");
    });

    it("should format the convert operation", () => {
      const result = formatOperation(TokenOperations.convert, "stMagic");
      expect(result).toBe("convert to stMagic");
    });
  });

  describe("formatConfirmationMessage", () => {
    it("should format a Stake operation with single token", () => {
      const result = formatConfirmationMessage({
        operation: TokenOperations.stake,
        amount1: 100,
        tokenId1: "stmagic",
      });

      expect(result).toBe("Staking of 100.00 stMagic successfull");
    });

    it("should format a Stake operation with multiple tokens", () => {
      const result = formatConfirmationMessage({
        operation: TokenOperations.stake,
        amount1: 100,
        tokenId1: "stmagic",
        tokenId2: "magic",
      });

      expect(result).toBe("Staking of 100.00 stMagic/Magic successfull");
    });

    it("should format an Unstake operation with single token", () => {
      const result = formatConfirmationMessage({
        operation: TokenOperations.unstake,
        tokenId1: "stmagic",
      });

      expect(result).toBe("Unstaking of stMagic successfull");
    });

    it("should format an Unstake operation with multiple tokens", () => {
      const result = formatConfirmationMessage({
        operation: TokenOperations.unstake,
        amount1: 100,
        tokenId1: "stmagic",
        tokenId2: "magic",
      });

      expect(result).toBe("Unstaking of 100.00 stMagic/Magic successfull");
    });

    it("should format a Convert operation", () => {
      const result = formatConfirmationMessage({
        operation: TokenOperations.convert,
        amount1: 100,
        amount2: 90,
        tokenId1: "magic",
        tokenId2: "stmagic",
      });

      expect(result).toBe(
        "Converting of 100.00 Magic to 90.00 stMagic successfull"
      );
    });

    it("should format a Convert and Stake operation", () => {
      const result = formatConfirmationMessage({
        operation: TokenOperations.convertAndStake,
        amount1: 100,
        amount2: 90,
        tokenId1: "magic",
        tokenId2: "stmagic",
      });

      expect(result).toBe(
        "Converting & Staking of 100.00 Magic to 90.00 stMagic successfull"
      );
    });
  });
});
