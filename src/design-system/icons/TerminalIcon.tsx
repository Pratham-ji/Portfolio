import React from 'react';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const TerminalIcon: React.FC<Omit<BaseIconProps, 'children' | 'weight'>> = (props) => (
  <BaseIcon weight="Heavy" {...props}>
    {/* 
      Live Grid: 640x640 
      Base Padding: 192px
      Visual Offset: Y shifted UP by 16px (Center Y = 496, Live Y = 176 to 816)
    */}
    
    {/* Baseline Horizontal Bar */}
    <line
      x1="192"
      y1="768"
      x2="832"
      y2="768"
      stroke="currentColor"
      strokeWidth="96"
      strokeLinecap="butt"
      strokeLinejoin="round"
    />
    
    {/* Vertical Laser Beam Cursor */}
    <line
      x1="512"
      y1="224"
      x2="512"
      y2="576"
      stroke="currentColor"
      strokeWidth="96"
      strokeLinecap="butt"
      strokeLinejoin="round"
    />
    
    {/* 
      The Pratham Signature: Optical Dot 
      Exact 48px gap from the baseline bar (768 - 48 [stroke-half] - 48 [gap] = 672 bottom edge)
      Dot radius is 48px, so center is 624.
      This seamlessly fuses with the bottom of the vertical line at Y=576.
    */}
    <circle
      cx="512"
      cy="624"
      r="48"
      fill="#D71921"
    />
  </BaseIcon>
);
