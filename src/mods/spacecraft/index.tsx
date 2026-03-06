import { lazy, Suspense } from "react";
import HudOverlay from "@/components/hud/HudOverlay";

const SpaceWindshield = lazy(
  () => import("@/components/three/SpaceWindshield")
);

const TOTAL_CHAPTERS = 9;

export default function SpacecraftMod() {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-[#050510]" />}>
        <SpaceWindshield />
      </Suspense>
      <HudOverlay />
      <div
        style={{ height: `${TOTAL_CHAPTERS * 100}vh` }}
        aria-hidden
      />
    </>
  );
}
