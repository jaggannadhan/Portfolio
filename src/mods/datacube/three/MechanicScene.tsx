import { useRef, useLayoutEffect, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import Vehicle from "./Vehicle";

interface MechanicSceneProps {
  companyIndex: number;
}

/** Spacetime fabric floor — warped grid with sine undulations */
function SpacetimeFabric() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const size = 200;
    const segments = 200;
    const g = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = g.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Layered sine waves for organic spacetime warping
      const z =
        Math.sin(x * 0.08) * Math.cos(y * 0.06) * 2.5 +
        Math.sin(x * 0.04 + y * 0.03) * 1.8 +
        Math.cos(y * 0.1) * Math.sin(x * 0.05) * 1.2;
      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      {/* Solid dark surface */}
      <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <meshStandardMaterial
          color="#0d1012"
          metalness={0.4}
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe overlay — cyan neon grid */}
      <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.98, 0]}>
        <meshBasicMaterial
          color="#00ddff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/** Flowing space particles — streaks past the ship */
function SpaceParticles({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 160;     // x spread
      pos[i * 3 + 1] = Math.random() * 60 - 10;      // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 160;  // z spread
      spd[i] = 8 + Math.random() * 16;                // speed
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] -= speeds[i] * delta; // flow backward along z
      if (arr[i * 3 + 2] < -80) arr[i * 3 + 2] = 80; // wrap around
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#aaddff"
        size={0.15}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Isometric-ish perspective camera */
function IsometricCamera() {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  useLayoutEffect(() => {
    if (camRef.current) {
      camRef.current.lookAt(0, 0, 0);
      camRef.current.updateProjectionMatrix();
    }
  }, []);
  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      position={[19, 11, 69]}
      fov={35}
      near={0.1}
      far={100}
    />
  );
}

/** Wraps fabric + particles + vehicle in a group that spins on scroll */
function SceneRig({ companyIndex }: { companyIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const spinTarget = useRef(0);
  const spinCurrent = useRef(0);
  const velocity = useRef(0);
  const prevIndex = useRef(companyIndex);

  // Spring-damper constants
  const stiffness = 3.5;  // how snappy the spring is
  const damping = 0.82;   // <1 = underdamped (bouncy cushion)

  useEffect(() => {
    if (companyIndex !== prevIndex.current) {
      const dir = companyIndex > prevIndex.current ? 1 : -1;
      spinTarget.current += dir * Math.PI * 0.83;
      prevIndex.current = companyIndex;
    }
  }, [companyIndex]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05); // clamp for tab-away spikes
    const displacement = spinTarget.current - spinCurrent.current;
    // Spring force + damping
    velocity.current += displacement * stiffness * dt;
    velocity.current *= damping;
    spinCurrent.current += velocity.current * dt;
    groupRef.current.rotation.y = spinCurrent.current;
  });

  return (
    <group ref={groupRef}>
      <SpacetimeFabric />
      <SpaceParticles />
      <Suspense fallback={null}>
        <Vehicle />
      </Suspense>
    </group>
  );
}

// Shared ref for the DOM element — written to from inside the canvas
const orientationRef = { current: null as HTMLDivElement | null };

/** Reads camera spherical coords every frame, writes to DOM */
function CameraTracker() {
  const spherical = useRef(new THREE.Spherical());

  useFrame(({ camera }) => {
    if (!orientationRef.current) return;
    spherical.current.setFromVector3(camera.position);
    const az = THREE.MathUtils.radToDeg(spherical.current.theta);
    const el = 90 - THREE.MathUtils.radToDeg(spherical.current.phi);
    const dist = spherical.current.radius;
    orientationRef.current.textContent =
      `AZ ${az.toFixed(1)}°  EL ${el.toFixed(1)}°  D ${dist.toFixed(1)}`;
  });

  return null;
}

export default function MechanicScene({ companyIndex }: MechanicSceneProps) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    orientationRef.current = domRef.current;
  }, []);

  return (
    <div className="fixed inset-0">
      {/* Orientation readout — DOM overlay */}
      <div
        ref={domRef}
        className="absolute top-20 right-7 z-30 pointer-events-none font-mono"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#00ddff",
          letterSpacing: "0.5px",
          textShadow: "0 0 6px rgba(0,221,255,0.8), 0 0 14px rgba(0,221,255,0.4)",
        }}
      />

      <Canvas
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#0a0e10" }}
      >
        <IsometricCamera />
        <OrbitControls enablePan={false} enableZoom={false} />

        {/* Bright ambient so model colors come through */}
        <ambientLight intensity={0.6} color="#ffffff" />

        {/* Key light from above */}
        <directionalLight
          position={[-5, 8, -3]}
          intensity={1.0}
          color="#ffffff"
        />
        {/* Fill light from opposite side */}
        <directionalLight
          position={[5, 4, 5]}
          intensity={0.5}
          color="#c0d0e0"
        />

        {/* Environment map for reflections */}
        <Environment preset="night" background={false} />

        <SceneRig companyIndex={companyIndex} />

        <CameraTracker />

        <EffectComposer>
          <Vignette eskil={false} offset={0.3} darkness={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
