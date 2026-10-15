import { ApplicationRegistry } from '../../registry/ApplicationRegistry';
import { TerminalResult } from '../types';

const createShortcutCommand = (appId: string) => {
  return {
    name: appId,
    description: `Launch the ${appId} application`,
    execute: async (): Promise<TerminalResult> => {
      const app = ApplicationRegistry.getApp(appId);
      if (app) {
        try {
          ApplicationRegistry.launch(appId);
          return {
            lines: [{
              id: crypto.randomUUID(),
              segments: [{ text: `Launching ${appId}...`, color: 'var(--pos-color-success)' }]
            }]
          };
        } catch (e: any) {
           return {
            lines: [{
              id: crypto.randomUUID(),
              segments: [{ text: `Error launching ${appId}: ${e.message}`, color: 'var(--pos-color-error)' }]
            }]
          };
        }
      }
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: `Application not found: ${appId}`, color: 'var(--pos-color-error)' }]
        }]
      };
    }
  };
};

export const resumeCommand = createShortcutCommand('resume');
export const contactCommand = createShortcutCommand('contact');
export const aboutCommand = createShortcutCommand('about');

export const projectsCommand = {
  name: 'projects',
  description: 'Launch Engineering Hub (Systems & Architecture)',
  execute: async (): Promise<TerminalResult> => {
    const appId = 'prathamos.engineering';
    const app = ApplicationRegistry.getApp(appId);
    if (app) {
      try {
        ApplicationRegistry.launch(appId, { tab: 'architecture' });
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Launching ${app.metadata.name} [Systems & Architecture]...`, color: 'var(--pos-color-success)' }]
          }]
        };
      } catch (e: any) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Error launching ${appId}: ${e.message}`, color: 'var(--pos-color-error)' }]
          }]
        };
      }
    }
    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `Application not found: ${appId}`, color: 'var(--pos-color-error)' }]
      }]
    };
  }
};

export const skillsCommand = {
  name: 'skills',
  description: 'Launch Engineering Hub (Algorithmic Telemetry)',
  execute: async (): Promise<TerminalResult> => {
    const appId = 'prathamos.engineering';
    const app = ApplicationRegistry.getApp(appId);
    if (app) {
      try {
        ApplicationRegistry.launch(appId, { tab: 'telemetry' });
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Launching ${app.metadata.name} [Algorithmic Telemetry]...`, color: 'var(--pos-color-success)' }]
          }]
        };
      } catch (e: any) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Error launching ${appId}: ${e.message}`, color: 'var(--pos-color-error)' }]
          }]
        };
      }
    }
    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `Application not found: ${appId}`, color: 'var(--pos-color-error)' }]
      }]
    };
  }
};

export const engineeringCommand = {
  name: 'engineering',
  description: 'Launch Engineering Hub',
  execute: async (): Promise<TerminalResult> => {
    const appId = 'prathamos.engineering';
    const app = ApplicationRegistry.getApp(appId);
    if (app) {
      try {
        ApplicationRegistry.launch(appId);
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Launching ${app.metadata.name}...`, color: 'var(--pos-color-success)' }]
          }]
        };
      } catch (e: any) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Error launching ${appId}: ${e.message}`, color: 'var(--pos-color-error)' }]
          }]
        };
      }
    }
    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `Application not found: ${appId}`, color: 'var(--pos-color-error)' }]
      }]
    };
  }
};
