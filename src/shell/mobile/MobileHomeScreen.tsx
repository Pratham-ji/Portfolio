import React, { useState } from 'react';
import { useWindowContext } from '../../core/window-manager';
import { useApplication } from '../../core/application-manager';
import { AppWindowIcon, SearchIcon, GridIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileHomeScreen: React.FC = () => {
  const { openWindow } = useWindowContext();
  const { getAppManifest } = useApplication();
  
  // Just dummy apps for now, since we use getAppManifest dynamically later
  const apps = ['explorer', 'terminal', 'projects', 'github', 'settings', 'resume'];
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="absolute inset-0 bg-black flex flex-col pt-12 pb-8">
      {/* App Grid */}
      <div className="flex-1 px-6 pt-8 grid grid-cols-4 gap-x-4 gap-y-8 content-start">
        {apps.map(appId => {
          const manifest = getAppManifest(appId);
          return (
            <button
              key={appId}
              onClick={() => openWindow(appId)}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                <AppWindowIcon size={24} className="text-white" />
              </div>
              <span className="text-xs text-white font-medium drop-shadow-md truncate w-full text-center">
                {manifest?.name || appId}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dock Area */}
      <div className="px-4 pb-2">
        <div className="w-full h-20 bg-white/20 backdrop-blur-3xl rounded-3xl flex items-center justify-around px-4 border border-white/10">
           <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
             <AppWindowIcon size={24} className="text-white" />
           </button>
           <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
             <SearchIcon size={24} className="text-white" />
           </button>
           <button onClick={() => setIsDrawerOpen(true)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
             <GridIcon size={24} className="text-white" />
           </button>
        </div>
      </div>

      {/* App Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-2xl flex flex-col pt-12"
          >
            <div className="px-6 flex justify-between items-center mb-8">
              <h2 className="text-white text-2xl font-bold">App Library</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-white/60">Close</button>
            </div>
            
            <div className="flex-1 px-6 overflow-y-auto grid grid-cols-4 gap-x-4 gap-y-8 content-start pb-20">
              {apps.map(appId => {
                const manifest = getAppManifest(appId);
                return (
                  <button
                    key={`drawer-${appId}`}
                    onClick={() => {
                      openWindow(appId);
                      setIsDrawerOpen(false);
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <AppWindowIcon size={24} className="text-white" />
                    </div>
                    <span className="text-xs text-white truncate w-full text-center">
                      {manifest?.name || appId}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
