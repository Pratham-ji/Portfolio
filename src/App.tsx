import React, { useEffect } from 'react';
import { Foundry } from './core/foundry/Foundry';
import { ThemeProvider } from './design-system/providers/ThemeProvider';
import { PlatformProvider } from './design-system/providers/PlatformProvider';
import { AccessibilityProvider } from './design-system/providers/AccessibilityProvider';
import { DesktopCanvas } from './desktop/DesktopCanvas';
import { SystemShell } from './shell';
import { BootRouter } from './runtime/BootRouter';
import { useSettings } from './core/settings-manager';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { CommandProvider } from './design-system/command/CommandProvider';
import { WorkspaceProvider } from './desktop/WorkspaceProvider';
import { WindowProvider } from './window-manager/renderer/WindowProvider';

const OS_Interface = () => {
  const { settings } = useSettings();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    BootRouter.init();
  }, []);

  // Disable animations if user prefers reduced motion OS-level, or if disabled in PrathamOS settings
  const shouldReduceMotion = prefersReducedMotion || !settings?.animationsEnabled;

  return (
    <ThemeProvider>
      <PlatformProvider>
        <AccessibilityProvider>
          <CommandProvider>
            <WorkspaceProvider>
              <WindowProvider>
                <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
                  <DesktopCanvas />
                  <SystemShell />
                </MotionConfig>
              </WindowProvider>
            </WorkspaceProvider>
          </CommandProvider>
        </AccessibilityProvider>
      </PlatformProvider>
    </ThemeProvider>
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
