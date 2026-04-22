import { skills } from "@/lib/data";
import { SectionHeading } from "./Receipts";

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16">
      <SectionHeading eyebrow="Arsenal" title="Tools I reach for" />
      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
        {skills.groups.map((g) => (
          <div key={g.title}>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              {g.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[0.82rem] text-zinc-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
