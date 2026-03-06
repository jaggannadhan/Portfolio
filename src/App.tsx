import { lazy, Suspense } from "react";
import HudOverlay from "@/components/hud/HudOverlay";

const SpaceWindshield = lazy(
  () => import("@/components/three/SpaceWindshield")
);

const TOTAL_CHAPTERS = 9;

export default function App() {
  return (
    <>
      {/* 3D scene: fixed, pointer-events-none so scroll passes through */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#050510]" />}>
        <SpaceWindshield />
      </Suspense>

      {/* 2D HUD overlay: fixed, pointer-events-none (children opt-in) */}
      <HudOverlay />

      {/* Scroll track: normal document flow, generates scrollY */}
      <div
        style={{ height: `${TOTAL_CHAPTERS * 100}vh` }}
        aria-hidden
      />
    </>
  );
}
