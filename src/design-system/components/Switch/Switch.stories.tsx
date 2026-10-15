import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const Demo = () => {
  const [active, setActive] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 24, padding: 50, background: 'var(--pos-surface-0)', color: 'white' }}>
      <Switch checked={active} onChange={setActive} size="sm" aria-label="Small switch" />
      <Switch checked={active} onChange={setActive} size="md" aria-label="Medium switch" />
      <Switch checked={active} onChange={setActive} size="lg" aria-label="Large switch" />
    </div>
  );
};

const meta: Meta<typeof Switch> = {
  title: 'Foundation/Switch',
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
