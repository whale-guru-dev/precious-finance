import { useEffect } from "react";
import { useRouter } from "next/router";

import { isConnectedAndConfirmed } from "@/stores/defi/connection";
import { useStore } from "@/stores/root";

export const useRedirect = () => {
  const connectedAndConfirmed = useStore(isConnectedAndConfirmed);
  const router = useRouter();

  useEffect(() => {
    !connectedAndConfirmed && router.push("/");
  }, [connectedAndConfirmed]);

  return connectedAndConfirmed;
};
