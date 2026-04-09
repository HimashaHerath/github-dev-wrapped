import { describe, it, expect } from 'vitest';
import { computeDelta } from './delta.js';
import type { ActivitySignals } from '../types.js';

const base: ActivitySignals = {
  totalCommits: 10, totalPRsOpened: 2, totalPRsMerged: 1,
  totalReviews: 3, totalIssuesOpened: 1, totalIssuesClosed: 1,
  streak: 4, peakHour: 22, hourDistribution: [],
  topLanguages: [], topRepos: [], focusScore: 80, reviewGenerosity: 0.6,
};

describe('computeDelta', () => {
  it('computes positive deltas', () => {
    const current = { ...base, totalCommits: 15, streak: 6, peakHour: 22, focusScore: 90 };
    const delta = computeDelta(current, base);
    expect(delta.commits).toBe(5);
    expect(delta.streak).toBe(2);
    expect(delta.focusScore).toBe(10);
  });

  it('computes negative deltas', () => {
    const current = { ...base, totalCommits: 5 };
    const delta = computeDelta(current, base);
    expect(delta.commits).toBe(-5);
  });
});
