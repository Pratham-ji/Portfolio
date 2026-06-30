import { useMemo } from 'react';
import { useApplication } from '../../core/application-manager';
import { useFileSystem, FileSystemNode } from '../../core/file-system';
import { AppManifest } from '../../core/application-manager/types';

export type SearchResult = 
  | { type: 'app'; data: AppManifest }
  | { type: 'file'; data: FileSystemNode };

export const useSpotlightSearch = (query: string) => {
  const { getAllApps } = useApplication();
  const { state: fsState } = useFileSystem();

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const matches: SearchResult[] = [];

    // Search Apps
    const apps = getAllApps();
    for (const app of apps) {
      if (app.name.toLowerCase().includes(lowerQuery)) {
        matches.push({ type: 'app', data: app });
      }
    }

    // Search Files (excluding root/system directories if possible)
    const nodes = Object.values(fsState.nodes);
    for (const node of nodes) {
      if (node.name.toLowerCase().includes(lowerQuery)) {
        matches.push({ type: 'file', data: node });
      }
    }

    // Sort or prioritize (apps first)
    return matches.sort((a, b) => {
      if (a.type === 'app' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'app') return 1;
      return a.data.name.localeCompare(b.data.name);
    });
  }, [query, getAllApps, fsState.nodes]);

  return results;
};
