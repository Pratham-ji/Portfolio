import React, { useState, useEffect } from 'react';
import styles from './PowerMenu.module.css';

// In reality, this opens via the TopBar OS Logo click.
export const PowerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (e: CustomEvent) => setIsOpen(e.detail !== undefined ? e.detail : !isOpen);
    window.addEventListener('toggle-power-menu' as any, handleToggle);
    
    const closeMenu = () => setIsOpen(false);
    window.addEventListener('click', closeMenu);
    
    return () => {
      window.removeEventListener('toggle-power-menu' as any, handleToggle);
      window.removeEventListener('click', closeMenu);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const dispatch = (command: string) => {
    console.log(`CommandRegistry.execute('${command}')`);
    if (command === 'OS_LOCK') {
      window.dispatchEvent(new Event('os-lock'));
    }
  };

  return (
    <div 
      className={styles.menuContainer} 
      onClick={e => e.stopPropagation()}
      role="menu"
    >
      <div className={styles.menuItem} role="menuitem" onClick={() => dispatch('OS_SLEEP')}>Sleep</div>
      <div className={styles.menuItem} role="menuitem" onClick={() => dispatch('OS_RESTART')}>Restart...</div>
      <div className={styles.menuItem} role="menuitem" onClick={() => dispatch('OS_SHUTDOWN')}>Shut Down...</div>
      <div className={styles.divider} />
      <div className={styles.menuItem} role="menuitem" onClick={() => dispatch('OS_LOCK')}>Lock Screen</div>
      <div className={styles.menuItem} role="menuitem" onClick={() => dispatch('OS_LOGOUT')}>Log Out Pratham...</div>
    </div>
  );
};

export default PowerMenu;
