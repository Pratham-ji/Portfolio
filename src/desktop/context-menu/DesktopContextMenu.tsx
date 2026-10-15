import React from 'react';
// import { ContextMenu } from '../../design-system/components/ContextMenu';
// import { CommandRegistry } from '../../design-system/command/CommandRegistry';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({ x, y, onClose }) => {
  // Mock implementations for the ContextMenu consumer.
  // In a real environment, this emits typed commands to CommandRegistry.

  const executeCommand = (command: string) => {
    console.log(`Executing Desktop Command: ${command}`);
    // CommandRegistry.execute(command);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'absolute',
        left: x,
        top: y,
        backgroundColor: 'var(--pos-surface-0)',
        border: '1px solid var(--pos-border-subtle)',
        borderRadius: 'var(--pos-radius-md)',
        padding: '4px 0',
        minWidth: 160,
        boxShadow: 'var(--pos-shadow-menu)',
        zIndex: 10000 // Handled by LayerManager in future
      }}
    >
      <ContextMenuItem label="New Folder" onClick={() => executeCommand('NEW_FOLDER')} />
      <ContextMenuItem label="Refresh" onClick={() => executeCommand('REFRESH')} />
      <div style={{ height: 1, backgroundColor: 'var(--pos-border-subtle)', margin: '4px 0' }} />
      <ContextMenuItem label="Change Wallpaper" onClick={() => executeCommand('CHANGE_WALLPAPER')} />
      <ContextMenuItem label="Settings" onClick={() => executeCommand('OPEN_SETTINGS')} />
      {process.env.NODE_ENV === 'development' && (
        <>
          <div style={{ height: 1, backgroundColor: 'var(--pos-border-subtle)', margin: '4px 0' }} />
          <ContextMenuItem label="Inspect" onClick={() => executeCommand('INSPECT')} />
        </>
      )}
    </div>
  );
};

const ContextMenuItem: React.FC<{ label: string, onClick: () => void }> = ({ label, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      padding: '6px 16px',
      fontSize: '13px',
      color: 'var(--pos-text-primary)',
      cursor: 'pointer',
      userSelect: 'none'
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--pos-surface-1)'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
  >
    {label}
  </div>
);
