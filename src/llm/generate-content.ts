import type { PeriodData, LLMOutput, Language } from '../types.js';
import type { LLMConfig } from './types.js';
import { preprocess } from './preprocess.js';
import { buildPrompt } from './prompt.js';
import { getProvider } from './providers/index.js';

export async function generateContent(data: PeriodData, config: LLMConfig, language: Language): Promise<LLMOutput> {
  const input = preprocess(data);
  const prompt = buildPrompt(input, language);
  const provider = getProvider(config.provider);
  const raw = await provider.complete(config.apiKey, config.model, prompt);

  return {
    archetype: raw.archetype,
    evolution: raw.evolution,
    headline: raw.headline,
  };
}
