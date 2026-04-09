import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMRawOutput } from '../types.js';
import { parseOutput } from './openai.js';

export async function complete(apiKey: string, model: string, prompt: string): Promise<LLMRawOutput> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const gemini = genAI.getGenerativeModel({ model, generationConfig: { responseMimeType: 'application/json' } });
  const result = await gemini.generateContent(prompt);
  return parseOutput(result.response.text());
}
