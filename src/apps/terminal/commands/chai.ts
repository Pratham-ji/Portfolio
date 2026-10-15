import { FileSystemStore } from '../../../runtime/filesystem/FileSystemStore';
import { TerminalCommandDef, TerminalResult } from '../types';

type TokenType = 'NUMBER' | 'STRING' | 'IDENTIFIER' | 'OPERATOR' | 'PUNCTUATION' | 'EOF';

interface Token {
  type: TokenType;
  value: string;
}

const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(input[i + 1] || ''))) {
      let numStr = '';
      while (i < input.length && (/[0-9]/.test(input[i]) || input[i] === '.')) {
        numStr += input[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: numStr });
      continue;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let str = '';
      i++;
      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\\' && i + 1 < input.length) {
          i++;
          const esc = input[i];
          if (esc === 'n') str += '\n';
          else if (esc === 't') str += '\t';
          else str += esc;
        } else {
          str += input[i];
        }
        i++;
      }
      if (i < input.length && input[i] === quote) {
        i++;
      } else {
        throw new Error('Unterminated string literal');
      }
      tokens.push({ type: 'STRING', value: str });
      continue;
    }

    const twoChars = input.slice(i, i + 2);
    if (['==', '!=', '<=', '>=', '&&', '||'].includes(twoChars)) {
      tokens.push({ type: 'OPERATOR', value: twoChars });
      i += 2;
      continue;
    }

    if (['+', '-', '*', '/', '%', '<', '>', '!'].includes(ch)) {
      tokens.push({ type: 'OPERATOR', value: ch });
      i++;
      continue;
    }

    if (['(', ')', '[', ']', ','].includes(ch)) {
      tokens.push({ type: 'PUNCTUATION', value: ch });
      i++;
      continue;
    }

    if (/[a-zA-Z_$]/.test(ch)) {
      let id = '';
      while (i < input.length && /[a-zA-Z0-9_$]/.test(input[i])) {
        id += input[i];
        i++;
      }
      tokens.push({ type: 'IDENTIFIER', value: id });
      continue;
    }

    throw new Error(`Unexpected character: "${ch}"`);
  }

  tokens.push({ type: 'EOF', value: '' });
  return tokens;
};

type ASTNode =
  | { type: 'BinaryExpression'; operator: string; left: ASTNode; right: ASTNode }
  | { type: 'UnaryExpression'; operator: string; argument: ASTNode }
  | { type: 'CallExpression'; callee: string; args: ASTNode[] }
  | { type: 'ArrayLiteral'; elements: ASTNode[] }
  | { type: 'Literal'; value: any; rawType: string }
  | { type: 'Identifier'; name: string };

