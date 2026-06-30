import { TerminalContextValue } from '../types';

const handleHistory = (ctx: TerminalContextValue) => {
  const historyOutput = ctx.inputHistory.map((cmd, i) => `${(i + 1).toString().padStart(4, ' ')}  ${cmd}`).join('\n');
  ctx.pushHistory({ type: 'output', content: historyOutput });
};

const handleNeofetch = (ctx: TerminalContextValue) => {
  const asciiArt = `
   .MMM..:MMMMMMM               pratham@foundry
  MMMMMMMMMMMMMMMMMM            ---------------
  MMMMMMMMMMMMMMMMMMMM.         OS: PrathamOS v1.0
 MMMMMMMMMMMMMMMMMMMMMMM        Kernel: React 19 / Web
MMMMMMMMMMMMMMMMMMMMMMMMM       Uptime: 42 seconds
MMMMMMMMMMMMMMMMMMMMMMMMM       Packages: 12 (npm)
MMMMMMMMMMMMMMMMMMMMMMMMM       Shell: vsh 1.0.0
MMMMMMMMMMMMMMMMMMMMMMMMM       Resolution: Responsive
.MMMMMMMMMMMMMMMMMMMMMMM.       DE: Shell
  MMMMMMMMMMMMMMMMMMMMM         WM: WindowManager
   MMMMMMMMMMMMMMMMMMM          Theme: Glassmorphism
     MMMMMMMMMMMMMMM            Terminal: Virtual Terminal
  `;
  ctx.pushHistory({ type: 'output', content: asciiArt });
};

const handleHelp = (ctx: TerminalContextValue) => {
  const helpText = `
Available commands:
  pwd        - Print name of current/working directory
  ls         - List directory contents
  cd         - Change the shell working directory
  cat        - Concatenate files and print on the standard output
  tree       - List contents of directories in a tree-like format
  clear      - Clear the terminal screen
  history    - Display the command history list
  whoami     - Print effective userid
  date       - Print or set the system date and time
  neofetch   - A fast, highly customizable system info script
  skills     - Display skills
  projects   - Display projects
  experience - Display experience
  contact    - Display contact information
  resume     - Display resume link
  github     - Display GitHub information
  leetcode   - Display LeetCode information
  about      - Display about information
  sudo       - Execute a command as another user
  exit       - Cause normal process termination
  `;
  ctx.pushHistory({ type: 'output', content: helpText.trim() });
};

const commandMap: Record<string, (args: string[], ctx: TerminalContextValue) => void> = {
  clear: (_, ctx) => ctx.clearHistory(),
  history: (_, ctx) => handleHistory(ctx),
  whoami: (_, ctx) => ctx.pushHistory({ type: 'output', content: 'pratham' }),
  date: (_, ctx) => ctx.pushHistory({ type: 'output', content: new Date().toString() }),
  neofetch: (_, ctx) => handleNeofetch(ctx),
  sudo: (args, ctx) => {
    if (args[0] === 'hire' && args[1] === 'pratham') {
      ctx.pushHistory({ type: 'output', content: 'Success! Initiating onboarding sequence... Welcome to the team!' });
    } else {
      ctx.pushHistory({ type: 'error', content: 'pratham is not in the sudoers file. This incident will be reported.' });
    }
  },
  rm: (args, ctx) => {
    if (args[0] === '-rf' && args[1] === '/') {
      ctx.pushHistory({ type: 'error', content: 'rm: it is dangerous to operate recursively on \'/\' \nrm: use --no-preserve-root to override this failsafe' });
    } else {
      ctx.pushHistory({ type: 'error', content: 'rm: permission denied' });
    }
  },
  exit: (_, ctx) => ctx.closeTerminal(),
  help: (_, ctx) => handleHelp(ctx),
  skills: (_, ctx) => handleOpenApp('skills', ctx),
  projects: (_, ctx) => handleOpenApp('projects', ctx),
  experience: (_, ctx) => handleOpenApp('experience', ctx),
  contact: (_, ctx) => handleOpenApp('contact', ctx),
  resume: (_, ctx) => handleOpenApp('resume', ctx),
  github: (_, ctx) => handleOpenApp('github', ctx),
  leetcode: (_, ctx) => handleOpenApp('leetcode', ctx),
  about: (_, ctx) => handleOpenApp('about', ctx),
};

const handleOpenApp = (command: string, ctx: TerminalContextValue) => {
  ctx.pushHistory({ type: 'output', content: `Opening ${command}... (Type 'cd' and 'ls' to browse manually, or use the Desktop UI to launch the app).` });
};

export const executeSystemCommand = (command: string, args: string[], ctx: TerminalContextValue) => {
  const handler = commandMap[command];
  if (handler) {
    handler(args, ctx);
  }
};
