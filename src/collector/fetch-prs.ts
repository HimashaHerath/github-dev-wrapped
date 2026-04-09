import type { PullRequestData } from '../types.js';
import { PRS_QUERY } from './queries.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchPRs(graphql: any, username: string, from: Date, to: Date): Promise<PullRequestData[]> {
  const data = await graphql(PRS_QUERY, {
    login: username,
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const prs: PullRequestData[] = [];
  const collection = data.user.contributionsCollection;

  for (const repoEntry of collection.pullRequestContributionsByRepository) {
    const repoName: string = repoEntry.repository.nameWithOwner;
    for (const { pullRequest: pr } of repoEntry.contributions.nodes) {
      prs.push({
        id: pr.id,
        repo: repoName,
        title: pr.title,
        state: pr.state === 'MERGED' ? 'merged' : pr.state === 'OPEN' ? 'open' : 'closed',
        createdAt: new Date(pr.createdAt),
        mergedAt: pr.mergedAt ? new Date(pr.mergedAt) : null,
        isReview: false,
      });
    }
  }

  for (const { pullRequest: pr, occurredAt } of collection.pullRequestReviewContributions.nodes) {
    prs.push({
      id: `review-${pr.id}-${occurredAt}`,
      repo: pr.repository.nameWithOwner,
      title: '',
      state: 'closed',
      createdAt: new Date(occurredAt),
      mergedAt: null,
      isReview: true,
    });
  }

  return prs;
}
