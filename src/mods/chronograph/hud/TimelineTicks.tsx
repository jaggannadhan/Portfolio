const TOTAL = 9;
const LABELS = [
  "ORIGIN", "IMPACT", "LEAH", "FLOW", "ANYW",
  "ARTFCT", "GENOME", "KNOWL", "FUTURE",
];

interface Props {
  chapterIndex: number;
  globalT: number;
}

export default function TimelineTicks({ chapterIndex, globalT }: Props) {
  return (
    <div className="flex items-end gap-0.5 sm:gap-1">
      {Array.from({ length: TOTAL }, (_, i) => {
        const active = i === chapterIndex;
        const past = i < chapterIndex;
        return (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div
              className={`w-1 rounded-full transition-all duration-300 ${
                active
                  ? "h-4 bg-gradient-to-t from-violet-500 to-fuchsia-400 shadow-[0_0_6px_#8b5cf6]"
                  : past
                    ? "h-2.5 bg-violet-500/40"
                    : "h-2 bg-violet-900/30"
              }`}
            />
            <span
              className={`font-mono text-[6px] tracking-wider transition-colors duration-300 ${
                active ? "text-fuchsia-300" : past ? "text-violet-400/40" : "text-violet-900/40"
              }`}
            >
              {LABELS[i]}
            </span>
          </div>
        );
      })}
      {/* Progress line */}
      <div className="ml-2 font-mono text-[7px] tabular-nums text-violet-400/20 self-center">
        {(globalT * 100).toFixed(0)}%
      </div>
    </div>
  );
}
