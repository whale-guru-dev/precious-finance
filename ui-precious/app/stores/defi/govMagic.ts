import BigNumber from "bignumber.js";
import { NamedSet } from "zustand/middleware";

import { TokenOperations } from "@/types/tokenOperations";
import { OperationDetails, Portfolio } from "./types";
import { AppState, StoreSlice } from "../types";
import { mockRequest } from "@/utils/mock";

interface GovMagicProps {
  portfolio: Portfolio;
  stake: OperationDetails;
  unstake: OperationDetails;
}

type GovMagicTokenOperations = TokenOperations.stake | TokenOperations.unstake;

export interface GovMagicSlice {
  govmagic: {
    fetchDetails: () => void;
    approve: () => void;
    confirm: (operation: GovMagicTokenOperations) => void;
    operationSuccess: (operation: GovMagicTokenOperations) => void;
    changeAmount: (
      operation: GovMagicTokenOperations,
      value: BigNumber | number
    ) => void;
  } & GovMagicProps;
}

export const createGovMagicSlice: StoreSlice<GovMagicSlice> = (
  set: NamedSet<GovMagicSlice>
) => ({
  govmagic: {
    portfolio: {
      earnedMagic: 0,
      earnedGovMagic: 0,
      stakedStMagic: 0,
      vApr: 0,
      tvl: 0,
    },
    stake: {
      value: 0,
      balance: 0,
      approved: false,
      confirmed: false,
    },
    unstake: {
      value: 0,
      balance: 0,
      approved: true,
      confirmed: false,
    },

    fetchDetails: async () => {
      const result = await mockRequest(
        {
          portfolio: {
            earnedMagic: 11,
            earnedGovMagic: 22,
            stakedStMagic: 33,
            vApr: 74.23,
            tvl: 5600000,
          },
          stake: {
            value: 0,
            balance: 150,
            approved: false,
            confirmed: false,
          },
          unstake: {
            value: 0,
            balance: 160,
            approved: true,
            confirmed: false,
          },
        },
        1000
      );

      set(function fetchDetails(state: AppState) {
        state.govmagic = { ...state.govmagic, ...result };
      });
    },

    approve: async () => {
      const result = await mockRequest(true, 500);

      set(function approve(state: AppState) {
        state.govmagic.stake.approved = result;
      });
    },

    confirm: async (operation: GovMagicTokenOperations) => {
      const result = await mockRequest(true, 500);

      set(function confirm(state: AppState) {
        state.govmagic[operation].confirmed = result;
      });
    },

    operationSuccess: async (operation: GovMagicTokenOperations) => {
      const result = await mockRequest(true, 500);

      set(function operationSuccess(state: AppState) {
        state.govmagic[operation].confirmed = false;
        state.govmagic[operation].value = 0;
      });
    },

    changeAmount: (
      operation: GovMagicTokenOperations,
      value: BigNumber | number
    ) => {
      set(function changeAmount(state: AppState) {
        state.govmagic[operation].value = value;
      });
    },
  },
});

export const getIsInputPopulated = ({
  govmagic: { stake, unstake },
}: AppState) => {
  return (
    (stake.value > 0 && stake.value <= stake.balance) ||
    (unstake.value > 0 && unstake.value <= unstake.balance)
  );
};
