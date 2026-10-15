import React from 'react';

export type IconSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type IconWeight = 'Light' | 'Standard' | 'Heavy';

export interface BaseIconProps {
  size?: IconSize;
  weight?: IconWeight;
  className?: string;
  children: React.ReactNode;
}

const sizeMap: Record<IconSize, number> = {
  XS: 16,
  S: 20,
  M: 24,
  L: 32,
  XL: 48
};

export const BaseIcon: React.FC<BaseIconProps> = ({
  size = 'M',
  weight = 'Standard',
  className = '',
  children
}) => {
  const sizeInPx = sizeMap[size];

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={sizeInPx}
      height={sizeInPx}
      aria-hidden="true"
      role="img"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={`icon-weight-${weight.toLowerCase()}`}>
        {children}
      </g>
    </svg>
  );
};
