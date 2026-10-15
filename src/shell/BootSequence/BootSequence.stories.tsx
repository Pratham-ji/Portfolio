import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { BootSequence } from './index';

const Demo = () => {
  const [key, setKey] = useState(0);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#1a1a1a' }}>
      <button 
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 100000 }}
        onClick={() => setKey(k => k + 1)}
      >
        Replay Boot
      </button>
      <BootSequence key={key} onComplete={() => console.log('Boot completed')} />
    </div>
  );
};

const meta: Meta<typeof BootSequence> = {
  title: 'Shell/BootSequence',
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
