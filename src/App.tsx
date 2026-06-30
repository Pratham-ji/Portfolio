import React from 'react';
import { Foundry } from './core/foundry/Foundry';
import { ShellProvider } from './shell/context';
import { AdaptiveShellLoader } from './shell/AdaptiveShellLoader';
import { useSettings } from './core/settings-manager';
import { MotionConfig, useReducedMotion } from 'framer-motion';

const OS_Interface = () => {
  const { settings } = useSettings();
  const prefersReducedMotion = useReducedMotion();

  // Disable animations if user prefers reduced motion OS-level, or if disabled in PrathamOS settings
  const shouldReduceMotion = prefersReducedMotion || !settings.animationsEnabled;

  return (
    <ShellProvider>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
        <AdaptiveShellLoader />
      </MotionConfig>
    </ShellProvider>
  );
};

const App: React.FC = () => {
  return (
    <Foundry>
      <OS_Interface />
    </Foundry>
  );
};

export default App;