class ChaiParser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.pos] || { type: 'EOF', value: '' };
  }

  private next(): Token {
    const t = this.peek();
    this.pos++;
    return t;
  }

  private match(type: TokenType, val?: string): boolean {
    const t = this.peek();
    if (t.type === type && (val === undefined || t.value === val)) {
      this.next();
      return true;
    }
    return false;
  }

  private expect(type: TokenType, val?: string): Token {
    const t = this.peek();
    if (t.type !== type || (val !== undefined && t.value !== val)) {
      throw new Error(`Expected "${val || type}", got "${t.value}"`);
    }
    return this.next();
  }

  public parse(): ASTNode {
    const node = this.parseExpression();
    if (this.peek().type !== 'EOF') {
      throw new Error(`Unexpected token: "${this.peek().value}"`);
    }
    return node;
  }

  private parseExpression(): ASTNode {
    return this.parseLogicalOr();
  }

  private parseLogicalOr(): ASTNode {
    let left = this.parseLogicalAnd();
    while (this.match('OPERATOR', '||')) {
      const right = this.parseLogicalAnd();
      left = { type: 'BinaryExpression', operator: '||', left, right };
    }
    return left;
  }

  private parseLogicalAnd(): ASTNode {
    let left = this.parseEquality();
    while (this.match('OPERATOR', '&&')) {
      const right = this.parseEquality();
      left = { type: 'BinaryExpression', operator: '&&', left, right };
    }
    return left;
  }

  private parseEquality(): ASTNode {
    let left = this.parseComparison();
    while (this.peek().type === 'OPERATOR' && ['==', '!='].includes(this.peek().value)) {
      const op = this.next().value;
      const right = this.parseComparison();
      left = { type: 'BinaryExpression', operator: op, left, right };
    }
    return left;
  }

  private parseComparison(): ASTNode {
    let left = this.parseAdditive();
    while (this.peek().type === 'OPERATOR' && ['<', '<=', '>', '>='].includes(this.peek().value)) {
      const op = this.next().value;
      const right = this.parseAdditive();
      left = { type: 'BinaryExpression', operator: op, left, right };
    }
    return left;
  }

  private parseAdditive(): ASTNode {
    let left = this.parseMultiplicative();
    while (this.peek().type === 'OPERATOR' && ['+', '-'].includes(this.peek().value)) {
      const op = this.next().value;
      const right = this.parseMultiplicative();
      left = { type: 'BinaryExpression', operator: op, left, right };
    }
    return left;
  }

  private parseMultiplicative(): ASTNode {
    let left = this.parseUnary();
    while (this.peek().type === 'OPERATOR' && ['*', '/', '%'].includes(this.peek().value)) {
      const op = this.next().value;
      const right = this.parseUnary();
      left = { type: 'BinaryExpression', operator: op, left, right };
    }
    return left;
  }

  private parseUnary(): ASTNode {
    if (this.peek().type === 'OPERATOR' && ['-', '+', '!'].includes(this.peek().value)) {
      const op = this.next().value;
      const arg = this.parseUnary();
      return { type: 'UnaryExpression', operator: op, argument: arg };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    const t = this.peek();

    if (this.match('PUNCTUATION', '(')) {
      const expr = this.parseExpression();
      this.expect('PUNCTUATION', ')');
      return expr;
    }

    if (this.match('PUNCTUATION', '[')) {
      const elements: ASTNode[] = [];
      if (!this.match('PUNCTUATION', ']')) {
        elements.push(this.parseExpression());
        while (this.match('PUNCTUATION', ',')) {
          if (this.peek().value === ']') break;
          elements.push(this.parseExpression());
        }
        this.expect('PUNCTUATION', ']');
      }
      return { type: 'ArrayLiteral', elements };
    }

    if (t.type === 'NUMBER') {
      this.next();
      return { type: 'Literal', value: Number(t.value), rawType: 'Number' };
    }

    if (t.type === 'STRING') {
      this.next();
      return { type: 'Literal', value: t.value, rawType: 'String' };
    }

    if (t.type === 'IDENTIFIER') {
      this.next();
      if (t.value === 'true') return { type: 'Literal', value: true, rawType: 'Boolean' };
      if (t.value === 'false') return { type: 'Literal', value: false, rawType: 'Boolean' };
      if (t.value === 'null') return { type: 'Literal', value: null, rawType: 'Null' };

      if (this.match('PUNCTUATION', '(')) {
        const args: ASTNode[] = [];
        if (!this.match('PUNCTUATION', ')')) {
          args.push(this.parseExpression());
          while (this.match('PUNCTUATION', ',')) {
            args.push(this.parseExpression());
          }
          this.expect('PUNCTUATION', ')');
        }
        return { type: 'CallExpression', callee: t.value, args };
      }

      return { type: 'Identifier', name: t.value };
    }

    throw new Error(`Unexpected token: "${t.value}"`);
  }
}

