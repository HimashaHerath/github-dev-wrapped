import { describe, it, expect, vi } from 'vitest';
import { fetchCommits } from './fetch-commits.js';

const mockGraphql = vi.fn();

describe('fetchCommits', () => {
  it('maps GraphQL response to CommitData array', async () => {
    mockGraphql.mockResolvedValueOnce({
      user: {
        contributionsCollection: {
          commitContributionsByRepository: [
            {
              repository: {
                nameWithOwner: 'user/repo',
                primaryLanguage: { name: 'TypeScript' },
              },
              contributions: {
                nodes: [
                  { occurredAt: '2026-04-07T22:00:00Z', commitCount: 3 },
                ],
              },
            },
          ],
        },
      },
    });

    const result = await fetchCommits(mockGraphql, 'user', new Date('2026-04-06'), new Date('2026-04-12'));

    expect(result).toHaveLength(3);
    expect(result[0].repo).toBe('user/repo');
    expect(result[0].timestamp).toBeInstanceOf(Date);
  });

  it('returns empty array if no contributions', async () => {
    mockGraphql.mockResolvedValueOnce({
      user: {
        contributionsCollection: {
          commitContributionsByRepository: [],
        },
      },
    });
    const result = await fetchCommits(mockGraphql, 'user', new Date('2026-04-06'), new Date('2026-04-12'));
    expect(result).toHaveLength(0);
  });
});
