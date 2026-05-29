import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { LiquidRibbon } from "./LiquidRibbon";
import { PlatformOrbitCarousel } from "./PlatformOrbitCarousel";
import { HeroEnvironment } from "./HeroEnvironment";
import { HeroSceneLoader } from "./HeroSceneLoader";
import { WebGLErrorBoundary, HeroWebGLFallback } from "./WebGLErrorBoundary";

type HeroCanvasProps = {
  paused: boolean;
  reducedMotion: boolean;
};

function HeroScene({ paused, reducedMotion }: HeroCanvasProps) {
  const animate = !reducedMotion;

  return (
    <>
      <color attach="background" args={["#030508"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#a8c4ff" />
      <directionalLight position={[-5, -2, 3]} intensity={0.65} color="#ff8a4c" />
      <pointLight position={[0, 2, 4]} intensity={0.8} color="#c084fc" />
      <HeroEnvironment />
      <LiquidRibbon paused={paused} animate={animate} />
      <PlatformOrbitCarousel paused={paused} animate={animate} />
    </>
  );
}

export function HeroCanvas({ paused, reducedMotion }: HeroCanvasProps) {
  return (
    <WebGLErrorBoundary fallback={<HeroWebGLFallback />}>
      <Canvas
        className="h-full w-full touch-none"
        camera={{ position: [0, 0.15, 8.5], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<HeroSceneLoader />}>
          <HeroScene paused={paused} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
