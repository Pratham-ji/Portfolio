import React from 'react';
import { useShell } from '../context';
import { WifiIcon, BatteryIcon, Volume2Icon } from 'lucide-react';
import { Clock } from '../taskbar/Clock';

export const TopBar: React.FC = () => {
  const { state, toggleStartMenu } = useShell();

  return (
    <nav className="absolute top-0 left-0 right-0 h-8 bg-[#1c1c1c] text-white flex items-center justify-between px-4 z-[10000] select-none shadow-sm">
      <div className="flex items-center h-full">
        <button 
          onClick={toggleStartMenu}
          className={`px-3 h-full font-bold text-[14px] hover:bg-white/10 transition-colors ${state.isStartMenuOpen ? 'bg-white/10' : ''}`}
        >
          Activities
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full hover:bg-white/10 px-3 cursor-pointer transition-colors font-bold text-[14px] rounded-full">
        <Clock />
      </div>

      <div className="flex items-center gap-3 h-full px-3 hover:bg-white/10 transition-colors cursor-pointer rounded-full">
        <WifiIcon size={14} />
        <Volume2Icon size={14} />
        <BatteryIcon size={14} />
      </div>
    </nav>
  );
};
