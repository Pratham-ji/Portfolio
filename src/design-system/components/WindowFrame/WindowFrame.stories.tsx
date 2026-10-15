import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WindowFrame } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof WindowFrame> = {
  title: 'Foundation/WindowFrame',
  component: WindowFrame,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ background: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe) center/cover', padding: 50, height: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof WindowFrame>;

export const Default: Story = {
  args: {
    id: 'story-win-1',
    title: 'Terminal',
    style: { width: 600, height: 400 },
    children: (
      <div style={{ padding: 'var(--pos-space-16)', color: 'var(--pos-color-primary)' }}>
        Welcome to PrathamOS Terminal.
      </div>
    )
  },
};
