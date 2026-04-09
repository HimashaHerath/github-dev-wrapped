import { complete as openaiComplete } from './openai.js';
import type { LLMRawOutput } from '../types.js';

export async function complete(apiKey: string, model: string, prompt: string): Promise<LLMRawOutput> {
  return openaiComplete(apiKey, model, prompt, 'https://api.x.ai/v1');
}
