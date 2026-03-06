import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import TunnelRings from "./layers/TunnelRings";
import CodeEchoes from "./layers/CodeEchoes";
import TemporalParticles from "./layers/TemporalParticles";
import { getThrottleState } from "@/lib/scrollThrottle";

const BASE_FOV = 70;
const IS_MOBILE =
  typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

function CameraRig() {
  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const { throttle, isScrolling } = getThrottleState();

    // Wider FOV at speed for tunnel rush effect
    const targetFov = BASE_FOV + throttle * 18;
    cam.fov += (targetFov - cam.fov) * delta * 3;
    cam.updateProjectionMatrix();

    // Subtle barrel roll at high speed
    if (isScrolling && throttle > 0.05) {
      const t = state.clock.elapsedTime;
      const amp = throttle * 0.02;
      cam.position.x = Math.sin(t * 11.3) * amp;
      cam.position.y = Math.cos(t * 14.7) * amp;
      cam.rotation.z = Math.sin(t * 3.1) * throttle * 0.03;
    } else {
      cam.position.x *= 1 - delta * 5;
      cam.position.y *= 1 - delta * 5;
      cam.rotation.z *= 1 - delta * 3;
    }
  });

  return null;
}

function DynamicChromaticAberration() {
  const offsetRef = useRef(new THREE.Vector2(0, 0));
  const targetOffset = useRef(0);

  useFrame((_, delta) => {
    const { throttle } = getThrottleState();
    targetOffset.current = throttle * 0.005;
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
        intensity={2}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <DynamicChromaticAberration />
      <Glitch
        delay={new THREE.Vector2(8, 15)}
        duration={new THREE.Vector2(0.1, 0.3)}
        strength={new THREE.Vector2(0.02, 0.05)}
        mode={GlitchMode.SPORADIC}
        active
        ratio={0.1}
      />
      <Vignette eskil={false} offset={0.3} darkness={0.8} />
    </EffectComposer>
  );
}

export default function TimeTunnel() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: BASE_FOV }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ background: "#030208" }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.05} />
          <TunnelRings />
          <CodeEchoes />
          <TemporalParticles />
          {!IS_MOBILE && <PostProcessing />}
        </Suspense>
      </Canvas>
    </div>
  );
}
