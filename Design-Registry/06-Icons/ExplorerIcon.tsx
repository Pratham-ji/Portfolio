import React from 'react';

export const ExplorerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* 
      Live Grid: 640x640 
      Base Padding: 192px
      Visual Offset: Y shifted UP by 24px (Center Y = 488, Live Y = 168 to 808)
    */}
    <defs>
      <mask id="explorer-mask">
        {/* Base mask allowing everything to be visible */}
        <rect x="0" y="0" width="1024" height="1024" fill="white" />
        
        {/* 
          The Pratham Signature: 48px Negative-Space Diagonal Air Channel 
          Created by masking out the exact stroke of the top plate, but heavily thickened.
          Original stroke: 96px. 
          New mask stroke: 96 + (48px gap * 2) = 192px.
          The round linejoin perfectly expands the mask radius at the corners.
        */}
        <rect
          x="352"
          y="168"
          width="480"
          height="480"
          fill="none"
          stroke="black"
          strokeWidth="192"
          strokeLinejoin="round"
        />
      </mask>
    </defs>

    {/* Bottom Underlying Plate */}
    <rect
      x="192"
      y="328"
      width="480"
      height="480"
      fill="none"
      stroke="currentColor"
      strokeWidth="96"
      strokeLinecap="butt"
      strokeLinejoin="round"
      mask="url(#explorer-mask)"
    />

    {/* Top Overlapping Plate */}
    <rect
      x="352"
      y="168"
      width="480"
      height="480"
      fill="none"
      stroke="currentColor"
      strokeWidth="96"
      strokeLinecap="butt"
      strokeLinejoin="round"
    />
  </svg>
);
