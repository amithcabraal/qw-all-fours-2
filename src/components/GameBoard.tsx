import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import Token from './Token';
import Grid from './Grid';
import { Group } from 'three';

export default function GameBoard() {
  const boardRef = useRef<Group>(null);
  const grid = useGameStore((state) => state.grid);
  const winner = useGameStore((state) => state.winner);
  const winningPositions = useGameStore((state) => state.winningPositions);

  useFrame((state, delta) => {
    if (boardRef.current && !winner) {
      boardRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={boardRef}>
      <Grid />
      {grid.map((plane, x) =>
        plane.map((row, z) =>
          row.map((cell, y) => {
            if (cell) {
              const isWinning = winningPositions.some(
                ([wx, wz, wy]) => wx === x && wz === z && wy === y
              );
              return (
                <Token
                  key={`${x}-${z}-${y}`}
                  position={[
                    (x - 1.5) * 1.5,
                    y * 0.8 + 0.3 - 1,
                    (z - 1.5) * 1.5
                  ]}
                  player={cell}
                  isWinning={isWinning}
                />
              );
            }
            return null;
          })
        )
      )}
    </group>
  );
}