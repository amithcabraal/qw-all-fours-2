import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('hasSeenSplash', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-lg w-full"
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to QW - All Fours!
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Experience Connect Four in a whole new dimension! Challenge your spatial thinking
              by connecting four tokens in any direction - horizontally, vertically, or diagonally,
              even through the depth of the 3D space.
            </p>
            <div className="space-y-4 text-slate-700 dark:text-slate-200 mb-6">
              <h2 className="font-semibold text-xl">Quick Tips:</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Drag to rotate the board</li>
                <li>Click any pole to drop your token</li>
                <li>Think in three dimensions to win!</li>
              </ul>
            </div>
            <button
              onClick={handleDismiss}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Let's Play!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}