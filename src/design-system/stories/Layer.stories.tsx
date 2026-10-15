import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useLayer } from '../hooks/useLayer';
import { GlassPanel } from '../components/GlassPanel';
import { Button } from '../components/Button';

const Window = ({ id, color, defaultX, defaultY }: any) => {
  const { zIndex, bringToFront } = useLayer(id);
  
  return (
    <GlassPanel 
      onClick={bringToFront}
      style={{ 
        position: 'absolute', 
        left: defaultX, 
        top: defaultY, 
        width: 300, 
        height: 200, 
        zIndex,
        background: color,
        cursor: 'pointer',
        padding: 'var(--pos-space-16)'
      }}
    >
      <h3 style={{ color: 'white' }}>Window: {id}</h3>
      <p style={{ color: 'white' }}>Z-Index: {zIndex}</p>
      <Button variant="ghost" onClick={(e) => { e.stopPropagation(); bringToFront(); }}>Bring to Front</Button>
    </GlassPanel>
  );
};

const LayerDemo = () => {
  return (
    <div style={{ position: 'relative', height: 600, width: '100%', background: 'var(--pos-surface-0)' }}>
      <Window id="win1" color="rgba(10, 132, 255, 0.8)" defaultX={50} defaultY={50} />
      <Window id="win2" color="rgba(215, 25, 33, 0.8)" defaultX={150} defaultY={100} />
      <Window id="win3" color="rgba(48, 209, 88, 0.8)" defaultX={250} defaultY={150} />
    </div>
  );
};

const meta: Meta = {
  title: 'Infrastructure/LayerManager',
  component: LayerDemo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
