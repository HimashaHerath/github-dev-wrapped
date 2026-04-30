# github-dev-wrapped

[![npm](https://img.shields.io/npm/v/github-dev-wrapped)](https://www.npmjs.com/package/github-dev-wrapped)

AI-powered weekly and monthly GitHub activity reports — deployed automatically to GitHub Pages, with zero backend infrastructure.

Like Spotify Wrapped, but for your code. Runs on your own GitHub account every week or month, generates a unique AI-written personality profile from your actual activity, and publishes a beautiful static report to GitHub Pages.

**[Live demo →](https://himashaherath.github.io/my-dev-wrapped/)** · **[npm package →](https://www.npmjs.com/package/github-dev-wrapped)**

---

## What you get

**Every run produces:**
- A full static HTML report page (no JavaScript, SEO optimized)
- An animated SVG card to embed in your GitHub profile README

**Two themes:**
- `noir` — dark, cinematic, monospace. Movie poster feel.
- `clean` — light, minimal, editorial. Portfolio-ready.

**Two frequencies:**
- `weekly` — runs every Monday, reports the previous complete week (Mon–Sun)
- `monthly` — first of each month, richer stats

**AI writes three things every run:**
1. **Archetype** — a unique sentence describing your coding personality this period, generated fresh from actual behavior signals. Never a fixed label.
2. **Evolution story** — one paragraph comparing this period to your history. Unlocks after 2+ periods.
3. **Headline** — one punchy line for the animated SVG card.

---

## Quick start

```bash
npx github-dev-wrapped setup
```

The wizard takes about 60 seconds and handles everything:
- Creates your report repo
- Stores your API keys as encrypted GitHub secrets
- Enables GitHub Pages
- Commits the workflow file
- Triggers your first report

**You need:**
- A GitHub Personal Access Token with `repo` and `workflow` scopes
- An API key from any supported LLM provider (free tiers work)

---

## Embed the card in your profile README

After your first run, add this to your GitHub profile `README.md`:

```html
<!-- Dark card -->
<img src="https://{username}.github.io/{repo}/screenshots/card-dark.svg" alt="Dev Wrapped" />

<!-- Light card -->
<img src="https://{username}.github.io/{repo}/screenshots/card.svg" alt="Dev Wrapped" />
```

---

## Supported LLM providers

All free tiers on OpenRouter, Groq, and Gemini make the full feature set available at $0/month.

| Provider | Free tier | Default model |
|---|---|---|
| **OpenRouter** | Yes (many free models) | `meta-llama/llama-3.3-70b-instruct:free` |
| **Groq** | Yes | `llama-3.3-70b-versatile` |
| **Gemini** | Yes | `gemini-2.0-flash` |
| OpenAI | No | `gpt-4o-mini` |
| Anthropic | No | `claude-haiku-4-5-20251001` |
| Grok (xAI) | No | `grok-3-mini` |

---

## What gets tracked

**Activity stats (from GitHub API):**
- Commits — time of day, day of week, repo
- PRs opened / merged / reviewed
- Issues opened / closed
- Languages written (by primary repo language)

**Derived signals:**
- Peak coding hour
- Coding streak (consecutive active days)
- Focus score — how concentrated your effort was (one repo vs many)
- Review generosity — helping others vs building your own stuff
- Language drift — stack shifting over time

**Evolution delta:**
Every run computes a delta against the previous period. Stored as JSON in your report repo so it compounds over time. Evolution data appears in reports after 2+ periods. The full narrative arc unlocks after 3+ months.

---

## How it works

```
GitHub Actions (weekly/monthly cron)
    │
    ├─ fetch      Collect activity from GitHub API → write JSON to repo
    ├─ generate   Send signals to LLM → get archetype + headline + evolution
    ├─ render     Build HTML report + animated SVG card from Handlebars templates
    └─ deploy     Force-push static output to gh-pages branch
```

All data lives in your report repo as JSON. No external database. No hosted backend. Period history is committed to the `main` branch under `data/`; `gh-pages` serves the rendered output.

---

## Configuration

The generated workflow file (`.github/workflows/wrapped.yml`) supports these inputs:

| Input | Default | Description |
|---|---|---|
| `frequency` | `weekly` | `weekly` or `monthly` |
| `theme` | `noir` | `noir` or `clean` |
| `language` | `en` | Report language (en, ja, zh-CN, zh-TW, ko, es, fr, de, pt, ru) |
| `timezone` | `UTC` | IANA timezone (e.g. `Asia/Colombo`) |
| `llm-provider` | — | Provider name (see table above) |
| `llm-model` | — | Model name |
| `date` | — | Target date `YYYY-MM-DD` for manual backfills via `workflow_dispatch`. Omit for automatic behaviour (weekly defaults to the previous complete week, monthly to the current month). |

---

## Cost

**$0/month on a public repo.**

- GitHub Actions: free for public repos
- LLM: one API call per period — OpenRouter/Groq/Gemini free tiers cover it
- GitHub Pages: free for public repos

---

## CLI commands

The npm package exposes internal commands used by the GitHub Action:

```bash
npx github-dev-wrapped setup          # Interactive setup wizard
npx github-dev-wrapped fetch          # Collect GitHub activity
npx github-dev-wrapped generate       # Generate AI narrative
npx github-dev-wrapped render         # Build HTML report + SVG card
npx github-dev-wrapped deploy         # Push to GitHub Pages
```

---

## Contributing

Contributions are welcome — bug fixes, new themes, additional LLM providers, language translations, or anything that makes the reports better.

**Getting started:**

```bash
git clone https://github.com/himasha/github-dev-wrapped
cd github-dev-wrapped
npm install
npm run build       # compile TypeScript
npm test            # run tests
```

**Key areas to contribute:**

- `src/collector/` — GitHub API queries and signal derivation
- `src/llm/providers/` — add a new LLM provider (implement the `LLMProvider` interface)
- `src/renderer/themes/` — add a new visual theme (Handlebars templates + styles)
- `src/i18n/locales/` — add or improve a language translation

Please open an issue before starting larger changes so we can align on approach. PRs should include tests where applicable and pass `npm test` cleanly.

**Releasing a new version:**

```bash
npm version patch   # or minor / major
git push --follow-tags
```

That's it — pushing the tag triggers the publish workflow which runs tests, builds, publishes to npm, and creates a GitHub Release automatically.

---

## License

MIT
