import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof Badge> = {
  title: 'Foundation/Badge',
  component: Badge,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ padding: 50, display: 'flex', gap: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: () => (
    <>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </>
  )
};
