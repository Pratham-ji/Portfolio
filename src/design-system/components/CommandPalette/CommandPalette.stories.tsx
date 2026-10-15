import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { CommandProvider, useCommandContext } from '../../command/CommandProvider';
import { CommandRegistry } from '../../command/CommandRegistry';
import { Button } from '../Button';

const DemoTrigger = () => {
  const { setIsOpen } = useCommandContext();
  
  useEffect(() => {
    // Populate dummy commands
    CommandRegistry.register({ id: '1', title: 'Open Terminal', shortcut: '⌘T', handler: () => console.log('Terminal') });
    CommandRegistry.register({ id: '2', title: 'Toggle Theme', shortcut: '⌘⇧D', handler: () => console.log('Theme') });
    CommandRegistry.register({ id: '3', title: 'New File', shortcut: '⌘N', handler: () => console.log('File') });
    CommandRegistry.pinCommand('1');
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <Button onClick={() => setIsOpen(true)}>Open Command Palette (or Cmd+K)</Button>
      <CommandPalette />
    </div>
  );
};

const meta: Meta<typeof CommandPalette> = {
  title: 'Foundation/CommandPalette',
  component: DemoTrigger,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <CommandProvider>
          <Story />
        </CommandProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = {};
