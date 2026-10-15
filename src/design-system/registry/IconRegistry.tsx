import React from 'react';

/**
 * ==========================================================================
 * PRATHAMOS v3.2 — ICON REGISTRY
 * ==========================================================================
 * Centralized registry for resolving vector icons.
 * Enforces zero direct imports in UI components.
 */

export type IconIdentifier = string;

class IconRegistrySingleton {
  private registry: Map<IconIdentifier, React.ElementType> = new Map();

  /**
   * Register a new icon component.
   */
  public register(id: IconIdentifier, component: React.ElementType): void {
    if (this.registry.has(id)) {
      console.warn(`[IconRegistry] Overwriting existing icon: ${id}`);
    }
    this.registry.set(id, component);
  }

  /**
   * Retrieve a registered icon component. Returns null if not found.
   */
  public get(id: IconIdentifier): React.ElementType | null {
    const component = this.registry.get(id);
    if (!component) {
      console.error(`[IconRegistry] Icon not found: ${id}`);
      return null;
    }
    return component;
  }
}

export const IconRegistry = new IconRegistrySingleton();

import { TerminalIcon } from '../icons/TerminalIcon';
import { ExplorerIcon } from '../icons/ExplorerIcon';
import { EngineeringIcon } from '../icons/EngineeringIcon';
import { PaperIcon } from '../icons/PaperIcon';
import { SettingsIcon } from '../icons/SettingsIcon';
import { IconSize } from '../icons/BaseIcon';

// Pre-register core OS application icons
IconRegistry.register('terminal', TerminalIcon);
IconRegistry.register('prathamos.terminal', TerminalIcon);
IconRegistry.register('cli', TerminalIcon);

IconRegistry.register('explorer', ExplorerIcon);
IconRegistry.register('finder', ExplorerIcon);
IconRegistry.register('files', ExplorerIcon);

IconRegistry.register('engineering', EngineeringIcon);
IconRegistry.register('prathamos.engineering', EngineeringIcon);
IconRegistry.register('cpu', EngineeringIcon);

IconRegistry.register('paper', PaperIcon);
IconRegistry.register('prathamos.paper', PaperIcon);
IconRegistry.register('resume', PaperIcon);
IconRegistry.register('doc', PaperIcon);

IconRegistry.register('settings', SettingsIcon);
IconRegistry.register('prathamos.settings', SettingsIcon);
IconRegistry.register('preferences', SettingsIcon);

export interface SystemAppIconProps {
  id: string;
  size?: IconSize;
  className?: string;
  style?: React.CSSProperties;
}

export const SystemAppIcon: React.FC<SystemAppIconProps> = ({ id, size = 'M', className, style }) => {
  const cleanId = id.toLowerCase().trim();
  const IconComponent = IconRegistry.get(cleanId) || 
    (cleanId.includes('terminal') ? TerminalIcon :
     cleanId.includes('paper') || cleanId.includes('resume') ? PaperIcon :
     cleanId.includes('engineering') || cleanId.includes('queue') ? EngineeringIcon :
     cleanId.includes('setting') ? SettingsIcon :
     cleanId.includes('explorer') || cleanId.includes('finder') ? ExplorerIcon : null);

  if (!IconComponent) {
    return <TerminalIcon size={size} className={className} />;
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <IconComponent size={size} className={className} />
    </div>
  );
};
