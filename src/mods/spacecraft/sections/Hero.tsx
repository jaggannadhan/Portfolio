import { profile } from "@/lib/data";
import Socials from "./Socials";
import portraitSrc from "@/assets/images/portrait.png";

export default function Hero() {
  return (
    <section id="top" className="pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_300px] md:gap-14">
        <div className="order-2 md:order-1">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Full-Stack · Agentic AI · Data
          </p>
          <h1 className="text-[clamp(1.875rem,5.5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-zinc-900">
            A Senior Full-Stack Engineer shipping{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              agentic AI
            </span>{" "}
            into production.
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-zinc-600">
            {profile.subheadline} I work at the messy seams where LLMs meet real
            systems — orchestration, RAG, and the data plumbing that keeps them honest.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Socials />
            <span className="ml-1 font-mono text-xs text-zinc-400">
              {profile.email}
            </span>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-44 sm:w-56 md:w-full">
            <div
              className="relative w-full overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
              style={{
                aspectRatio: "2 / 3",
                borderRadius: "9999px",
              }}
            >
              <img
                src={portraitSrc}
                alt={profile.name}
                className="absolute inset-0 block h-full w-full object-cover"
                style={{ objectPosition: "58% 25%" }}
              />
            </div>
            <div
              className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-gradient-to-br from-indigo-200/40 to-emerald-200/40 blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
