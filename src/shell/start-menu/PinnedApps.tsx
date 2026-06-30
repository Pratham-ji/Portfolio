import { useApplication } from '../../core/application-manager';
import { useWindowContext } from '../../core/window-manager';
import { useShell } from '../context';
import { AppWindowIcon } from 'lucide-react';

export const PinnedApps: React.FC = () => {
  const { getAllApps } = useApplication();
  const { openWindow } = useWindowContext();
  const { closeAllOverlays } = useShell();
  const apps = getAllApps();

  return (
    <div className="p-6 pb-2">
      <h3 className="text-sm font-semibold text-[var(--theme-text)] mb-4 ml-2">Pinned</h3>
      <div className="grid grid-cols-4 gap-4">
        {apps.map(app => {
          const Icon = AppWindowIcon; // Fallback icon

          return (
            <button
              key={app.id}
              onClick={() => {
                openWindow(app.id, app.name);
                closeAllOverlays();
              }}
              className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-[var(--theme-surface-hover)] transition-colors group"
            >
              <div className="w-12 h-12 bg-[var(--theme-surface)] rounded-xl shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform border border-[var(--theme-border)]">
                <Icon size={24} className="text-[var(--theme-text)]" />
              </div>
              <span className="text-xs text-[var(--theme-text)] truncate w-full text-center">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
