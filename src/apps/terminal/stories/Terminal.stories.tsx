import React from 'react';
import type { Meta } from '@storybook/react';
import { TerminalApp } from '../TerminalApp';

const meta: Meta<typeof TerminalApp> = {
  title: 'Apps/Terminal',
  component: TerminalApp,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '800px', height: '600px', padding: 24, backgroundColor: '#e5e5e5' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;

export const Default = {};
