import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThrottleState } from "@/lib/scrollThrottle";

const COUNT = 1200;
const SPREAD = 16;
const DEPTH = 60;

export default function TemporalParticles() {
  const ref = useRef<THREE.Points>(null);

  const { geometry, speeds } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Distribute in a hollow cylinder (tunnel walls)
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * SPREAD;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = -Math.random() * DEPTH;
      spd[i] = 0.4 + Math.random() * 1.5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, speeds: spd };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const { throttle, direction } = getThrottleState();
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const speed = (2 + throttle * 40) * delta * direction;

    for (let i = 0; i < COUNT; i++) {
      const iz = i * 3 + 2;
      arr[iz] += speed * speeds[i];
      if (arr[iz] > 10) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * SPREAD;
        arr[i * 3] = Math.cos(angle) * radius;
        arr[i * 3 + 1] = Math.sin(angle) * radius;
        arr[iz] = -DEPTH;
      } else if (arr[iz] < -DEPTH - 5) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * SPREAD;
        arr[i * 3] = Math.cos(angle) * radius;
        arr[i * 3 + 1] = Math.sin(angle) * radius;
        arr[iz] = 10;
      }
    }
    posAttr.needsUpdate = true;

    const mat = ref.current.material as THREE.PointsMaterial;
    // Shift color: blue at low speed, magenta at high
    const r = 0.3 + throttle * 0.55;
    const g = 0.3 - throttle * 0.1;
    const b = 0.95 - throttle * 0.2;
    mat.color.setRGB(r, g, b);
    mat.size = 0.025 + throttle * 0.08;
    mat.opacity = 0.1 + throttle * 0.4;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#6d9fff"
        transparent
        opacity={0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
