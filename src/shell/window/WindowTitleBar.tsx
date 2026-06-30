import { useWindowContext } from '../../core/window-manager';
import { useSettings } from '../../core/settings-manager';
import { usePlatform } from '../../core/hooks/usePlatform';
import { MinusIcon, SquareIcon, XIcon } from 'lucide-react';

interface WindowTitleBarProps {
  id: string;
  title: string;
  isMaximized: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

const MacOSControls: React.FC<{ id: string; isMaximized: boolean }> = ({ id, isMaximized }) => {
  const { closeWindow, maximizeWindow, minimizeWindow } = useWindowContext();
  return (
    <div className="absolute left-3 flex items-center gap-2 group">
      <button 
        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
        className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors relative flex items-center justify-center"
        aria-label="Close"
      />
      <button 
        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
        className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors relative flex items-center justify-center"
        aria-label="Minimize"
      />
      <button 
        onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
        className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors relative flex items-center justify-center"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      />
    </div>
  );
};

const WindowsControls: React.FC<{ id: string; isMaximized: boolean }> = ({ id, isMaximized }) => {
  const { closeWindow, maximizeWindow, minimizeWindow } = useWindowContext();
  return (
    <div className="flex items-center">
      <button 
        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
        className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Minimize"
      >
        <MinusIcon size={14} className="text-[var(--theme-text)]" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
        className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        <SquareIcon size={12} className="text-[var(--theme-text)]" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
        className="p-1.5 hover:bg-red-500 hover:text-white transition-colors"
        aria-label="Close"
      >
        <XIcon size={14} className="text-[var(--theme-text)]" />
      </button>
    </div>
  );
};

const usePlatformTheme = () => {
  const { settings } = useSettings();
  const { os } = usePlatform();
  if (settings.platformTheme !== 'auto') return settings.platformTheme;
  if (os === 'macos' || os === 'linux') return os;
  return 'windows';
};

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({ id, title, isMaximized, onPointerDown }) => {
  const { maximizeWindow } = useWindowContext();
  const theme = usePlatformTheme();
  const isMacOS = theme === 'macos';

  return (
    <div 
      className={`flex items-center ${isMacOS ? 'justify-center' : 'justify-between'} px-3 py-2 select-none relative`}
      onPointerDown={onPointerDown}
      style={{ 
        backgroundColor: 'var(--theme-surface)',
        borderBottom: '1px solid var(--theme-border)',
        borderTopLeftRadius: isMaximized ? 0 : 'var(--radius-md)',
        borderTopRightRadius: isMaximized ? 0 : 'var(--radius-md)',
        cursor: isMaximized ? 'default' : 'grab',
      }}
      onDoubleClick={() => maximizeWindow(id)}
    >
      {isMacOS && <MacOSControls id={id} isMaximized={isMaximized} />}

      <div className={`flex items-center gap-2 ${isMacOS ? '' : ''}`}>
        <div className="text-sm font-semibold text-[var(--theme-text)]">{title}</div>
      </div>
      
      {!isMacOS && <WindowsControls id={id} isMaximized={isMaximized} />}
    </div>
  );
};
