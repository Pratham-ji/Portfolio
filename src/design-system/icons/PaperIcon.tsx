import React from 'react';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const PaperIcon: React.FC<Omit<BaseIconProps, 'children' | 'weight'>> = (props) => (
  <BaseIcon weight="Heavy" {...props}>
    {/* Base Document Outline with Folded Corner */}
    <path
      d="M 256 160 H 608 L 768 320 V 864 H 256 Z"
      stroke="currentColor"
      strokeWidth="80"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Folded Corner Detail */}
    <path
      d="M 608 160 V 320 H 768"
      stroke="currentColor"
      strokeWidth="80"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Document Content Lines */}
    <line
      x1="352"
      y1="448"
      x2="672"
      y2="448"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="round"
    />
    <line
      x1="352"
      y1="576"
      x2="672"
      y2="576"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="round"
    />
    <line
      x1="352"
      y1="704"
      x2="544"
      y2="704"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="round"
    />

    {/* The Pratham Signature: Optical Dot sealing the document */}
    <circle
      cx="640"
      cy="704"
      r="48"
      fill="#D71921"
    />
  </BaseIcon>
);
