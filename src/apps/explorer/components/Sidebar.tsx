import React from 'react';
import { HomeIcon, HardDriveIcon, UserIcon } from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { label: 'Root', path: '/', icon: HardDriveIcon },
  { label: 'Home', path: '/home/pratham', icon: HomeIcon },
  { label: 'Desktop', path: '/home/pratham/Desktop', icon: UserIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  return (
    <div className="ds-sidebar bg-[var(--theme-surface)]">
      <div className="ds-section-header pt-2">
        Quick Access
      </div>
      {navItems.map((item) => {
        const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`ds-sidebar-item ${isActive ? 'active shadow-md' : 'text-[var(--theme-text)]'}`}
          >
            <Icon size={16} className={`${isActive ? 'text-white' : 'text-[var(--theme-accent)] group-hover:scale-110 transition-transform'}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`truncate ${isActive ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
