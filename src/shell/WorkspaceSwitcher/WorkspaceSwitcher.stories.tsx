import React from 'react';
import type { Meta } from '@storybook/react';
import { WorkspaceSwitcher } from './index';

const Demo = () => {
  React.useEffect(() => {
    // Force open for demo
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'ArrowUp' }));
  }, []);

  return <WorkspaceSwitcher />;
};

const meta: Meta<typeof WorkspaceSwitcher> = {
  title: 'Shell/WorkspaceSwitcher',
  component: Demo,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940)', backgroundSize: 'cover', position: 'relative' }}>
        <p style={{ padding: 24, color: 'white' }}>Press Ctrl + Up Arrow to toggle.</p>
        <Story />
      </div>
    )
  ]
};

export default meta;

export const Default = {};
