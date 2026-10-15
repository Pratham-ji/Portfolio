import { Command } from './Command';

export class SearchEngine {
  static search(query: string, commands: Command[]): Command[] {
    if (!query.trim()) return commands;
    
    const lowerQuery = query.toLowerCase();
    
    return commands
      .filter(cmd => {
        const matchesTitle = cmd.title.toLowerCase().includes(lowerQuery);
        const matchesKeywords = cmd.keywords?.some(k => k.toLowerCase().includes(lowerQuery));
        return matchesTitle || matchesKeywords;
      })
      .sort((a, b) => {
        // Priority descending
        if ((a.priority || 0) !== (b.priority || 0)) {
          return (b.priority || 0) - (a.priority || 0);
        }
        return a.title.localeCompare(b.title);
      });
  }
}
