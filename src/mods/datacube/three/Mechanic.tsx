import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Low-poly mechanic lying on the ground next to the car,
 * half-under the chassis. Blue overalls, subtle breathing animation.
 * A small work light illuminates the area.
 */

const BLUE_SUIT = "#1a3a7a";
const SKIN = "#c8946e";

export default function Mechanic() {
  const armRef = useRef<THREE.Mesh>(null);

  // Subtle arm movement — working on the car
  useFrame((state) => {
    if (!armRef.current) return;
    const t = state.clock.elapsedTime;
    armRef.current.rotation.x = Math.sin(t * 1.5) * 0.15;
  });

  return (
    <group position={[1.0, 0, 2.0]} rotation={[0, -0.4, 0]}>
      {/* Creeper board */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 1.4]} />
        <meshStandardMaterial
          color="#2a1800"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Creeper wheels — 4 tiny cylinders */}
      {([[-0.25, 0.01, -0.6], [0.25, 0.01, -0.6], [-0.25, 0.01, 0.6], [0.25, 0.01, 0.6]] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Torso — lying face up, upper body going under car */}
      <mesh position={[0, 0.1, -0.15]}>
        <boxGeometry args={[0.4, 0.15, 0.65]} />
        <meshStandardMaterial color={BLUE_SUIT} roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.14, 0.35]}>
        <sphereGeometry args={[0.1, 10, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.8} />
      </mesh>
      {/* Hard hat */}
      <mesh position={[0, 0.2, 0.35]}>
        <sphereGeometry args={[0.11, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#dddd00" roughness={0.5} />
      </mesh>

      {/* Left arm — reaching up toward car */}
      <mesh
        ref={armRef}
        position={[-0.28, 0.12, -0.3]}
        rotation={[0.3, 0, 0.4]}
      >
        <boxGeometry args={[0.09, 0.08, 0.45]} />
        <meshStandardMaterial color={BLUE_SUIT} roughness={0.7} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.32, 0.15, -0.55]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color={SKIN} roughness={0.8} />
      </mesh>

      {/* Right arm — resting beside body */}
      <mesh position={[0.28, 0.1, -0.05]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.09, 0.08, 0.4]} />
        <meshStandardMaterial color={BLUE_SUIT} roughness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, 0.08, 0.55]}>
        <boxGeometry args={[0.12, 0.12, 0.5]} />
        <meshStandardMaterial color={BLUE_SUIT} roughness={0.7} />
      </mesh>
      <mesh position={[0.1, 0.08, 0.55]}>
        <boxGeometry args={[0.12, 0.12, 0.5]} />
        <meshStandardMaterial color={BLUE_SUIT} roughness={0.7} />
      </mesh>
      {/* Boots */}
      <mesh position={[-0.1, 0.06, 0.82]}>
        <boxGeometry args={[0.13, 0.1, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 0.06, 0.82]}>
        <boxGeometry args={[0.13, 0.1, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Work light on ground — illuminates the area */}
      <pointLight
        color="#ffcc66"
        intensity={4}
        distance={8}
        decay={2}
        position={[0.4, 0.3, 0.2]}
      />
      {/* Small light mesh */}
      <mesh position={[0.4, 0.08, 0.2]}>
        <boxGeometry args={[0.08, 0.08, 0.12]} />
        <meshStandardMaterial
          color="#ffcc44"
          emissive="#ffcc44"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}
