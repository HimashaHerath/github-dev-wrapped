import OpenAI from 'openai';
import type { LLMRawOutput } from '../types.js';

export async function complete(apiKey: string, model: string, prompt: string, baseURL?: string): Promise<LLMRawOutput> {
  const client = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const text = response.choices[0]?.message?.content ?? '{}';
  return parseOutput(text);
}

export function parseOutput(text: string): LLMRawOutput {
  const parsed = JSON.parse(text);
  return {
    archetype: String(parsed.archetype ?? ''),
    evolution: parsed.evolution ? String(parsed.evolution) : null,
    headline: String(parsed.headline ?? ''),
  };
}
