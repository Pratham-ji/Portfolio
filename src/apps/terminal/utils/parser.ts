export const parseCommand = (input: string): { command: string; args: string[] } => {
  const trimmed = input.trim();
  if (!trimmed) return { command: '', args: [] };

  // Split by spaces, respecting quotes (simple implementation)
  const tokens = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  if (tokens.length === 0) return { command: '', args: [] };
  
  const command = tokens[0]?.toLowerCase() || '';
  const args = tokens.slice(1).map(arg => 
    arg.startsWith('"') && arg.endsWith('"') ? arg.slice(1, -1) : arg
  );

  return { command, args };
};
