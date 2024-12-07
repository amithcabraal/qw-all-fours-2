import { useState } from 'react';
import { Menu, X, Share2, Shield, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'help' | 'privacy' | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QW - All Fours',
          text: 'Check out this awesome 3D Connect Four game!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg backdrop-blur-sm"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-72 bg-white/95 dark:bg-slate-800/95 shadow-lg backdrop-blur-sm z-40 p-6 pt-20"
          >
            <div className="space-y-4">
              <button
                onClick={() => setActiveModal('help')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>How to Play</span>
              </button>
              <button
                onClick={() => setActiveModal('privacy')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span>Privacy</span>
              </button>
              <button
                onClick={handleShare}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md w-full"
            >
              {activeModal === 'privacy' ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                  <div className="prose dark:prose-invert">
                    <p>We respect your privacy and only store:</p>
                    <ul>
                      <li>Game preferences in local storage</li>
                      <li>No personal data is collected</li>
                      <li>No cookies are used</li>
                      <li>No analytics are tracked</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                  <div className="prose dark:prose-invert">
                    <ul>
                      <li>Click on any vertical pole to drop your token</li>
                      <li>Connect 4 tokens in any direction to win</li>
                      <li>Tokens can connect:</li>
                      <ul>
                        <li>Horizontally</li>
                        <li>Vertically</li>
                        <li>Diagonally</li>
                        <li>Through the depth of the board</li>
                      </ul>
                    </ul>
                  </div>
                </>
              )}
              <button
                onClick={() => setActiveModal(null)}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}