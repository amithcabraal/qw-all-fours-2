import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

interface TokenProps {
  position: [number, number, number];
  player: 1 | 2;
  isWinning?: boolean;
}

export default function Token({ position, player, isWinning = false }: TokenProps) {
  const meshRef = useRef<Mesh>(null);
  const targetPos = useRef(new Vector3(...position));
  const startPos = useRef(new Vector3(position[0], 4, position[2]));

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(startPos.current);
    }
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Animate drop
      meshRef.current.position.lerp(targetPos.current, delta * 5);

      // Winning animation
      if (isWinning) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
      }
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[0.26, 32, 32]} /> {/* Increased from 0.2 to 0.26 (30% larger) */}
      <meshStandardMaterial
        color={player === 1 ? '#f43f5e' : '#3b82f6'}
        roughness={0.2}
        metalness={0.8}
        emissive={isWinning ? (player === 1 ? '#ef4444' : '#60a5fa') : '#000000'}
        emissiveIntensity={isWinning ? 0.8 : 0}
      />
    </mesh>
  );
}