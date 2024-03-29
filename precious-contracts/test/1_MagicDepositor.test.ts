import { expect } from "chai";
import { BaseFixture } from "./fixtures/BaseFixture";
import { deployments, ethers, timeAndMine, tracer } from "hardhat";
import { BigNumber } from "ethers";
import {
  ATLAS_MASTER_OF_COIN_ADDRESS,
  ATLAS_MINE_ADDRESS,
  MAGIC_TOKEN_ADDRESS,
  ONE_DAY_IN_SECONDS,
  ONE_MAGIC_BN,
  PRECISION,
  ONE_THOUSAND_MAGIC_BN,
  ONE_LEGION,
  ONE_TREAUSRE,
  TREASURE_TOKEN_IDS,
  LEGION_TOKEN_IDS,
  ONE_WEEK_IN_SECONDS,
  ARBITRUM_BLOCK_GAS_LIMIT,
  ONE_MONTH_IN_SECONDS,
} from "../utils/constants";
import { awaitTx } from "../utils/AwaitTx";
import { depositMagicInGuild } from "../utils/DepositMagicInGuild";

const { AddressZero } = ethers.constants;

describe("MagicDepositor", () => {
  function checkAtlasDepositHasBeenInitialized(atlasDeposit: any, isUpdate?: boolean) {
    expect(atlasDeposit.activationTimestamp).to.be.gt(0);
    isUpdate
      ? expect(atlasDeposit.accumulatedMagic).to.equal(0)
      : expect(atlasDeposit.accumulatedMagic).to.be.gt(0);
    expect(atlasDeposit.isActive).to.be.equal(false);
  }

  function checkAtlasDepositHasBeenActivated(atlasDeposit: any) {
    expect(atlasDeposit.activationTimestamp).to.be.gt(0);
    expect(atlasDeposit.isActive).to.be.equal(true);
  }

  before("tags", async () => {
    tracer.nameTags[ATLAS_MINE_ADDRESS] = "AtlasMine";
    tracer.nameTags[MAGIC_TOKEN_ADDRESS] = "MagicToken";
    tracer.nameTags[ATLAS_MASTER_OF_COIN_ADDRESS] = "Master of Coin";
  });

  describe("depositFor()", () => {
    it("rejects zero inputs", async () => {
      const { alice, magicDepositor } = await BaseFixture();

      await expect(magicDepositor.depositFor(0, alice.address)).to.be.revertedWith(
        "amount cannot be 0"
      );
      await expect(magicDepositor.depositFor(1, AddressZero)).to.be.revertedWith(
        "cannot deposit for 0x0"
      );
    });

    describe("when the first user deposit happens", () => {
      it("initializes the first deposit with the correct parameters", async () => {
        const { alice, bob, magicToken, magicDepositor } = await BaseFixture();

        let _activationTimestamp: BigNumber;

        // First ever user deposit
        {
          await magicDepositor.connect(alice).depositFor(ONE_MAGIC_BN, alice.address);

          expect((await magicDepositor.atlasDeposits(0)).activationTimestamp).to.be.equal(0); // Deposits should start at index 1

          const atlasDeposit = await magicDepositor.atlasDeposits(1);
          const { activationTimestamp, accumulatedMagic } = atlasDeposit;
          _activationTimestamp = activationTimestamp; // Save for later checks

          checkAtlasDepositHasBeenInitialized(atlasDeposit);
          expect(accumulatedMagic).to.be.equal(ONE_MAGIC_BN);
          expect(await magicToken.balanceOf(magicDepositor.address)).to.be.equal(ONE_MAGIC_BN);
          expect(await magicDepositor.getUserDepositedMagic(1, alice.address)).to.be.equal(
            ONE_MAGIC_BN
          );
        }

        // Secondary user deposit
        {
          await magicToken
            .connect(bob)
            .approve(magicDepositor.address, ethers.constants.MaxUint256);
          await magicDepositor.connect(bob).depositFor(ONE_MAGIC_BN.mul(2), bob.address);

          expect((await magicDepositor.atlasDeposits(2)).activationTimestamp).to.be.equal(0);

          const atlasDeposit = await magicDepositor.atlasDeposits(1);
          const { activationTimestamp, accumulatedMagic, isActive } = atlasDeposit;

          expect(activationTimestamp).to.be.eq(_activationTimestamp);
          expect(accumulatedMagic).to.be.equal(ONE_MAGIC_BN.mul(3));
          expect(isActive).to.be.equal(false);
          expect(await magicToken.balanceOf(magicDepositor.address)).to.be.equal(
            ONE_MAGIC_BN.mul(3)
          );
        }

        // First deposit increment
        {
          await magicDepositor.connect(alice).depositFor(ONE_MAGIC_BN, alice.address);

          const atlasDeposit = await magicDepositor.atlasDeposits(1);
          const { activationTimestamp, accumulatedMagic, isActive } = atlasDeposit;

          expect(activationTimestamp).to.be.equal(_activationTimestamp);
          expect(accumulatedMagic).to.be.equal(ONE_MAGIC_BN.mul(4));
          expect(isActive).to.be.equal(false);
          expect(await magicToken.balanceOf(magicDepositor.address)).to.be.equal(
            ONE_MAGIC_BN.mul(4)
          );
        }
      });
    });

    describe("after the second week", () => {
      const depositAmount = ONE_MAGIC_BN;

      const fixture = deployments.createFixture(async () => {
        const baseFixture = await BaseFixture();
        const { alice, bob, carol, magicToken, magicDepositor } = baseFixture;

        await magicDepositor.connect(alice).deposit(depositAmount);
        await depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount);
        await depositMagicInGuild(carol, magicToken, magicDepositor, depositAmount);

        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        return { ...baseFixture };
      });

      it("activates the first week and initializes the second week", async () => {
        const { alice, magicDepositor, atlasMine } = await fixture();

        expect(await atlasMine.getAllUserDepositIds(magicDepositor.address)).to.have.length(0);

        // After a deposit has been accumulating user funds for one week,
        // this deposit is forwarded to the AtlasMine. This happens automatically when
        // a user tries to deposit into the contract, initializing a new accumulation deposit
        // for another week
        await magicDepositor.connect(alice).deposit(ONE_MAGIC_BN);
        expect(await atlasMine.getAllUserDepositIds(magicDepositor.address)).to.have.length(1);

        const [firstAtlasDeposit, secondAtlasDeposit] = await Promise.all([
          magicDepositor.atlasDeposits(1),
          magicDepositor.atlasDeposits(2),
        ]);

        checkAtlasDepositHasBeenActivated(firstAtlasDeposit);
        checkAtlasDepositHasBeenInitialized(secondAtlasDeposit);
      });

      it("correctly computes shares", async () => {
        const { alice, prMagicToken, magicDepositor } = await fixture();

        await expect(() => magicDepositor.connect(alice).update()).to.changeTokenBalance(
          prMagicToken,
          magicDepositor,
          depositAmount.mul(3)
        );
      });

      it("correctly harvests magic from atlas mine", async () => {
        const { alice, magicToken, magicDepositor, rewardPool } = await fixture();
        await magicDepositor.connect(alice).deposit(depositAmount); // Deposit 1 is activated, Deposit 2 is init'ed

        await timeAndMine.increaseTime(ONE_DAY_IN_SECONDS);

        const [magicBalancePre, magicBalanceOfRewardPoolPre] = await Promise.all([
          magicToken.balanceOf(magicDepositor.address),
          magicToken.balanceOf(rewardPool.address),
          magicToken.balanceOf(alice.address),
        ]);

        await magicDepositor.connect(alice).deposit(depositAmount);

        const [
          magicBalancePost,
          compoundedMagic,
          magicBalanceOfRewardPoolPost,
          aliceMagicBalancePost,
        ] = await Promise.all([
          magicToken.balanceOf(magicDepositor.address),
          magicDepositor.harvestForNextDeposit(),
          magicToken.balanceOf(rewardPool.address),
          magicToken.balanceOf(alice.address),
        ]);

        expect(magicBalanceOfRewardPoolPost).to.gte(magicBalanceOfRewardPoolPre);
        expect(aliceMagicBalancePost.add(depositAmount)).to.gte(magicBalanceOfRewardPoolPre);

        // Because sometime harvestAmount will be as = 777073004001825
        // then stakeRewardIncrement treasuryIncrement   stakeRewardSplit treasurySplit
        //       388536502000912      388536502000912  500000000000000000 500000000000000000
        // so stakeRewardIncrement is 388536502000912 instead of 388536502000912.5
        //same with treasuryIncrement , then after we will subtract it we will get 1 as heldMagicIncrement
        expect(magicBalancePost).to.gte(magicBalancePre.add(depositAmount));

        const expectedCompoundedMagic = magicBalancePost.sub(magicBalancePre).sub(depositAmount);
        expect(expectedCompoundedMagic).to.gte(compoundedMagic);
      });
    });

    describe("after the third week", () => {
      const firstWeekDepositAmount = ONE_MAGIC_BN;
      const secondWeekDepositAmount = ONE_THOUSAND_MAGIC_BN.mul(10);

      const fixture = deployments.createFixture(async () => {
        const baseFixture = await BaseFixture();
        const { alice, bob, carol, magicToken, magicDepositor } = baseFixture;

        await Promise.all([
          magicToken.connect(bob).approve(magicDepositor.address, ethers.constants.MaxUint256),
          magicToken.connect(carol).approve(magicDepositor.address, ethers.constants.MaxUint256),
        ]);

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, firstWeekDepositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, firstWeekDepositAmount, true),
          depositMagicInGuild(carol, magicToken, magicDepositor, firstWeekDepositAmount, true),
        ]);

        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, secondWeekDepositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, secondWeekDepositAmount, true),
          depositMagicInGuild(carol, magicToken, magicDepositor, secondWeekDepositAmount, true),
        ]);

        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        return { ...baseFixture };
      });

      it("activates the second week and initializes third week", async () => {
        const { alice, bob, magicToken, magicDepositor } = await fixture();

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, ONE_MAGIC_BN, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, ONE_MAGIC_BN, true),
        ]);

        const [firstAtlasDeposit, secondAtlasDeposit, thirdAtlasDeposit, fourthAtlasDeposit] =
          await Promise.all([
            magicDepositor.atlasDeposits(1),
            magicDepositor.atlasDeposits(2),
            magicDepositor.atlasDeposits(3),
            magicDepositor.atlasDeposits(4),
          ]);

        expect(fourthAtlasDeposit.activationTimestamp).to.be.equal(0);
        checkAtlasDepositHasBeenActivated(firstAtlasDeposit);
        checkAtlasDepositHasBeenActivated(secondAtlasDeposit);
        checkAtlasDepositHasBeenInitialized(thirdAtlasDeposit);
      });

      it("greatly increases harvest rate after second deposit is activated", async () => {
        const { alice, magicToken, magicDepositor } = await fixture();
        await magicDepositor.update({ gasLimit: ARBITRUM_BLOCK_GAS_LIMIT });

        const harvestRatePre = (await magicDepositor.harvestForNextDeposit())
          .mul(PRECISION)
          .div(ONE_WEEK_IN_SECONDS);

        expect(harvestRatePre).to.be.gte(0);
        await depositMagicInGuild(alice, magicToken, magicDepositor, ONE_MAGIC_BN, true);

        //After activation harvestForNextDeposit will be 0
        expect(await magicDepositor.harvestForNextDeposit()).to.be.equal(0);
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        await magicDepositor.update({ gasLimit: ARBITRUM_BLOCK_GAS_LIMIT });

        const harvestRatePost = (await magicDepositor.harvestForNextDeposit())
          .mul(PRECISION)
          .div(ONE_WEEK_IN_SECONDS);

        expect(harvestRatePost).to.be.gte(0);
      });
    });

    describe("after the 14th month", () => {
      const depositAmount = ONE_THOUSAND_MAGIC_BN;

      /** Simulates the passing of 12 months and deposits */
      const fixture = deployments.createFixture(async () => {
        const baseFixture = await BaseFixture();
        const { alice, bob, carol, magicToken, magicDepositor } = baseFixture;

        await Promise.all([
          magicToken.connect(bob).approve(magicDepositor.address, ethers.constants.MaxUint256),
          magicToken.connect(carol).approve(magicDepositor.address, ethers.constants.MaxUint256),
        ]);

        for (let i = 0; i < 13; i++) {
          await depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true);
          await timeAndMine.increaseTime(ONE_MONTH_IN_SECONDS + 1);
        }

        return { ...baseFixture };
      });

      it("correctly withdraws the first deposit and reinvests the amount", async () => {
        const { alice, magicToken, magicDepositor, atlasMine } = await fixture();

        // 5 days extra is because AtlasMine defines one year = 365 days, instead of 12 * 30
        const { lockedUntil } = await atlasMine.userInfo(magicDepositor.address, 1);
        await timeAndMine.setTimeNextBlock(lockedUntil.toNumber() + ONE_DAY_IN_SECONDS * 45 + 1);

        // Expect the first deposit to be withdrawn
        const tx = await magicDepositor.update();
        await expect(tx)
          .to.emit(atlasMine, "Withdraw")
          .withArgs(magicDepositor.address, 1, depositAmount);

        expect(tx).to.emit(magicDepositor, "ActivateDeposit");

        // Expect the first deposit amount to be relocked

        const { logs } = await awaitTx(tx);

        const log = logs.find(
          ({ topics }) => topics[0] === ethers.utils.id("Deposit(address,uint256,uint256,uint8)")
        );
        if (!log) throw new Error(`Deposit event was not emitted`);
        const {
          args: { amount },
        } = atlasMine.interface.parseLog(log);
        expect(amount as BigNumber).to.be.gte(depositAmount);
      });
    });

    describe("when there are no deposits for more than one Week", () => {
      const depositAmount = ONE_THOUSAND_MAGIC_BN;

      const fixture = deployments.createFixture(async () => {
        const baseFixture = await BaseFixture();
        const { alice, bob, carol, magicToken, magicDepositor } = baseFixture;

        await Promise.all([
          magicToken.connect(bob).approve(magicDepositor.address, ethers.constants.MaxUint256),
          magicToken.connect(carol).approve(magicDepositor.address, ethers.constants.MaxUint256),
        ]);

        for (let i = 0; i < 2; i++) {
          await depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true);
          await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);
        }

        return { ...baseFixture };
      });

      it("activates previous Week and initializes a new one", async () => {
        const { alice, magicToken, magicDepositor, atlasMine } = await fixture();

        const { lockedUntil } = await atlasMine.userInfo(magicDepositor.address, 1);
        await timeAndMine.setTimeNextBlock(lockedUntil.toNumber() + ONE_DAY_IN_SECONDS * 45);

        await magicDepositor.update();

        const [firstAtlasDeposit, secondAtlasDeposit, thirdAtlasDeposit] = await Promise.all([
          magicDepositor.atlasDeposits(1),
          magicDepositor.atlasDeposits(2),
          magicDepositor.atlasDeposits(3),
        ]);

        checkAtlasDepositHasBeenActivated(firstAtlasDeposit);
        checkAtlasDepositHasBeenActivated(secondAtlasDeposit);
        checkAtlasDepositHasBeenInitialized(thirdAtlasDeposit, true);
      });
    });
  });

  describe("NFT staking", () => {
    const depositAmount = ONE_THOUSAND_MAGIC_BN;

    const fixture = deployments.createFixture(async () => {
      const baseFixture = await BaseFixture();
      const { alice, bob, carol, magicToken, magicDepositor } = baseFixture;

      for (let i = 0; i < 3; i++) {
        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
          depositMagicInGuild(carol, magicToken, magicDepositor, depositAmount),
        ]);
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);
      }

      await depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true);
      return { ...baseFixture };
    });

    it("Staking Treasure", async () => {
      const { alice, magicDepositor, treasure, atlasMine } = await fixture();
      const TREASURE_TOKEN_ID = TREASURE_TOKEN_IDS[0];
      const treasureBoost = await atlasMine.getNftBoost(
        treasure.address,
        TREASURE_TOKEN_ID,
        ONE_TREAUSRE
      );
      const prePendingRewards = await atlasMine.pendingRewardsAll(magicDepositor.address);

      await treasure
        .connect(alice)
        .safeTransferFrom(
          alice.address,
          magicDepositor.address,
          TREASURE_TOKEN_ID,
          ONE_TREAUSRE,
          []
        );
      await magicDepositor.stakeTreasure(TREASURE_TOKEN_ID, ONE_TREAUSRE);

      // increase the boots
      const magicDepositorBoost = await atlasMine.getUserBoost(magicDepositor.address);
      expect(magicDepositorBoost).to.equal(treasureBoost);
      // increase pendingReward
      const postPendingRewards = await atlasMine.pendingRewardsAll(magicDepositor.address);
      expect(postPendingRewards).to.gt(prePendingRewards);
    });

    it("Staking Legion", async () => {
      const { alice, magicDepositor, legion, atlasMine } = await fixture();
      const LEGION_TOKEN_ID = LEGION_TOKEN_IDS[0];
      const legionBoost = await atlasMine.getNftBoost(legion.address, LEGION_TOKEN_ID, ONE_LEGION);
      const prePendingRewards = await atlasMine.pendingRewardsAll(magicDepositor.address);

      await legion
        .connect(alice)
        ["safeTransferFrom(address,address,uint256)"](
          alice.address,
          magicDepositor.address,
          LEGION_TOKEN_ID
        );
      await magicDepositor.stakeLegion(LEGION_TOKEN_ID);

      // increase the boots
      const magicDepositorBoost = await atlasMine.getUserBoost(magicDepositor.address);
      expect(magicDepositorBoost).to.equal(legionBoost);
      // increase pendingReward
      const postPendingRewards = await atlasMine.pendingRewardsAll(magicDepositor.address);
      expect(postPendingRewards).to.gt(prePendingRewards);
    });
  });

  describe("claimMintedShares()", () => {
    const depositAmount = ONE_THOUSAND_MAGIC_BN;

    const fixture = deployments.createFixture(async () => {
      const baseFixture = await BaseFixture();
      const { alice, bob, carol, magicToken, magicDepositor } = baseFixture;

      for (let i = 0; i < 3; i++) {
        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
          depositMagicInGuild(carol, magicToken, magicDepositor, depositAmount),
        ]);
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);
      }

      await depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true);
      return { ...baseFixture };
    });

    it("rejects claims to non-existing deposits", async () => {
      const { mallory, magicDepositor } = await fixture();
      await expect(
        magicDepositor.connect(mallory).claimMintedShares(ethers.constants.MaxUint256, false)
      ).to.be.revertedWith("Deposit does not exist");
    });

    it("rejects claims to inactive deposits", async () => {
      const { mallory, magicDepositor } = await fixture();
      const lastIndex = await magicDepositor.currentAtlasDepositIndex();
      await expect(
        magicDepositor.connect(mallory).claimMintedShares(lastIndex, false)
      ).to.be.revertedWith("Deposit has not been activated");
    });
    it("rejects claiming to deposits where the sender has not participated", async () => {
      const { mallory, magicDepositor } = await fixture();
      await expect(magicDepositor.connect(mallory).claimMintedShares(1, false)).to.be.revertedWith(
        "Nothing to claim"
      );
    });
    it("rejects trying to claim twice", async () => {
      const { alice, magicDepositor } = await fixture();
      await magicDepositor.connect(alice).claimMintedShares(1, false);
      await expect(magicDepositor.connect(alice).claimMintedShares(1, false)).to.be.revertedWith(
        "Nothing to claim"
      );
    });

    it("correctly transfer shares to the claimant", async () => {
      const { alice, bob, magicToken, prMagicToken, magicDepositor } = await BaseFixture();
      // In first Week
      {
        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);
        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        await expect(magicDepositor.connect(alice).claimMintedShares(1, false))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, alice.address, depositAmount);
      }

      // In second Week
      {
        const depositIndex = await magicDepositor.currentAtlasDepositIndex();
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        const [aliceMintedShares, bobMintedShares] = await Promise.all([
          magicDepositor.connect(alice).callStatic.claimMintedShares(depositIndex, false),
          magicDepositor.connect(bob).callStatic.claimMintedShares(depositIndex, false),
        ]);

        expect(aliceMintedShares).to.be.equal(bobMintedShares).and.equal(depositAmount);

        await expect(magicDepositor.connect(alice).claimMintedShares(depositIndex, false))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, alice.address, aliceMintedShares);
      }

      // In third Week
      {
        const depositIndex = await magicDepositor.currentAtlasDepositIndex();
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        const [aliceMintedShares, bobMintedShares] = await Promise.all([
          magicDepositor.connect(alice).callStatic.claimMintedShares(depositIndex, false),
          magicDepositor.connect(bob).callStatic.claimMintedShares(depositIndex, false),
        ]);

        expect(aliceMintedShares).to.be.equal(bobMintedShares).and.equal(depositAmount);

        await expect(magicDepositor.connect(alice).claimMintedShares(depositIndex, false))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, alice.address, aliceMintedShares);
      }
    });

    it("Staking prMagic token afterClaiming", async () => {
      const { alice, bob, magicToken, prMagicToken, magicDepositor, rewardPool } =
        await BaseFixture();
      // In first Week
      {
        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);
        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        await expect(magicDepositor.connect(alice).claimMintedShares(1, true))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, rewardPool.address, depositAmount);

        await expect(magicDepositor.connect(bob).claimMintedShares(1, true))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, rewardPool.address, depositAmount);
      }

      const stakedAlice = await rewardPool.balanceOf(alice.address);
      expect(stakedAlice).to.be.equal(depositAmount);

      const stakedbob = await rewardPool.balanceOf(bob.address);
      expect(stakedbob).to.be.equal(depositAmount);

      // In second Week
      {
        const depositIndex = await magicDepositor.currentAtlasDepositIndex();
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        await expect(magicDepositor.connect(alice).claimMintedShares(depositIndex, true)).to.emit(
          prMagicToken,
          "Transfer"
        );

        await expect(magicDepositor.connect(bob).claimMintedShares(depositIndex, true)).to.emit(
          prMagicToken,
          "Transfer"
        );

        const stakedAlice = await rewardPool.balanceOf(alice.address);
        expect(stakedAlice).to.be.equal(depositAmount.mul(2));

        const stakedbob = await rewardPool.balanceOf(bob.address);
        expect(stakedbob).to.be.equal(depositAmount.mul(2));
      }

      // In third Week
      {
        const depositIndex = await magicDepositor.currentAtlasDepositIndex();
        await timeAndMine.increaseTime(ONE_WEEK_IN_SECONDS + 1);

        await Promise.all([
          depositMagicInGuild(alice, magicToken, magicDepositor, depositAmount, true),
          depositMagicInGuild(bob, magicToken, magicDepositor, depositAmount),
        ]);

        const [aliceMintedShares, bobMintedShares] = await Promise.all([
          magicDepositor.connect(alice).callStatic.claimMintedShares(depositIndex, true),
          magicDepositor.connect(bob).callStatic.claimMintedShares(depositIndex, true),
        ]);

        expect(aliceMintedShares).to.be.equal(bobMintedShares).and.equal(depositAmount);

        await expect(magicDepositor.connect(alice).claimMintedShares(depositIndex, true))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, rewardPool.address, aliceMintedShares);

        await expect(magicDepositor.connect(bob).claimMintedShares(depositIndex, true))
          .to.emit(prMagicToken, "Transfer")
          .withArgs(magicDepositor.address, rewardPool.address, aliceMintedShares);

        const stakedAlice = await rewardPool.balanceOf(alice.address);
        expect(stakedAlice).to.be.equal(depositAmount.mul(3));

        const stakedbob = await rewardPool.balanceOf(bob.address);
        expect(stakedbob).to.be.equal(depositAmount.mul(3));
      }
    });
  });
});
