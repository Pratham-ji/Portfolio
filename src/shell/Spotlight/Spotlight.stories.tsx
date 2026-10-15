import React from 'react';
import type { Meta } from '@storybook/react';
import { Spotlight } from './index';

const meta: Meta<typeof Spotlight> = {
  title: 'Shell/Spotlight',
  component: Spotlight,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e5e5e5', position: 'relative' }}>
        <p style={{ padding: 24 }}>Press Cmd+K to open Spotlight in this demo (or it may be open by default if rigged).</p>
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
