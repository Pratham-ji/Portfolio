import { TerminalStore } from './TerminalStore';
import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';

class TerminalSessionImpl {
  public getUser(): string {
    return 'pratham'; // Hardcoded for PrathamOS
  }

  public getHost(): string {
    return 'prathamos';
  }

  public getCwd(): string {
    return TerminalStore.getState().cwd;
  }
  
  public getCwdName(): string {
    const cwd = this.getCwd();
    const node = FileSystemStore.getNode(cwd);
    return node ? node.name : cwd;
  }

  public setCwd(id: string) {
    TerminalStore.setCwd(id);
  }
}

export const TerminalSession = new TerminalSessionImpl();
