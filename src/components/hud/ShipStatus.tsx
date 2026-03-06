import { cn } from "@/lib/utils";

interface ShipStatusProps {
  isScrolling: boolean;
  throttle: number;
}

export default function ShipStatus({ isScrolling, throttle }: ShipStatusProps) {
  const pct = Math.round(throttle * 100);
  const warpLevel = throttle < 0.3 ? "SUB-LIGHT" : throttle < 0.7 ? "WARP 1" : "WARP 2";
  const integrity = Math.max(0, Math.round(100 - throttle * 18));

  return (
    <div className="hud-text space-y-2">
      {/* Ship ID */}
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">
        L4 CIV // NAV ONLINE
      </div>

      {/* Thrust indicator */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            isScrolling ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-white/20"
          )}
        />
        <span className="text-xs text-white/50">
          {isScrolling ? "THRUST ENGAGED" : "STANDBY"}
        </span>
      </div>

      {/* Warp Speed Gauge */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-wider text-cyan-400/70">
            Warp Speed
          </span>
          <span className="text-[9px] tabular-nums text-fuchsia-400/70">
            {warpLevel}
          </span>
        </div>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/5 border border-white/[0.06]">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-200",
              throttle > 0.7
                ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_8px_#d946ef]"
                : throttle > 0.3
                  ? "bg-gradient-to-r from-cyan-400 to-cyan-300"
                  : "bg-cyan-400/60"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-[8px] tabular-nums text-white/30">{pct}%</div>
      </div>

      {/* System Integrity Monitor */}
      <div className="space-y-1">
        <span className="text-[9px] uppercase tracking-wider text-cyan-400/70">
          Sys Integrity
        </span>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-20 overflow-hidden rounded-full bg-white/5 border border-white/[0.06]">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                integrity > 90
                  ? "bg-emerald-400"
                  : integrity > 80
                    ? "bg-cyan-400"
                    : "bg-fuchsia-400"
              )}
              style={{ width: `${integrity}%` }}
            />
          </div>
          <span className="text-[8px] tabular-nums text-white/30">{integrity}%</span>
        </div>
      </div>
    </div>
  );
}
