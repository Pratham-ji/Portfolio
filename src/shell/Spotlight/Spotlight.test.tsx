import { describe, it, expect } from 'vitest';
import { SpotlightEngine } from './SpotlightEngine';

describe('SpotlightEngine', () => {
  it('finds results based on fuzzy substring match', () => {
    const results = SpotlightEngine.search('term');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Terminal');
  });

  it('ignores spaces in queries', () => {
    const results = SpotlightEngine.search('t e r m');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Terminal');
  });

  it('returns empty array when no matches', () => {
    const results = SpotlightEngine.search('xyz123');
    expect(results.length).toBe(0);
  });
  
  it('is case insensitive', () => {
    const results = SpotlightEngine.search('FINDER');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Finder');
  });
});
