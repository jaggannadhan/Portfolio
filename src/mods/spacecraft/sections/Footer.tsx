import { education, profile } from "@/lib/data";
import { SectionHeading } from "./Receipts";
import Socials from "./Socials";

export default function Footer() {
  return (
    <>
      <section id="education" className="py-12 sm:py-16">
        <SectionHeading eyebrow="Academy" title="Where the theory came from" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((e) => (
            <div key={e.degree} className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                {e.dates}
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900">
                {e.degree}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">{e.school}</p>
              <p className="mt-2 font-mono text-xs text-zinc-500">GPA {e.gpa}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16">
        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 text-center sm:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Contact
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-zinc-900">
            Let's build something that ships.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-600">
            Open to full-stack, AI, and data-engineering roles. I reply fast.
          </p>
          <div className="mt-7 flex justify-center">
            <Socials />
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block font-mono text-sm text-zinc-900 underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </div>
      </section>

      <footer className="border-t border-zinc-200 py-10">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-500 sm:flex-row">
          <span className="font-mono tracking-wider">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="font-mono tracking-wider">
            Built with Brain & Brawn
          </span>
        </div>
      </footer>
    </>
  );
}
