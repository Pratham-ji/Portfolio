import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowContext } from '../../core/window-manager';
import { DownloadIcon, BriefcaseIcon, XIcon, UserCircleIcon, RocketIcon } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openWindow } = useWindowContext();

  useEffect(() => {
    // Only show on first visit
    const hasSeenOnboarding = localStorage.getItem('prathamos_onboarding_seen');
    if (!hasSeenOnboarding) {
      // Slight delay to allow system to boot
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('prathamos_onboarding_seen', 'true');
  };

  const handleQuickAction = (appId: string) => {
    openWindow(appId);
    handleDismiss();
  };

  const handleDownloadResume = () => {
    // Use the same logic as ResumeApp for downloading
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'pratham_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-lg bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <XIcon size={20} />
          </button>
          
          <div className="p-8 pb-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <UserCircleIcon size={40} className="text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-3">Welcome to PrathamOS!</h1>
            <p className="text-white/70 leading-relaxed mb-8">
              This isn't just a portfolio—it's a fully functional operating system built with React. Feel free to explore the apps, open multiple windows, and check out my work.
            </p>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => handleQuickAction('projects')}
                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20"
              >
                <BriefcaseIcon size={18} />
                View Projects
              </button>
              
              <button 
                onClick={handleDownloadResume}
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-all border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <DownloadIcon size={18} />
                Get Resume
              </button>
            </div>
          </div>
          
          <div className="bg-black/40 px-8 py-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <RocketIcon size={14} />
              <span>Built with React & Vite</span>
            </div>
            <button 
              onClick={handleDismiss}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Skip Tour
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
