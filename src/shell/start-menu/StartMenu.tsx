import { useShell } from '../context';
import { PinnedApps } from './PinnedApps';
import { UserProfile } from './UserProfile';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export const StartMenu: React.FC = () => {
  const { state, closeAllOverlays } = useShell();
  const menuRef = useRef<HTMLDivElement>(null);

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
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute bottom-16 left-2 w-[400px] bg-[var(--theme-bg-alpha)] backdrop-blur-xl border border-[var(--theme-border)] rounded-xl shadow-2xl flex flex-col z-[9999]"
        >
          <div className="flex flex-col flex-1 min-h-[400px]">
            {/* Search Bar Placeholder */}
            <div className="p-6 pb-0">
              <div className="w-full h-10 bg-[var(--theme-surface)] rounded-full border border-[var(--theme-border)] flex items-center px-4 text-sm text-[var(--theme-text-muted)] cursor-text">
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
