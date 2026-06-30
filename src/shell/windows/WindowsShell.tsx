import React from 'react';
import { Desktop } from '../desktop';
import { WindowRenderer } from '../window';
import { Taskbar } from '../taskbar';
import { StartMenu } from '../start-menu';
import { Spotlight } from '../spotlight';
import { NotificationToasts } from '../notifications';
import { DeveloperMode } from '../developer-mode';
import { BootScreen } from '../desktop/BootScreen';
import { AuthScreen } from '../desktop/AuthScreen';

const WindowsShell: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <Desktop />
      <WindowRenderer />
      <Taskbar />
      <StartMenu />
      <Spotlight />
      <NotificationToasts />
      <DeveloperMode />
      <AuthScreen />
      <BootScreen />
    </div>
  );
};

export default WindowsShell;
