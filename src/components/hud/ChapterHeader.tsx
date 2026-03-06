import { motion, AnimatePresence } from "framer-motion";

const CHAPTER_NAMES = [
  "IDENTITY // MISSION",
  "IMPACT METRICS",
  "STATION ALPHA // LEAH",
  "STATION BETA // FLOW GLOBAL",
  "STATION GAMMA // ANYWHEREWORKS",
  "PROJECT ARCHIVE",
  "SKILL MATRIX",
  "EDUCATION // HONORS",
  "CONTACT // COMMS",
];

interface ChapterHeaderProps {
  chapterIndex: number;
  isScrolling: boolean;
}

export default function ChapterHeader({
  chapterIndex,
  isScrolling,
}: ChapterHeaderProps) {
  const name = CHAPTER_NAMES[chapterIndex] ?? "UNKNOWN";

  return (
    <div className="hud-text flex flex-col items-center gap-1">
      <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/25">
        {"<"} SECTOR {chapterIndex + 1} / 9 {">"}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={chapterIndex}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium tracking-wider text-white/70"
        >
          {name}
        </motion.div>
      </AnimatePresence>
      {isScrolling && (
        <div className="mt-0.5 h-px w-24 animate-pulse bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      )}
    </div>
  );
}
