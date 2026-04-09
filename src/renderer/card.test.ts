import { describe, it, expect } from 'vitest';
import { buildCardSvgData } from './card.js';
import type { LLMOutput, ActivitySignals } from '../types.js';

const signals: ActivitySignals = {
  totalCommits: 42, totalPRsOpened: 3, totalPRsMerged: 2,
  totalReviews: 5, totalIssuesOpened: 1, totalIssuesClosed: 1,
  streak: 7, peakHour: 22, hourDistribution: [],
  topLanguages: [], topRepos: [], focusScore: 90, reviewGenerosity: 0.6,
};

const llm: LLMOutput = {
  archetype: 'You are a night coder.',
  evolution: null,
  headline: 'LATE-NIGHT ARCHITECT STRIKES',
};

describe('buildCardSvgData', () => {
  it('returns headline and stats for the card', () => {
    const data = buildCardSvgData(signals, llm);
    expect(data.headline).toBe('LATE-NIGHT ARCHITECT STRIKES');
    expect(data.stats).toHaveLength(3);
    expect(data.stats[0].value).toBe('42');
  });

  it('uses fallback headline when llm is null', () => {
    const data = buildCardSvgData(signals, null);
    expect(data.headline).toBe('GITHUB ACTIVITY REPORT');
  });
});
