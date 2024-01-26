import { NamedSet } from "zustand/middleware";

import { AppState, StoreSlice } from "../types";
import { ConnectionSteps } from "@/types/connection";

export type Account = {
  address: string | null;
};

export type WalletName = "Metamask" | "WalletConnect" | "Other" | null;
export type WalletNetwork = "Arbitrum" | "Other" | null;

export type Wallet = {
  name: WalletName;
  network: WalletNetwork;
};

interface ConnectionProps {
  connected: boolean;
  confirmed: boolean;
  step: ConnectionSteps;
  wallet: Wallet;
  account: Account;
}

export interface ConnectionSlice {
  connection: ConnectionProps & {
    connectWallet: () => void;
    connectSupportedWallet: (connectionProps: ConnectionProps) => void;
    switchArbitrum: (connectionProps: ConnectionProps) => void;
    disconnectWallet: () => void;
    confirmPermission: () => void;
  };
}

export const createConnectionSlice: StoreSlice<ConnectionSlice> = (
  set: NamedSet<ConnectionSlice>
) => ({
  connection: {
    connected: false,
    confirmed: false,
    step: ConnectionSteps.Start,
    wallet: {
      name: null,
      network: null,
    },
    account: {
      address: null,
    },

    connectWallet: () => {
      set(function connectWallet(state: AppState) {
        state.connection.wallet = { name: null, network: null };
        state.connection.account.address =
          null;
        state.connection.step = ConnectionSteps.ConnectWallet;
        state.connection.connected = false;
      });
    },

    connectSupportedWallet: ({wallet, account, connected, confirmed, step} : ConnectionProps) =>
    set(function connectSupportedWallet(state: AppState) {
        state.connection.wallet = wallet;
        state.connection.account = account;
        state.connection.step = step;
        state.connection.connected = connected;
        state.connection.confirmed = confirmed;
      }),

    switchArbitrum: ({wallet, account, connected, confirmed, step} : ConnectionProps) =>
      set(function switchArbitrum(state: AppState) {
        state.connection.wallet = wallet;
        state.connection.account = account;
        state.connection.step = step;
        state.connection.connected = connected;
        state.connection.confirmed = confirmed;
      }),

    disconnectWallet: () =>
      set(function disconnectWallet(state: AppState) {
        state.connection.wallet = {
          name: null,
          network: null,
        };
        state.connection.step = ConnectionSteps.Start;
        state.connection.connected = false;
        state.connection.confirmed = false;
      }),

    confirmPermission: () =>
      set(function confirmPermission(state: AppState) {
        state.connection.confirmed = true;
        state.connection.step = ConnectionSteps.Confirmed;
      }),
  },
});

export const isConnectedAndConfirmed = (state: AppState) =>
  state.connection.connected && state.connection.confirmed;
