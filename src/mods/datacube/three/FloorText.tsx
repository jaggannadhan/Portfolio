import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { sections } from "@/lib/data";
import { mechanicPos } from "../mechanicStore";

/**
 * Bullet text scattered across the floor as spatial data.
 * Each line brightens/changes color when the mechanic is nearby.
 * On companyIndex change, old text purges out, new text types in.
 */

interface FloorTextProps {
  companyIndex: number;
  isPurging: boolean;
}

interface TextNode {
  text: string;
  x: number;
  z: number;
  delay: number;
}

const PROXIMITY_RADIUS = 4;

// Deterministic scatter positions for bullets
function scatterBullets(bullets: string[]): TextNode[] {
  return bullets.map((text, i) => {
    // Scatter around the scene, avoiding dead center where car is
    const angle = (i / bullets.length) * Math.PI * 2 + 0.8;
    const radius = 3 + (i % 3) * 2;
    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius;
    // Push away from center if too close
    if (Math.abs(x) < 1.5 && Math.abs(z) < 2) {
      x *= 2;
      z *= 2;
    }
    return { text, x, z, delay: i * 0.12 };
  });
}

function FloorTextNode({
  node,
  isPurging,
  typeDelay,
}: {
  node: TextNode;
  isPurging: boolean;
  typeDelay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (isPurging) {
      setTyped("");
      setIsTyping(false);
      return;
    }

    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setTyped(node.text.slice(0, idx));
        if (idx >= node.text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 18);
      return () => clearInterval(interval);
    }, typeDelay * 1000);

    return () => clearTimeout(startTimer);
  }, [node.text, isPurging, typeDelay]);

  // Proximity-based brightness via useFrame
  useFrame(() => {
    if (!ref.current) return;
    const dx = mechanicPos.x - node.x;
    const dz = mechanicPos.z - node.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const proximity = Math.max(0, 1 - dist / PROXIMITY_RADIUS);

    // Interpolate: dim cyan → bright white when mechanic is near
    const brightness = 0.25 + proximity * 0.75;
    const glow = proximity * 12;
    const r = Math.round(proximity * 255);
    const g = Math.round(200 + proximity * 55);
    const b = Math.round(200 + proximity * 55);
    ref.current.style.color = `rgba(${r}, ${g}, ${b}, ${brightness})`;
    ref.current.style.textShadow = `0 0 ${glow}px rgba(0, 255, 255, ${proximity * 0.8})`;
    ref.current.style.transform = `scale(${1 + proximity * 0.15})`;
  });

  if (!typed && !isPurging) return null;

  return (
    <Html
      center
      position={[node.x, 0.04, node.z]}
      className="pointer-events-none select-none"
    >
      <span
        ref={ref}
        className="font-mono whitespace-nowrap block max-w-[220px] overflow-hidden text-ellipsis"
        style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.5px",
          color: "rgba(0, 255, 255, 0.25)",
          transition: "color 0.1s, text-shadow 0.1s",
          animation: isPurging
            ? "purgeGlitch 0.4s ease-out forwards"
            : undefined,
        }}
      >
        {typed}
        {isTyping && (
          <span className="cursor-pointer-blip">▌</span>
        )}
      </span>
    </Html>
  );
}

export default function FloorText({ companyIndex, isPurging }: FloorTextProps) {
  const sec = sections[companyIndex % sections.length];
  const nodes = useMemo(() => scatterBullets(sec.bullets), [sec.bullets]);

  return (
    <group>
      {nodes.map((node, i) => (
        <FloorTextNode
          key={`${companyIndex}-${i}`}
          node={node}
          isPurging={isPurging}
          typeDelay={node.delay + 0.3}
        />
      ))}
    </group>
  );
}
