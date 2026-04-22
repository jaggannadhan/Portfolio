type Receipt = { year: string; body: string; kind: "work" | "edu" | "award" };

const receipts: Receipt[] = [
  { year: "2025", body: "Shipping agentic procurement workflows at Leah with Google ADK + LangGraph — cut vendor onboarding ~40%.", kind: "work" },
  { year: "2025", body: "Wired AI/ML + CRMs into an Electron app at Flow Global; lifted sales efficiency 75%.", kind: "work" },
  { year: "2024", body: "Finished MS in Computer Science at UMass Boston (GPA 3.54).", kind: "edu" },
  { year: "2022", body: "Founded UMass Boston's first Jiu-Jitsu club as its inaugural president.", kind: "award" },
  { year: "2022", body: "Built micro-frontends at AnywhereWorks driving $2.5M annual revenue with 99% uptime.", kind: "work" },
  { year: "2016", body: "Completed BE in Computer Science at SVCET.", kind: "edu" }
];

const dotColor: Record<Receipt["kind"], string> = {
  work: "bg-indigo-500",
  edu: "bg-emerald-500",
  award: "bg-amber-500",
};

export default function Receipts() {
  return (
    <section id="receipts" className="py-12 sm:py-16">
      <SectionHeading eyebrow="Receipts" title="A trail of shipped things" />
      <ol className="relative mt-8 border-l border-zinc-200 pl-6">
        {receipts.map((r, i) => (
          <li key={i} className="relative pb-6 last:pb-0">
            <span
              className={`absolute -left-[30px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-white ${dotColor[r.kind]}`}
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="w-16 shrink-0 font-mono text-xs tracking-wider text-zinc-500">
                {r.year}
              </span>
              <p className="text-[0.98rem] leading-relaxed text-zinc-800">{r.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>
    </div>
  );
}
