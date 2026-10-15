// @ts-nocheck
import React, { useRef, useState, useEffect, useId } from 'react';
import styles from './Tabs.module.css';
import { MotionScheduler } from '../../motion/MotionScheduler';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  orientation?: 'horizontal' | 'vertical';
  defaultSelectedId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * <Tabs />
 * Navigation tabs with strict structural constraints and strict translate indicator.
 */
export const Tabs: React.FC<TabsProps> & { metadata: any } = ({
  items,
  orientation = 'horizontal',
  defaultSelectedId,
  onChange,
  className = ''
}) => {
  const [selectedId, setSelectedId] = useState<string>(defaultSelectedId || items[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: 'translate(0,0)', width: 0, height: 0, opacity: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const selectedIndex = items.findIndex(item => item.id === selectedId);

  useEffect(() => {
    const activeTab = tabsRef.current[selectedIndex];
    if (activeTab && tablistRef.current) {
      const tabRect = activeTab.getBoundingClientRect();
      const listRect = tablistRef.current.getBoundingClientRect();

      const offsetLeft = tabRect.left - listRect.left + tablistRef.current.scrollLeft;
      const offsetTop = tabRect.top - listRect.top + tablistRef.current.scrollTop;

      // Notice we are NOT using anime.js scaling. Strictly translate and opacity as per rules.
      setIndicatorStyle({
        transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
        width: tabRect.width,
        height: tabRect.height,
        opacity: 1
      });
    }
  }, [selectedId, selectedIndex, items, orientation]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newIndex = selectedIndex;

    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

    if (e.key === nextKey || (e.ctrlKey && e.key === 'PageDown')) {
      e.preventDefault();
      newIndex = (selectedIndex + 1) % items.length;
      while (items[newIndex].disabled) {
        newIndex = (newIndex + 1) % items.length;
      }
    } else if (e.key === prevKey || (e.ctrlKey && e.key === 'PageUp')) {
      e.preventDefault();
      newIndex = (selectedIndex - 1 + items.length) % items.length;
      while (items[newIndex].disabled) {
        newIndex = (newIndex - 1 + items.length) % items.length;
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = items.length - 1;
    }

    if (newIndex !== selectedIndex && !items[newIndex].disabled) {
      handleSelect(items[newIndex].id);
      tabsRef.current[newIndex]?.focus();
    }
  };

  return (
    <div className={`${styles.tabsContainer} ${styles[orientation]} ${className}`.trim()}>
      <div 
        ref={tablistRef}
        className={styles.tablist} 
        role="tablist" 
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              ref={el => tabsRef.current[index] = el}
              id={`tab-${baseId}-${item.id}`}
              className={styles.tab}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${baseId}-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </button>
          );
        })}
        {/* The active indicator visually binds to the selected tab. */}
        <div 
          className={styles.indicator}
          style={{
            transform: indicatorStyle.transform,
            width: orientation === 'horizontal' ? indicatorStyle.width : 2,
            height: orientation === 'vertical' ? indicatorStyle.height : 2,
            opacity: indicatorStyle.opacity
          }}
        />
      </div>
      
      <div 
        id={`panel-${baseId}-${selectedId}`}
        role="tabpanel"
        className={styles.tabPanel}
        aria-labelledby={`tab-${baseId}-${selectedId}`}
        tabIndex={0}
      >
        {items[selectedIndex]?.content}
      </div>
    </div>
  );
};

Tabs.metadata = {
  material: "System Surface",
  motion: "Translate/Opacity Only",
  elevation: 0,
  accessibility: "AA",
  since: "2.5.3"
};
