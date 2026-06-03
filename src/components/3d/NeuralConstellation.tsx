import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;
const CONNECTION_DISTANCE = 0.8;
const MOUSE_RADIUS = 1.5;
const MOUSE_FORCE = 0.003;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const linesRef = useRef<THREE.LineSegments>(null);
  const frameCount = useRef(0);

  const { positions, phases, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.7) * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      ph[i] = Math.random() * Math.PI * 2;
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, phases: ph, velocities: vel };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePos = new Float32Array(PARTICLE_COUNT * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    return geo;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    frameCount.current++;
    const t = clock.getElapsedTime();

    // Update mouse position in 3D
    mouseRef.current.set(pointer.x * 6, pointer.y * 6, 0);

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Animate particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;

      // Sinusoidal drift
      posArr[ix] += Math.sin(t * 0.5 + phases[i]) * 0.0008;
      posArr[ix + 1] += Math.cos(t * 0.3 + phases[i]) * 0.0008;
      posArr[ix + 2] += Math.sin(t * 0.4 + phases[i]) * 0.0008;

      // Mouse repulsion
      const dx = posArr[ix] - mouseRef.current.x;
      const dy = posArr[ix + 1] - mouseRef.current.y;
      const dz = posArr[ix + 2] - mouseRef.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
        velocities[ix] += (dx / dist) * force;
        velocities[ix + 1] += (dy / dist) * force;
        velocities[ix + 2] += (dz / dist) * force;
      }

      // Apply velocity with damping
      posArr[ix] += velocities[ix];
      posArr[ix + 1] += velocities[ix + 1];
      posArr[ix + 2] += velocities[ix + 2];
      velocities[ix] *= 0.95;
      velocities[ix + 1] *= 0.95;
      velocities[ix + 2] *= 0.95;

      // Keep within sphere
      const r = Math.sqrt(posArr[ix] ** 2 + posArr[ix + 1] ** 2 + posArr[ix + 2] ** 2);
      if (r > 5.5) {
        const scale = 5.5 / r;
        posArr[ix] *= scale;
        posArr[ix + 1] *= scale;
        posArr[ix + 2] *= scale;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation of the whole group
    pointsRef.current.rotation.y += 0.0003;

    // Update connections every 5 frames
    if (linesRef.current && frameCount.current % 5 === 0) {
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIdx = 0;

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < PARTICLE_COUNT * 6 - 6; i++) {
        let connections = 0;
        const ix = i * 3;

        for (let j = i + 1; j < PARTICLE_COUNT && connections < 2; j++) {
          const jx = j * 3;
          const ddx = posArr[ix] - posArr[jx];
          const ddy = posArr[ix + 1] - posArr[jx + 1];
          const ddz = posArr[ix + 2] - posArr[jx + 2];
          const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

          if (d < CONNECTION_DISTANCE) {
            linePos[lineIdx++] = posArr[ix];
            linePos[lineIdx++] = posArr[ix + 1];
            linePos[lineIdx++] = posArr[ix + 2];
            linePos[lineIdx++] = posArr[jx];
            linePos[lineIdx++] = posArr[jx + 1];
            linePos[lineIdx++] = posArr[jx + 2];
            connections++;
          }
        }
      }

      // Fill remaining with zeros
      for (let k = lineIdx; k < PARTICLE_COUNT * 6; k++) {
        linePos[k] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      if (linesRef.current) {
        linesRef.current.rotation.y = pointsRef.current.rotation.y;
      }
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#C8FF00" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#C8FF00" transparent opacity={0.06} />
      </lineSegments>
    </>
  );
}

export function NeuralConstellation() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <Particles />
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.7} luminanceSmoothing={0.8} radius={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
