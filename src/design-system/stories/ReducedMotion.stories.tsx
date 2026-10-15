import React, { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AccessibilityProvider } from '../providers/AccessibilityProvider';
import { MotionScheduler } from '../motion/MotionScheduler';
import { Button } from '../components/Button';
import { GlassPanel } from '../components/GlassPanel';

const MotionDemo = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  const triggerAnimation = () => {
    if (boxRef.current) {
      MotionScheduler.schedule({
        targets: boxRef.current,
        translateX: [0, 200],
        scale: [1, 1.2],
        opacity: [0.5, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  return (
    <GlassPanel style={{ padding: 'var(--pos-space-32)', width: 600 }}>
      <h2 style={{ color: 'var(--pos-color-primary)', marginBottom: 'var(--pos-space-16)' }}>Reduced Motion Scheduling</h2>
      <p style={{ color: 'var(--pos-color-secondary)', marginBottom: 'var(--pos-space-16)' }}>
        If your OS has reduced motion enabled, the scheduler will automatically strip the translation/scaling and downgrade this to a 120ms fade.
      </p>
      <Button onClick={triggerAnimation} style={{ marginBottom: 'var(--pos-space-24)' }}>Trigger Animation</Button>
      
      <div 
        ref={boxRef} 
        style={{ width: 100, height: 100, background: 'var(--pos-accent-brand)', borderRadius: 'var(--pos-radius-md)' }} 
      />
    </GlassPanel>
  );
};

const meta: Meta = {
  title: 'Infrastructure/MotionScheduler',
  component: MotionDemo,
  decorators: [
    (Story: any) => (
      <AccessibilityProvider>
        <Story />
      </AccessibilityProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
