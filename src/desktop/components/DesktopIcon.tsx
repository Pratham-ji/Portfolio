import React from 'react';
import { DesktopItem } from '../runtime/DesktopItem';
import { DesktopInputRouter } from '../runtime/DesktopInputRouter';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';
import { SystemAppIcon } from '../../design-system/registry/IconRegistry';

interface DesktopIconProps {
  item: DesktopItem;
  isSelected: boolean;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ item, isSelected }) => {
  const handleLaunch = () => {
    if (item.capabilities.execute) {
      ApplicationRegistry.launch(item.id);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: item.position.x,
        top: item.position.y,
        width: 84,
        height: 104,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 'var(--pos-radius-sm, 6px)',
        backgroundColor: isSelected ? 'rgba(10, 132, 255, 0.3)' : 'transparent',
        border: isSelected ? '1px solid rgba(10, 132, 255, 0.5)' : '1px solid transparent',
        cursor: 'default',
        userSelect: 'none',
        outline: 'none',
        transition: 'background-color 0.15s ease'
      }}
      onPointerDown={(e) => DesktopInputRouter.handlePointerDown(e, 'icon', { itemId: item.id })}
      onDoubleClick={handleLaunch}
    >
      <div 
        style={{
          width: 52,
          height: 52,
          marginBottom: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <SystemAppIcon id={item.icon || item.id} size="L" />
      </div>
      <span 
        style={{
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 500,
          textAlign: 'center',
          textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.6)',
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '1px 3px'
        }}
      >
        {item.name}
      </span>
    </div>
  );
};

