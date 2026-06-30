import React from 'react';
import { useShell } from '../context';
import { WifiIcon, BatteryIcon, SearchIcon, CommandIcon } from 'lucide-react';
import { Clock } from '../taskbar/Clock';

export const MenuBar: React.FC = () => {
  const { toggleSpotlight } = useShell();

  return (
    <nav className="absolute top-0 left-0 right-0 h-7 bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-between px-4 z-[10000] text-[13px] font-medium text-black dark:text-white border-b border-white/20 dark:border-black/20 select-none shadow-sm">
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          <CommandIcon size={14} className="mt-[1px]" />
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors font-semibold">
          PrathamOS
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          File
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          Edit
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          View
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          Window
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          Help
        </div>
      </div>

      <div className="flex items-center gap-2 h-full">
        <div className="flex items-center gap-3 px-2">
          <WifiIcon size={14} />
          <BatteryIcon size={14} />
          <button onClick={toggleSpotlight} className="hover:text-os-blue transition-colors outline-none">
            <SearchIcon size={14} />
          </button>
        </div>
        <div className="flex items-center h-full hover:bg-black/10 dark:hover:bg-white/10 px-2 cursor-pointer transition-colors">
          <Clock />
        </div>
      </div>
    </nav>
  );
};
