import type { CommitData } from '../types.js';
import { COMMITS_QUERY } from './queries.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchCommits(graphql: any, username: string, from: Date, to: Date): Promise<CommitData[]> {
  const data = await graphql(COMMITS_QUERY, {
    login: username,
    from: from.toISOString(),
    to: to.toISOString(),
  });

  const commits: CommitData[] = [];
  const repos = data.user.contributionsCollection.commitContributionsByRepository;

  for (const repoEntry of repos) {
    const repoName: string = repoEntry.repository.nameWithOwner;
    for (const contribution of repoEntry.contributions.nodes) {
      for (let i = 0; i < contribution.commitCount; i++) {
        commits.push({
          sha: `${repoName}-${contribution.occurredAt}-${i}`,
          repo: repoName,
          message: '',
          timestamp: new Date(contribution.occurredAt),
          additions: 0,
          deletions: 0,
        });
      }
    }
  }

  return commits;
}
