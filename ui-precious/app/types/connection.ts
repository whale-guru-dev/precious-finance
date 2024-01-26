export enum ConnectionSteps {
  Start = "CONNECT_START",
  UnsupportedNetwork = "UNSUPPORTED_NETWORK",
  ConnectWallet = "CONNECT_WALLET",
  ConnectWalletError = "CONNECT_WALLET_ERROR",
  ConfirmPermission = "CONFIRM_PERMISSION",
  Confirmed = "CONFIRMED",
}

export enum StepActions {
  Connect = "CONNECT",
  Disconnect = "DISCONNECT",
  Switch = "SWITCH_ARBITRUM",
  Metamask = "METAMASK",
  WalletConnect = "WALLET_CONNECT",
}
