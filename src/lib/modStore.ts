export type ModId = "spacecraft" | "chronograph" | "datacube";

type Listener = () => void;

let activeMod: ModId = (localStorage.getItem("mod") as ModId) || "spacecraft";
let snapshot: ModId = activeMod;
const listeners = new Set<Listener>();

function notify() {
  snapshot = activeMod;
  listeners.forEach((fn) => fn());
}

export function setMod(mod: ModId) {
  activeMod = mod;
  localStorage.setItem("mod", mod);
  notify();
}

export function getModSnapshot(): ModId {
  return snapshot;
}

export function subscribeMod(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
