import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { platformTokens, type PlatformToken } from "../../data/platformTokens";
import { PlatformOrbitCard } from "./PlatformOrbitCard";

type PlatformOrbitCarouselProps = {
  paused: boolean;
  animate: boolean;
};

const COUNT = platformTokens.length;
const RADIUS_X = 3.35;
const RADIUS_Z = 1.65;

const CarouselCard = forwardRef<THREE.Group, { token: PlatformToken; position: [number, number, number] }>(
  function CarouselCard({ token, position }, ref) {
    const groupRef = useRef<THREE.Group>(null);
    const [visual, setVisual] = useState({ scale: 1, opacity: 1 });

    useImperativeHandle(ref, () => groupRef.current as THREE.Group);

    useFrame(() => {
      if (!groupRef.current) return;
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      const depth = THREE.MathUtils.clamp((worldPos.z + RADIUS_Z) / (RADIUS_Z * 2), 0, 1);
      const scale = 0.72 + depth * 0.38;
      const opacity = 0.32 + depth * 0.68;
      if (Math.abs(visual.scale - scale) > 0.02 || Math.abs(visual.opacity - opacity) > 0.02) {
        setVisual({ scale, opacity });
      }
      groupRef.current.renderOrder = Math.round(depth * 100);
    });

    return (
      <group ref={groupRef} position={position}>
        <PlatformOrbitCard token={token} scale={visual.scale} opacity={visual.opacity} />
      </group>
    );
  },
);

export function PlatformOrbitCarousel({ paused, animate }: PlatformOrbitCarouselProps) {
  const ringRef = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (ringRef.current && animate && !paused && !hovered) {
      ringRef.current.rotation.y += delta * 0.42;
    }
  });

  return (
    <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <group ref={ringRef}>
        {platformTokens.map((token, index) => {
          const theta = (index / COUNT) * Math.PI * 2;
          const x = Math.cos(theta) * RADIUS_X;
          const z = Math.sin(theta) * RADIUS_Z;
          const y = Math.sin(theta * 2) * 0.22;

          return (
            <CarouselCard
              key={token.name}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              token={token}
              position={[x, y, z]}
            />
          );
        })}
      </group>
    </group>
  );
}
