export class TerminalParser {
  public static parse(input: string): string[] {
    const tokens: string[] = [];
    let currentToken = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if ((char === '"' || char === "'") && (i === 0 || input[i - 1] !== '\\')) {
        if (inQuotes && quoteChar === char) {
          inQuotes = false;
        } else if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else {
          currentToken += char;
        }
      } else if (char === ' ' && !inQuotes) {
        if (currentToken.length > 0) {
          tokens.push(currentToken);
          currentToken = '';
        }
      } else {
        currentToken += char;
      }
    }

    if (currentToken.length > 0) {
      tokens.push(currentToken);
    }

    return tokens;
  }
}
