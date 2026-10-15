import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Foundation/Avatar',
  component: Avatar,
  decorators: [
    (Story: any) => (
      <div style={{ padding: 50, display: 'flex', gap: 16 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', 'away', undefined],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const DefaultImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    alt: 'Profile',
    size: 'lg'
  },
};

export const Initials: Story = {
  args: {
    initials: 'PR',
    size: 'lg'
  },
};

export const StatusVariants: Story = {
  render: () => (
    <>
      <Avatar initials="ON" status="online" />
      <Avatar initials="AW" status="away" />
      <Avatar initials="BZ" status="busy" />
      <Avatar initials="OF" status="offline" />
    </>
  )
};
