import { motion, AnimatePresence } from "framer-motion";
import HoloCard from "./HoloCard";
import ChapterContent from "./ChapterContent";

interface WindshieldHudProps {
  chapterIndex: number;
  isScrolling: boolean;
}

export default function WindshieldHud({
  chapterIndex,
  isScrolling,
}: WindshieldHudProps) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={chapterIndex}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.08 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="pointer-events-auto w-[clamp(320px,42vw,620px)] max-sm:w-[92vw]">
          <HoloCard>
            {/* terminal header bar */}
            <div className="mb-3 flex items-center gap-2 border-b border-cyan-500/10 pb-2">
              <div className={`h-1.5 w-1.5 rounded-full ${isScrolling ? "bg-fuchsia-400 animate-pulse" : "bg-cyan-400"} shadow-[0_0_4px_#22d3ee]`} />
              <span className="hud-text text-[9px] uppercase tracking-[0.3em] text-cyan-400/50">
                {isScrolling ? "WARP ACTIVE // STAND BY" : "MISSION LOG // ACTIVE"}
              </span>
              <span className="ml-auto hud-text text-[8px] tabular-nums text-fuchsia-400/30">
                SEC-{chapterIndex + 1}
              </span>
            </div>
            <ChapterContent chapterIndex={chapterIndex} />
          </HoloCard>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
