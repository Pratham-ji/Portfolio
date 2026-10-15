import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Splitter } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const SplitterDemo = ({ orientation }: { orientation: 'horizontal' | 'vertical' }) => {
  const [size, setSize] = useState(200);

  const handleResize = (delta: number) => {
    setSize(prev => prev + delta);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: orientation === 'vertical' ? 'row' : 'column',
      width: 600, 
      height: 400, 
      background: 'var(--pos-surface-0)',
      border: '1px solid var(--pos-surface-2)'
    }}>
      <div style={{ 
        [orientation === 'vertical' ? 'width' : 'height']: size,
        background: 'var(--pos-surface-1)' 
      }}>
        <div style={{ padding: 20, color: 'white' }}>Panel A</div>
      </div>
      <Splitter orientation={orientation} onResize={handleResize} />
      <div style={{ flex: 1, background: 'var(--pos-surface-2)' }}>
        <div style={{ padding: 20, color: 'white' }}>Panel B</div>
      </div>
    </div>
  );
};

const meta: Meta<typeof Splitter> = {
  title: 'Foundation/Splitter',
  component: SplitterDemo,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Splitter>;

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};
