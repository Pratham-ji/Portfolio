import React from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopGrid } from './DesktopGrid';

/**
 * The main Desktop container.
 * Sits below windows and houses the wallpaper and icons.
 */
export const Desktop: React.FC = () => {
  return (
    <main 
      className="absolute inset-0 overflow-hidden w-full h-full select-none"
      aria-label="Desktop Environment"
    >
      <Wallpaper />
      <DesktopGrid />
    </main>
  );
};
