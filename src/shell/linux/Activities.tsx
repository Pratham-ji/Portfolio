import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShell } from '../context';
import { useWindowContext, WindowStateObj } from '../../core/window-manager';
import { useApplication } from '../../core/application-manager';
import { AppWindowIcon } from 'lucide-react';

export const Activities: React.FC = () => {
  const { state, closeAllOverlays } = useShell();
  const { windows, activeWindowId, focusWindow, openWindow } = useWindowContext();
  const { getAppManifest } = useApplication();

  const pinnedApps = ['explorer', 'terminal', 'settings', 'projects'];

  return (
    <AnimatePresence>
      {state.isStartMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 top-8 z-[9000] bg-black/60 backdrop-blur-md flex"
          onClick={closeAllOverlays}
        >
          {/* Dash (Dock) on the left */}
          <div 
            className="w-16 h-full flex flex-col items-center py-8 gap-4 border-r border-white/10"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {pinnedApps.map(appId => {
              const manifest = getAppManifest(appId);
              const isOpen = windows.some((w: WindowStateObj) => w.appId === appId);
              const isActive = windows.find((w: WindowStateObj) => w.appId === appId)?.id === activeWindowId;

              return (
                <button
                  key={appId}
                  onClick={() => {
                    if (!isOpen) {
                      openWindow(appId);
                      closeAllOverlays();
                    } else {
                      const win = windows.find((w: WindowStateObj) => w.appId === appId);
                      if (win) focusWindow(win.id);
                      closeAllOverlays();
                    }
                  }}
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`}
                  title={manifest?.name}
                >
                  <AppWindowIcon size={24} className="text-white" />
                  {isOpen && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Workspace Overview */}
          <div className="flex-1 p-12 flex flex-wrap gap-8 items-start justify-center content-start">
            {windows.map(win => (
              <motion.div
                key={win.id}
                layoutId={`window-${win.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  focusWindow(win.id);
                  closeAllOverlays();
                }}
                className="w-64 h-48 bg-black/50 border border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-os-blue transition-colors relative flex items-center justify-center shadow-xl"
              >
                <span className="text-white font-medium">{win.title}</span>
              </motion.div>
            ))}
            
            {windows.length === 0 && (
              <div className="text-white/50 text-xl font-medium mt-32">
                No open windows
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
