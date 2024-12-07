export type Player = 1 | 2;
export type Cell = Player | null;
export type Grid = Cell[][][];
export type Position = [number, number, number];
export type GameMode = 'pvp' | 'pvc';
export type Move = { x: number; z: number; y: number; player: Player };

export interface GameState {
  grid: Grid;
  currentPlayer: Player;
  winner: Player | null;
  winningPositions: Position[];
  gameMode: GameMode;
  moveHistory: Move[];
  placeToken: (x: number, z: number) => void;
  resetGame: () => void;
  undoMove: () => void;
  setGameMode: (mode: GameMode) => void;
}