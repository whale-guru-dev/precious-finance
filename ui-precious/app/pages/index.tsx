import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useConnector } from "@integrations-lib/core";

import Default from "@/components/Templates/Default";
import { WalletConnection } from "@/components";
import { StepActions, ConnectionSteps } from "@/types/connection";
import { useStore } from "@/stores/root";
import { useSnackbarStore } from "@/components/Atoms/Snackbar/snackbar.store";
import { ARBITRUM_NETWORK } from "@/defi/config";
import { WalletNetwork } from "@/stores/defi/connection";

const Home: NextPage = () => {
  const { showSnackbar } = useSnackbarStore((state) => state);
  const {
    step,
    confirmPermission,
    connectSupportedWallet,
    connectWallet,
    disconnectWallet,
    switchArbitrum,
  } = useStore(({ connection }) => connection);
  const router = useRouter();

  const {
    chainId,
    account,
    isActive: connected,
    activate,
    deactivate,
  } = useConnector("metamask");

  const handleWalletConnection = (type: StepActions) => {
    let network = null;
    switch (type) {
      case StepActions.Connect:
        connectWallet();
        break;
      case StepActions.Disconnect:
        if (connected) {
          deactivate();
        }
        disconnectWallet();
        break;
      case StepActions.Switch:
        activate(ARBITRUM_NETWORK.chainId);
        network = chainId === ARBITRUM_NETWORK.chainId ? "Arbitrum" : "Other";
        switchArbitrum({
          wallet: {
            name: "Metamask",
            network: network as WalletNetwork,
          },
          account: {
            address: account ? account : "",
          },
          step:
            chainId === ARBITRUM_NETWORK.chainId
              ? ConnectionSteps.Confirmed
              : ConnectionSteps.UnsupportedNetwork,
          connected: true,
          confirmed: true,
        });
        router.push("/magic");
        break;
      case StepActions.Metamask:
        activate();
        network = chainId === ARBITRUM_NETWORK.chainId ? "Arbitrum" : "Other";
        connectSupportedWallet({
          wallet: {
            name: "Metamask",
            network: network as WalletNetwork,
          },
          account: {
            address: account ? account : "",
          },
          step:
            chainId === ARBITRUM_NETWORK.chainId
              ? ConnectionSteps.Confirmed
              : ConnectionSteps.UnsupportedNetwork,
          connected: true,
          confirmed: true,
        });
        if (chainId === ARBITRUM_NETWORK.chainId) {
          router.push("/magic");
        }
        break;
      case StepActions.WalletConnect:
        confirmPermission();
        break;
    }
  };

  const handleBackClick = (step: ConnectionSteps) => {
    disconnectWallet();
  };

  return (
    <Default>
      <WalletConnection
        step={step}
        onClick={handleWalletConnection}
        onBackClick={handleBackClick}
      />
    </Default>
  );
};

export default Home;
