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
    <div className="w-48 bg-black/20 border-r border-white/5 flex flex-col p-2 gap-1 overflow-y-auto">
      <div className="text-xs font-semibold text-white/50 px-2 pb-1 pt-2 uppercase tracking-wider">
        Quick Access
      </div>
      {navItems.map((item) => {
        const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left
              ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}
            `}
          >
            <Icon size={16} className={isActive ? 'text-blue-400' : 'text-white/50'} />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
