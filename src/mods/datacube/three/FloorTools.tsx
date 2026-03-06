import * as THREE from "three";

/**
 * Toolbox + scattered tools on the floor near the mechanic.
 * Green toolbox with compartments, wrenches/screwdrivers scattered around.
 */

export default function FloorTools() {
  return (
    <group>
      <Toolbox position={[2.8, 0, 2.2]} />
      <ScatteredTools />
    </group>
  );
}

/** Green toolbox with open lid and visible compartments */
function Toolbox({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.3, 0]}>
      {/* Main box body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.7, 0.4, 0.4]} />
        <meshStandardMaterial
          color="#1a5a2a"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Open lid — tilted back */}
      <group position={[0, 0.4, -0.2]} rotation={[-0.8, 0, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.72, 0.04, 0.4]} />
          <meshStandardMaterial
            color="#1a5a2a"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Interior compartments — red/green trays */}
      <mesh position={[-0.15, 0.35, 0.02]}>
        <boxGeometry args={[0.28, 0.08, 0.3]} />
        <meshStandardMaterial color="#8b1a1a" roughness={0.6} />
      </mesh>
      <mesh position={[0.15, 0.35, 0.02]}>
        <boxGeometry args={[0.28, 0.08, 0.3]} />
        <meshStandardMaterial color="#2a6a3a" roughness={0.6} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, 0.42, 0.05]}>
        <boxGeometry args={[0.4, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#555"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/** Scattered wrenches, screwdrivers, bolts near the mechanic */
function ScatteredTools() {
  // Tool positions — scattered on the right side of the car
  const tools: {
    type: "wrench" | "screwdriver" | "bolt";
    pos: [number, number, number];
    rot: number;
  }[] = [
    { type: "wrench", pos: [1.8, 0.02, 1.6], rot: 0.7 },
    { type: "wrench", pos: [2.2, 0.02, 1.2], rot: -0.4 },
    { type: "screwdriver", pos: [0.6, 0.02, 2.6], rot: 1.2 },
    { type: "screwdriver", pos: [1.5, 0.02, 2.8], rot: -0.8 },
    { type: "screwdriver", pos: [2.5, 0.02, 1.0], rot: 0.3 },
    { type: "bolt", pos: [1.2, 0.02, 1.8], rot: 0 },
    { type: "bolt", pos: [0.8, 0.02, 2.2], rot: 0.5 },
    { type: "bolt", pos: [2.0, 0.02, 2.5], rot: 1.0 },
    { type: "bolt", pos: [1.6, 0.02, 1.4], rot: -0.6 },
    { type: "bolt", pos: [2.4, 0.02, 2.0], rot: 0.2 },
  ];

  return (
    <group>
      {tools.map((tool, i) => {
        if (tool.type === "wrench") return <Wrench key={i} position={tool.pos} rotation={tool.rot} />;
        if (tool.type === "screwdriver") return <Screwdriver key={i} position={tool.pos} rotation={tool.rot} />;
        return <Bolt key={i} position={tool.pos} rotation={tool.rot} />;
      })}

      {/* Socket set — small open case */}
      <group position={[1.0, 0.01, 1.5]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Socket bits */}
        {[-0.08, 0, 0.08].map((x, i) => (
          <mesh key={i} position={[x, 0.05, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
            <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Wrench({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Handle */}
      <mesh>
        <boxGeometry args={[0.35, 0.02, 0.04]} />
        <meshStandardMaterial color="#666" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Head — open end */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.08]} />
        <meshStandardMaterial color="#666" metalness={0.85} roughness={0.15} />
      </mesh>
    </group>
  );
}

function Screwdriver({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Handle — red/orange */}
      <mesh position={[-0.08, 0.015, 0]}>
        <cylinderGeometry args={[0.025, 0.02, 0.12, 8]} />
        <meshStandardMaterial color="#cc3300" roughness={0.6} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0.1, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.22, 6]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Bolt({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, rotation, 0]}>
      <cylinderGeometry args={[0.012, 0.012, 0.04, 6]} />
      <meshStandardMaterial color="#777" metalness={0.9} roughness={0.15} />
    </mesh>
  );
}
