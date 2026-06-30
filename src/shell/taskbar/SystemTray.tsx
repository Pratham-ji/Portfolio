import { useSettings } from '../../core/settings-manager';
import { BellIcon, WifiIcon, Volume2Icon, MoonIcon, SunIcon } from 'lucide-react';
import { Clock } from './Clock';

export const SystemTray: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const isDarkMode = settings.theme === 'dark';

  const toggleTheme = () => {
    updateSetting('theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center h-full space-x-1 pr-2">
      {/* Hidden icons container (Network, Volume) */}
      <div className="flex items-center px-2 py-1 rounded-md hover:bg-[var(--theme-surface-hover)] cursor-pointer transition-colors gap-2 text-[var(--theme-text)]">
        <WifiIcon size={16} />
        <Volume2Icon size={16} />
      </div>

      <button 
        onClick={toggleTheme}
        className="p-1.5 rounded-md hover:bg-[var(--theme-surface-hover)] transition-colors text-[var(--theme-text)]"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </button>

      <button 
        className="p-1.5 rounded-md hover:bg-[var(--theme-surface-hover)] transition-colors text-[var(--theme-text)] relative"
        aria-label="Notifications"
      >
        <BellIcon size={16} />
        {/* Placeholder badge for MVP */}
      </button>

      <Clock />
    </div>
  );
};
