import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThrottleState } from "@/lib/scrollThrottle";

const RING_COUNT = 24;
const TUNNEL_DEPTH = 80;
const RING_RADIUS = 9;

const COOL = new THREE.Color("#3b82f6"); // blue
const HOT = new THREE.Color("#d946ef"); // magenta

export default function TunnelRings() {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const colorRef = useRef(new THREE.Color("#3b82f6"));

  const positions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < RING_COUNT; i++) {
      arr.push(-i * (TUNNEL_DEPTH / RING_COUNT));
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    const { throttle, direction } = getThrottleState();
    const speed = (3 + throttle * 50) * delta * direction;

    // Lerp color toward throttle-based tint
    const target = COOL.clone().lerp(HOT, throttle);
    colorRef.current.lerp(target, delta * 4);

    ringsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.z += speed;

      // Wrap rings
      if (mesh.position.z > 10) {
        mesh.position.z = -TUNNEL_DEPTH;
      } else if (mesh.position.z < -TUNNEL_DEPTH - 5) {
        mesh.position.z = 10;
      }

      // Rotate rings for visual interest
      mesh.rotation.z += delta * (0.2 + throttle * 0.8) * (i % 2 === 0 ? 1 : -1);

      // Pulse scale with throttle
      const pulse = 1 + Math.sin(Date.now() * 0.002 + i) * 0.05 * throttle;
      mesh.scale.setScalar(pulse);

      // Update color
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.color.copy(colorRef.current);
      mat.opacity = 0.06 + throttle * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((z, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringsRef.current[i] = el; }}
          position={[0, 0, z]}
        >
          <torusGeometry args={[RING_RADIUS, 0.03, 8, i % 3 === 0 ? 4 : i % 3 === 1 ? 6 : 64]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
