import React from 'react';
import { BootScreen } from '../desktop/BootScreen';
import { DeveloperMode } from '../developer-mode';
import { NotificationToasts } from '../notifications';

// Temporary Placeholder
const MobileShell: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl">Mobile Shell (Under Construction)</h1>
      <NotificationToasts />
      <DeveloperMode />
      <BootScreen />
    </div>
  );
};

export default MobileShell;