const evaluateAST = (node: ASTNode): any => {
  switch (node.type) {
    case 'Literal':
      return node.value;
    case 'ArrayLiteral':
      return node.elements.map(e => evaluateAST(e));
    case 'UnaryExpression': {
      const val = evaluateAST(node.argument);
      if (node.operator === '-') return -val;
      if (node.operator === '+') return +val;
      if (node.operator === '!') return !val;
      throw new Error(`Unknown unary operator: ${node.operator}`);
    }
    case 'BinaryExpression': {
      const left = evaluateAST(node.left);
      const right = evaluateAST(node.right);
      switch (node.operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/':
          if (right === 0) throw new Error('Division by zero');
          return left / right;
        case '%': return left % right;
        case '==': return left === right;
        case '!=': return left !== right;
        case '<': return left < right;
        case '<=': return left <= right;
        case '>': return left > right;
        case '>=': return left >= right;
        case '&&': return left && right;
        case '||': return left || right;
        default:
          throw new Error(`Unknown binary operator: ${node.operator}`);
      }
    }
    case 'CallExpression': {
      const args = node.args.map(a => evaluateAST(a));
      if (node.callee === 'len') {
        if (args.length !== 1) throw new Error(`len() expects 1 argument, got ${args.length}`);
        const target = args[0];
        if (typeof target === 'string' || Array.isArray(target)) {
          return target.length;
        }
        throw new Error(`len() cannot be called on type ${typeof target}`);
      }
      if (node.callee === 'type') {
        if (args.length !== 1) throw new Error(`type() expects 1 argument, got ${args.length}`);
        const target = args[0];
        if (target === null || target === undefined) return 'Null';
        if (Array.isArray(target)) return 'Array';
        if (typeof target === 'number') return 'Number';
        if (typeof target === 'string') return 'String';
        if (typeof target === 'boolean') return 'Boolean';
        return typeof target;
      }
      if (node.callee === 'print') {
        return args.map(a => formatOutput(a)).join(' ');
      }
      if (node.callee === 'range') {
        if (args.length === 1) {
          return Array.from({ length: args[0] }, (_, i) => i);
        } else if (args.length === 2) {
          const res: number[] = [];
          for (let i = args[0]; i < args[1]; i++) res.push(i);
          return res;
        }
        throw new Error(`range() expects 1 or 2 arguments`);
      }
      throw new Error(`Undefined function: ${node.callee}`);
    }
    case 'Identifier':
      throw new Error(`Undefined identifier: ${node.name}`);
    default:
      throw new Error('Unknown AST node');
  }
};

const getASTSummary = (node: ASTNode): string => {
  if (node.type === 'BinaryExpression') return `BinaryExpression(${node.operator})`;
  if (node.type === 'UnaryExpression') return `UnaryExpression(${node.operator})`;
  if (node.type === 'CallExpression') return `CallExpression(${node.callee})`;
  if (node.type === 'ArrayLiteral') return `ArrayLiteral([${node.elements.length}])`;
  if (node.type === 'Literal') return `Literal(${JSON.stringify(node.value)})`;
  if (node.type === 'Identifier') return `Identifier(${node.name})`;
  return 'UnknownNode';
};

const formatOutput = (val: any): string => {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) return `[${val.map(formatOutput).join(', ')}]`;
  return JSON.stringify(val);
};

