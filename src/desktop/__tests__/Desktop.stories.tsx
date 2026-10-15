import React from 'react';
import type { Meta } from '@storybook/react';
import { DesktopCanvas } from '../DesktopCanvas';
import { WorkspaceProvider } from '../WorkspaceProvider';
import { WindowProvider } from '../../window-manager/renderer/WindowProvider';

const DesktopDemo = () => {
  return (
    <DesktopCanvas />
  );
};

const meta: Meta = {
  title: 'OS/DesktopCanvas',
  component: DesktopDemo,
  decorators: [
    (Story: any) => (
      <WindowProvider>
        <WorkspaceProvider>
          <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Story />
          </div>
        </WorkspaceProvider>
      </WindowProvider>
    )
  ]
};

export default meta;

export const DefaultDesktop = {};
