export function generateWorkflowYaml(opts: {
  actionRef: string;
  frequency: 'weekly' | 'monthly';
  cron: string;
  theme: string;
  language: string;
  timezone: string;
  llmProvider: string;
  llmModel: string;
}): string {
  const keyEnvVar = getLlmKeyEnvVar(opts.llmProvider);
  return `name: GitHub Dev Wrapped

on:
  schedule:
    - cron: '${opts.cron}'
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  wrapped:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: ${opts.actionRef}
        with:
          github-token: \${{ secrets.GDW_PAT }}
          frequency: '${opts.frequency}'
          theme: '${opts.theme}'
          language: '${opts.language}'
          timezone: '${opts.timezone}'
          llm-provider: '${opts.llmProvider}'
          llm-model: '${opts.llmModel}'
          ${keyEnvVar}: \${{ secrets.GDW_LLM_KEY }}
`;
}

export function getCronFromFrequency(frequency: 'weekly' | 'monthly'): string {
  return frequency === 'weekly' ? '0 1 * * 1' : '0 1 1 * *';
}

function getLlmKeyEnvVar(provider: string): string {
  const map: Record<string, string> = {
    openai: 'openai-api-key',
    anthropic: 'anthropic-api-key',
    gemini: 'gemini-api-key',
    groq: 'groq-api-key',
    openrouter: 'openrouter-api-key',
    grok: 'grok-api-key',
  };
  return map[provider] ?? 'openai-api-key';
}
