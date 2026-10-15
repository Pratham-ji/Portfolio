// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import styles from './DesktopContextMenu.module.css';

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}

export const DesktopContextMenu: React.FC = () => {
  const [state, setState] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'New Folder', action: 'OS_CREATE_FOLDER' },
    { label: 'Sort By', hasSubmenu: true },
    { label: 'Clean Up', action: 'OS_CLEAN_UP_DESKTOP' },
    { divider: true },
    { label: 'Change Wallpaper', action: 'OS_OPEN_SETTINGS', payload: { section: 'wallpaper' } }
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Ideally only fires if target is the desktop canvas background
      e.preventDefault();
      
      let x = e.clientX;
      let y = e.clientY;

      // Viewport collision handling (mock, as we don't know the rendered size yet, assume 200x200 menu)
      const menuWidth = 200;
      const menuHeight = 200;
      
      if (x + menuWidth > window.innerWidth) x -= menuWidth;
      if (y + menuHeight > window.innerHeight) y -= menuHeight;

      setState({ isOpen: true, x, y });
      setSelectedIndex(0);
    };

    const handleClick = () => setState(prev => ({ ...prev, isOpen: false }));

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (!state.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setState(prev => ({ ...prev, isOpen: false }));
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => {
          let next = prev + 1;
          if (next < menuItems.length && menuItems[next].divider) next++;
          return next < menuItems.length ? next : prev;
        });
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => {
          let next = prev - 1;
          if (next >= 0 && menuItems[next].divider) next--;
          return next >= 0 ? next : prev;
        });
        e.preventDefault();
      } else if (e.key === 'Enter') {
        const item = menuItems[selectedIndex];
        if (item && item.action) {
          console.log(`CommandRegistry.execute('${item.action}')`);
          setState(prev => ({ ...prev, isOpen: false }));
        }
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, selectedIndex, menuItems]);

  if (!state.isOpen) return null;

  return (
    <div 
      className={styles.overlay} 
      onContextMenu={e => { e.preventDefault(); setState(prev => ({ ...prev, isOpen: false })); }}
    >
      <div 
        ref={menuRef}
        className={styles.menuContainer}
        style={{ left: state.x, top: state.y }}
        role="menu"
      >
        {menuItems.map((item, i) => (
          item.divider ? (
            <div key={`div-${i}`} className={styles.divider} />
          ) : (
            <div 
              key={item.label}
              className={`${styles.menuItem} ${selectedIndex === i ? styles.selected : ''}`}
              role="menuitem"
              onMouseEnter={() => setSelectedIndex(i)}
              onClick={() => {
                if (item.action) {
                  console.log(`CommandRegistry.execute('${item.action}')`);
                }
              }}
            >
              <span>{item.label}</span>
              {item.hasSubmenu && <span>▶</span>}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default DesktopContextMenu;