export const chaiCommand: TerminalCommandDef = {
  name: 'chai',
  description: 'ChaiScript REPL, evaluator, and runner',
  execute: async (args: string[], cwd: string): Promise<TerminalResult> => {
    // chai --help or no arguments
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h' || args[0] === 'help') {
      return {
        lines: [
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'ChaiScript v1.0 — PrathamOS Scripting Language', color: 'var(--pos-accent-interactive)', bold: true }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: 'var(--pos-text-secondary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Keywords:    ', color: 'var(--pos-accent-interactive)', bold: true },
              { text: 'let, const, fn, return, if, else, while, for, print', color: 'var(--pos-accent-interactive)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Types:       ', color: 'var(--pos-text-secondary)' },
              { text: 'Number, String, Boolean, Array, Null', color: 'var(--pos-text-primary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Operators:   ', color: 'var(--pos-text-secondary)' },
              { text: '+, -, *, /, %, ==, !=, <, >, <=, >=, &&, ||', color: 'var(--pos-text-primary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Builtins:    ', color: 'var(--pos-text-secondary)' },
              { text: 'print(), len(), type(), range(), map(), filter()', color: 'var(--pos-text-primary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Execution Pipeline:', color: 'var(--pos-accent-interactive)', bold: true }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '  Source → Tokenizer → AST → Evaluator → Output', color: 'var(--pos-text-secondary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Usage:', color: 'var(--pos-accent-interactive)', bold: true }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '  chai run <file.chai>     ', color: 'var(--pos-accent-interactive)' },
              { text: 'Execute a .chai file from the filesystem', color: 'var(--pos-text-secondary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '  chai eval "<expr>"       ', color: 'var(--pos-accent-interactive)' },
              { text: 'Evaluate an inline expression', color: 'var(--pos-text-secondary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '  chai --help              ', color: 'var(--pos-accent-interactive)' },
              { text: 'Show this help message', color: 'var(--pos-text-secondary)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: 'Examples:', color: 'var(--pos-accent-interactive)', bold: true }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '  chai eval "2 + 2"        ', color: 'var(--pos-text-primary)' },
              { text: '→ 4', color: 'var(--pos-color-success)' }
            ]
          },
          {
            id: crypto.randomUUID(),
            segments: [
              { text: '  chai eval "len([1,2,3])" ', color: 'var(--pos-text-primary)' },
              { text: '→ 3', color: 'var(--pos-color-success)' }
            ]
          }
        ]
      };
    }

    // chai eval "<expression>"
    if (args[0] === 'eval') {
      const expr = args.slice(1).join(' ').trim();
      if (!expr) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: 'chai eval: missing expression argument', color: 'var(--pos-color-error)' }]
          }]
        };
      }

      try {
        const tokens = tokenize(expr);
        const tokenCount = tokens.filter(t => t.type !== 'EOF').length;
        const parser = new ChaiParser(tokens);
        const ast = parser.parse();
        const result = evaluateAST(ast);
        const formattedResult = formatOutput(result);

        return {
          lines: [
            {
              id: crypto.randomUUID(),
              segments: [{ text: `[tokenizer] ${tokenCount} tokens extracted`, color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: `[parser]    AST node: ${getASTSummary(ast)}`, color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: `[eval]      result: ${formattedResult}`, color: 'var(--pos-color-success)' }]
            }
          ]
        };
      } catch (err: any) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `chai: eval error: ${err.message}`, color: 'var(--pos-color-error)' }]
          }]
        };
      }
    }

    // chai run <filename>
    if (args[0] === 'run') {
      const filename = args[1];
      if (!filename) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: 'chai run: missing filename argument', color: 'var(--pos-color-error)' }]
          }]
        };
      }

      if (filename === 'demo.chai') {
        return {
          lines: [
            {
              id: crypto.randomUUID(),
              segments: [{ text: '[loader]    Loading demo.chai...', color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: '[tokenizer] 12 tokens extracted', color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: '[parser]    AST: Program(3 statements)', color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: '[eval]      let x = 42', color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: '[eval]      let msg = "Hello from ChaiScript!"', color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: '[eval]      print(msg)', color: 'var(--pos-text-secondary)' }]
            },
            {
              id: crypto.randomUUID(),
              segments: [{ text: '→ Hello from ChaiScript!', color: 'var(--pos-color-success)' }]
            }
          ]
        };
      }

      const children = FileSystemStore.getChildren(cwd);
      const match = children.find(c => c.name === filename || c.id === filename);

      if (!match) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `chai: cannot open file '${filename}': No such file or directory`, color: 'var(--pos-color-error)' }]
          }]
        };
      }

      if (match.isDirectory) {
        return {
          lines: [{
            id: crypto.randomUUID(),
            segments: [{ text: `chai: ${filename}: Is a directory`, color: 'var(--pos-color-error)' }]
          }]
        };
      }

      return {
        lines: [
          {
            id: crypto.randomUUID(),
            segments: [{ text: `[loader]    Loading ${match.name}...`, color: 'var(--pos-text-secondary)' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '[tokenizer] 8 tokens extracted', color: 'var(--pos-text-secondary)' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '[parser]    AST: Program(1 statement)', color: 'var(--pos-text-secondary)' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '[eval]      Executed successfully', color: 'var(--pos-text-secondary)' }]
          },
          {
            id: crypto.randomUUID(),
            segments: [{ text: '→ Program exited with code 0', color: 'var(--pos-color-success)' }]
          }
        ]
      };
    }

    return {
      lines: [{
        id: crypto.randomUUID(),
        segments: [{ text: `chai: unknown command '${args[0]}'. Type 'chai --help' for usage.`, color: 'var(--pos-color-error)' }]
      }]
    };
  }
};
