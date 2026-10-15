import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassPanel } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof GlassPanel> = {
  title: 'Foundation/GlassPanel',
  component: GlassPanel,
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
    variant: {
      control: { type: 'select' },
      options: ['default', 'dynamicContent', 'highContrast'],
    },
    blur: { control: 'number' },
    interactive: { control: 'boolean' }
  },
};

export default meta;
type Story = StoryObj<typeof GlassPanel>;

export const Default: Story = {
  args: {
    variant: 'default',
    interactive: false,
    children: <div style={{ color: 'white', padding: 20 }}>Default Material 01</div>,
    style: { width: 300, height: 200 }
  },
};

export const DynamicContent: Story = {
  args: {
    variant: 'dynamicContent',
    children: <div style={{ color: 'white', padding: 20 }}>Dynamic Content Variant</div>,
    style: { width: 300, height: 200 }
  },
};

export const Interactive: Story = {
  args: {
    variant: 'default',
    interactive: true,
    children: <div style={{ color: 'white', padding: 20 }}>Click Me</div>,
    style: { width: 300, height: 200 }
  },
};
