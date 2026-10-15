import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { AccessibilityProvider } from '../../providers/AccessibilityProvider';

const meta: Meta<typeof Button> = {
  title: 'Foundation/Button',
  component: Button,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <AccessibilityProvider>
          <div style={{ padding: 50 }}>
            <Story />
          </div>
        </AccessibilityProvider>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger', 'toolbar', 'icon'],
    },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'secondary',
    children: 'Settings',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Save Changes',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete Repository',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Save Changes',
  },
};
