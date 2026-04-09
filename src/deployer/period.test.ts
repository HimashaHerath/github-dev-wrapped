import { describe, it, expect } from 'vitest';
import { getPeriodFilePath } from './period.js';

describe('getPeriodFilePath', () => {
  it('builds correct path for weekly', () => {
    expect(getPeriodFilePath('weekly', '2026-W15')).toBe('weekly/2026-W15.json');
  });

  it('builds correct path for monthly', () => {
    expect(getPeriodFilePath('monthly', '2026-04')).toBe('monthly/2026-04.json');
  });
});
