import { useContext } from 'react';
import { PlatformContext } from '../providers/PlatformProvider';
import { PlatformConfig } from '../types/platform';

const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  os: 'macOS',
  modifierKey: '⌘',
  secondaryModifier: '⌥',
  windowControlsPosition: 'left'
};

export const usePlatform = (): PlatformConfig => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    return DEFAULT_PLATFORM_CONFIG;
  }
  return context;
};
