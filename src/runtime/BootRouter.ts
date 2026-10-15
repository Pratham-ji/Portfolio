import { ApplicationRegistry } from '../apps/registry/ApplicationRegistry';
import { PaperViewerStore } from '../apps/PaperViewer/store/PaperViewerStore';
import { TerminalCommands } from '../apps/terminal/runtime/TerminalCommands';
import { registerAllCommands } from '../apps/terminal/commands';
import { SettingsStore } from '../apps/settings/store/SettingsStore';
import { RecruiterDirectorController } from '../shell/RecruiterDirector';
import { WindowStore } from '../window-manager/runtime/WindowStore';

export interface BootConfig {
  mode: string;
  tour: boolean;
  app: string | null;
  shell: string | null;
  rawParams: Record<string, string>;
}

export class BootRouterClass {
  public parse(input?: string | URLSearchParams): BootConfig {
    let params: URLSearchParams;
    if (input instanceof URLSearchParams) {
      params = input;
    } else {
      let str = input || '';
      if (str.startsWith('?')) str = str.slice(1);
      params = new URLSearchParams(str);
    }

    const rawParams: Record<string, string> = {};
    params.forEach((value, key) => {
      rawParams[key] = value;
    });

    const mode = params.get('mode') || 'default';
    let tour = false;
    if (params.has('tour')) {
      tour = params.get('tour') === 'true';
    } else if (mode === 'recruiter') {
      tour = true;
    }

    const app = params.get('app') || null;
    const shell = params.get('shell') || null;

    return {
      mode,
      tour,
      app,
      shell,
      rawParams
    };
  }

  public buildUrl(params: Partial<BootConfig> & Record<string, any>): string {
    const searchParams = new URLSearchParams();
    if (params.mode) searchParams.set('mode', params.mode);
    if (params.tour !== undefined) searchParams.set('tour', String(params.tour));
    if (params.app) searchParams.set('app', params.app);
    if (params.shell) searchParams.set('shell', params.shell);
    if (params.rawParams) {
      Object.entries(params.rawParams).forEach(([k, v]) => {
        if (!searchParams.has(k)) searchParams.set(k, v);
      });
    }
    const qs = searchParams.toString();
    return qs ? `?${qs}` : '';
  }
}

export function parseBootParams(input?: string | URLSearchParams): BootConfig {
  return new BootRouterClass().parse(input);
}

const defaultRouter = new BootRouterClass();

export class BootRouter {
  private static isInitialized = false;

  public static hasParam(param: string): boolean {
    if (typeof window === 'undefined' || !window.location) return false;
    const search = window.location.search || '';
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    return params.has(param);
  }

  public static getParam(param: string): string | null {
    if (typeof window === 'undefined' || !window.location) return null;
    const search = window.location.search || '';
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    return params.get(param);
  }

  public static parse(input?: string | URLSearchParams): BootConfig {
    return defaultRouter.parse(input);
  }

  public static buildUrl(params: Partial<BootConfig>): string {
    return defaultRouter.buildUrl(params);
  }

  public static init(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (typeof window === 'undefined') return;

    registerAllCommands();

    const config = defaultRouter.parse(window.location.search);

    // Apply shell persona override (?shell=macos | ?shell=windows | ?shell=linux)
    if (config.shell && ['macos', 'windows', 'linux'].includes(config.shell)) {
      try {
        const persona = config.shell as 'macos' | 'windows' | 'linux';
        document.documentElement.setAttribute('data-shell-persona', persona);
        document.documentElement.setAttribute('data-platform', persona);

        const rawSettings = localStorage.getItem('pratham_os_settings');
        const settings = rawSettings ? JSON.parse(rawSettings) : {};
        settings.platformTheme = persona;
        localStorage.setItem('pratham_os_settings', JSON.stringify(settings));
        SettingsStore.syncWithOS({ platformTheme: persona });
        console.log(`[BootRouter] Shell persona overridden to: ${persona}`);
      } catch (err) {
        console.warn('[BootRouter] Shell persona override error:', err);
      }
    }

    // Pre-execute neofetch into Terminal buffer
    try {
      TerminalCommands.execute('neofetch');
    } catch (err) {
      console.warn('[BootRouter] neofetch execution error:', err);
    }

    // Recruiter Tour Deep Link (?mode=recruiter or ?tour=true)
    if (config.tour || config.mode === 'recruiter') {
      console.log('[BootRouter] Recruiter Tour deep-link active');
      setTimeout(() => {
        RecruiterDirectorController.startTour();
      }, 350);
      return;
    }

    // Dedicated App Deep-Links
    if (config.app === 'queue' || config.app === 'engineering') {
      console.log('[BootRouter] Engineering Hub deep-link active');
      ApplicationRegistry.focusOrLaunch('prathamos.engineering', {
        tab: 'architecture',
        bounds: { x: 80, y: 50, width: 880, height: 640 }
      });
      return;
    }

    if (config.app === 'resume' || config.app === 'paper') {
      console.log('[BootRouter] Resume & Docs deep-link active');
      PaperViewerStore.openByPathOrName('Resume_Prathamraj_Giri.paper');
      ApplicationRegistry.focusOrLaunch('prathamos.paper', {
        bounds: { x: 80, y: 50, width: 760, height: 600 }
      });
      return;
    }

    // Default First-Boot Desktop Staging (Zero Empty Wallpaper Law)
    PaperViewerStore.openByPathOrName('Resume_Prathamraj_Giri.paper');
    const paperWinId = ApplicationRegistry.launch('prathamos.paper', {
      bounds: { x: 80, y: 50, width: 760, height: 600 }
    });

    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 900;
    const termX = Math.max(860, screenW - 660);
    const termY = Math.max(380, screenH - 440);

    ApplicationRegistry.launch('prathamos.terminal', {
      bounds: { x: termX, y: termY, width: 620, height: 380 }
    });

    if (paperWinId) {
      WindowStore.focusWindow(paperWinId);
    }
  }
}

export default BootRouter;
