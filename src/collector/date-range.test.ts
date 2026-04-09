import { describe, it, expect } from 'vitest';
import { getPeriod, getPeriodLabel, formatDate } from './date-range.js';

describe('getPeriod', () => {
  it('returns correct weekly period for a known date', () => {
    const period = getPeriod('weekly', '2026-04-09', 'UTC');
    expect(period.label).toBe('2026-W15');
    expect(period.startDate.toISOString().slice(0, 10)).toBe('2026-04-06');
    expect(period.endDate.toISOString().slice(0, 10)).toBe('2026-04-12');
  });

  it('returns correct monthly period', () => {
    const period = getPeriod('monthly', '2026-04-09', 'UTC');
    expect(period.label).toBe('2026-04');
    expect(period.startDate.toISOString().slice(0, 10)).toBe('2026-04-01');
    expect(period.endDate.toISOString().slice(0, 10)).toBe('2026-04-30');
  });
});

describe('getPeriodLabel', () => {
  it('formats weekly label', () => {
    expect(getPeriodLabel('weekly', new Date('2026-04-06T00:00:00Z'))).toBe('2026-W15');
  });

  it('formats monthly label', () => {
    expect(getPeriodLabel('monthly', new Date('2026-04-01T00:00:00Z'))).toBe('2026-04');
  });
});
