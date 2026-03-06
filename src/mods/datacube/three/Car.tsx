import { useMemo } from "react";
import * as THREE from "three";

/**
 * Low-poly DeLorean-style car built from procedural geometry.
 * Solid metallic body, gull-wing door (left open), neon accents,
 * rear battery packs (magenta), roof flux cylinder (cyan),
 * yellow circuit traces along the body.
 */

const SILVER = "#b0b8c0";
const DARK_BODY = "#2a2e32";
const WINDOW_COLOR = "#0a1520";
const WHEEL_COLOR = "#111111";
const TIRE_COLOR = "#1a1a1a";

export default function Car() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main body */}
      <CarBody />
      {/* Wheels */}
      <Wheels />
      {/* Windows */}
      <Windows />
      {/* Gull-wing door — left side, open */}
      <GullWingDoor />
      {/* Rear section — louvers + battery packs */}
      <RearSection />
      {/* Neon circuit traces */}
      <CircuitTraces />
      {/* Flux capacitor cylinder on roof */}
      <FluxCapacitor />
      {/* Headlights / taillights */}
      <Lights />
    </group>
  );
}

/** Main wedge-shaped body */
function CarBody() {
  const bodyGeo = useMemo(() => {
    const shape = new THREE.Shape();
    // DeLorean side profile: low front, rises to cabin, drops to rear
    shape.moveTo(-2.2, 0);       // front bottom
    shape.lineTo(2.2, 0);        // rear bottom
    shape.lineTo(2.2, 0.45);     // rear rise
    shape.lineTo(1.8, 0.5);      // rear deck
    shape.lineTo(1.2, 0.95);     // rear window top
    shape.lineTo(0.0, 1.0);      // roof peak
    shape.lineTo(-0.8, 0.95);    // windshield top
    shape.lineTo(-1.5, 0.5);     // hood-windshield junction
    shape.lineTo(-2.2, 0.35);    // front nose
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.6,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    });
    geo.translate(0, 0, -0.8);
    return geo;
  }, []);

  return (
    <mesh geometry={bodyGeo}>
      <meshStandardMaterial
        color={SILVER}
        metalness={0.8}
        roughness={0.25}
      />
    </mesh>
  );
}

/** Four wheels with tires */
function Wheels() {
  const positions: [number, number, number][] = [
    [-1.5, 0.18, 0.85],   // front-left
    [-1.5, 0.18, -0.85],  // front-right
    [1.5, 0.18, 0.85],    // rear-left
    [1.5, 0.18, -0.85],   // rear-right
  ];

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.18, 0.08, 8, 16]} />
            <meshStandardMaterial color={TIRE_COLOR} roughness={0.9} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 12]} />
            <meshStandardMaterial
              color={WHEEL_COLOR}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Dark tinted windows */
function Windows() {
  return (
    <group>
      {/* Windshield */}
      <mesh position={[-1.15, 0.75, 0]} rotation={[0, 0, 0.42]}>
        <planeGeometry args={[0.65, 1.5]} />
        <meshStandardMaterial
          color={WINDOW_COLOR}
          metalness={0.5}
          roughness={0.1}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Rear window */}
      <mesh position={[1.05, 0.75, 0]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[0.55, 1.4]} />
        <meshStandardMaterial
          color={WINDOW_COLOR}
          metalness={0.5}
          roughness={0.1}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Right side window (closed door) */}
      <mesh position={[0.1, 0.85, -0.81]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.6, 0.35]} />
        <meshStandardMaterial
          color={WINDOW_COLOR}
          metalness={0.5}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/** Left gull-wing door — open at ~60 degrees */
