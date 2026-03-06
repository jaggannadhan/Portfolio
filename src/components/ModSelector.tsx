import { useMod } from "@/lib/useMod";
import { setMod } from "@/lib/modStore";
import type { ModId } from "@/lib/modStore";

const MODS: { id: ModId; label: string; icon: string }[] = [
  { id: "spacecraft", label: "Spacecraft", icon: "I" },
  { id: "chronograph", label: "Chronograph", icon: "II" },
  { id: "datacube", label: "Data Cube", icon: "III" },
];

export default function ModSelector() {
  const activeMod = useMod();

  return (
    <div className="fixed top-4 right-4 sm:right-6 z-20 flex gap-1.5 pointer-events-auto">
      {MODS.map((mod) => {
        const active = mod.id === activeMod;
        return (
          <button
            key={mod.id}
            onClick={() => {
              if (!active) {
                window.scrollTo({ top: 0 });
                setMod(mod.id);
              }
            }}
            className={`
              rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider
              transition-all duration-300 cursor-pointer
              ${active
                ? mod.id === "spacecraft"
                  ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.15)]"
                  : mod.id === "chronograph"
                  ? "border-violet-400/40 bg-violet-500/10 text-violet-300 shadow-[0_0_8px_rgba(139,92,246,0.15)]"
                  : "border-emerald-400/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)]"
                : "border-white/10 bg-white/5 text-white/30 hover:border-white/20 hover:text-white/50"
              }
            `}
            title={mod.label}
          >
            MOD {mod.icon}
          </button>
        );
      })}
    </div>
  );
}
