export const noirStyles = `
  :root {
    --bg: #080808; --surface: #101010; --surface2: #161616;
    --border: #1e1e1e; --text: #e8e8e8; --muted: #555; --muted2: #3a3a3a;
    --accent: #ffffff; --accent2: #888; --green: #4ade80; --red: #f87171;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: 'JetBrains Mono', 'Courier New', monospace; line-height: 1.6; }
  .container { max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }

  /* Hero */
  .hero { padding: 3rem 0 2.5rem; border-bottom: 1px solid var(--border); margin-bottom: 0.5rem; }
  .hero-headline { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.75rem; }
  h1 { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; }
  .hero-sub { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted); margin-top: 0.5rem; }
  .hero-archetype { margin-top: 1.5rem; color: var(--accent2); font-size: 0.9rem; max-width: 600px; line-height: 1.7; border-left: 2px solid var(--border); padding-left: 1rem; }

  /* Section headings */
  h2 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--muted); margin: 3rem 0 1.25rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }

  /* Stat grid */
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .stat-card { background: var(--surface); padding: 1.25rem 1rem; }
  .stat-value { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.03em; line-height: 1; }
  .stat-label { font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 0.4rem; }
  .delta { font-size: 0.7rem; margin-top: 0.4rem; }
  .delta.up { color: var(--green); }
  .delta.down { color: var(--red); }

  /* Heatmap */
  .heatmap { display: grid; grid-template-columns: repeat(24, 1fr); gap: 3px; margin-bottom: 0.4rem; }
  .heatmap-cell { aspect-ratio: 1; border-radius: 2px; background: var(--accent); }
  .heatmap-axis { display: flex; justify-content: space-between; font-size: 0.6rem; color: var(--muted); margin-top: 0.25rem; }

  /* Language bars */
  .lang-row { margin-bottom: 0.875rem; }
  .lang-meta { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.3rem; color: var(--text); }
  .bar { height: 4px; background: var(--surface2); border-radius: 2px; }
  .bar-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s; }

  /* Repo list */
  .repo-list { list-style: none; }
  .repo-list li { display: flex; justify-content: space-between; align-items: baseline; padding: 0.625rem 0; border-bottom: 1px solid var(--border); }
  .repo-name { font-size: 0.875rem; }
  .repo-owner { color: var(--muted); }
  .repo-count { font-size: 0.75rem; color: var(--muted); white-space: nowrap; margin-left: 1rem; }

  /* Narrative */
  .narrative { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent); padding: 1.75rem; margin: 1rem 0; }
  .headline { font-size: 1.1rem; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem; }

  /* Arc chart */
  .arc-sub { font-size: 0.75rem; color: var(--muted); margin-bottom: 1rem; }
  .arc-chart { display: flex; align-items: flex-end; gap: 4px; height: 80px; }
  .arc-bar { flex: 1; background: var(--accent); opacity: 0.6; border-radius: 2px 2px 0 0; position: relative; min-height: 4px; transition: opacity 0.2s; }
  .arc-bar:hover { opacity: 1; }
  .arc-label { display: none; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); font-size: 0.55rem; color: var(--muted); white-space: nowrap; padding-bottom: 2px; }
  .arc-bar:hover .arc-label { display: block; }

  /* Footer */
  footer { margin-top: 5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); font-size: 0.7rem; color: var(--muted); }
  a { color: var(--accent2); text-decoration: none; }
  a:hover { color: var(--text); }
`;
