import React, { KeyboardEvent } from 'react';

export interface DesktopIconProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onSelect: (id: string, multi: boolean) => void;
  onDoubleClick: (id: string) => void;
}

/**
 * Individual desktop icon.
 */
export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  name,
  icon,
  isSelected,
  onSelect,
  onDoubleClick
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id, e.ctrlKey || e.metaKey);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick(id);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onDoubleClick(id);
    } else if (e.key === ' ') {
      e.preventDefault();
      onSelect(id, e.ctrlKey || e.metaKey);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={name}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      className={`
        flex flex-col items-center justify-start w-20 h-24 p-1 m-1 rounded-sm
        cursor-default select-none border border-transparent outline-none
        transition-colors duration-100 ease-in-out
        ${isSelected ? 'bg-white/20 border-white/30 backdrop-blur-sm' : 'hover:bg-white/10 hover:border-white/20'}
        focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]
      `}
    >
      <div className="w-12 h-12 mb-1 flex items-center justify-center text-3xl drop-shadow-md">
        {/* Replace with actual Lucide icons dynamically later, using emoji for MVP structure */}
        {icon || '📄'}
      </div>
      <span className="text-xs text-center text-white drop-shadow-md line-clamp-2 leading-tight px-1 rounded-sm">
        {name}
      </span>
    </div>
  );
};
