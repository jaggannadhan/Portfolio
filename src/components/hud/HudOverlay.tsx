import { useState, useEffect, useRef } from "react";
import { useScrollThrottle } from "@/lib/useScrollThrottle";
import ShipStatus from "./ShipStatus";
import ChapterHeader from "./ChapterHeader";
import ProgressTicks from "./ProgressTicks";
import WindshieldHud from "./WindshieldHud";

export default function HudOverlay() {
  const state = useScrollThrottle();

  // Debounce chapter so the animation only fires once scrolling
  // settles on a new chapter (avoids rapid-fire transitions).
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

  // Settle immediately when scrolling stops
  useEffect(() => {
    if (!state.isScrolling) {
      setSettledChapter(state.chapterIndex);
    }
  }, [state.isScrolling, state.chapterIndex]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Top left: ship status */}
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <ShipStatus isScrolling={state.isScrolling} throttle={state.throttle} />
      </div>

      {/* Top center: chapter name */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-6">
        <ChapterHeader
          chapterIndex={state.chapterIndex}
          isScrolling={state.isScrolling}
        />
      </div>

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 hud-scanlines opacity-[0.02]" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,16,0.6)_100%)]" />

      {/* Main content: WindshieldHud - full viewport zoom */}
      <WindshieldHud
        chapterIndex={settledChapter}
        isScrolling={state.isScrolling}
      />

      {/* Bottom: progress ticks */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-auto">
        <ProgressTicks
          chapterIndex={state.chapterIndex}
          globalT={state.globalT}
        />
      </div>

      {/* Debug readout (add ?debug to URL) */}
      {typeof window !== "undefined" &&
        window.location.search.includes("debug") && (
          <div className="absolute left-4 bottom-16 hud-text text-[9px] text-white/40 space-y-0.5 pointer-events-none">
            <div>scrollY: {Math.round(window.scrollY)}</div>
            <div>rawSpeed: {state.rawSpeed.toFixed(3)}</div>
            <div>throttle: {state.throttle.toFixed(3)}</div>
            <div>isScrolling: {String(state.isScrolling)}</div>
            <div>chapter: {state.chapterIndex} (t={state.chapterT.toFixed(2)})</div>
            <div>globalT: {state.globalT.toFixed(3)}</div>
            <div>signal: {state.scrollEndSignal}</div>
          </div>
        )}
    </div>
  );
}
