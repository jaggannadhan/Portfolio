import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { sections } from "@/lib/data";

interface BulletListProps {
  companyIndex: number;
  isPurging: boolean;
  hoveredTag: number;
}

export default function BulletList({ companyIndex, isPurging, hoveredTag }: BulletListProps) {
  const sec = sections[companyIndex % sections.length];
  const isSkills = sec.type === "skills";
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIndex, setTypingIndex] = useState(-1);

  useEffect(() => {
    if (isPurging) {
      setVisibleCount(0);
      setTypingIndex(-1);
      return;
    }
    const timer = setTimeout(() => {
      setVisibleCount(1);
      setTypingIndex(0);
    }, 600);
    return () => clearTimeout(timer);
  }, [companyIndex, isPurging]);

  const handleBulletDone = (index: number) => {
    if (index + 1 < sec.bullets.length) {
      setVisibleCount(index + 2);
      setTypingIndex(index + 1);
    } else {
      setTypingIndex(-1);
    }
  };

  return (
    <div
      className="fixed z-20 pointer-events-none"
      style={{
        top: "50%",
        right: "clamp(24px, 4vw, 64px)",
        transform: "translateY(-50%)",
        width: "min(38vw, 480px)",
        animation: isPurging ? "purgeGlitch 0.35s ease-in-out forwards" : "typeIn 0.4s ease-out",
      }}
    >
      {/* Section label */}
      <div
        className="font-mono uppercase tracking-[0.35em] mb-4"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#ffdd00",
          textShadow: "0 0 8px rgba(255,221,0,0.6), 0 0 20px rgba(255,221,0,0.3)",
        }}
      >
        {sec.sectionLabel}
      </div>

      {/* Bullet list */}
      <ul className="space-y-4 list-none p-0 m-0">
        {sec.bullets.map((bullet, i) => {
          const isHighlighted = isSkills && hoveredTag === i;
          return (
            <li
              key={`${companyIndex}-${i}`}
              className="flex items-start gap-3 transition-all duration-200"
              style={{
                opacity: i < visibleCount ? 1 : 0,
                transition: "opacity 0.2s ease-in",
              }}
            >
              {/* Bullet marker */}
              <span
                className="shrink-0 mt-[2px] transition-all duration-200"
                style={{
                  color: isHighlighted ? "#ff8800" : "#ffb844",
                  fontSize: "14px",
                  fontWeight: 700,
                  textShadow: isHighlighted
                    ? "0 0 8px rgba(255,136,0,0.9), 0 0 16px rgba(255,136,0,0.5)"
                    : "0 0 6px rgba(255,184,68,0.4)",
                }}
              >
                ▸
              </span>

              {/* Typed text */}
              <span
                className="font-sans leading-relaxed transition-all duration-200"
                style={{
                  fontSize: "clamp(14px, 1.6vw, 17px)",
                  fontWeight: 600,
                  color: isHighlighted ? "#ff8800" : "rgba(240, 245, 250, 0.9)",
                  textShadow: isHighlighted
                    ? "0 0 8px rgba(255,136,0,0.8), 0 0 16px rgba(255,136,0,0.4)"
                    : "0 1px 6px rgba(0,0,0,0.9)",
                  letterSpacing: "0.2px",
                }}
              >
                {i < visibleCount ? (
                  <>
                    <TypeAnimation
                      sequence={[
                        bullet,
                        () => handleBulletDone(i),
                      ]}
                      speed={85}
                      cursor={false}
                      wrapper="span"
                    />
                    {i === typingIndex && (
                      <span className="cursor-pointer-blip">▌</span>
                    )}
                  </>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
