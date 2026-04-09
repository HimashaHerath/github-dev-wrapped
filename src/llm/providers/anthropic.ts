import Anthropic from '@anthropic-ai/sdk';
import type { LLMRawOutput } from '../types.js';
import { parseOutput } from './openai.js';

export async function complete(apiKey: string, model: string, prompt: string): Promise<LLMRawOutput> {
  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '{}';
  return parseOutput(text);
}
