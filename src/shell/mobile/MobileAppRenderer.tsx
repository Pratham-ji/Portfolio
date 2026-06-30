import React from 'react';
import { useWindowContext, WindowStateObj } from '../../core/window-manager';
import { useApplication } from '../../core/application-manager';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileAppRenderer: React.FC = () => {
  const { windows, activeWindowId, closeWindow } = useWindowContext();
  const { getAppManifest } = useApplication();

  return (
    <div className={`absolute inset-0 z-[5000] ${windows.length > 0 ? 'bg-black pointer-events-auto' : 'pointer-events-none'}`}>
      <AnimatePresence>
        {windows.map((win: WindowStateObj) => {
          if (win.id !== activeWindowId && !win.isMinimized) return null;
          
          const manifest = getAppManifest(win.appId);
          if (!manifest || !manifest.component) return null;
          const AppComponent = manifest.component;

          return (
            <motion.div
              key={win.id}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute inset-0 w-full h-full bg-[var(--theme-bg)] flex flex-col ${win.id === activeWindowId ? 'z-50' : 'z-0 hidden'}`}
            >
              {/* Mobile App Header */}
              <div className="h-14 bg-[var(--theme-surface)] flex items-center justify-center border-b border-[var(--theme-border)] shrink-0 pt-4">
                <span className="font-semibold text-[var(--theme-text)]">{win.title}</span>
              </div>
              
              {/* App Content */}
              <div className="flex-1 overflow-auto relative bg-[var(--theme-bg)]">
                <React.Suspense fallback={<div className="flex h-full items-center justify-center text-white/50 animate-pulse">Loading app...</div>}>
                  <AppComponent />
                </React.Suspense>
              </div>

              {/* iOS style Home Bar */}
              <div className="h-6 w-full absolute bottom-0 left-0 flex justify-center items-end pb-2 z-50 pointer-events-none">
                 <button 
                   onClick={() => closeWindow(win.id)}
                   className="w-1/3 h-1.5 bg-black/40 dark:bg-white/40 rounded-full hover:bg-black/60 transition-colors pointer-events-auto"
                 />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
