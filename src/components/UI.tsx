import { useGameStore } from '../store/gameStore';
import { RotateCcw, HelpCircle, Moon, Sun, Undo, Users, Monitor } from 'lucide-react';
import { useState } from 'react';

export default function UI() {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const resetGame = useGameStore((state) => state.resetGame);
  const undoMove = useGameStore((state) => state.undoMove);
  const gameMode = useGameStore((state) => state.gameMode);
  const setGameMode = useGameStore((state) => state.setGameMode);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">QW - All Fours</h1>
              <div className="flex items-center gap-4">
                {winner ? (
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    {winner === 2 && gameMode === 'pvc' ? 'Computer' : `Player ${winner}`} wins! 🎉
                  </span>
                ) : (
                  <span className="text-xl font-bold text-slate-700 dark:text-slate-200">
                    {currentPlayer === 2 && gameMode === 'pvc' ? 'Computer\'s turn' : `Player ${currentPlayer}'s turn`}
                  </span>
                )}
                <button
                  onClick={() => setGameMode(gameMode === 'pvp' ? 'pvc' : 'pvp')}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title={gameMode === 'pvp' ? 'Switch to Player vs Computer' : 'Switch to Player vs Player'}
                >
                  {gameMode === 'pvp' ? (
                    <Users className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  ) : (
                    <Monitor className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  )}
                </button>
                <button
                  onClick={undoMove}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Undo last move"
                >
                  <Undo className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                </button>
                <button
                  onClick={() => setShowHelp(true)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="How to play"
                >
                  <HelpCircle className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  ) : (
                    <Moon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                  )}
                </button>
                <button
                  onClick={resetGame}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Reset game"
                >
                  <RotateCcw className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to play modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">How to Play</h2>
            <div className="prose dark:prose-invert">
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-200">
                <li>Click on any vertical pole to drop your token</li>
                <li>Tokens will stack from bottom to top</li>
                <li>Connect 4 tokens in any direction to win:</li>
                <ul className="list-disc list-inside ml-4">
                  <li>Horizontally</li>
                  <li>Vertically</li>
                  <li>Diagonally</li>
                  <li>Through the depth of the board</li>
                </ul>
                <li>Use the undo button to take back your last move</li>
                <li>Switch between playing against another player or the computer</li>
                <li>Drag to rotate the board and see all angles</li>
              </ul>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}