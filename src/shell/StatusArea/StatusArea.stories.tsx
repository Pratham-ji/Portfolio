import React from 'react';
import type { Meta } from '@storybook/react';
import { StatusArea } from './index';

const meta: Meta<typeof StatusArea> = {
  title: 'Shell/StatusArea',
  component: StatusArea,
  decorators: [
    (Story: any) => (
      <div style={{ padding: '24px', backgroundColor: '#e5e5e5', display: 'flex', height: 32 }}>
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
      <div data-theme="dark" style={{ padding: '24px', backgroundColor: '#111', color: '#fff', display: 'flex', height: 32 }}>
        <Story />
      </div>
    )
  ]
};
