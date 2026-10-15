import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu, ContextMenuItem } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { Button } from '../Button';

const Demo = () => {
  const [menuConfig, setMenuConfig] = useState<{ x: number, y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuConfig({ x: e.clientX, y: e.clientY });
  };

  const items: (ContextMenuItem | 'separator')[] = [
    { id: 'new-folder', label: 'New Folder', shortcut: '⇧⌘N' },
    { id: 'get-info', label: 'Get Info', shortcut: '⌘I' },
    'separator',
    { id: 'paste', label: 'Paste', disabled: true, shortcut: '⌘V' },
    'separator',
    { id: 'share', label: 'Share', subItems: [] } // subItems mocked for UI
  ];

  return (
    <div 
      onContextMenu={handleContextMenu}
      style={{ width: '100%', height: 600, background: 'var(--pos-surface-0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <p style={{ color: 'var(--pos-color-secondary)' }}>Right click anywhere</p>
      
      {menuConfig && (
        <ContextMenu 
          x={menuConfig.x} 
          y={menuConfig.y} 
          items={items} 
          onClose={() => setMenuConfig(null)} 
        />
      )}
    </div>
  );
};

const meta: Meta<typeof ContextMenu> = {
  title: 'Foundation/ContextMenu',
  component: Demo,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {};
