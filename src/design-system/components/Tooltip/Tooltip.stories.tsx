import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';
import { Button } from '../Button';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof Tooltip> = {
  title: 'Foundation/Tooltip',
  component: Tooltip,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ padding: 100, display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    position: 'top',
    content: 'This is a tooltip',
    children: <Button>Hover me (Top)</Button>
  },
};

export const AutoEdgeDetection: Story = {
  args: {
    position: 'auto',
    content: 'I will flip if needed',
    children: <Button>Hover me (Auto)</Button>
  },
};

export const Right: Story = {
  args: {
    position: 'right',
    content: 'On the right side',
    children: <Button>Hover me (Right)</Button>
  },
};
