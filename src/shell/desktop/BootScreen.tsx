import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShell } from '../context';
import { TerminalIcon } from 'lucide-react';

export const BootScreen: React.FC = () => {
  const { state, setPowerState } = useShell();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state.powerState !== 'booting') return;

    // Simulate boot sequence loading
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPowerState('on'), 300); // Small delay before fading out
          return 100;
        }
        // Random progress jump between 5 and 20
        return Math.min(p + Math.random() * 15 + 5, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [state.powerState, setPowerState]);

  return (
    <AnimatePresence>
      {state.powerState === 'booting' && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 z-[99999] bg-black flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-12 max-w-sm w-full px-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white/80"
            >
              <TerminalIcon size={64} className="text-[#0a84ff]" />
            </motion.div>
            
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear', duration: 0.15 }}
                />
              </div>
              <p className="text-white/40 text-xs tracking-widest uppercase font-semibold">
                Initializing Foundry...
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {state.powerState === 'shutting_down' && (
        <motion.div
          key="shutdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 z-[99999] bg-black pointer-events-auto flex items-center justify-center"
        >
           <p className="text-white/40 text-sm tracking-widest uppercase font-semibold animate-pulse">
              Shutting down...
           </p>
        </motion.div>
      )}

      {state.powerState === 'off' && (
        <div className="absolute inset-0 z-[99999] bg-black pointer-events-auto flex items-center justify-center flex-col gap-6">
          <TerminalIcon size={48} className="text-white/10" />
          <button 
            onClick={() => setPowerState('booting')}
            className="px-6 py-2 rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            Power On
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};
