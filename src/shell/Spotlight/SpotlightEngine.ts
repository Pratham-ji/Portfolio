export interface SearchResult {
  id: string;
  title: string;
  type: 'app' | 'file' | 'setting' | 'web';
  commandId: string;
  payload?: any;
}

export class Engine {
  // Mock dataset simulating system indexing
  private mockData: SearchResult[] = [
    { id: 'app-terminal', title: 'Terminal', type: 'app', commandId: 'OS_LAUNCH_APP', payload: { target: 'terminal' } },
    { id: 'app-finder', title: 'Finder', type: 'app', commandId: 'OS_LAUNCH_APP', payload: { target: 'finder' } },
    { id: 'app-settings', title: 'System Settings', type: 'setting', commandId: 'OS_LAUNCH_APP', payload: { target: 'settings' } },
    { id: 'file-resume', title: 'Resume.pdf', type: 'file', commandId: 'OS_OPEN_FILE', payload: { path: '/Documents/Resume.pdf' } },
    { id: 'cmd-restart', title: 'Restart', type: 'setting', commandId: 'OS_RESTART' }
  ];

  search(query: string): SearchResult[] {
    if (!query.trim()) return [];
    
    // Fuzzy matching simplified for mock
    const q = query.toLowerCase().replace(/\s+/g, '');
    return this.mockData.filter(item => {
      const t = item.title.toLowerCase().replace(/\s+/g, '');
      return t.includes(q);
    });
  }

  execute(result: SearchResult) {
    // In reality: CommandRegistry.execute(result.commandId, result.payload);
    console.log(`Executing ${result.commandId} with`, result.payload);
  }
}

export const SpotlightEngine = new Engine();
