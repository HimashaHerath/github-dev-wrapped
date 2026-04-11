import type { RawActivity, ActivitySignals, HourDistribution, LanguageStat, RepoStat } from '../types.js';

export function deriveSignals(activity: RawActivity): ActivitySignals {
  const { commits, pullRequests, issues } = activity;

  const totalCommits = commits.length;
  const totalPRsOpened = pullRequests.filter(p => !p.isReview).length;
  const totalPRsMerged = pullRequests.filter(p => p.state === 'merged').length;
  const totalReviews = pullRequests.filter(p => p.isReview).length;
  const totalIssuesOpened = issues.filter(i => i.action === 'opened').length;
  const totalIssuesClosed = issues.filter(i => i.action === 'closed').length;

  const hourDistribution = computeHourDistribution(commits.map(c => c.timestamp));
  const peakHour = hourDistribution.reduce((a, b) => (a.count >= b.count ? a : b), { hour: 0, count: 0 }).hour;

  const topLanguages = computeLanguageStats(commits);
  const topRepos = computeRepoStats(pullRequests, commits);
  const focusScore = computeFocusScore(commits);
  const reviewGenerosity = (totalReviews + totalPRsOpened) === 0
    ? 0
    : totalReviews / (totalReviews + totalPRsOpened);

  const streak = computeStreak(commits.map(c => c.timestamp));

  return {
    totalCommits, totalPRsOpened, totalPRsMerged, totalReviews,
    totalIssuesOpened, totalIssuesClosed, streak, peakHour,
    hourDistribution, topLanguages, topRepos, focusScore, reviewGenerosity,
  };
}

function computeHourDistribution(timestamps: Date[]): HourDistribution[] {
  const counts = new Array<number>(24).fill(0);
  for (const t of timestamps) counts[t.getUTCHours()]++;
  return counts.map((count, hour) => ({ hour, count }));
}

function computeLanguageStats(commits: RawActivity['commits']): LanguageStat[] {
  const counts = new Map<string, number>();
  for (const c of commits) {
    if (c.language) counts.set(c.language, (counts.get(c.language) ?? 0) + 1);
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  return [...counts.entries()]
    .map(([language, commitCount]) => ({
      language,
      commitCount,
      percentage: Math.round((commitCount / total) * 100),
    }))
    .sort((a, b) => b.commitCount - a.commitCount)
    .slice(0, 5);
}

function computeRepoStats(prs: RawActivity['pullRequests'], commits: RawActivity['commits']): RepoStat[] {
  const map = new Map<string, RepoStat>();

  for (const c of commits) {
    const entry = map.get(c.repo) ?? { repo: c.repo, commits: 0, prsOpened: 0, prsMerged: 0 };
    entry.commits++;
    map.set(c.repo, entry);
  }

  for (const pr of prs.filter(p => !p.isReview)) {
    const entry = map.get(pr.repo) ?? { repo: pr.repo, commits: 0, prsOpened: 0, prsMerged: 0 };
    entry.prsOpened++;
    if (pr.state === 'merged') entry.prsMerged++;
    map.set(pr.repo, entry);
  }

  return [...map.values()].sort((a, b) => b.commits - a.commits).slice(0, 5);
}

function computeFocusScore(commits: RawActivity['commits']): number {
  if (commits.length === 0) return 0;
  const repoCounts = new Map<string, number>();
  for (const c of commits) repoCounts.set(c.repo, (repoCounts.get(c.repo) ?? 0) + 1);
  const max = Math.max(...repoCounts.values());
  return Math.round((max / commits.length) * 100);
}

function computeStreak(timestamps: Date[]): number {
  if (timestamps.length === 0) return 0;
  const days = new Set(timestamps.map(t => t.toISOString().slice(0, 10)));
  const sorted = [...days].sort();
  let maxStreak = 1, cur = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr.getTime() - prev.getTime()) / 86400000;
    cur = diff === 1 ? cur + 1 : 1;
    maxStreak = Math.max(maxStreak, cur);
  }
  return maxStreak;
}
