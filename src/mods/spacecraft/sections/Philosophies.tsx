import { useEffect, useRef, useState } from "react";
import { philosophies } from "@/lib/data";

const ROTATION_MS = 60_000;

export default function Philosophies() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % philosophies.length);
    }, ROTATION_MS);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [paused]);

  const goTo = (i: number) => setIndex(i);

  return (
    <section
      id="philosophies"
      className="py-12 sm:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          My Philosophies
        </p>
        <h2 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-zinc-900">
          What I hold onto
        </h2>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 sm:p-12">
        <div className="relative min-h-[8rem] sm:min-h-[6.5rem]">
          {philosophies.map((p, i) => (
            <blockquote
              key={i}
              aria-hidden={i !== index}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <p
                className="max-w-2xl text-center text-[clamp(1.25rem,2.3vw,1.6rem)] leading-relaxed text-zinc-800"
                style={{ fontFamily: '"Dancing Script", "Brush Script MT", cursive' }}
              >
                {p}
              </p>
            </blockquote>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Philosophy">
          {philosophies.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show philosophy ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-zinc-900"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
