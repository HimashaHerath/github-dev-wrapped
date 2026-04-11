import { Octokit } from '@octokit/rest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// libsodium-wrappers ESM bundle is incomplete; use CJS build instead
const sodium = require('libsodium-wrappers') as typeof import('libsodium-wrappers');

export async function createRepo(token: string, repoName: string): Promise<{ owner: string }> {
  const octokit = new Octokit({ auth: token });
  const { data: user } = await octokit.rest.users.getAuthenticated();
  try {
    await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      auto_init: true,
      private: false,
    });
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status !== 422) throw err;
    // Repo already exists — reuse it
  }
  return { owner: user.login };
}

export async function setSecret(token: string, owner: string, repo: string, name: string, value: string): Promise<void> {
  const octokit = new Octokit({ auth: token });
  await sodium.ready;
  const { data: key } = await octokit.rest.actions.getRepoPublicKey({ owner, repo });
  const messageBytes = Buffer.from(value);
  const keyBytes = Buffer.from(key.key, 'base64');
  const encrypted = sodium.crypto_box_seal(messageBytes, keyBytes);
  const encryptedB64 = Buffer.from(encrypted).toString('base64');
  await octokit.rest.actions.createOrUpdateRepoSecret({
    owner,
    repo,
    secret_name: name,
    encrypted_value: encryptedB64,
    key_id: key.key_id,
  });
}

export async function pushWorkflowFile(token: string, owner: string, repo: string, content: string): Promise<void> {
  const silent = { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} };
  const silentOctokit = new Octokit({ auth: token, log: silent });
  const octokit = new Octokit({ auth: token });
  const path = '.github/workflows/wrapped.yml';
  let sha: string | undefined;
  try {
    const { data } = await silentOctokit.rest.repos.getContent({ owner, repo, path });
    if (!Array.isArray(data)) sha = data.sha;
  } catch {
    // File doesn't exist yet — that's fine
  }
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: 'chore: add github-dev-wrapped workflow',
    content: Buffer.from(content).toString('base64'),
    ...(sha ? { sha } : {}),
  });
}

export async function enablePages(token: string, owner: string, repo: string): Promise<string> {
  try {
    await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source: { branch: 'gh-pages', path: '/' } }),
    });
  } catch {
    // Pages may already be enabled or not yet applicable
  }
  return `https://${owner}.github.io/${repo}`;
}
