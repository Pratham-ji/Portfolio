import { useWindowContext } from '../../core/window-manager';
import { useApplication } from '../../core/application-manager';
import { AppWindowIcon } from 'lucide-react';

export const TaskbarAppList: React.FC = () => {
  const { windows, activeWindowId, focusWindow, minimizeWindow } = useWindowContext();
  const { getAppManifest } = useApplication();

  return (
    <div className="flex items-center justify-center flex-1 h-full gap-1">
      {windows.map(win => {
        const isActive = win.id === activeWindowId;
        const manifest = getAppManifest(win.appId);
        
        // Use manifest icon if available, otherwise fallback
        const IconComponent = AppWindowIcon;

        return (
          <button
            key={win.id}
            onClick={() => {
              if (isActive && !win.isMinimized) {
                minimizeWindow(win.id);
              } else {
                focusWindow(win.id);
              }
            }}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200
              ${isActive ? 'bg-[var(--theme-surface-active)]' : 'hover:bg-[var(--theme-surface-hover)]'}
            `}
            title={manifest?.name || win.title}
          >
            <IconComponent size={20} className="text-[var(--theme-text)]" />
            
            {/* Active Indicator Line */}
            <div 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-t-sm transition-all duration-300
                ${isActive ? 'w-4 bg-os-blue' : 'w-2 bg-gray-400 opacity-50'}
              `} 
            />
          </button>
        );
      })}
    </div>
  );
};
