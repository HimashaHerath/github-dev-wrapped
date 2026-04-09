import type { IssueData } from '../types.js';
import { ISSUES_QUERY } from './queries.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchIssues(graphql: any, username: string, from: Date, to: Date): Promise<IssueData[]> {
  const data = await graphql(ISSUES_QUERY, {
    login: username,
    from: from.toISOString(),
    to: to.toISOString(),
  });

  return data.user.contributionsCollection.issueContributions.nodes.map(
    ({ occurredAt, issue }: { occurredAt: string; issue: { id: string; title: string; repository: { nameWithOwner: string }; state: string } }) => ({
      id: issue.id,
      repo: issue.repository.nameWithOwner,
      title: issue.title,
      action: issue.state === 'OPEN' ? 'opened' : 'closed',
      timestamp: new Date(occurredAt),
    } satisfies IssueData)
  );
}
