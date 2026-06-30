import React from 'react';
import { UserIcon, PowerIcon, SettingsIcon } from 'lucide-react';
import { useWindowContext } from '../../core/window-manager';
import { useShell } from '../context';

export const UserProfile: React.FC = () => {
  const { openWindow } = useWindowContext();
  const { setPowerState, closeAllOverlays } = useShell();

  const handleShutdown = () => {
    closeAllOverlays();
    setPowerState('shutting_down');
    setTimeout(() => setPowerState('off'), 2000); // Transition to off after 2 seconds
  };

  return (
    <div className="mt-auto p-6 border-t border-white/10 flex items-center justify-between bg-black/20 rounded-b-xl">
      <div className="flex items-center gap-4 hover:bg-white/5 p-2 pr-4 rounded-lg cursor-pointer transition-colors">
        <div className="w-10 h-10 rounded-full bg-os-blue flex items-center justify-center text-white shadow-lg">
          <UserIcon size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">Pratham</span>
          <span className="text-xs text-[var(--theme-text-muted)]">Administrator</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-lg hover:bg-[var(--theme-surface-hover)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
          title="Settings"
          onClick={() => { openWindow('settings', 'Settings'); closeAllOverlays(); }}
        >
          <SettingsIcon size={18} />
        </button>
        <button 
          className="p-2 rounded-lg hover:bg-[var(--theme-surface-hover)] text-[var(--theme-text-muted)] hover:text-red-500 transition-colors"
          title="Shut Down"
          onClick={handleShutdown}
        >
          <PowerIcon size={18} />
        </button>
      </div>
    </div>
  );
};
