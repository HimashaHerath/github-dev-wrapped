export const cleanStyles = `
  :root {
    --bg: #fafafa; --surface: #ffffff; --surface2: #f0f0f0;
    --border: #e8e8e8; --text: #111111; --muted: #999; --accent: #111111;
    --green: #16a34a; --red: #dc2626;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #111; --surface: #1a1a1a; --surface2: #222; --border: #2a2a2a; --text: #f0f0f0; --muted: #666; --accent: #f0f0f0; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; }
  .container { max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }

  /* Hero */
  .hero { padding: 2.5rem 0 2rem; border-bottom: 1px solid var(--border); margin-bottom: 0.5rem; }
  .hero-eyebrow { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
  h1 { font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 700; letter-spacing: -0.02em; }
  .hero-sub { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.35rem; }
  .hero-archetype { margin-top: 1.25rem; color: var(--muted); font-size: 0.9rem; max-width: 580px; line-height: 1.7; }

  /* Section headings */
  h2 { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted); margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }

  /* Stat grid */
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1.5rem; }
  .stat-card { padding: 0.25rem 0; }
  .stat-value { font-size: 2rem; font-weight: 300; letter-spacing: -0.03em; line-height: 1.1; }
  .stat-label { font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem; }
  .delta { font-size: 0.7rem; margin-top: 0.25rem; }
  .delta.up { color: var(--green); }
  .delta.down { color: var(--red); }

  /* Heatmap */
  .heatmap { display: grid; grid-template-columns: repeat(24, 1fr); gap: 3px; }
  .heatmap-cell { aspect-ratio: 1; border-radius: 3px; background: var(--accent); }
  .heatmap-axis { display: flex; justify-content: space-between; font-size: 0.6rem; color: var(--muted); margin-top: 0.4rem; }

  /* Language bars */
  .lang-row { margin-bottom: 0.875rem; }
  .lang-meta { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.3rem; }
  .bar { height: 4px; background: var(--surface2); border-radius: 3px; }
  .bar-fill { height: 100%; background: var(--accent); border-radius: 3px; }

  /* Repo list */
  .repo-list { list-style: none; }
  .repo-list li { display: flex; justify-content: space-between; align-items: baseline; padding: 0.625rem 0; border-bottom: 1px solid var(--border); }
  .repo-name { font-size: 0.875rem; }
  .repo-owner { color: var(--muted); }
  .repo-count { font-size: 0.75rem; color: var(--muted); margin-left: 1rem; }

  /* Narrative */
  .narrative { border-left: 3px solid var(--border); padding-left: 1.5rem; margin: 1rem 0; }
  .headline { font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem; }

  /* Arc */
  .arc-sub { font-size: 0.75rem; color: var(--muted); margin-bottom: 1rem; }
  .arc-chart { display: flex; align-items: flex-end; gap: 4px; height: 80px; }
  .arc-bar { flex: 1; background: var(--accent); opacity: 0.3; border-radius: 2px 2px 0 0; position: relative; min-height: 4px; }
  .arc-bar:hover { opacity: 0.7; }
  .arc-label { display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); font-size: 0.55rem; color: var(--muted); white-space: nowrap; padding-bottom: 2px; }
  .arc-bar:hover .arc-label { display: block; }

  /* Footer */
  footer { margin-top: 4rem; padding-top: 1.5rem; border-top: 1px solid var(--border); font-size: 0.7rem; color: var(--muted); }
  a { color: var(--muted); text-decoration: none; }
  a:hover { color: var(--text); }
`;
