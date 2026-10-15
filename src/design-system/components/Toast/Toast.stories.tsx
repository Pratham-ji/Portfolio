import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastContainer, toast } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { Button } from '../Button';

const Demo = () => {
  return (
    <div style={{ height: 400, padding: 50 }}>
      <ToastContainer />
      <div style={{ display: 'flex', gap: 16 }}>
        <Button onClick={() => toast.show('System Update', 'A new update is ready to install.', 4000)}>
          Show Toast
        </Button>
        <Button onClick={() => toast.show('Error', 'Connection lost.', 0)} variant="danger">
          Show Persistent Error
        </Button>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Foundation/Toast',
  component: Demo,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
