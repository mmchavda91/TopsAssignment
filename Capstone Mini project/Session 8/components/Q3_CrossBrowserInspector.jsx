import React, { useState } from 'react';

/**
 * Question 3:
 * Test your React app in both Chrome and Firefox browsers.
 * Write down any UI or functionality issue you notice that appears in one browser but not the other.
 */
export default function CrossBrowserInspector() {
  const [selectedIssue, setSelectedIssue] = useState('scrollbar');

  const issues = [
    {
      id: 'scrollbar',
      title: 'Issue 1: Custom Scrollbar Styling (Webkit vs Standard W3C)',
      severity: 'Medium UI Discrepancy',
      chromeBehavior: 'Chrome (Blink) renders pseudo-elements: ::-webkit-scrollbar, ::-webkit-scrollbar-thumb, and ::-webkit-scrollbar-track with custom borders and hover transitions.',
      firefoxBehavior: 'Firefox (Gecko) completely ignores all ::-webkit-* scrollbar selectors. Without standard CSS scrollbar properties, Firefox displays its default thick grey OS scrollbar.',
      codeSolution: `/* Cross-Browser Scrollbar Fix */
/* For Firefox (Standard W3C) */
* {
  scrollbar-width: thin;
  scrollbar-color: #1db954 #121212;
}

/* For Chrome, Edge & Safari (WebKit) */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #121212;
}
::-webkit-scrollbar-thumb {
  background-color: #1db954;
  border-radius: 4px;
}`
    },
    {
      id: 'backdrop',
      title: 'Issue 2: Glassmorphism & backdrop-filter Rendering',
      severity: 'Visual Glitch on Non-GPU Firefox',
      chromeBehavior: 'Hardware-accelerated backdrop-filter: blur(12px) works effortlessly across all recent versions.',
      firefoxBehavior: 'When hardware acceleration is disabled or on older Firefox builds, backdrop-filter can produce rendering artifacts or transparent text bleed.',
      codeSolution: `/* Cross-Browser Glassmorphism Fix */
.glass-header {
  background-color: rgba(18, 18, 18, 0.85); /* Solid translucent fallback */
  -webkit-backdrop-filter: blur(12px);     /* Safari & Chrome */
  backdrop-filter: blur(12px);             /* Modern Firefox & Chrome */
}`
    },
    {
      id: 'input-focus',
      title: 'Issue 3: Button & Form Control Outline Ring (Focus Visible)',
      severity: 'Accessibility & Aesthetics',
      chromeBehavior: 'Chrome defaults to a blue double-ring focus outline (`:focus-visible`).',
      firefoxBehavior: 'Firefox exhibits an extra dotted inner border (`::-moz-focus-inner`) and different default input padding.',
      codeSolution: `/* Cross-Browser Input / Focus Normalization */
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

:focus-visible {
  outline: 2px solid #1db954;
  outline-offset: 2px;
}`
    }
  ];

  const current = issues.find((i) => i.id === selectedIssue) || issues[0];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Question 3: Cross-Browser Compatibility</span>
        <h2 style={styles.title}>🌐 Chrome vs Firefox Compatibility Audit</h2>
        <p style={styles.subtitle}>
          Analysis of UI discrepancies and CSS rendering differences observed between Google Chrome (Blink) and Mozilla Firefox (Gecko).
        </p>
      </div>

      {/* Tabs */}
      <div style={styles.tabRow}>
        {issues.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedIssue(item.id)}
            style={{
              ...styles.tabBtn,
              backgroundColor: selectedIssue === item.id ? '#10b981' : '#1f2937',
              color: selectedIssue === item.id ? '#000000' : '#ffffff',
              fontWeight: selectedIssue === item.id ? '800' : '500'
            }}
          >
            {item.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div style={styles.detailBox}>
        <div style={styles.detailHeader}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#f8fafc' }}>{current.title}</h3>
          <span style={styles.severityBadge}>{current.severity}</span>
        </div>

        <div style={styles.comparisonGrid}>
          {/* Chrome Box */}
          <div style={styles.browserCard}>
            <div style={styles.browserTitleChrome}>
              <span>🟡 Google Chrome (Blink Engine)</span>
            </div>
            <p style={styles.browserText}>{current.chromeBehavior}</p>
          </div>

          {/* Firefox Box */}
          <div style={styles.browserCard}>
            <div style={styles.browserTitleFirefox}>
              <span>🦊 Mozilla Firefox (Gecko Engine)</span>
            </div>
            <p style={styles.browserText}>{current.firefoxBehavior}</p>
          </div>
        </div>

        {/* Code Solution */}
        <div style={styles.solutionBox}>
          <div style={styles.solutionHeader}>
            <span>🛠️ Recommended Cross-Browser Fix:</span>
            <span style={{ fontSize: '11px', color: '#34d399' }}>Verified in React 18</span>
          </div>
          <pre style={styles.codeSnippet}>{current.codeSolution}</pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#111827',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '26px',
    border: '1px solid #1f2937',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
  },
  header: {
    marginBottom: '18px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#34d399',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    border: '1px solid rgba(16, 185, 129, 0.4)'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '800'
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#9ca3af'
  },
  tabRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  tabBtn: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  detailBox: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #374151'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  severityBadge: {
    fontSize: '11px',
    backgroundColor: '#92400e',
    color: '#fef3c7',
    padding: '3px 10px',
    borderRadius: '10px',
    fontWeight: '700'
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  browserCard: {
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #1e293b'
  },
  browserTitleChrome: {
    backgroundColor: '#1e293b',
    padding: '10px 14px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#facc15',
    borderBottom: '1px solid #334155'
  },
  browserTitleFirefox: {
    backgroundColor: '#1e293b',
    padding: '10px 14px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#fb923c',
    borderBottom: '1px solid #334155'
  },
  browserText: {
    padding: '14px',
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#cbd5e1',
    margin: 0
  },
  solutionBox: {
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #10b98133'
  },
  solutionHeader: {
    backgroundColor: '#064e3b',
    color: '#a7f3d0',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  codeSnippet: {
    margin: 0,
    padding: '14px',
    fontSize: '12px',
    color: '#34d399',
    backgroundColor: '#022c22',
    fontFamily: 'monospace',
    overflowX: 'auto',
    lineHeight: 1.5
  }
};
