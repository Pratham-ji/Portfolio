import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof Tabs> = {
  title: 'Foundation/Tabs',
  component: Tabs,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ padding: 50, background: 'var(--pos-surface-0)', color: 'white', minHeight: 400 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const mockItems = [
  { id: '1', label: 'General', content: <div>General Settings Content</div> },
  { id: '2', label: 'Appearance', content: <div>Appearance Settings Content</div> },
  { id: '3', label: 'Network', content: <div>Network Config</div>, disabled: true },
  { id: '4', label: 'Advanced', content: <div>Advanced Options</div> }
];

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: mockItems
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    items: mockItems
  },
};
