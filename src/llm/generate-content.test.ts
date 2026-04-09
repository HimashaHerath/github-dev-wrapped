import { describe, it, expect, vi } from 'vitest';
import { generateContent } from './generate-content.js';
import type { PeriodData } from '../types.js';

vi.mock('./providers/index.js', () => ({
  getProvider: () => ({
    complete: vi.fn().mockResolvedValue({
      archetype: 'You are a night coder.',
      evolution: null,
      headline: 'LATE-NIGHT ARCHITECT STRIKES AGAIN',
    }),
  }),
}));

const periodData: PeriodData = {
  period: { frequency: 'weekly', label: '2026-W15', startDate: new Date(), endDate: new Date() },
  signals: {
    totalCommits: 10, totalPRsOpened: 1, totalPRsMerged: 1,
    totalReviews: 2, totalIssuesOpened: 0, totalIssuesClosed: 0,
    streak: 3, peakHour: 22, hourDistribution: [],
    topLanguages: [], topRepos: [], focusScore: 80, reviewGenerosity: 0.5,
  },
  delta: null,
  llm: null,
  generatedAt: new Date().toISOString(),
};

describe('generateContent', () => {
  it('returns LLMOutput with archetype and headline', async () => {
    const result = await generateContent(periodData, {
      provider: 'openai', model: 'gpt-4o-mini', apiKey: 'test-key',
    }, 'en');

    expect(result.archetype).toBe('You are a night coder.');
    expect(result.headline).toBe('LATE-NIGHT ARCHITECT STRIKES AGAIN');
    expect(result.evolution).toBeNull();
  });
});
