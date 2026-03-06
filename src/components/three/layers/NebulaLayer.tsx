import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThrottleState } from "@/lib/scrollThrottle";

/** Chapter-indexed nebula tints */
const CHAPTER_COLORS = [
  new THREE.Color("#06b6d4"), // hero - cyan
  new THREE.Color("#22d3ee"), // impact - bright cyan
  new THREE.Color("#d946ef"), // station alpha (Leah) - magenta
  new THREE.Color("#a855f7"), // station beta (Flow) - purple
  new THREE.Color("#f59e0b"), // station gamma (AnywhereWorks) - amber
  new THREE.Color("#06b6d4"), // projects - cyan
  new THREE.Color("#8b5cf6"), // skills - violet
  new THREE.Color("#f0abfc"), // education - pink
  new THREE.Color("#67e8f9"), // contact - light cyan
];

function makeNoiseTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 80;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 40 + Math.random() * 60;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

interface CloudProps {
  position: [number, number, number];
  scale: number;
  rotSpeed: number;
}

function NebulaCloud({ position, scale, rotSpeed }: CloudProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tex = useMemo(makeNoiseTexture, []);
  const colorRef = useRef(new THREE.Color("#06b6d4"));
  const targetColor = useRef(new THREE.Color("#06b6d4"));

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const { throttle, chapterIndex, globalT } = getThrottleState();
    meshRef.current.rotation.z += delta * rotSpeed;

    // parallax shift with throttle
    meshRef.current.position.z += throttle * delta * 2;
    if (meshRef.current.position.z > 5) {
      meshRef.current.position.z = position[2];
    }

    // lerp color toward chapter color
    targetColor.current.copy(CHAPTER_COLORS[chapterIndex] ?? CHAPTER_COLORS[0]);
    colorRef.current.lerp(targetColor.current, delta * 2);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.color.copy(colorRef.current);

    // intensity based on throttle
    mat.opacity = 0.06 + throttle * 0.12 + globalT * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
        color="#06b6d4"
      />
    </mesh>
  );
}

export default function NebulaLayer() {
  const clouds: CloudProps[] = useMemo(
    () => [
      { position: [-8, 4, -20], scale: 3, rotSpeed: 0.01 },
      { position: [6, -3, -25], scale: 4, rotSpeed: -0.008 },
      { position: [0, 2, -30], scale: 3.5, rotSpeed: 0.006 },
    ],
    []
  );

  return (
    <group>
      {clouds.map((c, i) => (
        <NebulaCloud key={i} {...c} />
      ))}
    </group>
  );
}
