import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThrottleState } from "@/lib/scrollThrottle";

const COUNT = 2000;
const SPREAD = 60;

export default function StarfieldLayer() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const { throttle } = getThrottleState();
    // slow rotation + subtle throttle-driven drift
    ref.current.rotation.y += delta * 0.005;
    ref.current.rotation.z += delta * 0.002;
    // slight z-drift toward camera with speed
    ref.current.position.z += throttle * delta * 0.5;
    if (ref.current.position.z > 5) ref.current.position.z = 0;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#67e8f9"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
