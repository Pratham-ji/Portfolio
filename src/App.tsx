import React from 'react';
import { Foundry } from './core/foundry/Foundry';

import { Desktop } from './shell/desktop';
import { WindowRenderer } from './shell/window';
import { Taskbar } from './shell/taskbar';
import { StartMenu } from './shell/start-menu';
import { Spotlight } from './shell/spotlight';
import { NotificationToasts } from './shell/notifications';
import { DeveloperMode } from './shell/developer-mode';
import { ShellProvider } from './shell/context';
import { BootScreen } from './shell/desktop/BootScreen';
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
        <div className="w-full h-screen overflow-hidden bg-[var(--theme-bg)] text-[var(--theme-text)] relative">
          <Desktop />
          <WindowRenderer />
          <Taskbar />
          <StartMenu />
          <Spotlight />
          <NotificationToasts />
          <DeveloperMode />
          <BootScreen />
        </div>
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
