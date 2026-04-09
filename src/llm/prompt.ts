import type { PreprocessedInput } from './preprocess.js';
import type { Language } from '../types.js';

const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English', ja: 'Japanese', 'zh-CN': 'Simplified Chinese',
  'zh-TW': 'Traditional Chinese', ko: 'Korean', es: 'Spanish',
  fr: 'French', de: 'German', pt: 'Portuguese', ru: 'Russian',
};

export function buildPrompt(input: PreprocessedInput, language: Language): string {
  const lang = LANGUAGE_NAMES[language] ?? 'English';
  const peak = `${input.peakHour}:00 UTC`;
  const deltaSection = input.hasPreviousData && input.delta
    ? `
Compared to the previous period:
- Commits changed by: ${input.delta.commits > 0 ? '+' : ''}${input.delta.commits}
- Streak changed by: ${input.delta.streak > 0 ? '+' : ''}${input.delta.streak} days
- Focus score changed by: ${input.delta.focusScore > 0 ? '+' : ''}${input.delta.focusScore}
- Peak coding hour shifted by: ${input.delta.peakHour > 0 ? '+' : ''}${input.delta.peakHour} hours`
    : '';

  return `You are writing a developer activity report. Respond in ${lang}.

Here is the developer's activity for period ${input.periodLabel}:
- Commits: ${input.commits}
- PRs opened: ${input.prsOpened}, merged: ${input.prsMerged}
- Code reviews done: ${input.reviews}
- Longest streak: ${input.streak} days
- Peak coding hour: ${peak}
- Focus score: ${input.focusScore}/100 (100 = all commits in one repo)
- Review generosity: ${input.reviewGenerosity}% of PRs were reviews for others
- Top repos: ${input.topRepos.join(', ') || 'none'}
- Top languages: ${input.topLanguages.join(', ') || 'unknown'}
${deltaSection}

Write a short, vivid developer personality profile. Be specific, surprising, and direct.
${input.hasPreviousData ? 'Include a one-paragraph evolution story comparing this period to the previous one.' : ''}

Respond with ONLY valid JSON in this exact shape:
{
  "archetype": "One or two sentences describing their coding personality this period. Be concrete and specific.",
  "evolution": ${input.hasPreviousData ? '"One paragraph about how their behavior changed vs last period. Be direct and insightful."' : 'null'},
  "headline": "A SINGLE ALL-CAPS PUNCHY LINE (max 8 words) for their profile card. Like a news headline."
}`;
}
