import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalVariant } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { Button } from '../Button';

const Demo = ({ variant }: { variant: ModalVariant }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: 50, height: 400, background: 'var(--pos-surface-0)' }}>
      <Button onClick={() => setIsOpen(true)}>Open {variant} Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant={variant}>
        <div style={{ padding: 24, color: 'white' }}>
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setIsOpen(false)} variant="primary">Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'Foundation/Modal',
  component: Demo,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dialog', 'sheet', 'popover', 'fullscreen'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Dialog: Story = { args: { variant: 'dialog' } };
export const Sheet: Story = { args: { variant: 'sheet' } };
export const Fullscreen: Story = { args: { variant: 'fullscreen' } };
