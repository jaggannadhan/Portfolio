import { lazy, Suspense, useEffect, useRef, useState, useCallback } from "react";
import SpatialHud from "./hud/SpatialHud";
import BulletList from "./hud/BulletList";
import { sections } from "@/lib/data";
const MechanicScene = lazy(() => import("./three/MechanicScene"));
const MUSIC_URL = new URL("../../assets/music/BTTF.mp3", import.meta.url).href;

const SECTION_COUNT = sections.length;
const SNAP_COOLDOWN = 800; // ms before next single snap is allowed
const MULTI_WINDOW = 1000; // ms window to count rapid scrolls
const MULTI_COUNT = 3; // need 3+ scrolls within window...
const MULTI_INTENSITY = 80; // ...AND deltaY > this to allow multi-skip

export default function DataCubeMod() {
  const [settled, setSettled] = useState(0);
  const [isPurging, setIsPurging] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(-1);
  const indexRef = useRef(0);
  const lastSnapTime = useRef(0);
  const rapidCount = useRef(0);
  const purgeTimer = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background music — lazy-loaded on first user interaction
  useEffect(() => {
    const startMusic = () => {
      const audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
      audio.play().catch(() => {});
      window.removeEventListener("wheel", startMusic);
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("wheel", startMusic);
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      audioRef.current?.pause();
      window.removeEventListener("wheel", startMusic);
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const goTo = useCallback((newIndex: number) => {
    const clamped = Math.max(0, Math.min(newIndex, SECTION_COUNT - 1));
    if (clamped === indexRef.current) return;

    indexRef.current = clamped;
    setIsPurging(true);
    clearTimeout(purgeTimer.current);

    purgeTimer.current = window.setTimeout(() => {
      setSettled(clamped);
      setIsPurging(false);
    }, 350);
  }, []);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      // Ignore tiny trackpad noise
      if (Math.abs(e.deltaY) < 10) return;

      const now = performance.now();
      const elapsed = now - lastSnapTime.current;

      // Track rapid scroll count within the multi-skip window
      if (now - lastSnapTime.current < MULTI_WINDOW) {
        rapidCount.current++;
      } else {
        rapidCount.current = 1;
      }

      // Multi-skip: BOTH conditions must be true
      const isMulti =
        rapidCount.current >= MULTI_COUNT &&
        Math.abs(e.deltaY) > MULTI_INTENSITY;

      if (elapsed < SNAP_COOLDOWN && !isMulti) return;

      lastSnapTime.current = now;
      const dir = e.deltaY > 0 ? 1 : -1;
      goTo(indexRef.current + dir);
    }

    // Touch support
    let touchStartY = 0;

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return; // ignore small swipes

      const now = performance.now();
      const elapsed = now - lastSnapTime.current;

      if (now - lastSnapTime.current < MULTI_WINDOW) {
        rapidCount.current++;
      } else {
        rapidCount.current = 1;
      }

      const isMulti =
        rapidCount.current >= MULTI_COUNT &&
        Math.abs(deltaY) > MULTI_INTENSITY;

      if (elapsed < SNAP_COOLDOWN && !isMulti) return;

      lastSnapTime.current = now;
      const dir = deltaY > 0 ? 1 : -1;
      goTo(indexRef.current + dir);
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimeout(purgeTimer.current);
    };
  }, [goTo]);

  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-[#020404]" />}>
        <MechanicScene companyIndex={settled} />
      </Suspense>

      <SpatialHud companyIndex={settled} isPurging={isPurging} hoveredTag={hoveredTag} onTagHover={setHoveredTag} />
      <BulletList companyIndex={settled} isPurging={isPurging} hoveredTag={hoveredTag} />
    </>
  );
}
