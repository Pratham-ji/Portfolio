import React from 'react';
import type { Meta } from '@storybook/react';
import { SettingsApp } from '../SettingsApp';

const meta: Meta<typeof SettingsApp> = {
  title: 'Apps/Settings',
  component: SettingsApp,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '850px', height: '600px', padding: 24, backgroundColor: '#e5e5e5' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;

export const Default = {};

export const DarkMode = {
  decorators: [
    (Story: any) => (
      <div data-theme="dark" style={{ width: '850px', height: '600px', padding: 24, backgroundColor: '#111' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <Story />
        </div>
      </div>
    )
  ]
};
