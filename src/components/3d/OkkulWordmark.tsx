import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function WordmarkMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { tension: 300, friction: 20 },
  });

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.02;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {/* Using box geometry as a stylized 3D wordmark base */}
      <boxGeometry args={[3, 1.2, 0.4]} />
      <meshPhysicalMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.35}
        clearcoat={0.3}
        clearcoatRoughness={0.4}
        envMapIntensity={1.5}
      />
    </animated.mesh>
  );
}

export function OkkulWordmark() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
        shadows
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight position={[-3, 0, 2]} intensity={0.4} color="#C8FF00" />
        <pointLight position={[0, 3, -3]} intensity={0.8} color="#22d3ee" />

        <WordmarkMesh />

        <ContactShadows position={[0, -1, 0]} opacity={0.4} blur={2} far={4} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
