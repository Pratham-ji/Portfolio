import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShell } from '../context';
import { UserIcon, ArrowRightIcon } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { state, setPowerState } = useShell();
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (state.powerState !== 'locked') return;
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [state.powerState]);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoggingIn(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoggingIn(false);
      setPassword('');
      setPowerState('on');
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <AnimatePresence>
      {/* Lock Screen */}
      {state.powerState === 'locked' && (
        <motion.div
          key="lockscreen"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-[90000] bg-black/40 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
          onClick={() => setPowerState('login')}
        >
          <div className="flex flex-col items-center text-white mt-32">
            <h1 className="text-8xl font-light tracking-tight mb-2">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </h1>
            <p className="text-xl font-medium">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="mt-auto mb-16 text-white/70 animate-bounce">
            Click or press any key to unlock
          </div>
        </motion.div>
      )}

      {/* Login Screen */}
      {state.powerState === 'login' && (
        <motion.div
          key="loginscreen"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-[80000] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-os-blue flex items-center justify-center text-white shadow-2xl">
              <UserIcon size={64} />
            </div>
            
            <h2 className="text-3xl font-semibold text-white">Pratham</h2>
            
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-64">
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="PIN or Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoggingIn}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-os-blue transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoggingIn || !password}
                  className="absolute right-1 top-1 bottom-1 px-2 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-50 transition-colors"
                >
                  <ArrowRightIcon size={20} />
                </button>
              </div>
              
              {isLoggingIn && (
                <div className="text-white/70 text-sm flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Welcome
                </div>
              )}
            </form>
          </div>
          
          {/* Back to lock screen button */}
          {!isLoggingIn && (
            <button 
              onClick={() => setPowerState('locked')}
              className="absolute bottom-12 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              Cancel
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
