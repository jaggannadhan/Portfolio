import { useState, useEffect, useRef } from "react";
import { useScrollThrottle } from "@/lib/useScrollThrottle";
import ChronoHud from "./ChronoHud";
import TimelineTicks from "./TimelineTicks";

const EPOCH_NAMES = [
  "ORIGIN",
  "IMPACT",
  "LEAH",
  "FLOW",
  "ANYW",
  "ARTIFACTS",
  "GENOME",
  "KNOWL",
  "FUTURE",
];

export default function ChronoOverlay() {
  const state = useScrollThrottle();

  const [settledChapter, setSettledChapter] = useState(state.chapterIndex);
  const timerRef = useRef(0);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (state.chapterIndex === settledChapter) return;
    timerRef.current = window.setTimeout(() => {
      setSettledChapter(state.chapterIndex);
    }, 250);
    return () => clearTimeout(timerRef.current);
  }, [state.chapterIndex, settledChapter]);

  useEffect(() => {
    if (!state.isScrolling) {
      setSettledChapter(state.chapterIndex);
    }
  }, [state.isScrolling, state.chapterIndex]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Top left: temporal status */}
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6 pointer-events-none hidden sm:block">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-400/40">
          CHRONOGRAPH v4.2
        </div>
        <div className="font-mono text-[9px] text-violet-300/30 mt-1">
          {state.isScrolling ? "TRAVERSING" : "ANCHORED"} // {state.throttle > 0.5 ? "WARP" : "SUB-LIGHT"}
        </div>
        <div className="mt-2 h-px w-20 bg-gradient-to-r from-violet-500/30 to-transparent" />
        <div className="font-mono text-[8px] text-fuchsia-400/25 mt-1">
          TEMPORAL INTEGRITY
        </div>
        <div className="mt-1 h-1 w-20 rounded-full bg-violet-950/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${100 - state.throttle * 60}%` }}
          />
        </div>
      </div>

      {/* Top center: epoch name — hidden below sm to avoid ModSelector collision */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-6 text-center hidden sm:block">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-400/30">
          {"<"} EPOCH {state.chapterIndex + 1} / 9 {">"}
        </div>
        <div className="font-mono text-sm uppercase tracking-[0.2em] text-white/70 mt-0.5">
          {EPOCH_NAMES[state.chapterIndex]}
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 hud-scanlines opacity-[0.03]" />

      {/* Vignette - deep purple tint, tight center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,3,15,0.85)_100%)]" />

      {/* Main content */}
      <ChronoHud
        chapterIndex={settledChapter}
        isScrolling={state.isScrolling}
      />

      {/* Bottom: timeline ticks */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-auto">
        <TimelineTicks
          chapterIndex={state.chapterIndex}
          globalT={state.globalT}
        />
      </div>
    </div>
  );
}
