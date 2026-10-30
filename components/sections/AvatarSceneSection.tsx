'use client';

import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sky, Stars } from '@react-three/drei';
import type * as THREE from 'three';

function TemporaryCharacter() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.45;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh castShadow position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#f3d9c4" roughness={0.8} metalness={0.1} />
      </mesh>

      <mesh castShadow position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.36, 1.1, 8, 16]} />
        <meshStandardMaterial color="#ff4d6d" roughness={0.75} metalness={0.15} />
      </mesh>

      <mesh castShadow position={[-0.23, 0.67, 0.08]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.09, 0.62, 6, 12]} />
        <meshStandardMaterial color="#f3d9c4" roughness={0.8} metalness={0.1} />
      </mesh>

      <mesh castShadow position={[0.23, 0.67, 0.08]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.09, 0.62, 6, 12]} />
        <meshStandardMaterial color="#f3d9c4" roughness={0.8} metalness={0.1} />
      </mesh>

      <mesh castShadow position={[-0.2, -0.5, 0]} rotation={[0, 0, 0.06]}>
        <capsuleGeometry args={[0.11, 0.85, 6, 12]} />
        <meshStandardMaterial color="#191f2d" roughness={0.7} metalness={0.15} />
      </mesh>

      <mesh castShadow position={[0.2, -0.5, 0]} rotation={[0, 0, -0.06]}>
        <capsuleGeometry args={[0.11, 0.85, 6, 12]} />
        <meshStandardMaterial color="#191f2d" roughness={0.7} metalness={0.15} />
      </mesh>

      <mesh castShadow position={[0, 1.75, 0.22]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#f8c0b7" emissive="#361a1b" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

function AvatarWorld() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      className="h-full w-full"
    >
      <color attach="background" args={['#070b17']} />
      <fog attach="fog" args={['#070b17', 6, 17]} />

      <ambientLight intensity={0.9} />
      <directionalLight
        castShadow
        position={[4, 7, 5]}
        intensity={1.8}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 3, 2]} intensity={1.2} color="#7dd3fc" />

      <Sky distance={450000} sunPosition={[5, 1.2, 8]} inclination={0.52} azimuth={0.25} />
      <Stars radius={18} depth={12} count={1200} factor={2.2} saturation={0} fade speed={0.8} />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#111827" roughness={1} metalness={0.05} />
      </mesh>

      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.7}>
          <TemporaryCharacter />
        </Float>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}

const AvatarCanvas = dynamic(() => Promise.resolve(AvatarWorld), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#070b17] text-xs text-zinc-400">
      Loading 3D scene...
    </div>
  ),
});

export function AvatarSceneSection() {
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
          Phase 1
        </div>
        <h2 className="mt-3 text-2xl font-black text-white">Anime Adventure</h2>
        <p className="mt-1 text-sm text-zinc-400">
          A standalone 3D character test scene for a future mobile anime action game.
        </p>
      </div>

      <div
        data-gesture-skip="true"
        className="relative mx-auto h-[360px] w-full max-w-[560px] overflow-hidden rounded-[28px] border border-red-600/40 bg-[#070b17] shadow-[0_0_45px_rgba(220,38,38,0.12)] touch-none sm:h-[420px] md:h-[500px]"
        style={{ touchAction: 'none' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/15 via-transparent to-sky-950/20" />
        <AvatarCanvas />
      </div>
    </div>
  );
}
