import React from 'react';
import { BootScreen } from '../desktop/BootScreen';
import { DeveloperMode } from '../developer-mode';
import { NotificationToasts } from '../notifications';
import { Spotlight } from '../spotlight';
import { Desktop } from '../desktop';
import { WindowRenderer } from '../window';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { AuthScreen } from '../desktop/AuthScreen';

const MacOSShell: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden text-[var(--theme-text)]">
      <Desktop />
      <MenuBar />
      <WindowRenderer />
      <Dock />
      
      <Spotlight />
      <NotificationToasts />
      <DeveloperMode />
      <AuthScreen />
      <BootScreen />
    </div>
  );
};

export default MacOSShell;
