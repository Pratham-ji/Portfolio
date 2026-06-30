import { useShell } from '../context';
import { PinnedApps } from './PinnedApps';
import { UserProfile } from './UserProfile';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

export const StartMenu: React.FC = () => {
  const { state, closeAllOverlays } = useShell();
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        state.isStartMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(e.target as Node) &&
        // Ignore clicks on the start button itself, otherwise it toggles twice
        !(e.target as Element).closest('button[aria-label="Start Menu"]')
      ) {
        closeAllOverlays();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isStartMenuOpen, closeAllOverlays]);

  return (
    <AnimatePresence>
      {state.isStartMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 50, scale: shouldReduceMotion ? 1 : 0.95 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : { type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[700px] max-h-[80vh] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-xl shadow-2xl flex flex-col z-[9999]"
        >
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Search Bar Placeholder */}
            <div className="p-8 pb-4">
              <div className="w-full h-12 bg-white/5 rounded-full border border-white/10 flex items-center px-4 text-sm text-[var(--theme-text-muted)] cursor-text hover:bg-white/10 transition-colors">
                Type here to search...
              </div>
            </div>

            <PinnedApps />
          </div>
          
          <UserProfile />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
