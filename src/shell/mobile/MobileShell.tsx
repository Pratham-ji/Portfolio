import React from 'react';
import { BootScreen } from '../desktop/BootScreen';
import { DeveloperMode } from '../developer-mode';
import { NotificationToasts } from '../notifications';
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileAppRenderer } from './MobileAppRenderer';
import { WifiIcon, BatteryIcon } from 'lucide-react';
import { Clock } from '../taskbar/Clock';

const MobileShell: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white">
      {/* Mobile Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 z-[6000] flex items-center justify-between px-6 pointer-events-none drop-shadow-md">
        <Clock />
        
        {/* Dynamic Island Placeholder */}
        <div className="absolute left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full shadow-lg" />
        
        <div className="flex items-center gap-2">
          <WifiIcon size={14} />
          <BatteryIcon size={14} />
        </div>
      </div>

      <MobileHomeScreen />
      <MobileAppRenderer />

      <NotificationToasts />
      <DeveloperMode />
      <BootScreen />
    </div>
  );
};

export default MobileShell;