function GullWingDoor() {
  return (
    <group position={[0.1, 0.95, 0.81]}>
      {/* Pivot at roof edge, rotate open */}
      <group rotation={[0, 0, 0.9]}>
        {/* Door panel */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[1.6, 0.6, 0.04]} />
          <meshStandardMaterial
            color={SILVER}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
        {/* Door window */}
        <mesh position={[0, -0.15, 0.005]}>
          <planeGeometry args={[1.2, 0.3]} />
          <meshStandardMaterial
            color={WINDOW_COLOR}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Rear louvers + magenta battery packs */
function RearSection() {
  // Louvers — horizontal slats on the rear
  const louvers = [];
  for (let i = 0; i < 5; i++) {
    louvers.push(
      <mesh key={i} position={[2.15, 0.15 + i * 0.07, 0]}>
        <boxGeometry args={[0.08, 0.015, 1.4]} />
        <meshStandardMaterial
          color="#1a1e22"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    );
  }

  return (
    <group>
      {louvers}

      {/* Battery pack left — magenta glow */}
      <BatteryPack position={[1.6, 0.55, 0.45]} />
      {/* Battery pack right — magenta glow */}
      <BatteryPack position={[1.6, 0.55, -0.45]} />
    </group>
  );
}

/** Magenta glowing battery pack */
function BatteryPack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Battery housing */}
      <mesh>
        <boxGeometry args={[0.5, 0.35, 0.5]} />
        <meshStandardMaterial
          color="#1a0020"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Glowing cells — 2x3 grid */}
      {[0, 1].map((row) =>
        [0, 1, 2].map((col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.1 + row * 0.2,
              0.18,
              -0.15 + col * 0.15,
            ]}
          >
            <boxGeometry args={[0.14, 0.04, 0.1]} />
            <meshStandardMaterial
              color="#ff00ff"
              emissive="#ff00ff"
              emissiveIntensity={3}
            />
          </mesh>
        ))
      )}
      {/* Magenta point light */}
      <pointLight
        color="#ff00ff"
        intensity={2}
        distance={4}
        decay={2}
        position={[0, 0.4, 0]}
      />
    </group>
  );
}

/** Yellow/green neon circuit traces along the car body */
function CircuitTraces() {
  const traceMat = (
    <meshStandardMaterial
      color="#ccff00"
      emissive="#aadd00"
      emissiveIntensity={2.5}
    />
  );

  return (
    <group>
      {/* Side trace — left */}
      <mesh position={[0, 0.42, 0.82]}>
        <boxGeometry args={[3.5, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      {/* Side trace — right */}
      <mesh position={[0, 0.42, -0.82]}>
        <boxGeometry args={[3.5, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      {/* Hood trace — center line */}
      <mesh position={[-1.6, 0.42, 0]}>
        <boxGeometry args={[1.0, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      {/* Hood trace — V-split left */}
      <mesh position={[-1.0, 0.48, 0.3]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      {/* Hood trace — V-split right */}
      <mesh position={[-1.0, 0.48, -0.3]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      {/* Rear trace connections to batteries */}
      <mesh position={[1.8, 0.5, 0.3]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      <mesh position={[1.8, 0.5, -0.3]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        {traceMat}
      </mesh>
      {/* Roof traces running to flux capacitor */}
      <mesh position={[0.3, 1.0, 0.2]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[1.2, 0.015, 0.015]} />
        {traceMat}
      </mesh>
      <mesh position={[0.3, 1.0, -0.2]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[1.2, 0.015, 0.015]} />
        {traceMat}
      </mesh>
    </group>
  );
}

/** Cyan glowing cylinder on the roof — flux capacitor style */
function FluxCapacitor() {
  return (
    <group position={[0.4, 1.1, 0]}>
      {/* Base mount */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.18, 0.1, 12]} />
        <meshStandardMaterial
          color="#1a2a2a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Glowing cylinder */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 12]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={4}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.06, 12]} />
        <meshStandardMaterial
          color="#304040"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Cyan glow light */}
      <pointLight
        color="#00ffff"
        intensity={3}
        distance={6}
        decay={2}
        position={[0, 0.3, 0]}
      />
    </group>
  );
}

/** Headlights and taillights */
function Lights() {
  return (
    <group>
      {/* Headlights — warm white */}
      {[0.5, -0.5].map((z, i) => (
        <mesh key={`h-${i}`} position={[-2.22, 0.25, z]}>
          <sphereGeometry args={[0.06, 8, 6]} />
          <meshStandardMaterial
            color="#ffffee"
            emissive="#ffffcc"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      {/* Taillights — red */}
      {[0.5, -0.5].map((z, i) => (
        <mesh key={`t-${i}`} position={[2.22, 0.25, z]}>
          <boxGeometry args={[0.04, 0.1, 0.2]} />
          <meshStandardMaterial
            color="#ff2200"
            emissive="#ff2200"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}
