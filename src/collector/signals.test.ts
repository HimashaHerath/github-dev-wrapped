import { describe, it, expect } from 'vitest';
import { deriveSignals } from './signals.js';
import type { RawActivity, Period } from '../types.js';

const period: Period = {
  frequency: 'weekly',
  label: '2026-W15',
  startDate: new Date('2026-04-06T00:00:00Z'),
  endDate: new Date('2026-04-12T23:59:59Z'),
};

describe('deriveSignals', () => {
  it('counts commits correctly', () => {
    const activity: RawActivity = {
      period,
      commits: [
        { sha: '1', repo: 'a/b', message: 'fix', timestamp: new Date('2026-04-07T10:00:00Z'), additions: 10, deletions: 2 },
        { sha: '2', repo: 'a/b', message: 'feat', timestamp: new Date('2026-04-08T22:00:00Z'), additions: 5, deletions: 0 },
      ],
      pullRequests: [],
      issues: [],
      stars: [],
    };
    const signals = deriveSignals(activity);
    expect(signals.totalCommits).toBe(2);
  });

  it('identifies peak hour', () => {
    const commits = Array.from({ length: 5 }, (_, i) => ({
      sha: String(i), repo: 'a/b', message: '',
      timestamp: new Date('2026-04-07T22:00:00Z'),
      additions: 0, deletions: 0,
    }));
    const activity: RawActivity = { period, commits, pullRequests: [], issues: [], stars: [] };
    const signals = deriveSignals(activity);
    expect(signals.peakHour).toBe(22);
  });

  it('computes focus score of 100 for single repo', () => {
    const activity: RawActivity = {
      period,
      commits: [
        { sha: '1', repo: 'a/b', message: '', timestamp: new Date('2026-04-07T10:00:00Z'), additions: 0, deletions: 0 },
        { sha: '2', repo: 'a/b', message: '', timestamp: new Date('2026-04-08T10:00:00Z'), additions: 0, deletions: 0 },
      ],
      pullRequests: [], issues: [], stars: [],
    };
    const signals = deriveSignals(activity);
    expect(signals.focusScore).toBe(100);
  });
});
