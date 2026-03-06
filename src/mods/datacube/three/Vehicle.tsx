import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_PATH = "/models/spaceship.glb";

useGLTF.preload(MODEL_PATH, true);

export default function Vehicle() {
  const { scene } = useGLTF(MODEL_PATH, true);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene) return;

    // Center and auto-scale the model
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Scale large — fills most of the viewport
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 32 / maxDim;
    scene.scale.setScalar(scale);

    // Re-center after scaling
    box.setFromObject(scene);
    box.getCenter(center);
    scene.position.sub(center);
    scene.position.y += box.getSize(new THREE.Vector3()).y / 2 + 5;

    // Override materials for cyberpunk look
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.metalness = Math.max(mat.metalness, 0.6);
          mat.roughness = Math.min(mat.roughness, 0.4);
          mat.envMapIntensity = 1.5;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Hover bob + gentle roll
  const baseY = useRef(0);
  const initialized = useRef(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (!initialized.current && scene) {
      baseY.current = groupRef.current.position.y;
      initialized.current = true;
    }
    const t = clock.getElapsedTime();
    groupRef.current.position.y = baseY.current + Math.sin(t * 0.8) * 0.6;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.015;
    groupRef.current.rotation.x = Math.cos(t * 0.6) * 0.01;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
