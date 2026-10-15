import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '../providers/PlatformProvider';
import { usePlatform } from '../hooks/usePlatform';
import { GlassPanel } from '../components/GlassPanel';

const PlatformDemo = () => {
  const platform = usePlatform();

  return (
    <GlassPanel style={{ padding: 'var(--pos-space-32)', width: 400 }}>
      <h2 style={{ color: 'var(--pos-color-primary)', marginBottom: 'var(--pos-space-16)' }}>Platform Engine</h2>
      <pre style={{ color: 'var(--pos-color-primary)', background: 'var(--pos-surface-1)', padding: 'var(--pos-space-16)' }}>
        {JSON.stringify(platform, null, 2)}
      </pre>
    </GlassPanel>
  );
};

const meta: Meta = {
  title: 'Infrastructure/PlatformProvider',
  component: PlatformDemo,
  decorators: [
    (Story: any) => (
      <PlatformProvider>
        <Story />
      </PlatformProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
