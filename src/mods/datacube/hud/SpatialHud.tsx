import { useState } from "react";
import { sections, profile } from "@/lib/data";

const TAG_LINKS: Record<string, string> = {
  LinkedIn: profile.linkedin,
  GitHub: profile.github,
};

function CopySpan({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <span
      onClick={handleClick}
      className="meta-copy"
      style={{
        cursor: "pointer",
        color: copied ? "#00ff88" : undefined,
        textShadow: copied ? "0 0 8px rgba(0,255,136,0.8)" : undefined,
        transition: "color 0.2s, text-shadow 0.2s",
      }}
    >
      {copied ? "COPIED ✓" : text}
    </span>
  );
}

interface SpatialHudProps {
  companyIndex: number;
  isPurging: boolean;
  hoveredTag: number;
  onTagHover: (index: number) => void;
}

export default function SpatialHud({ companyIndex, isPurging, hoveredTag, onTagHover }: SpatialHudProps) {
  const sec = sections[companyIndex % sections.length];
  const isSkills = sec.type === "skills";
  const isProfile = sec.type === "profile";

  return (
    <div
      className="spatial-hud fixed z-20 pointer-events-none"
      style={{
        animation: isPurging ? "purgeGlitch 0.35s ease-in-out forwards" : "typeIn 0.4s ease-out",
      }}
    >
      {/* System tag */}
      <div
        className="font-mono uppercase tracking-[0.35em] mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#ffdd00",
          textShadow: "0 0 6px rgba(255,221,0,0.8), 0 0 14px rgba(255,221,0,0.4)",
        }}
      >
        <span>{sec.tag}</span>
        {sec.url && (
          <a
            href={sec.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto"
            style={{
              fontSize: "11px",
              color: "#00ff88",
              textShadow: "0 0 6px rgba(0,255,136,0.8), 0 0 14px rgba(0,255,136,0.4)",
              textDecoration: "none",
            }}
          >
            {sec.url.includes("github.com") ? "REPO ↗" : "LIVE ↗"}
          </a>
        )}
      </div>

      {/* Title — white, large, bold */}
      <h1
        className="font-extrabold leading-tight"
        style={{
          fontSize: "clamp(28px, 4vw, 50px)",
          color: "#ffffff",
          textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,180,255,0.3)",
        }}
      >
        {sec.title}
      </h1>

      {/* Subtitle — yellow neon */}
      <p
        className="font-bold mt-2"
        style={{
          fontSize: "clamp(16px, 2.2vw, 24px)",
          color: "#ffdd00",
          textShadow: "0 0 4px rgba(255,221,0,0.5), 0 0 10px rgba(255,221,0,0.25)",
        }}
      >
        {sec.subtitle}
      </p>

      {/* Meta line (dates, location, etc.) */}
      {!isPurging && sec.meta && (
        <p
          className="font-mono mt-3"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#e0e8f0",
            textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            pointerEvents: isProfile ? "auto" : "none",
          }}
        >
          {isProfile ? (
            <>
              <CopySpan text={profile.email} />
              <span> · </span>
              <CopySpan text={profile.phone} />
            </>
          ) : (
            sec.meta
          )}
        </p>
      )}

      {/* Tags */}
      {!isPurging && sec.tags.length > 0 && (
        <div
          className="flex flex-wrap gap-2 mt-4"
          style={{ pointerEvents: isSkills || sec.tags.some(t => TAG_LINKS[t]) ? "auto" : "none" }}
        >
          {sec.tags.map((t, i) => {
            const isActive = isSkills && hoveredTag === i;
            const link = TAG_LINKS[t];
            const Tag = link ? "a" : "span";
            return (
              <Tag
                key={t}
                {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-full font-bold transition-all duration-200 tag-pill"
                style={{
                  fontSize: "11px",
                  padding: "3px 10px",
                  cursor: link || isSkills ? "pointer" : "default",
                  color: isActive ? "#ff8800" : "#00ddff",
                  border: `1px solid ${isActive ? "rgba(255,136,0,0.6)" : "rgba(0,221,255,0.3)"}`,
                  background: isActive ? "rgba(255,136,0,0.15)" : "rgba(0,0,0,0.5)",
                  textShadow: isActive
                    ? "0 0 8px rgba(255,136,0,0.9), 0 0 16px rgba(255,136,0,0.5)"
                    : "0 0 6px rgba(0,221,255,0.5)",
                  textDecoration: "none",
                }}
                onMouseEnter={() => isSkills && onTagHover(i)}
                onMouseLeave={() => isSkills && onTagHover(-1)}
                onClick={() => isSkills && onTagHover(hoveredTag === i ? -1 : i)}
              >
                {t}
              </Tag>
            );
          })}
        </div>
      )}

      {/* Scroll hint — hidden on the final (Education) section */}
      {!isPurging && sec.type !== "education" && (
        <div
          className="font-mono mt-5 scroll-hint-bounce"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#00ff88",
            textShadow: "0 0 6px rgba(0,255,136,0.8), 0 0 14px rgba(0,255,136,0.4)",
            animationDelay: "2s",
          }}
        >
          ▼ SCROLL TO CYCLE
        </div>
      )}
    </div>
  );
}
