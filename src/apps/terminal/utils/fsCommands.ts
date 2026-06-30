import { TerminalContextValue } from '../types';
import { FileSystemState } from '../../../core/file-system';

const resolvePath = (current: string, target: string): string | null => {
  if (target === '/') return '/';
  if (target === '~') return '/home/pratham';
  
  const parts = target.split('/').filter(Boolean);
  let resolvedParts = current === '/' ? [] : current.split('/').filter(Boolean);
  
  if (target.startsWith('/')) {
    resolvedParts = [];
  }

  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (resolvedParts.length > 0) resolvedParts.pop();
      continue;
    }
    resolvedParts.push(part);
  }

  const finalPath = '/' + resolvedParts.join('/');
  return finalPath;
};

const handleLs = (args: string[], ctx: TerminalContextValue, fs: FileSystemState) => {
  const targetPath = args[0] ? resolvePath(ctx.currentPath, args[0]) : ctx.currentPath;
  if (!targetPath) {
    ctx.pushHistory({ type: 'error', content: `ls: cannot access '${args[0]}': No such file or directory` });
    return;
  }
  
  const children = Object.values(fs.nodes).filter(n => n.parentId === targetPath);
  
  if (children.length === 0) {
    const node = fs.nodes[targetPath];
    if (node && node.type === 'file') {
      ctx.pushHistory({ type: 'output', content: node.name });
      return;
    }
  }

  const output = children.map(c => 
    c.type === 'directory' ? `${c.name}/` : c.name
  ).join('  ');
  
  ctx.pushHistory({ type: 'output', content: output || '(empty)' });
};

const handleCd = (args: string[], ctx: TerminalContextValue) => {
  const target = args[0] || '~';
  const resolved = resolvePath(ctx.currentPath, target);
  if (resolved) {
    ctx.setCurrentPath(resolved);
  } else {
    ctx.pushHistory({ type: 'error', content: `cd: ${target}: No such file or directory` });
  }
};

const handleCat = (args: string[], ctx: TerminalContextValue, fs: FileSystemState) => {
  if (!args[0]) {
    ctx.pushHistory({ type: 'error', content: 'cat: missing operand' });
    return;
  }
  const target = resolvePath(ctx.currentPath, args[0]);
  const node = Object.values(fs.nodes).find(n => n.id === target || (n.parentId === ctx.currentPath && n.name === args[0]));
  
  if (!node) {
    ctx.pushHistory({ type: 'error', content: `cat: ${args[0]}: No such file or directory` });
  } else if (node.type === 'directory') {
    ctx.pushHistory({ type: 'error', content: `cat: ${args[0]}: Is a directory` });
  } else {
    ctx.pushHistory({ type: 'output', content: node.content || '(empty file)' });
  }
};

export const executeFileSystemCommand = (command: string, args: string[], ctx: TerminalContextValue, fs: FileSystemState) => {
  switch (command) {
    case 'pwd':
      ctx.pushHistory({ type: 'output', content: ctx.currentPath });
      break;
    case 'ls':
      handleLs(args, ctx, fs);
      break;
    case 'cd':
      handleCd(args, ctx);
      break;
    case 'cat':
      handleCat(args, ctx, fs);
      break;
    case 'tree':
      ctx.pushHistory({ type: 'output', content: 'Tree command not fully implemented in MVP. Use ls instead.' });
      break;
  }
};
