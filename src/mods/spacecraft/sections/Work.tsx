import { experience, projects } from "@/lib/data";
import { SectionHeading } from "./Receipts";

export default function Work() {
  return (
    <section id="work" className="py-12 sm:py-16">
      <SectionHeading eyebrow="Work" title="Roles & projects" />

      <div className="mt-8 space-y-8">
        {experience.map((exp) => (
          <article key={exp.company} className="group grid grid-cols-1 gap-3 border-t border-zinc-200 pt-6 md:grid-cols-[180px_1fr] md:gap-8">
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              {exp.dates}
              <div className="mt-1 normal-case tracking-normal text-zinc-400">
                {exp.location}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                {exp.role} · <span className="text-zinc-600">{exp.company}</span>
              </h3>
              <ul className="mt-3 space-y-2 text-[0.98rem] leading-relaxed text-zinc-700">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-[10.5px] tracking-wide text-zinc-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p) => {
          const interactive = !!p.url;
          const Card = interactive ? "a" : "div";
          const cardProps = interactive
            ? { href: p.url, target: "_blank", rel: "noreferrer" as const }
            : {};
          return (
            <Card
              key={p.name}
              {...cardProps}
              className={`group relative flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all ${
                interactive
                  ? "hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-base font-semibold tracking-tight text-zinc-900">
                  {p.name}
                </h4>
                {interactive && (
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-indigo-600 transition-colors group-hover:text-indigo-700">
                    {p.url!.includes("github.com") ? "Repo ↗" : "Live ↗"}
                  </span>
                )}
              </div>
              <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-zinc-600">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10px] tracking-wide text-zinc-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
