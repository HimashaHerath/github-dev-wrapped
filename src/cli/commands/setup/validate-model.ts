export async function validateModel(provider: string, model: string, apiKey: string): Promise<boolean> {
  try {
    if (provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/models', {
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      });
      return res.ok;
    }

    if (provider === 'gemini') {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      return res.ok;
    }

    const baseURLs: Record<string, string> = {
      openai: 'https://api.openai.com/v1',
      groq: 'https://api.groq.com/openai/v1',
      openrouter: 'https://openrouter.ai/api/v1',
      grok: 'https://api.x.ai/v1',
    };

    if (baseURLs[provider]) {
      const res = await fetch(`${baseURLs[provider]}/models`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      return res.ok;
    }

    return true;
  } catch {
    return false;
  }
}
