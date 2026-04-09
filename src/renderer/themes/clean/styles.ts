export const cleanStyles = `
  :root { --bg: #ffffff; --surface: #f9f9f9; --border: #e5e5e5; --text: #1a1a1a; --muted: #999; --accent: #1a1a1a; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #1a1a1a; --surface: #222; --border: #333; --text: #f0f0f0; --muted: #777; --accent: #f0f0f0; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; }
  .container { max-width: 760px; margin: 0 auto; padding: 3rem 1.5rem; }
  h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.25rem; }
  h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); margin: 2rem 0 0.75rem; }
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1.5rem; }
  .stat-value { font-size: 2.5rem; font-weight: 300; }
  .stat-label { font-size: 0.75rem; color: var(--muted); }
  .bar { height: 6px; background: var(--border); border-radius: 3px; margin: 0.3rem 0; }
  .bar-fill { height: 100%; background: var(--accent); border-radius: 3px; }
  .narrative { border-left: 3px solid var(--border); padding-left: 1.5rem; margin: 1rem 0; }
  .headline { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem; }
  .heatmap { display: grid; grid-template-columns: repeat(24, 1fr); gap: 3px; }
  .heatmap-cell { aspect-ratio: 1; border-radius: 3px; background: var(--border); }
  .repo-list { list-style: none; }
  .repo-list li { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
  footer { margin-top: 4rem; font-size: 0.75rem; color: var(--muted); }
  a { color: inherit; }
`;
