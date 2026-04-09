import type { PeriodData } from '../types.js';

export interface PreprocessedInput {
  periodLabel: string;
  frequency: string;
  commits: number;
  prsOpened: number;
  prsMerged: number;
  reviews: number;
  streak: number;
  peakHour: number;
  focusScore: number;
  reviewGenerosity: number;
  topRepos: string[];
  topLanguages: string[];
  delta: {
    commits: number;
    streak: number;
    focusScore: number;
    peakHour: number;
  } | null;
  hasPreviousData: boolean;
}

export function preprocess(data: PeriodData): PreprocessedInput {
  const { period, signals, delta } = data;

  return {
    periodLabel: period.label,
    frequency: period.frequency,
    commits: signals.totalCommits,
    prsOpened: signals.totalPRsOpened,
    prsMerged: signals.totalPRsMerged,
    reviews: signals.totalReviews,
    streak: signals.streak,
    peakHour: signals.peakHour,
    focusScore: signals.focusScore,
    reviewGenerosity: Math.round(signals.reviewGenerosity * 100),
    topRepos: signals.topRepos.slice(0, 3).map(r => r.repo),
    topLanguages: signals.topLanguages.slice(0, 3).map(l => l.language),
    delta: delta
      ? { commits: delta.commits, streak: delta.streak, focusScore: delta.focusScore, peakHour: delta.peakHour }
      : null,
    hasPreviousData: delta !== null,
  };
}
