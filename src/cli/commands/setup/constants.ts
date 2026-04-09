export const PROVIDERS = ['openrouter', 'groq', 'gemini', 'openai', 'anthropic', 'grok'] as const;

export const DEFAULT_MODELS: Record<string, string> = {
  openrouter: 'meta-llama/llama-3.3-70b-instruct:free',
  groq: 'llama-3.3-70b-versatile',
  gemini: 'gemini-2.0-flash',
  openai: 'gpt-4o-mini',
  anthropic: 'claude-haiku-4-5-20251001',
  grok: 'grok-3-mini',
};
