import { NamedSet } from "zustand/middleware";
import { AlertColor } from "@mui/material";

import { createStore } from "@/stores/root";

interface SnackbarProps {
  severity: AlertColor;
  alertText: string;
  href: string;
  show: boolean;
}

export interface SnackbarState {
  snackbar: SnackbarProps;
  showSnackbar: (payload: Partial<SnackbarProps>) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = createStore<SnackbarState>(
  (set: NamedSet<any>) => ({
    snackbar: {
      severity: "success",
      alertText: "",
      href: "",
      show: false,
    },

    showSnackbar: (payload: Partial<SnackbarProps>) =>
      set(function showSnackbar(state: SnackbarState) {
        state.snackbar = {
          ...state.snackbar,
          ...payload,
          show: true,
        };
      }),

    hideSnackbar: () =>
      set(function hideSnackbar(state: SnackbarState) {
        state.snackbar.show = false;
      }),
  })
);
