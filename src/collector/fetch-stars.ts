import type { StarredRepo } from '../types.js';
import { STARS_QUERY } from './queries.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchStars(graphql: any, username: string, from: Date, to: Date): Promise<StarredRepo[]> {
  const stars: StarredRepo[] = [];
  let cursor: string | undefined;

  while (true) {
    const data = await graphql(STARS_QUERY, { login: username, after: cursor });
    const { edges, pageInfo } = data.user.starredRepositories;

    for (const { starredAt, node } of edges) {
      const starDate = new Date(starredAt);
      if (starDate < from) return stars;
      if (starDate <= to) {
        stars.push({
          repo: node.nameWithOwner,
          language: node.primaryLanguage?.name ?? null,
          starredAt: starDate,
        });
      }
    }

    if (!pageInfo.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }

  return stars;
}
