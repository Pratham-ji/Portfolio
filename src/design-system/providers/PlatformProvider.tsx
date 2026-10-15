import React, { createContext, useEffect, useState } from 'react';
import { PlatformConfig, PlatformOs, ModifierKey, SecondaryModifierKey, WindowControlsPosition } from '../types/platform';

const PlatformContext = createContext<PlatformConfig | undefined>(undefined);

const detectPlatform = (): PlatformConfig => {
  if (typeof window === 'undefined') {
    return { os: 'Unknown', modifierKey: 'Unknown', secondaryModifier: 'Unknown', windowControlsPosition: 'Unknown' };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('mac')) {
    return { os: 'macOS', modifierKey: '⌘', secondaryModifier: '⌥', windowControlsPosition: 'left' };
  }
  if (userAgent.includes('win')) {
    return { os: 'Windows', modifierKey: 'Ctrl', secondaryModifier: 'Alt', windowControlsPosition: 'right' };
  }
  if (userAgent.includes('linux')) {
    return { os: 'Linux', modifierKey: 'Ctrl', secondaryModifier: 'Alt', windowControlsPosition: 'right' };
  }

  return { os: 'Unknown', modifierKey: 'Ctrl', secondaryModifier: 'Alt', windowControlsPosition: 'right' };
};

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>({
    os: 'Unknown',
    modifierKey: 'Unknown',
    secondaryModifier: 'Unknown',
    windowControlsPosition: 'Unknown'
  });

  useEffect(() => {
    setPlatformConfig(detectPlatform());
  }, []);

  return (
    <PlatformContext.Provider value={platformConfig}>
      {children}
    </PlatformContext.Provider>
  );
};

export { PlatformContext };
