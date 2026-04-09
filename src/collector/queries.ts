export const COMMITS_QUERY = `
  query CommitsQuery($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        commitContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
            primaryLanguage { name }
          }
          contributions(first: 100) {
            nodes {
              occurredAt
              commitCount
            }
          }
        }
      }
    }
  }
`;

export const PRS_QUERY = `
  query PRsQuery($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository { nameWithOwner }
          contributions(first: 100) {
            nodes {
              pullRequest {
                id
                title
                state
                createdAt
                mergedAt
              }
            }
          }
        }
        pullRequestReviewContributions(first: 100) {
          nodes {
            occurredAt
            pullRequest {
              id
              repository { nameWithOwner }
            }
          }
        }
      }
    }
  }
`;

export const ISSUES_QUERY = `
  query IssuesQuery($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        issueContributions(first: 100) {
          nodes {
            occurredAt
            issue {
              id
              title
              repository { nameWithOwner }
              state
            }
          }
        }
      }
    }
  }
`;

export const STARS_QUERY = `
  query StarsQuery($login: String!, $after: String) {
    user(login: $login) {
      starredRepositories(first: 100, after: $after, orderBy: { field: STARRED_AT, direction: DESC }) {
        edges {
          starredAt
          node {
            nameWithOwner
            primaryLanguage { name }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;
