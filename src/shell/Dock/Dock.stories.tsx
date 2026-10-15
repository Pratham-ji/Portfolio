import React from 'react';
import type { Meta } from '@storybook/react';
import { Dock } from './index';

const meta: Meta<typeof Dock> = {
  title: 'Shell/Dock',
  component: Dock,
  parameters: {
    layout: 'fullscreen',
  },
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

export const DarkMode = {
  decorators: [
    (Story: any) => (
      <div data-theme="dark" style={{ width: '100vw', height: '100vh', backgroundColor: '#111', position: 'relative' }}>
        <Story />
      </div>
    )
  ]
};
