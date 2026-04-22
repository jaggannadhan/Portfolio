import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const LINKS = [
  { id: "receipts", label: "Receipts" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/70 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1104px] items-center gap-4 px-5 pr-[168px] sm:px-8 sm:pr-[180px]">
        <a
          href="#top"
          className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 font-mono text-[11px] text-white">
            {initials}
          </span>
          <span className="hidden text-sm sm:inline">{profile.name}</span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-md px-2.5 py-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
