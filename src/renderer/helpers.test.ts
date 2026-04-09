import { describe, it, expect } from 'vitest';
import { formatHour, deltaArrow, percentBar } from './helpers.js';

describe('formatHour', () => {
  it('formats midnight', () => expect(formatHour(0)).toBe('12am'));
  it('formats noon', () => expect(formatHour(12)).toBe('12pm'));
  it('formats 9am', () => expect(formatHour(9)).toBe('9am'));
  it('formats 10pm', () => expect(formatHour(22)).toBe('10pm'));
});

describe('deltaArrow', () => {
  it('returns ↑ for positive delta', () => expect(deltaArrow(5)).toBe('↑'));
  it('returns ↓ for negative delta', () => expect(deltaArrow(-3)).toBe('↓'));
  it('returns → for zero', () => expect(deltaArrow(0)).toBe('→'));
});

describe('percentBar', () => {
  it('returns width clamped to 100', () => expect(percentBar(150)).toBe(100));
  it('returns width for normal value', () => expect(percentBar(60)).toBe(60));
});
