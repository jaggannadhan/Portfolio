import { useEffect, useSyncExternalStore } from "react";
import {
  initScrollThrottle,
  getSnapshot,
  subscribe,
  type ThrottleState,
} from "./scrollThrottle";

let initialized = false;

export function useScrollThrottle(): ThrottleState {
  useEffect(() => {
    if (initialized) return;
    initialized = true;
    const cleanup = initScrollThrottle();
    return () => {
      cleanup();
      initialized = false;
    };
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
