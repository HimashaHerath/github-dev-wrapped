import { describe, it, expect } from 'vitest';
import { buildPrompt } from './prompt.js';
import type { PreprocessedInput } from './preprocess.js';

const input: PreprocessedInput = {
  periodLabel: '2026-W15',
  frequency: 'weekly',
  commits: 23,
  prsOpened: 2,
  prsMerged: 1,
  reviews: 4,
  streak: 5,
  peakHour: 22,
  focusScore: 85,
  reviewGenerosity: 67,
  topRepos: ['user/project-a', 'user/project-b'],
  topLanguages: ['TypeScript', 'Go'],
  delta: { commits: 8, streak: 2, focusScore: 15, peakHour: -1 },
  hasPreviousData: true,
};

describe('buildPrompt', () => {
  it('includes period label in prompt', () => {
    const prompt = buildPrompt(input, 'en');
    expect(prompt).toContain('2026-W15');
  });

  it('includes commit count', () => {
    const prompt = buildPrompt(input, 'en');
    expect(prompt).toContain('23');
  });

  it('requests JSON output with required fields', () => {
    const prompt = buildPrompt(input, 'en');
    expect(prompt).toContain('archetype');
    expect(prompt).toContain('evolution');
    expect(prompt).toContain('headline');
  });

  it('omits evolution instruction if no previous data', () => {
    const noHistory = { ...input, hasPreviousData: false, delta: null };
    const prompt = buildPrompt(noHistory, 'en');
    expect(prompt).not.toContain('evolution story');
  });
});
