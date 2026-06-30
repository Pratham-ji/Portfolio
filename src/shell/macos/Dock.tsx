import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowContext, WindowStateObj } from '../../core/window-manager';
import { useApplication } from '../../core/application-manager';
import { AppWindowIcon } from 'lucide-react';

export const Dock: React.FC = () => {
  const { windows, activeWindowId, focusWindow, minimizeWindow, openWindow } = useWindowContext();
  const { getAppManifest } = useApplication();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Hardcode a few pinned apps for demonstration, plus currently open apps
  const pinnedApps = ['explorer', 'terminal', 'settings'];
  const openAppIds = windows.map((w: WindowStateObj) => w.appId);
  const dockApps = Array.from(new Set([...pinnedApps, ...openAppIds]));

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-16 z-[10000] flex items-end">
      <div 
        className="flex items-end h-14 bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl px-2 pb-1 gap-2 shadow-2xl"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockApps.map((appId) => {
          const manifest = getAppManifest(appId);
          const isOpen = openAppIds.includes(appId);
          const activeWindow = windows.find((w: WindowStateObj) => w.appId === appId && w.id === activeWindowId);
          const isActive = !!activeWindow;

          // Simple magnification effect
          const isHovered = hoveredIndex === appId;

          return (
            <motion.button
              key={appId}
              onMouseEnter={() => setHoveredIndex(appId)}
              onClick={() => {
                if (isActive) {
                  minimizeWindow(activeWindow.id);
                } else if (isOpen) {
                  const win = windows.find((w: WindowStateObj) => w.appId === appId);
                  if (win) focusWindow(win.id);
                } else {
                  openWindow(appId);
                }
              }}
              animate={{
                width: isHovered ? 64 : 48,
                height: isHovered ? 64 : 48,
                y: isHovered ? -8 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center shadow-lg group overflow-visible"
            >
              <AppWindowIcon size={24} className="text-white drop-shadow-md" />
              
              {isOpen && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full" />
              )}
              
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs rounded-md whitespace-nowrap border border-white/10 pointer-events-none">
                  {manifest?.name || appId}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
