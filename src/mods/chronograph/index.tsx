import { lazy, Suspense } from "react";
import ChronoOverlay from "./hud/ChronoOverlay";

const TimeTunnel = lazy(() => import("./three/TimeTunnel"));

const TOTAL_CHAPTERS = 9;

export default function ChronographMod() {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-[#06050f]" />}>
        <TimeTunnel />
      </Suspense>
      <ChronoOverlay />
      <div
        style={{ height: `${TOTAL_CHAPTERS * 100}vh` }}
        aria-hidden
      />
    </>
  );
}
