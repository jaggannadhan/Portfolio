import { motion, AnimatePresence } from "framer-motion";
import ChronoChapterContent from "./ChronoChapterContent";

interface ChronoHudProps {
  chapterIndex: number;
  isScrolling: boolean;
}

const EPOCH_NAMES = [
  "ORIGIN POINT",
  "IMPACT ECHOES",
  "ERA: LEAH",
  "ERA: FLOW GLOBAL",
  "ERA: ANYWHEREWORKS",
  "DATA ARTIFACTS",
  "SKILL GENOME",
  "KNOWLEDGE ORIGIN",
  "FUTURE LINK",
];

export default function ChronoHud({
  chapterIndex,
  isScrolling,
}: ChronoHudProps) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={chapterIndex}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.06, rotateX: 15 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 2.5, rotateX: -10 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity", perspective: "1000px" }}
      >
        <div className="pointer-events-auto w-[min(92vw,620px)] sm:w-[clamp(420px,62vw,1000px)]">
          <div className="relative p-4 sm:p-5">
            {/* Temporal header */}
            <div className="mb-3 flex items-center gap-2 border-b border-violet-500/15 pb-2">
              <div className={`h-1.5 w-1.5 rounded-full ${isScrolling ? "bg-fuchsia-400 animate-pulse" : "bg-violet-400"} shadow-[0_0_6px_#8b5cf6]`} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300/60">
                {isScrolling ? "TIME WARP // TRAVERSING" : "TEMPORAL RECORD // LOCKED"}
              </span>
              <span className="ml-auto font-mono text-[9px] font-bold tabular-nums text-fuchsia-300/40">
                T-{chapterIndex + 1}
              </span>
            </div>

            {/* Epoch label */}
            <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-violet-200/55" style={{ textShadow: "0 0 10px rgba(167,139,250,0.3)" }}>
              {"> EPOCH"} :: {EPOCH_NAMES[chapterIndex] ?? "UNKNOWN"}
            </div>

            <ChronoChapterContent chapterIndex={chapterIndex} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
