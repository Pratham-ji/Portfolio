import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { Button } from '../Button';

const Demo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [density, setDensity] = useState<'compact' | 'comfortable' | 'expanded'>('comfortable');

  return (
    <div style={{ display: 'flex', height: 400, border: '1px solid var(--pos-surface-4)' }}>
      <Sidebar isCollapsed={collapsed} density={density}>
        <div style={{ padding: 16, color: 'white' }}>
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Projects</li>
            <li>Settings</li>
          </ul>
        </div>
      </Sidebar>
      <div style={{ flex: 1, padding: 16, display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button onClick={() => setCollapsed(!collapsed)}>Toggle Sidebar</Button>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => setDensity('compact')}>Compact</Button>
          <Button onClick={() => setDensity('comfortable')}>Comfortable</Button>
          <Button onClick={() => setDensity('expanded')}>Expanded</Button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof Sidebar> = {
  title: 'Foundation/Sidebar',
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
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
