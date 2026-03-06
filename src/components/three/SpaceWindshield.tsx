import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import StarfieldLayer from "./layers/StarfieldLayer";
import DebrisLayer from "./layers/DebrisLayer";
import NebulaLayer from "./layers/NebulaLayer";
import { getThrottleState } from "@/lib/scrollThrottle";

const BASE_FOV = 65;
const IS_MOBILE =
  typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

/** Camera controller: FOV shift + subtle shake during scroll */
function CameraRig() {
  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const { throttle, isScrolling } = getThrottleState();

    const targetFov = BASE_FOV + throttle * 12;
    cam.fov += (targetFov - cam.fov) * delta * 3;
    cam.updateProjectionMatrix();

    if (isScrolling && throttle > 0.05) {
      const t = state.clock.elapsedTime;
      const amp = throttle * 0.015;
      cam.position.x = Math.sin(t * 13.7) * amp;
      cam.position.y = Math.cos(t * 17.3) * amp;
    } else {
      cam.position.x *= 1 - delta * 5;
      cam.position.y *= 1 - delta * 5;
    }
  });

  return null;
}

/** Dynamically adjusts chromatic aberration offset based on scroll velocity */
function DynamicChromaticAberration() {
  const offsetRef = useRef(new THREE.Vector2(0, 0));
  const targetOffset = useRef(0);

  useFrame((_, delta) => {
    const { throttle } = getThrottleState();
    targetOffset.current = throttle * 0.003;
    const current = offsetRef.current.x;
    const next = current + (targetOffset.current - current) * delta * 6;
    offsetRef.current.set(next, next);
  });

  return (
    <ChromaticAberration
      blendFunction={BlendFunction.NORMAL}
      offset={offsetRef.current}
      radialModulation={false}
      modulationOffset={0}
    />
  );
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      <DynamicChromaticAberration />
      <Vignette eskil={false} offset={0.25} darkness={0.7} />
    </EffectComposer>
  );
}

export default function SpaceWindshield() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: BASE_FOV }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ background: "#050510" }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.15} />
          <StarfieldLayer />
          <DebrisLayer />
          <NebulaLayer />
          {!IS_MOBILE && <PostProcessing />}
        </Suspense>
      </Canvas>
    </div>
  );
}
