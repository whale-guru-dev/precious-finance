import { Snackbar } from "..";
import { useSnackbarStore } from "./snackbar.store";

export const SnackbarConnected = () => {
  const { snackbar, hideSnackbar } = useSnackbarStore((state) => state);

  return <Snackbar {...snackbar} onClose={hideSnackbar} />;
};
