import { StartButton } from './StartButton';
import { TaskbarAppList } from './TaskbarAppList';
import { SystemTray } from './SystemTray';

export const Taskbar: React.FC = () => {
  return (
    <nav 
      aria-label="Taskbar"
      className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between select-none shadow-lg backdrop-blur-md"
      style={{
        zIndex: 10000,
        backgroundColor: 'var(--theme-bg-alpha)'
      }}
    >
      <StartButton />
      <TaskbarAppList />
      <SystemTray />
    </nav>
  );
};
