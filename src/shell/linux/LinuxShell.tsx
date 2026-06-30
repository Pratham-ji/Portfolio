import React from 'react';
import { BootScreen } from '../desktop/BootScreen';
import { DeveloperMode } from '../developer-mode';
import { NotificationToasts } from '../notifications';

// Temporary Placeholder
const LinuxShell: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-gray-900 flex items-center justify-center">
      <h1 className="text-white text-2xl">Linux Shell (Under Construction)</h1>
      <NotificationToasts />
      <DeveloperMode />
      <BootScreen />
    </div>
  );
};

export default LinuxShell;
