import { NamedSet } from "zustand/middleware";
import BigNumber from "bignumber.js";

import { AppState, StoreSlice } from "../types";
import { mockRequest } from "@/utils/mock";

export enum TransactionKind {
  totals = "totals",
  rewards = "rewards",
}

interface Totals {
  claimable: BigNumber | number;
  deposits: BigNumber | number;
  confirmed?: boolean;
}

interface Rewards {
  earned: BigNumber | number;
  magic: BigNumber | number;
  govMagic: BigNumber | number;
  confirmed?: boolean;
}

interface ClaimProps {
  totals: Totals;
  rewards: Rewards;
}

export interface ClaimSlice {
  claim: ClaimProps & {
    fetchClaimTotals: () => void;
    fetchClaimRewards: () => void;
    confirmTransaction: (kind: TransactionKind) => void;
    claimSuccess: (kind: TransactionKind) => void;
  };
}

export const createClaimSlice: StoreSlice<ClaimSlice> = (
  set: NamedSet<ClaimSlice>
) => ({
  claim: {
    totals: {
      claimable: 0,
      deposits: 0,
      confirmed: false,
    },
    rewards: {
      earned: 0,
      magic: 0,
      govMagic: 0,
      confirmed: false,
    },

    fetchClaimTotals: async () => {
      const result: Totals = await mockRequest({
        claimable: 10,
        deposits: 20,
      });

      set(function fetchClaimTotals(state: AppState) {
        state.claim.totals = { ...result, confirmed: false };
      });
    },

    fetchClaimRewards: async () => {
      const result: Rewards = await mockRequest({
        earned: 30,
        magic: 40,
        govMagic: 50,
      });

      set(function fetchClaimRewards(state: AppState) {
        state.claim.rewards = { ...result, confirmed: false };
      });
    },

    confirmTransaction: async (kind: TransactionKind) => {
      const result: boolean = await mockRequest(true);

      set(function confirmTransaction(state: AppState) {
        state.claim[kind].confirmed = result;
      });
    },

    claimSuccess: (kind: TransactionKind) =>
      set(function claimSuccess(state: AppState) {
        state.claim = {
          ...state.claim,
          [kind]: {
            ...(kind === TransactionKind.totals
              ? { claimable: 0, deposits: 0 }
              : { earned: 0, magic: 0, govMagic: 0 }),
            confirmed: false,
          },
        };
      }),
  },
});
