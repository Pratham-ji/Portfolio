import { ApplicationRegistry } from '../../registry/ApplicationRegistry';
import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { PaperViewerStore } from '../../PaperViewer/store/PaperViewerStore';
import { TerminalResult } from '../types';

export const openCommand = {
  name: 'open',
  description: 'Open an application or document file',
  execute: async (args: string[], cwd: string): Promise<TerminalResult> => {
    if (!args[0]) {
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: `open: missing argument`, color: 'var(--pos-color-error)' }]
        }]
      };
    }

    const target = args[0].trim();
    const docExtensions = ['.paper', '.md', '.code', '.cpp', '.txt'];
    const isDocExtension = docExtensions.some(ext => target.toLowerCase().endsWith(ext));

    // 1. If target matches a file node in FileSystemStore (or has document extension)
    let matchedNode = typeof (FileSystemStore as any).resolveNode === 'function' 
      ? (FileSystemStore as any).resolveNode(target, cwd)
      : undefined;

    if (!matchedNode) {
      // Check current directory children
      const children = FileSystemStore.getChildren(cwd);
      matchedNode = children.find(c => 
        c.name.toLowerCase() === target.toLowerCase() || 
        c.id.toLowerCase() === target.toLowerCase()
      );
    }

    if (!matchedNode) {
      // Global lookup
      matchedNode = FileSystemStore.getNode(target);
    }

    if (matchedNode) {
      if (matchedNode.isDirectory) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `open: ${target}: Is a directory`, color: 'var(--pos-color-error)' }]
          }]
        };
      }

      PaperViewerStore.openFile(matchedNode);
      ApplicationRegistry.launch('prathamos.paper');
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: `Opened ${matchedNode.name} in PaperViewer`, color: 'var(--pos-color-success)' }]
        }]
      };
    }

    // 2. If argument ends in a document extension but wasn't in FileSystemStore
    if (isDocExtension) {
      PaperViewerStore.openByPathOrName(target);
      ApplicationRegistry.launch('prathamos.paper');
      return {
        lines: [{
          id: crypto.randomUUID(),
          segments: [{ text: `Opened ${target} in PaperViewer`, color: 'var(--pos-color-success)' }]
        }]
      };
    }

    // 3. Check if target is a registered application ID
    const app = ApplicationRegistry.getApp(target);
    if (app) {
      try {
        ApplicationRegistry.launch(app.metadata.id);
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Launched application: ${app.metadata.name}`, color: 'var(--pos-color-success)' }]
          }]
        };
      } catch (e: any) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `Error launching ${target}: ${e.message}`, color: 'var(--pos-color-error)' }]
          }]
        };
      }
    }

    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `open: unknown application or file: ${target}`, color: 'var(--pos-color-error)' }]
      }]
    };
  }
};
