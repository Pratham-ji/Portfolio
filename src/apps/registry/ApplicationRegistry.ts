import { AppContract } from '../shared/AppContract';
import EngineeringHubManifest from '../EngineeringHub';
import { PaperViewerManifest } from '../PaperViewer/manifest';
import { TerminalManifest } from '../terminal/manifest';
import { ExplorerManifest } from '../explorer/manifest';
import { SettingsManifest } from '../settings/manifest';
import { WindowStore } from '../../window-manager/runtime/WindowStore';

export interface LaunchOptions {
  tab?: 'architecture' | 'telemetry' | string;
  bounds?: { x: number; y: number; width: number; height: number };
  [key: string]: any;
}

export class AppRegistry {
  private apps: Map<string, AppContract> = new Map();
  private lastLaunchOptions: Map<string, LaunchOptions> = new Map();

  constructor() {
    this.register(EngineeringHubManifest);
    this.register(PaperViewerManifest);
    this.register(TerminalManifest);
    this.register(ExplorerManifest);
    this.register(SettingsManifest);
  }

  register(app: AppContract) {
    if (this.apps.has(app.metadata.id)) {
      console.warn(`App with ID ${app.metadata.id} is already registered. Overwriting.`);
    }
    this.apps.set(app.metadata.id, app);
    console.log(`Registered App: ${app.metadata.name}`);
  }

  getApp(id: string): AppContract | undefined {
    if (this.apps.has(id)) {
      return this.apps.get(id);
    }
    const cleanId = id.toLowerCase().trim();
    if (['engineering', 'projects', 'skills', 'prathamos.engineering', 'arch', 'architecture', 'telemetry', 'queue'].includes(cleanId)) {
      return this.apps.get('prathamos.engineering');
    }
    if (['paper', 'resume', 'doc', 'viewer', 'prathamos.paper'].includes(cleanId)) {
      return this.apps.get('prathamos.paper');
    }
    if (['terminal', 'cli', 'bash', 'shell', 'prathamos.terminal'].includes(cleanId)) {
      return this.apps.get('prathamos.terminal');
    }
    if (['explorer', 'finder', 'files'].includes(cleanId)) {
      return this.apps.get('explorer');
    }
    if (['settings', 'preferences', 'prathamos.settings'].includes(cleanId)) {
      return this.apps.get('prathamos.settings') || this.apps.get('settings');
    }
    return undefined;
  }

  getAllApps(): AppContract[] {
    return Array.from(this.apps.values());
  }

  getLaunchOptions(appId: string): LaunchOptions | undefined {
    const app = this.getApp(appId);
    return app ? this.lastLaunchOptions.get(app.metadata.id) : this.lastLaunchOptions.get(appId);
  }

  focusOrLaunch(appId: string, options?: LaunchOptions): string | undefined {
    const app = this.getApp(appId);
    if (!app) {
      console.warn(`[ApplicationRegistry] Unknown app to focusOrLaunch: ${appId}`);
      return undefined;
    }
    if (options) {
      this.lastLaunchOptions.set(app.metadata.id, options);
    }

    const existingWindows = WindowStore.getAllWindows();
    const existing = existingWindows.find(w => w.applicationId === app.metadata.id);
    if (existing) {
      if (options?.bounds) {
        WindowStore.updateBoundsInternal(existing.windowId, options.bounds);
      }
      if (existing.state === 'minimized') {
        WindowStore.setWindowState(existing.windowId, 'normal');
      }
      WindowStore.focusWindow(existing.windowId);
      return existing.windowId;
    }

    return this.launch(app.metadata.id, options);
  }

  launch(appId: string, options?: LaunchOptions): string | undefined {
    const app = this.getApp(appId);
    if (!app) {
      console.warn(`[ApplicationRegistry] Cannot launch unknown app: ${appId}`);
      return undefined;
    }
    if (options) {
      this.lastLaunchOptions.set(app.metadata.id, options);
    }
    console.log(`[ApplicationRegistry] Launching ${app.metadata.name}`, options);

    try {
      const existingWindows = WindowStore.getAllWindows();
      if (!app.capabilities.supportsMultipleInstances) {
        const existing = existingWindows.find(w => w.applicationId === app.metadata.id);
        if (existing) {
          if (options?.bounds) {
            WindowStore.updateBoundsInternal(existing.windowId, options.bounds);
          }
          if (existing.state === 'minimized') {
            WindowStore.setWindowState(existing.windowId, 'normal');
          }
          WindowStore.focusWindow(existing.windowId);
          return existing.windowId;
        }
      }

      const windowId = `win-${app.metadata.id.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
      const defaultBounds = options?.bounds || {
        x: Math.max(50, 80 + (existingWindows.length % 6) * 30),
        y: Math.max(50, 60 + (existingWindows.length % 6) * 30),
        width: app.windowDefaults?.preferredSize?.width || 880,
        height: app.windowDefaults?.preferredSize?.height || 680
      };

      WindowStore.addWindow({
        windowId,
        applicationId: app.metadata.id,
        workspaceId: WindowStore.getActiveWorkspace() || 'default',
        title: app.metadata.name,
        icon: app.metadata.icon || 'file-text',
        bounds: defaultBounds,
        state: 'normal',
        focused: true,
        layer: 10,
        visibility: 'VISIBLE',
        capabilities: {
          move: true,
          resize: app.windowDefaults?.isResizable ?? true,
          minimize: app.windowDefaults?.isMinimizable ?? true,
          maximize: app.windowDefaults?.isMaximizable ?? true,
          fullscreen: true,
          snap: true,
          pin: false,
          float: false,
          close: true,
        },
        constraints: {
          minWidth: app.windowDefaults?.minSize?.width || 400,
          minHeight: app.windowDefaults?.minSize?.height || 300
        }
      });
      WindowStore.focusWindow(windowId);
      return windowId;
    } catch (e) {
      console.warn('[ApplicationRegistry] Window creation skipped or headless:', e);
      return undefined;
    }
  }
}

export const ApplicationRegistry = new AppRegistry();
