import React from 'react';
import {
  Palette,
  Image,
  Monitor,
  Accessibility,
  Volume2,
  Code,
  Info,
  Search,
  X
} from 'lucide-react';
import styles from '../Settings.module.css';
import {
  SettingsStore,
  SettingItem,
  getWallpaperGradient
} from '../store/SettingsStore';
import { SoundEngine } from '../../../design-system/audio/SoundEngine';

// ============================================================================
// CATEGORY ICON MAPPER
// ============================================================================

const renderCategoryIcon = (iconName: string, size = 18) => {
  switch (iconName) {
    case 'palette':
      return <Palette size={size} />;
    case 'image':
      return <Image size={size} />;
    case 'monitor':
      return <Monitor size={size} />;
    case 'accessibility':
      return <Accessibility size={size} />;
    case 'volume-2':
      return <Volume2 size={size} />;
    case 'code':
      return <Code size={size} />;
    case 'info':
      return <Info size={size} />;
    default:
      return <Palette size={size} />;
  }
};

// ============================================================================
// HIGHLIGHT TEXT (for instant search matches)
// ============================================================================

export const HighlightText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={index} className={styles.highlight}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

// ============================================================================
// SIDEBAR
// ============================================================================

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <aside className={styles.sidebar} aria-label="Settings Categories">
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Settings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search Settings"
        />
        {searchQuery.trim().length > 0 && (
          <button
            type="button"
            className={styles.clearSearchButton}
            onClick={() => setSearchQuery('')}
            aria-label="Clear Search"
          >
            <X size={12} />
          </button>
        )}
      </div>

      <nav className={styles.categoryList} role="menu">
        {SettingsStore.categories.map((cat) => {
          const isActive = activeCategory === cat.id && !searchQuery.trim();
          return (
            <div
              key={cat.id}
              role="menuitem"
              tabIndex={0}
              className={`${styles.categoryItem} ${isActive ? styles.active : ''}`}
              onClick={() => {
                setSearchQuery('');
                onSelectCategory(cat.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSearchQuery('');
                  onSelectCategory(cat.id);
                }
              }}
            >
              <span className={styles.categoryIcon}>
                {renderCategoryIcon(cat.icon, 16)}
              </span>
              <span className={styles.categoryLabel}>{cat.title}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

// ============================================================================
// ABOUT SECTION
// ============================================================================

export const AboutSection: React.FC<{ onResetSettings?: () => void }> = ({ onResetSettings }) => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <div className={styles.aboutLogo}>
          <span className={styles.logoGlyph}>⌘</span>
        </div>
        <h3 className={styles.aboutTitle}>PrathamOS</h3>
        <div className={styles.aboutBadge}>Version 3.2 (Anodized Void)</div>
      </div>

      <div className={styles.specCard}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Architect</span>
          <span className={styles.specValue}>Prathamraj Giri</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Kernel</span>
          <span className={styles.specValue}>Hybrid rAF / 60FPS Window Compositor</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Runtime</span>
          <span className={styles.specValue}>React 19 + TypeScript 5.x + Vite</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Design System</span>
          <span className={styles.specValue}>Anodized Void &amp; Liquid Glass</span>
        </div>
      </div>

      {onResetSettings && (
        <div className={styles.aboutActions}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onResetSettings}
          >
            Reset All Settings to Defaults
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PAGE RENDERER
// ============================================================================

interface PageRendererProps {
  category: string;
  isSearching: boolean;
  searchResults?: SettingItem[];
  searchQuery?: string;
  onSettingChange: (id: string, value: any) => void;
  onResetSettings?: () => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  category,
  isSearching,
  searchResults = [],
  searchQuery = '',
  onSettingChange,
  onResetSettings
}) => {
  const currentCategory = SettingsStore.categories.find((c) => c.id === category);

  // If viewing About category and not in search mode
  if (!isSearching && category === 'about') {
    return (
      <div className={styles.pageContent}>
        <header className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>About PrathamOS</h2>
          <p className={styles.pageDescription}>
            System specifications, kernel architecture, and environment diagnostics.
          </p>
        </header>
        <AboutSection onResetSettings={onResetSettings} />
      </div>
    );
  }

  const itemsToRender: SettingItem[] = isSearching
    ? searchResults
    : SettingsStore.getByCategory(category);

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>
          {isSearching ? 'Search Results' : currentCategory?.title}
        </h2>
        {isSearching ? (
          <p className={styles.pageDescription}>
            {itemsToRender.length === 1
              ? '1 matching setting found'
              : `${itemsToRender.length} matching settings found`}
          </p>
        ) : (
          <p className={styles.pageDescription}>{currentCategory?.description}</p>
        )}
      </header>

      <div className={styles.settingsList}>
        {itemsToRender.map((item) => {
          const isVertical = item.type === 'wallpaper-grid';

          return (
            <div
              key={item.id}
              className={`${styles.settingRow} ${isVertical ? styles.settingRowVertical : ''}`}
            >
              <div className={styles.settingInfo}>
                <div className={styles.settingTitle}>
                  {isSearching ? (
                    <HighlightText text={item.title} query={searchQuery} />
                  ) : (
                    item.title
                  )}
                </div>
                {item.description && (
                  <div className={styles.settingDescription}>
                    {isSearching ? (
                      <HighlightText text={item.description} query={searchQuery} />
                    ) : (
                      item.description
                    )}
                  </div>
                )}
                {isSearching && (
                  <div className={styles.settingContext}>in {item.categoryId}</div>
                )}
              </div>

              <div className={styles.settingControl}>
                {/* TOGGLE */}
                {item.type === 'toggle' && (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(item.value)}
                    aria-label={item.title}
                    className={`${styles.toggleSwitch} ${
                      item.value ? styles.toggleActive : ''
                    }`}
                    onClick={() => {
                      SoundEngine.playSwitchClick();
                      onSettingChange(item.id, !item.value);
                    }}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                )}

                {/* SELECT (SEGMENTED CONTROL) */}
                {item.type === 'select' && item.options && (
                  <div
                    className={styles.selectGroup}
                    role="group"
                    aria-label={item.title}
                  >
                    {item.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`${styles.selectOption} ${
                          item.value === opt.value ? styles.selectActive : ''
                        }`}
                        onClick={() => onSettingChange(item.id, opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* COLOR PICKER */}
                {item.type === 'color-picker' && item.colors && (
                  <div
                    className={styles.colorPicker}
                    role="radiogroup"
                    aria-label={item.title}
                  >
                    {item.colors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={item.value === c.id}
                        aria-label={c.label}
                        title={c.label}
                        className={`${styles.colorDot} ${
                          item.value === c.id ? styles.colorSelected : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => onSettingChange(item.id, c.id)}
                      />
                    ))}
                  </div>
                )}

                {/* WALLPAPER GRID */}
                {item.type === 'wallpaper-grid' && item.wallpapers && (
                  <div
                    className={styles.wallpaperGrid}
                    role="radiogroup"
                    aria-label={item.title}
                  >
                    {item.wallpapers.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        role="radio"
                        aria-checked={item.value === w.id}
                        aria-label={w.name}
                        title={w.name}
                        className={`${styles.wallpaperCard} ${
                          item.value === w.id ? styles.wallpaperSelected : ''
                        }`}
                        onClick={() => onSettingChange(item.id, w.id)}
                      >
                        <div
                          className={styles.wallpaperThumb}
                          style={{ background: getWallpaperGradient(w.id) }}
                        />
                        <span className={styles.wallpaperName}>{w.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {itemsToRender.length === 0 && (
          <div className={styles.emptyState}>No settings found</div>
        )}
      </div>
    </div>
  );
};
