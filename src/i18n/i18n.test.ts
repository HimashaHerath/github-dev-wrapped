import { describe, it, expect } from 'vitest';
import { t } from './index.js';

describe('t', () => {
  it('returns English string for en', () => {
    expect(t('en', 'overview')).toBe('Overview');
  });

  it('returns streak label', () => {
    expect(t('en', 'streak')).toBe('Day Streak');
  });
});
