import { useEffect } from 'react';
import { useShell } from '../context';
import { usePerformanceMetrics } from './usePerformanceMetrics';
import { useWindowContext } from '../../core/window-manager';
import { ActivityIcon, LayersIcon, ZapIcon, CpuIcon } from 'lucide-react';

export const DeveloperMode: React.FC = () => {
  const { state, toggleDeveloperMode } = useShell();
  const { windows } = useWindowContext();
  const metrics = usePerformanceMetrics(state.isDeveloperModeOpen);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDeveloperMode();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [toggleDeveloperMode]);

  if (!state.isDeveloperModeOpen) return null;

  return (
    <div className="absolute top-4 left-4 z-[10000] pointer-events-none select-none">
      <div className="bg-black/80 backdrop-blur-md text-green-400 border border-green-500/30 rounded-lg p-3 font-mono text-xs shadow-2xl flex flex-col gap-2 w-48">
        <div className="flex items-center gap-2 border-b border-green-500/30 pb-2 mb-1 text-green-300 font-bold uppercase">
          <ActivityIcon size={14} />
          <span>PrathamOS Dev</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 opacity-80">
            <ZapIcon size={12} />
            <span>FPS</span>
          </div>
          <span className={metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}>{metrics.fps}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 opacity-80">
            <CpuIcon size={12} />
            <span>Memory</span>
          </div>
          <span>{metrics.memoryUsageMB ? `${metrics.memoryUsageMB} MB` : 'N/A'}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 opacity-80">
            <LayersIcon size={12} />
            <span>Windows</span>
          </div>
          <span>{windows.length}</span>
        </div>
        
        <div className="mt-1 pt-2 border-t border-green-500/30 text-[9px] text-green-500/60 text-center">
          Ctrl+Shift+D to hide
        </div>
      </div>
    </div>
  );
};
