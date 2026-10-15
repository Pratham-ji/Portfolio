import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Paper } from './index';
import { ThemeProvider } from '../../providers/ThemeProvider';

const meta: Meta<typeof Paper> = {
  title: 'Foundation/Paper',
  component: Paper,
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ padding: 50, background: 'var(--pos-surface-0)', minHeight: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['resume', 'markdown', 'blueprint', 'ebook'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Markdown: Story = {
  args: {
    mode: 'markdown',
    children: (
      <>
        <h1>Architecture Overview</h1>
        <p>This document describes the core architecture of the system.</p>
        <p>You can execute commands via <code>CommandRegistry.execute(id)</code>.</p>
      </>
    )
  },
};

export const Resume: Story = {
  args: {
    mode: 'resume',
    children: (
      <>
        <h1 style={{ textAlign: 'center', marginTop: 0 }}>Pratham</h1>
        <p style={{ textAlign: 'center', color: 'var(--pos-color-secondary)' }}>Staff Software Engineer</p>
        <hr style={{ border: 'none', borderTop: '1px solid var(--pos-paper-border)' }} />
        <h2>Experience</h2>
        <p><strong>Google</strong> - Frontend Architect</p>
      </>
    )
  },
};
