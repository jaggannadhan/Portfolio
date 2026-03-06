/**
 * Scroll-throttle state store.
 * Pure JS (no React) — read via refs in useFrame, subscribe from React hook.
 */

const TOTAL_CHAPTERS = 9;
const V_MAX = 2.5; // px/ms — scroll velocity that maps to throttle=1
const SMOOTH_K = 8; // critically-damped lerp constant
const SCROLL_END_MS = 220; // debounce ms to detect scroll end (trackpad-safe)

export interface ThrottleState {
  throttle: number; // 0..1 smoothed speed factor
  rawSpeed: number; // px/ms instantaneous velocity
  isScrolling: boolean;
  scrollEndSignal: number; // increments on each scroll-end
  chapterIndex: number; // 0..8
  chapterT: number; // 0..1 within chapter
  globalT: number; // 0..1 across all chapters
  direction: number; // 1 = scrolling down, -1 = scrolling up
}

type Listener = () => void;

// Mutable internal state (read directly in useFrame for perf)
const state: ThrottleState = {
  throttle: 0,
  rawSpeed: 0,
  isScrolling: false,
  scrollEndSignal: 0,
  chapterIndex: 0,
  chapterT: 0,
  globalT: 0,
  direction: 1,
};

// Immutable snapshot for useSyncExternalStore (new ref each notify)
let snapshot: ThrottleState = { ...state };

const listeners = new Set<Listener>();
let lastTime = 0;
let lastScrollY = 0;
let targetThrottle = 0;
let endTimer = 0;
let rAF = 0;
let reduced = false;

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function notify() {
  snapshot = { ...state };
  listeners.forEach((fn) => fn());
}

function updateChapter() {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  if (docH <= 0) {
    state.globalT = 0;
    state.chapterIndex = 0;
    state.chapterT = 0;
    return;
  }
  state.globalT = clamp(window.scrollY / docH, 0, 1);
  const raw = state.globalT * TOTAL_CHAPTERS;
  state.chapterIndex = Math.min(Math.floor(raw), TOTAL_CHAPTERS - 1);
  state.chapterT = raw - Math.floor(raw);
}

function tick() {
  const now = performance.now();
  const dt = Math.max(now - lastTime, 1);
  lastTime = now;

  // compute velocity and direction
  const scrollDelta = window.scrollY - lastScrollY;
  const dy = Math.abs(scrollDelta);
  if (scrollDelta !== 0) state.direction = scrollDelta > 0 ? 1 : -1;
  lastScrollY = window.scrollY;
  state.rawSpeed = dy / dt;

  // target throttle from velocity
  const maxT = reduced ? 0.15 : 1;
  targetThrottle = clamp(state.rawSpeed / V_MAX, 0, maxT);

  // smooth lerp
  const alpha = 1 - Math.exp(-SMOOTH_K * (dt / 1000));
  state.throttle = state.throttle + (targetThrottle - state.throttle) * alpha;
  if (state.throttle < 0.001) state.throttle = 0;

  updateChapter();
  notify();
  rAF = requestAnimationFrame(tick);
}

function onScrollEvent() {
  if (!state.isScrolling) {
    state.isScrolling = true;
    notify();
  }
  clearTimeout(endTimer);
  endTimer = window.setTimeout(() => {
    state.isScrolling = false;
    state.scrollEndSignal++;
    targetThrottle = 0;
    notify();
  }, SCROLL_END_MS);
}

export function initScrollThrottle() {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  lastTime = performance.now();
  lastScrollY = window.scrollY;
  updateChapter();
  notify();

  window.addEventListener("scroll", onScrollEvent, { passive: true });
  window.addEventListener("wheel", onScrollEvent, { passive: true });
  window.addEventListener("touchmove", onScrollEvent, { passive: true });
  rAF = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener("scroll", onScrollEvent);
    window.removeEventListener("wheel", onScrollEvent);
    window.removeEventListener("touchmove", onScrollEvent);
    cancelAnimationFrame(rAF);
    clearTimeout(endTimer);
  };
}

/** Mutable state — use in useFrame (no allocation) */
export function getThrottleState(): ThrottleState {
  return state;
}

/** Immutable snapshot — use with useSyncExternalStore */
export function getSnapshot(): ThrottleState {
  return snapshot;
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
