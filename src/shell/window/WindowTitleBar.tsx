import { useWindowContext } from '../../core/window-manager';

interface WindowTitleBarProps {
  id: string;
  title: string;
  isMaximized: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({ id, title, isMaximized, onPointerDown }) => {
  const { closeWindow, maximizeWindow, minimizeWindow } = useWindowContext();

  return (
    <div 
      className="flex items-center justify-between px-3 py-2 select-none"
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
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold text-[var(--theme-text)]">{title}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
          className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
          aria-label="Minimize"
        />
        <button 
          onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
          className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"
          aria-label={isMaximized ? "Restore" : "Maximize"}
        />
        <button 
          onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
          className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
          aria-label="Close"
        />
      </div>
    </div>
  );
};
