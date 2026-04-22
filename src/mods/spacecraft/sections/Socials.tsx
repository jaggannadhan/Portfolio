import { profile } from "@/lib/data";

const ICON_CLASS = "h-4 w-4";

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={ICON_CLASS}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7.5 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.82 0-2.1 1.42-2.1 2.88V21h-4V9z" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.27 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.73 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default function Socials({ size = "md" }: { size?: "sm" | "md" }) {
  const pad = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${profile.email}`}
        aria-label="Email"
        className={`${pad} flex items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900`}
      >
        <MailIcon />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className={`${pad} flex items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900`}
      >
        <LinkedInIcon />
      </a>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={`${pad} flex items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900`}
      >
        <GitHubIcon />
      </a>
    </div>
  );
}
