export async function validateModel(provider: string, model: string, apiKey: string): Promise<boolean> {
  try {
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

    // For anthropic/gemini — assume valid (would need separate validation logic)
    return true;
  } catch {
    return false;
  }
}
