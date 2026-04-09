import type { RawActivity, Period } from '../types.js';
import { fetchCommits } from './fetch-commits.js';
import { fetchPRs } from './fetch-prs.js';
import { fetchIssues } from './fetch-issues.js';
import { fetchStars } from './fetch-stars.js';
import { graphql as createGraphql } from '@octokit/graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function collectActivity(username: string, period: Period, token: string): Promise<RawActivity> {
  const graphql = createGraphql.defaults({ headers: { authorization: `token ${token}` } }) as any;
  const { startDate, endDate } = period;

  const [commits, pullRequests, issues, stars] = await Promise.all([
    fetchCommits(graphql, username, startDate, endDate),
    fetchPRs(graphql, username, startDate, endDate),
    fetchIssues(graphql, username, startDate, endDate),
    fetchStars(graphql, username, startDate, endDate),
  ]);

  return { period, commits, pullRequests, issues, stars };
}
