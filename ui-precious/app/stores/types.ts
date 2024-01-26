import { GetState, State, StoreApi } from "zustand";
import { NamedSet } from "zustand/middleware";

import { ClaimSlice } from "./defi/claim";
import { ConnectionSlice } from "./defi/connection";
import { GovMagicSlice } from "./defi/govMagic";
import { MagicSlice } from "./defi/magic";

export type StoreSlice<T extends object> = (
  set: NamedSet<T>,
  get: GetState<T>
) => T;

export type CustomStateCreator<
  T extends State,
  CustomSetState = NamedSet<T>,
  CustomGetState = GetState<T>,
  CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = (set: CustomSetState, get: CustomGetState, api: CustomStoreApi) => T;

export type AppState = MagicSlice &
  ClaimSlice &
  ConnectionSlice &
  GovMagicSlice;
