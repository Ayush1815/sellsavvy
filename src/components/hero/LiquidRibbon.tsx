import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LiquidRibbonProps = {
  paused: boolean;
  animate: boolean;
};

function createRibbonCurve() {
  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-2.8, 1.4, -0.6),
      new THREE.Vector3(-1.6, 0.2, 1.2),
      new THREE.Vector3(0.2, -0.8, 0.4),
      new THREE.Vector3(1.8, 0.4, -1.1),
      new THREE.Vector3(2.6, 1.2, 0.8),
      new THREE.Vector3(1.2, 1.8, 1.4),
      new THREE.Vector3(-0.8, 1.6, 0.2),
      new THREE.Vector3(-2.4, 1.0, -0.9),
    ],
    true,
    "catmullrom",
    0.42,
  );
}

export function LiquidRibbon({ paused, animate }: LiquidRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const basePositions = useRef<Float32Array | null>(null);

  const { geometry, material } = useMemo(() => {
    const curve = createRibbonCurve();
    const geo = new THREE.TubeGeometry(curve, 128, 0.28, 24, true);
    const pos = geo.attributes.position;
    basePositions.current = new Float32Array(pos.array.length);
    basePositions.current.set(pos.array as Float32Array);

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c8d0ff"),
      metalness: 1,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.8,
      transparent: true,
      opacity: 0.95,
    });

    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (!paused && animate) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }

    if (!meshRef.current || !basePositions.current || !animate || paused) return;
    const pos = meshRef.current.geometry.attributes.position;
    const base = basePositions.current;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const bx = base[ix];
      const by = base[ix + 1];
      const bz = base[ix + 2];
      const wave = Math.sin(t * 1.2 + bx * 2.1 + by * 1.7) * 0.045;
      pos.array[ix] = bx + wave;
      pos.array[ix + 1] = by + Math.cos(t * 0.9 + bz * 2) * 0.035;
      pos.array[ix + 2] = bz + wave * 0.6;
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </group>
  );
}
