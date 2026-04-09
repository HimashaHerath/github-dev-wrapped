export const noirStyles = `
  :root { --bg: #0a0a0a; --surface: #111; --border: #222; --text: #e8e8e8; --muted: #666; --accent: #fff; --accent2: #888; }
  @media (prefers-color-scheme: light) {
    :root { --bg: #f5f5f5; --surface: #fff; --border: #e0e0e0; --text: #111; --muted: #888; --accent: #000; --accent2: #555; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: 'JetBrains Mono', 'Courier New', monospace; line-height: 1.6; }
  .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; }
  h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; }
  h2 { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted); margin: 2.5rem 0 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); padding: 1rem; }
  .stat-value { font-size: 2rem; font-weight: 900; }
  .stat-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
  .delta { font-size: 0.75rem; margin-top: 0.25rem; }
  .delta.up { color: #4ade80; }
  .delta.down { color: #f87171; }
  .bar { height: 8px; background: var(--border); border-radius: 2px; margin: 0.25rem 0; }
  .bar-fill { height: 100%; background: var(--accent); border-radius: 2px; }
  .narrative { background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 1rem 0; }
  .headline { font-size: 1.25rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem; }
  .heatmap { display: grid; grid-template-columns: repeat(24, 1fr); gap: 2px; }
  .heatmap-cell { aspect-ratio: 1; border-radius: 2px; }
  .repo-list { list-style: none; }
  .repo-list li { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
  footer { margin-top: 4rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.75rem; color: var(--muted); }
  a { color: var(--text); }
`;
