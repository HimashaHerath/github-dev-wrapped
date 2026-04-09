// Period types
export type Frequency = 'weekly' | 'monthly';

export interface Period {
  frequency: Frequency;
  label: string;      // e.g. "2026-W14" or "2026-04"
  startDate: Date;
  endDate: Date;
}

// Raw collected data from GitHub API
export interface CommitData {
  sha: string;
  repo: string;
  message: string;
  timestamp: Date;
  additions: number;
  deletions: number;
}

export interface PullRequestData {
  id: string;
  repo: string;
  title: string;
  state: 'open' | 'merged' | 'closed';
  createdAt: Date;
  mergedAt: Date | null;
  isReview: boolean;
}

export interface IssueData {
  id: string;
  repo: string;
  title: string;
  action: 'opened' | 'closed' | 'commented';
  timestamp: Date;
}

export interface StarredRepo {
  repo: string;
  language: string | null;
  starredAt: Date;
}

export interface RawActivity {
  period: Period;
  commits: CommitData[];
  pullRequests: PullRequestData[];
  issues: IssueData[];
  stars: StarredRepo[];
}

// Derived signals
export interface HourDistribution {
  hour: number;   // 0–23
  count: number;
}

export interface LanguageStat {
  language: string;
  commitCount: number;
  percentage: number;
}

export interface RepoStat {
  repo: string;
  commits: number;
  prsOpened: number;
  prsMerged: number;
}

export interface ActivitySignals {
  totalCommits: number;
  totalPRsOpened: number;
  totalPRsMerged: number;
  totalReviews: number;
  totalIssuesOpened: number;
  totalIssuesClosed: number;
  streak: number;
  peakHour: number;
  hourDistribution: HourDistribution[];
  topLanguages: LanguageStat[];
  topRepos: RepoStat[];
  focusScore: number;
  reviewGenerosity: number;
}

// Evolution delta (current period vs previous)
export interface SignalDelta {
  commits: number;
  prsOpened: number;
  reviews: number;
  streak: number;
  peakHour: number;
  focusScore: number;
  reviewGenerosity: number;
}

// LLM-generated content
export interface LLMOutput {
  archetype: string;
  evolution: string | null;
  headline: string;
}

// Full period data (stored as JSON in orphan branch)
export interface PeriodData {
  period: Period;
  signals: ActivitySignals;
  delta: SignalDelta | null;
  llm: LLMOutput | null;
  generatedAt: string;
}

// Renderer config
export type Theme = 'noir' | 'clean';
export type Language = 'en' | 'ja' | 'zh-CN' | 'zh-TW' | 'ko' | 'es' | 'fr' | 'de' | 'pt' | 'ru';

export interface RenderConfig {
  theme: Theme;
  language: Language;
  timezone: string;
  baseUrl: string;
  siteTitle: string;
}
