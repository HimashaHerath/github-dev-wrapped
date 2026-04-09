import { describe, it, expect } from 'vitest';
import { getProvider } from './index.js';

describe('getProvider', () => {
  it('returns openai provider', () => {
    const p = getProvider('openai');
    expect(p).toBeDefined();
    expect(typeof p.complete).toBe('function');
  });

  it('returns groq provider', () => {
    const p = getProvider('groq');
    expect(p).toBeDefined();
  });

  it('throws for unknown provider', () => {
    // @ts-expect-error testing invalid input
    expect(() => getProvider('unknown')).toThrow();
  });
});
