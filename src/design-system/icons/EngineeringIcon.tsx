import React from 'react';
import { BaseIcon, BaseIconProps } from './BaseIcon';

export const EngineeringIcon: React.FC<Omit<BaseIconProps, 'children' | 'weight'>> = (props) => (
  <BaseIcon weight="Heavy" {...props}>
    {/* Outer Microchip Ceramic Package */}
    <rect
      x="288"
      y="288"
      width="448"
      height="448"
      rx="48"
      stroke="currentColor"
      strokeWidth="80"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Center Silicon Processing Core */}
    <rect
      x="416"
      y="416"
      width="192"
      height="192"
      rx="16"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Top Bus Interconnects */}
    <line x1="384" y1="160" x2="384" y2="288" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="512" y1="160" x2="512" y2="288" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="640" y1="160" x2="640" y2="288" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />

    {/* Bottom Bus Interconnects */}
    <line x1="384" y1="736" x2="384" y2="864" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="512" y1="736" x2="512" y2="864" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="640" y1="736" x2="640" y2="864" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />

    {/* Left Bus Interconnects */}
    <line x1="160" y1="384" x2="288" y2="384" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="160" y1="512" x2="288" y2="512" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="160" y1="640" x2="288" y2="640" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />

    {/* Right Bus Interconnects */}
    <line x1="736" y1="384" x2="864" y2="384" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="736" y1="512" x2="864" y2="512" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />
    <line x1="736" y1="640" x2="864" y2="640" stroke="currentColor" strokeWidth="64" strokeLinecap="round" />

    {/* The Pratham Signature: Optical Dot at the heart of the processor */}
    <circle
      cx="512"
      cy="512"
      r="48"
      fill="#D71921"
    />
  </BaseIcon>
);
