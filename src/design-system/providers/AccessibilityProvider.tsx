import React, { createContext, useEffect, useState } from 'react';
import { MotionScheduler } from '../motion/MotionScheduler';

interface AccessibilityState {
  prefersReducedMotion: boolean;
  prefersContrast: boolean;
  prefersReducedTransparency: boolean;
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>({
    prefersReducedMotion: false,
    prefersContrast: false,
    prefersReducedTransparency: false
  });

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastMq = window.matchMedia('(prefers-contrast: more)');
    const transparencyMq = window.matchMedia('(prefers-reduced-transparency: reduce)');

    const updateState = () => {
      const newState = {
        prefersReducedMotion: motionMq.matches,
        prefersContrast: contrastMq.matches,
        prefersReducedTransparency: transparencyMq.matches
      };
      
      setState(newState);
      
      // Hook directly into MotionScheduler to downgrade physics
      MotionScheduler.updateContext({
        prefersReducedMotion: newState.prefersReducedMotion
      });
    };

    updateState();

    motionMq.addEventListener('change', updateState);
    contrastMq.addEventListener('change', updateState);
    transparencyMq.addEventListener('change', updateState);

    return () => {
      motionMq.removeEventListener('change', updateState);
      contrastMq.removeEventListener('change', updateState);
      transparencyMq.removeEventListener('change', updateState);
    };
  }, []);

  return (
    <AccessibilityContext.Provider value={state}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export { AccessibilityContext };
