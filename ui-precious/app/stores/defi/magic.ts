import BigNumber from "bignumber.js";
import { NamedSet } from "zustand/middleware";

import { TokenOperations } from "@/types/tokenOperations";
import { OperationDetails, Portfolio } from "./types";
import { AppState, StoreSlice } from "../types";
import { mockRequest } from "@/utils/mock";

interface MagicProps {
  portfolio: Portfolio;
  convert: OperationDetails;
  convertAndStake: OperationDetails;
  stake: OperationDetails;
  unstake: OperationDetails;
}

export interface MagicSlice {
  magic: {
    fetchDetails: () => void;
    approve: (operation: TokenOperations) => void;
    confirm: (operation: TokenOperations) => void;
    operationSuccess: (operation: TokenOperations) => void;
    changeAmount: (
      operation: TokenOperations,
      value: BigNumber | number
    ) => void;
  } & MagicProps;
}

export const createMagicSlice: StoreSlice<MagicSlice> = (
  set: NamedSet<MagicSlice>
) => ({
  magic: {
    portfolio: {
      earnedMagic: 0,
      earnedGovMagic: 0,
      stakedStMagic: 0,
      vApr: 0,
      tvl: 0,
    },
    convert: {
      value: 0,
      balance: 0,
      approved: false,
      confirmed: false,
    },
    convertAndStake: {
      value: 0,
      balance: 0,
      approved: false,
      confirmed: false,
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
            earnedMagic: 15,
            earnedGovMagic: 25,
            stakedStMagic: 35,
            vApr: 45.29,
            tvl: 2800000,
          },
          convert: {
            value: 0,
            balance: 500,
            approved: false,
            confirmed: false,
          },
          convertAndStake: {
            value: 0,
            balance: 435,
            approved: false,
            confirmed: false,
          },
          stake: {
            value: 0,
            balance: 500,
            approved: false,
            confirmed: false,
          },
          unstake: {
            value: 0,
            balance: 500,
            approved: false,
            confirmed: false,
          },
        },
        1000
      );

      set(function fetchDetails(state: AppState) {
        state.magic = { ...state.magic, ...result };
      });
    },

    approve: async (operation: TokenOperations) => {
      const result = await mockRequest(true, 500);

      set(function approve(state: AppState) {
        state.magic[operation].approved = result;
      });
    },

    confirm: async (operation: TokenOperations) => {
      const result = await mockRequest(true, 500);

      set(function confirm(state: AppState) {
        state.magic[operation].confirmed = result;
      });
    },

    operationSuccess: async (operation: TokenOperations) => {
      const result = await mockRequest(true, 500);

      set(function operationSuccess(state: AppState) {
        state.magic[operation].confirmed = false;
        state.magic[operation].value = 0;
      });
    },

    changeAmount: (operation: TokenOperations, value: BigNumber | number) => {
      set(function changeAmount(state: AppState) {
        state.magic[operation].value = value;
      });
    },
  },
});

export const getIsInputPopulated = ({ magic }: AppState) => {
  return Object.values(magic).some(
    ({ value, balance }) => value > 0 && value <= balance
  );
};
