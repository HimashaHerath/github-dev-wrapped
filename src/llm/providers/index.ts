import type { LLMProvider, LLMRawOutput } from '../types.js';
import * as openai from './openai.js';
import * as anthropic from './anthropic.js';
import * as gemini from './gemini.js';
import * as groq from './groq.js';
import * as openrouter from './openrouter.js';
import * as grok from './grok.js';

export interface Provider {
  complete(apiKey: string, model: string, prompt: string): Promise<LLMRawOutput>;
}

const PROVIDERS: Record<LLMProvider, Provider> = {
  openai, anthropic, gemini, groq, openrouter, grok,
};

export function getProvider(name: LLMProvider): Provider {
  const p = PROVIDERS[name];
  if (!p) throw new Error(`Unknown LLM provider: ${name}`);
  return p;
}
