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
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
    }
    if (audio.paused) {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
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

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="fixed z-30 font-mono music-toggle"
        style={{
          bottom: "clamp(12px, 3vw, 40px)",
          left: "clamp(12px, 4vw, 64px)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.5px",
          color: musicPlaying ? "#00ddff" : "rgba(240, 245, 250, 0.4)",
          textShadow: musicPlaying
            ? "0 0 6px rgba(0,221,255,0.8), 0 0 14px rgba(0,221,255,0.4)"
            : "none",
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(0,221,255,0.15)",
          borderRadius: "8px",
          cursor: "pointer",
          padding: "8px 12px",
          transition: "color 0.2s, text-shadow 0.2s, background 0.2s",
        }}
      >
        {musicPlaying ? "♫ SND ON" : "♫ SND OFF"}
      </button>
    </>
  );
}
