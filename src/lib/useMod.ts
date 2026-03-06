import { useSyncExternalStore } from "react";
import { getModSnapshot, subscribeMod } from "./modStore";
import type { ModId } from "./modStore";

export function useMod(): ModId {
  return useSyncExternalStore(subscribeMod, getModSnapshot);
}
