import { cn } from "@/lib/utils";

const TOTAL_CHAPTERS = 9;

const CHAPTER_LABELS = [
  "IDENT",
  "IMPACT",
  "LEAH",
  "FLOW",
  "ANYW",
  "PROJ",
  "SKILL",
  "EDU",
  "COMM",
];

interface ProgressTicksProps {
  chapterIndex: number;
  globalT: number;
}

export default function ProgressTicks({
  chapterIndex,
  globalT,
}: ProgressTicksProps) {
  return (
    <div className="hud-text relative flex items-center gap-1">
      {CHAPTER_LABELS.map((label, i) => (
        <button
          key={i}
          className={cn(
            "group relative flex flex-col items-center gap-1 px-2 py-1.5 transition-colors cursor-pointer",
            i === chapterIndex ? "text-white/80" : "text-white/25 hover:text-white/50"
          )}
          onClick={() => {
            const maxScroll =
              document.documentElement.scrollHeight - window.innerHeight;
            const targetT = (i + 0.5) / TOTAL_CHAPTERS;
            const targetY = Math.min(Math.max(targetT * maxScroll, 0), maxScroll);
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }}
        >
          <div
            className={cn(
              "h-4 w-0.5 rounded-full transition-all duration-300",
              i === chapterIndex
                ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
                : i < chapterIndex
                  ? "bg-white/30"
                  : "bg-white/10"
            )}
          />
          <span className="hidden text-[8px] tracking-wider sm:block">
            {label}
          </span>
        </button>
      ))}
      {/* thin progress bar underneath */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
        <div
          className="h-full bg-cyan-500/40 transition-all duration-300"
          style={{ width: `${globalT * 100}%` }}
        />
      </div>
    </div>
  );
}
