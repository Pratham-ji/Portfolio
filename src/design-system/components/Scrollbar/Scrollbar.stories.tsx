import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Scrollbar } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof Scrollbar> = {
  title: 'Foundation/Scrollbar',
  component: Scrollbar,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ height: 300, width: 300, border: '1px solid var(--pos-surface-2)', margin: 50 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Scrollbar>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 20 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ padding: 10, borderBottom: '1px solid var(--pos-surface-2)', color: 'white' }}>
            Scroll Item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};
