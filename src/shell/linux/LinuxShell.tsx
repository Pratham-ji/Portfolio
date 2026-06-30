import React from 'react';
import { BootScreen } from '../desktop/BootScreen';
import { DeveloperMode } from '../developer-mode';
import { NotificationToasts } from '../notifications';
import { Desktop } from '../desktop';
import { WindowRenderer } from '../window';
import { AuthScreen } from '../desktop/AuthScreen';
import { TopBar } from './TopBar';
import { Activities } from './Activities';

const LinuxShell: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden text-white bg-black">
      <Desktop />
      <TopBar />
      <div className="absolute inset-0 top-8">
        <WindowRenderer />
      </div>
      <Activities />
      
      <NotificationToasts />
      <DeveloperMode />
      <AuthScreen />
      <BootScreen />
    </div>
  );
};

export default LinuxShell;
