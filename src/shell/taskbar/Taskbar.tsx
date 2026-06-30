import { StartButton } from './StartButton';
import { TaskbarAppList } from './TaskbarAppList';
import { SystemTray } from './SystemTray';

export const Taskbar: React.FC = () => {
  return (
    <nav 
      aria-label="Taskbar"
      className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between select-none shadow-lg bg-black/40 backdrop-blur-xl border-t border-white/10"
      style={{ zIndex: 10000 }}
    >
      <div className="flex-1" />
      
      <div className="flex flex-1 justify-center items-center h-full gap-1">
        <StartButton />
        <TaskbarAppList />
      </div>

      <div className="flex-1 flex justify-end h-full">
        <SystemTray />
      </div>
    </nav>
  );
};
