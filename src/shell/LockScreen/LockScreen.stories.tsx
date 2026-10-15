import React from 'react';
import type { Meta } from '@storybook/react';
import { LockScreen } from './index';

const Demo = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Background wallpaper that the lock screen blurs over */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <LockScreen onUnlock={() => console.log('Unlocked!')} />
    </div>
  );
};

const meta: Meta<typeof LockScreen> = {
  title: 'Shell/LockScreen',
  component: Demo,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

export const Default = {};
