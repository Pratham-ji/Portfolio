import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from '../providers/ThemeProvider';
import { Button } from '../components/Button';
import { GlassPanel } from '../components/GlassPanel';

const ThemeDemo = () => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <GlassPanel style={{ padding: 'var(--pos-space-32)', width: 400 }}>
      <h2 style={{ color: 'var(--pos-color-primary)', marginBottom: 'var(--pos-space-16)' }}>Theme Engine</h2>
      <p style={{ color: 'var(--pos-color-secondary)', marginBottom: 'var(--pos-space-16)' }}>
        Current: <strong>{theme}</strong> (Resolved: {resolvedTheme})
      </p>
      <div style={{ display: 'flex', gap: 'var(--pos-space-8)' }}>
        <Button onClick={toggleTheme}>Toggle</Button>
        <Button onClick={() => setTheme('system')} variant="ghost">Set System</Button>
      </div>
    </GlassPanel>
  );
};

const meta: Meta = {
  title: 'Infrastructure/ThemeProvider',
  component: ThemeDemo,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
