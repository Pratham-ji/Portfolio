import React from 'react';
import { BootScreen } from '../desktop/BootScreen';
import { DeveloperMode } from '../developer-mode';
import { NotificationToasts } from '../notifications';
import { Dock } from '../macos/Dock';
import { MobileAppRenderer } from '../mobile/MobileAppRenderer';
import { AuthScreen } from '../desktop/AuthScreen';
import { Clock } from '../taskbar/Clock';
import { WifiIcon, BatteryIcon } from 'lucide-react';

const TabletShell: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white">
      {/* Tablet Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 z-[6000] flex items-center justify-between px-6 pointer-events-none drop-shadow-md">
        <Clock />
        <div className="flex items-center gap-2">
          <WifiIcon size={14} />
          <BatteryIcon size={14} />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        {/* Empty state for tablet background */}
      </div>

      <MobileAppRenderer />
      <Dock />

      <NotificationToasts />
      <DeveloperMode />
      <AuthScreen />
      <BootScreen />
    </div>
  );
};

export default TabletShell;
