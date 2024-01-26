import create, { GetState, State } from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

import immer from "./middlewares/immer";

import { createClaimSlice } from "./defi/claim";
import { createConnectionSlice } from "./defi/connection";
import { createGovMagicSlice } from "./defi/govMagic";
import { createMagicSlice } from "./defi/magic";
import { AppState, CustomStateCreator } from "./types";

export const createStore = <TState extends State>(
  storeCreator: CustomStateCreator<TState>
) => {
  return create(devtools(immer(storeCreator)));
};

export const useStore = createStore<AppState>(
  (set: NamedSet<any>, get: GetState<any>) => ({
    ...createConnectionSlice(set, get),
    ...createMagicSlice(set, get),
    ...createClaimSlice(set, get),
    ...createGovMagicSlice(set, get),
  })
);
