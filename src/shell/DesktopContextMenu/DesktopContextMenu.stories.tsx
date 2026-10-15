import React from 'react';
import type { Meta } from '@storybook/react';
import { DesktopContextMenu } from './index';

const Demo = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <p style={{ padding: 24 }}>Right-click anywhere to open the context menu.</p>
      <DesktopContextMenu />
    </div>
  );
};

const meta: Meta<typeof DesktopContextMenu> = {
  title: 'Shell/DesktopContextMenu',
  component: Demo,
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e5e5e5', position: 'relative' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

export const Default = {};
