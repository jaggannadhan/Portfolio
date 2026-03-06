import { useMemo } from "react";
import * as THREE from "three";

/**
 * Smaller, realistic wireframe car — proper sedan proportions.
 * Built from EdgesGeometry of shaped extrusions for clean lines.
 * Sits center-screen between the left HUD and right bullet list.
 */

const CYAN = "#00ddff";

/** Neon line material */
function NeonLine({ geo, opacity = 0.7 }: { geo: THREE.BufferGeometry; opacity?: number }) {
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={CYAN} transparent opacity={opacity} />
    </lineSegments>
  );
}

export default function WireframeCar() {
  // Main body — sedan side profile extruded to width
  const bodyEdges = useMemo(() => {
    const s = new THREE.Shape();
    // Bottom line
    s.moveTo(-1.4, 0);
    s.lineTo(1.4, 0);
    // Trunk rise
    s.lineTo(1.4, 0.3);
    s.lineTo(1.1, 0.35);
    // Rear window
    s.lineTo(0.7, 0.7);
    // Roof
    s.lineTo(-0.2, 0.7);
    // Windshield
    s.lineTo(-0.6, 0.35);
    // Hood
    s.lineTo(-1.4, 0.3);
    s.closePath();

    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.8, bevelEnabled: false });
    geo.translate(0, 0, -0.4);
    const edges = new THREE.EdgesGeometry(geo, 20);
    geo.dispose();
    return edges;
  }, []);

  // Wheel wells — small box cutouts
  const wheelEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.TorusGeometry(0.15, 0.03, 8, 16)),
    []
  );

  // Windshield/rear window cross-bar
  const barGeo = useMemo(() => {
    const pts = [
      new THREE.Vector3(-0.6, 0.35, -0.4), new THREE.Vector3(-0.6, 0.35, 0.4),
      new THREE.Vector3(0.7, 0.7, -0.4), new THREE.Vector3(0.7, 0.7, 0.4),
      new THREE.Vector3(-0.2, 0.7, -0.4), new THREE.Vector3(-0.2, 0.7, 0.4),
      new THREE.Vector3(1.1, 0.35, -0.4), new THREE.Vector3(1.1, 0.35, 0.4),
    ];
    const arr = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z; });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  // Headlights / taillights
  const headlightGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.CircleGeometry(0.06, 8)),
    []
  );

  return (
    <group position={[0, 0.18, 0]}>
      {/* Body shell */}
      <NeonLine geo={bodyEdges} />

      {/* Interior cross-bars (pillars) */}
      <NeonLine geo={barGeo} opacity={0.4} />

      {/* Wheels — 4 corners */}
      {([
        [-1.0, -0.02, 0.42],
        [-1.0, -0.02, -0.42],
        [0.95, -0.02, 0.42],
        [0.95, -0.02, -0.42],
      ] as [number, number, number][]).map((pos, i) => (
        <lineSegments key={i} position={pos} rotation={[Math.PI / 2, 0, 0]} geometry={wheelEdges}>
          <lineBasicMaterial color={CYAN} transparent opacity={0.5} />
        </lineSegments>
      ))}

      {/* Headlights */}
      {([
        [-1.4, 0.18, 0.25],
        [-1.4, 0.18, -0.25],
      ] as [number, number, number][]).map((pos, i) => (
        <lineSegments key={`hl-${i}`} position={pos} rotation={[0, Math.PI / 2, 0]} geometry={headlightGeo}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </lineSegments>
      ))}

      {/* Taillights */}
      {([
        [1.4, 0.18, 0.25],
        [1.4, 0.18, -0.25],
      ] as [number, number, number][]).map((pos, i) => (
        <lineSegments key={`tl-${i}`} position={pos} rotation={[0, Math.PI / 2, 0]} geometry={headlightGeo}>
          <lineBasicMaterial color="#ff3333" transparent opacity={0.35} />
        </lineSegments>
      ))}

      {/* Subtle ground glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, 0]}>
        <planeGeometry args={[3.2, 1.4]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
