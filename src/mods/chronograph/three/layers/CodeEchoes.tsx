import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThrottleState } from "@/lib/scrollThrottle";

const ECHO_COUNT = 18;
const SPREAD = 12;
const DEPTH = 60;

const SNIPPETS = [
  "async fn()", "import {}", "const x =", "return <>",
  "await db.", "export {}", "useEffect", ".map(fn)",
  "pipeline", "RAG.query", "deploy()", "git push",
  "lambda x:", "SELECT *", "fetch(url", "useState(",
  "def train", "class Mod",
];

function makeTextTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, 256, 64);
  ctx.font = "bold 20px monospace";
  ctx.fillStyle = "#a78bfa";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 32);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface EchoData {
  position: [number, number, number];
  speed: number;
  tex: THREE.CanvasTexture;
}

export default function CodeEchoes() {
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const echoes = useMemo<EchoData[]>(() => {
    return Array.from({ length: ECHO_COUNT }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * SPREAD * 2,
        (Math.random() - 0.5) * SPREAD,
        -Math.random() * DEPTH,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 1.2,
      tex: makeTextTexture(SNIPPETS[i % SNIPPETS.length]),
    }));
  }, []);

  useFrame((_, delta) => {
    const { throttle, direction } = getThrottleState();
    const speed = (2 + throttle * 35) * delta * direction;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const echo = echoes[i];
      mesh.position.z += speed * echo.speed;

      // Wrap
      if (mesh.position.z > 8) {
        mesh.position.z = -DEPTH;
        mesh.position.x = (Math.random() - 0.5) * SPREAD * 2;
        mesh.position.y = (Math.random() - 0.5) * SPREAD;
      } else if (mesh.position.z < -DEPTH - 5) {
        mesh.position.z = 8;
        mesh.position.x = (Math.random() - 0.5) * SPREAD * 2;
        mesh.position.y = (Math.random() - 0.5) * SPREAD;
      }

      // Fade based on distance
      const dist = Math.abs(mesh.position.z);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.15 - dist * 0.002) + throttle * 0.12;
    });
  });

  return (
    <group>
      {echoes.map((echo, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el; }}
          position={echo.position}
        >
          <planeGeometry args={[3, 0.75]} />
          <meshBasicMaterial
            map={echo.tex}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
