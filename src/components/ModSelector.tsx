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
  const lightTheme = activeMod === "spacecraft";

  const inactive = lightTheme
    ? "border-zinc-900/15 bg-white/60 backdrop-blur text-zinc-900/50 hover:border-zinc-900/35 hover:text-zinc-900/80"
    : "border-white/10 bg-white/5 text-white/30 hover:border-white/20 hover:text-white/50";

  return (
    <div className="fixed top-4 right-4 sm:right-6 z-30 flex gap-1.5 pointer-events-auto">
      {MODS.map((mod) => {
        const active = mod.id === activeMod;
        const activeStyles =
          mod.id === "spacecraft"
            ? "border-zinc-900/40 bg-zinc-900 text-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.2)]"
            : mod.id === "chronograph"
            ? "border-violet-400/40 bg-violet-500/10 text-violet-300 shadow-[0_0_8px_rgba(139,92,246,0.15)]"
            : "border-emerald-400/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.15)]";
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
              ${active ? activeStyles : inactive}
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
