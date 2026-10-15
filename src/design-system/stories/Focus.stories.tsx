import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useFocus } from '../hooks/useFocus';
import { GlassPanel } from '../components/GlassPanel';
import { Button } from '../components/Button';

const FocusDemo = () => {
  const { focusedWindow, focusedPanel, focus, blur } = useFocus();

  return (
    <GlassPanel style={{ padding: 'var(--pos-space-32)', width: 500 }}>
      <h2 style={{ color: 'var(--pos-color-primary)', marginBottom: 'var(--pos-space-16)' }}>Global Focus Manager</h2>
      <p style={{ color: 'var(--pos-color-secondary)', marginBottom: 'var(--pos-space-8)' }}>Focused Window: {focusedWindow || 'None'}</p>
      <p style={{ color: 'var(--pos-color-secondary)', marginBottom: 'var(--pos-space-24)' }}>Focused Panel: {focusedPanel || 'None'}</p>
      
      <div style={{ display: 'flex', gap: 'var(--pos-space-8)', flexWrap: 'wrap' }}>
        <Button onClick={() => focus('terminal')}>Focus Terminal</Button>
        <Button onClick={() => focus('explorer', 'sidebar')}>Focus Explorer Sidebar</Button>
        <Button variant="danger" onClick={blur}>Blur All</Button>
      </div>
    </GlassPanel>
  );
};

const meta: Meta = {
  title: 'Infrastructure/FocusManager',
  component: FocusDemo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
