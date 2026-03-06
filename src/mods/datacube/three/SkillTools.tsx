import { Html } from "@react-three/drei";
import { skills } from "@/lib/data";

/**
 * Static tech labels scattered on the floor like fallen tools.
 * Only illuminated by the mechanic's flashlight as he passes.
 * Scaled for the new macro view.
 */

const ALL_SKILLS = skills.groups.flatMap((g) => g.items);

interface ToolData {
  label: string;
  x: number;
  z: number;
  rotY: number;
}

function generateTools(): ToolData[] {
  const tools: ToolData[] = [];
  const count = Math.min(ALL_SKILLS.length, 24);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + 0.4;
    const radius = 5.0 + (i % 4) * 1.5;
    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius;
    // Avoid the center car/dashboard area
    if (Math.abs(x) < 2.5 && Math.abs(z) < 4) {
      x += x > 0 ? 2.5 : -2.5;
    }
    tools.push({
      label: ALL_SKILLS[i],
      x,
      z,
      rotY: ((i * 41) % 360) * (Math.PI / 180),
    });
  }
  return tools;
}

const TOOLS = generateTools();

export default function SkillTools() {
  return (
    <group>
      {TOOLS.map((tool, i) => (
        <group
          key={i}
          position={[tool.x, 0, tool.z]}
          rotation={[0, tool.rotY, 0]}
        >
          {/* Chip body — flat on floor */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.7, 0.04, 0.28]} />
            <meshStandardMaterial
              color="#080e10"
              emissive="#06b6d4"
              emissiveIntensity={0.2}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>

          {/* Connector dots */}
          <mesh position={[-0.28, 0.04, 0]}>
            <sphereGeometry args={[0.02, 6, 4]} />
            <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0.28, 0.04, 0]}>
            <sphereGeometry args={[0.02, 6, 4]} />
            <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} />
          </mesh>

          {/* Label */}
          <Html
            center
            position={[0, 0.08, 0]}
            className="pointer-events-none select-none"
          >
            <span
              className="font-mono font-bold whitespace-nowrap"
              style={{
                fontSize: "9px",
                color: "rgba(0,255,255,0.6)",
                textShadow: "0 0 5px rgba(0,255,255,0.3)",
              }}
            >
              {tool.label}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}
