import { Command } from 'commander';
import { generateContent } from '../../llm/index.js';
import { getPeriod } from '../../collector/date-range.js';
import { getPeriodFilePath } from '../../deployer/period.js';
import { readPeriodData, writePeriodData } from '../../deployer/orphan-branch.js';
import { spinner } from '../spinner.js';
import type { Frequency, Language } from '../../types.js';
import type { LLMProvider } from '../../llm/types.js';

export const generateCommand = new Command('generate')
  .description('Generate AI narrative for the current period')
  .option('--date <YYYY-MM-DD>', 'target date within the period')
  .action(async (opts: { date?: string }) => {
    const frequency = (process.env.FREQUENCY ?? 'weekly') as Frequency;
    const timezone = process.env.TIMEZONE ?? 'UTC';
    const language = (process.env.LANGUAGE ?? 'en') as Language;
    const dataDir = process.env.DATA_DIR ?? './data';
    const provider = (process.env.LLM_PROVIDER ?? '') as LLMProvider;
    const model = process.env.LLM_MODEL ?? '';
    const apiKey = getApiKey(provider);

    if (!provider || !model || !apiKey) {
      console.error('LLM_PROVIDER, LLM_MODEL, and the provider API key env var are required');
      process.exit(1);
    }

    const period = getPeriod(frequency, opts.date, timezone);
    const filePath = getPeriodFilePath(frequency, period.label);
    const data = readPeriodData(dataDir, filePath);

    if (!data) {
      console.error(`No data found for ${period.label}. Run fetch first.`);
      process.exit(1);
    }

    const s = spinner('Generating AI narrative...');
    const llm = await generateContent(data, { provider, model, apiKey }, language);
    data.llm = llm;
    writePeriodData(dataDir, filePath, data);
    s.stop(`Generated: ${llm.headline}`);
  });

function getApiKey(provider: LLMProvider): string {
  const map: Record<LLMProvider, string> = {
    openai: 'OPENAI_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
    gemini: 'GEMINI_API_KEY',
    groq: 'GROQ_API_KEY',
    openrouter: 'OPENROUTER_API_KEY',
    grok: 'GROK_API_KEY',
  };
  return process.env[map[provider]] ?? '';
}
