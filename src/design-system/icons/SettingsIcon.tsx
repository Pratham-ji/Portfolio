import React from 'react';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const SettingsIcon: React.FC<Omit<BaseIconProps, 'children' | 'weight'>> = (props) => (
  <BaseIcon weight="Heavy" {...props}>
    {/* Outer Gear Ring */}
    <circle
      cx="512"
      cy="512"
      r="224"
      stroke="currentColor"
      strokeWidth="80"
      fill="none"
    />

    {/* Orthogonal Gear Teeth */}
    <line x1="512" y1="160" x2="512" y2="288" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
    <line x1="512" y1="736" x2="512" y2="864" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
    <line x1="160" y1="512" x2="288" y2="512" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
    <line x1="736" y1="512" x2="864" y2="512" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />

    {/* Diagonal Gear Teeth */}
    <line x1="263" y1="263" x2="353" y2="353" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
    <line x1="671" y1="671" x2="761" y2="761" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
    <line x1="761" y1="263" x2="671" y2="353" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
    <line x1="353" y1="671" x2="263" y2="761" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />

    {/* Inner Precision Hub */}
    <circle
      cx="512"
      cy="512"
      r="112"
      stroke="currentColor"
      strokeWidth="64"
      fill="none"
    />

    {/* The Pratham Signature: Optical Dot at the center of calibration */}
    <circle
      cx="512"
      cy="512"
      r="48"
      fill="#D71921"
    />
  </BaseIcon>
);
