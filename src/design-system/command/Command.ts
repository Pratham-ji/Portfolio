export interface Command {
  id: string;
  title: string;
  keywords?: string[];
  group?: string;
  shortcut?: string;
  icon?: string;
  handler: () => void;
  priority?: number;
  lazy?: boolean;
  condition?: () => boolean;
}
