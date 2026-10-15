import React from 'react';
import type { Meta } from '@storybook/react';
import { PowerMenu } from './index';

const Demo = () => {
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('toggle-power-menu', { detail: true }));
  }, []);

  return <PowerMenu />;
};

const meta: Meta<typeof PowerMenu> = {
  title: 'Shell/PowerMenu',
  component: Demo,
  decorators: [
    (Story: any) => (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e5e5e5', position: 'relative', paddingTop: 40 }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

export const Default = {};
