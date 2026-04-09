export type LLMProvider = 'openai' | 'anthropic' | 'gemini' | 'groq' | 'openrouter' | 'grok';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiKey: string;
}

export interface LLMRawOutput {
  archetype: string;
  evolution: string | null;
  headline: string;
}
