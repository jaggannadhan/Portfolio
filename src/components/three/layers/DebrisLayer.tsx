import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThrottleState } from "@/lib/scrollThrottle";

const COUNT = 1500;
const SPREAD_XY = 30;
const DEPTH = 50;

export default function DebrisLayer() {
  const ref = useRef<THREE.Points>(null);

  const { geometry, speeds } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD_XY;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_XY;
      pos[i * 3 + 2] = -Math.random() * DEPTH;
      sizes[i] = 0.02 + Math.random() * 0.06;
      spd[i] = 0.5 + Math.random() * 1.5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return { geometry: geo, speeds: spd };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const { throttle, direction } = getThrottleState();
    const posAttr = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const baseSpeed = 2;
    const boost = 40;
    const speed = (baseSpeed + throttle * boost) * delta * direction;

    for (let i = 0; i < COUNT; i++) {
      const iz = i * 3 + 2;
      arr[iz] += speed * speeds[i];
      // respawn when out of bounds
      if (arr[iz] > 10) {
        arr[iz] = -DEPTH;
        arr[i * 3] = (Math.random() - 0.5) * SPREAD_XY;
        arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_XY;
      } else if (arr[iz] < -DEPTH) {
        arr[iz] = 10;
        arr[i * 3] = (Math.random() - 0.5) * SPREAD_XY;
        arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_XY;
      }
    }
    posAttr.needsUpdate = true;

    // scale point size with throttle for streak illusion
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.size = 0.03 + throttle * 0.12;
    mat.opacity = 0.3 + throttle * 0.5;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#e0d4ff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
