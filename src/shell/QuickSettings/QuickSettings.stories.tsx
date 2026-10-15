import React from 'react';
import type { Meta } from '@storybook/react';
import { QuickSettings } from './index';

const Demo = () => {
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('toggle-quick-settings', { detail: true }));
  }, []);

  return <QuickSettings />;
};

const meta: Meta<typeof QuickSettings> = {
  title: 'Shell/QuickSettings',
  component: Demo,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940)', backgroundSize: 'cover', position: 'relative' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

export const Default = {};

export const DarkMode = {
  decorators: [
    (Story: any) => (
      <div data-theme="dark" style={{ width: '100vw', height: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940)', backgroundSize: 'cover', position: 'relative' }}>
        <Story />
      </div>
    )
  ]
};
