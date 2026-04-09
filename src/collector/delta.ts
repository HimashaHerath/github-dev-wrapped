import type { ActivitySignals, SignalDelta } from '../types.js';

export function computeDelta(current: ActivitySignals, previous: ActivitySignals): SignalDelta {
  return {
    commits: current.totalCommits - previous.totalCommits,
    prsOpened: current.totalPRsOpened - previous.totalPRsOpened,
    reviews: current.totalReviews - previous.totalReviews,
    streak: current.streak - previous.streak,
    peakHour: current.peakHour - previous.peakHour,
    focusScore: current.focusScore - previous.focusScore,
    reviewGenerosity: current.reviewGenerosity - previous.reviewGenerosity,
  };
}
