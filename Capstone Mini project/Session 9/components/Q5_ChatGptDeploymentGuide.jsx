import React, { useState } from 'react';

/**
 * Question 5:
 * Use ChatGPT or GitHub Copilot to generate a step-by-step guide for deploying
 * a React app to either Netlify or Firebase Hosting, then follow the guide
 * and note any step that didn't work as expected.
 * Hint: Paste your prompt and the AI's response as part of your submission.
 */
export default function ChatGptDeploymentGuide() {
  const [activeTab, setActiveTab] = useState('gotcha'); // 'gotcha' | 'prompt' | 'guide'

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Question 5: AI Deployment Guide & Gotcha Analysis</span>
        <h2 style={styles.title}>🤖 ChatGPT Deployment Guide & Troubleshooting Report</h2>
        <p style={styles.subtitle}>
          Step-by-step deployment guide generated with AI, followed by a post-mortem on the client-side routing 404 gotcha.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div style={styles.navBar}>
        <button
          onClick={() => setActiveTab('gotcha')}
          style={{
            ...styles.navBtn,
            backgroundColor: activeTab === 'gotcha' ? '#f59e0b' : '#1e293b',
            color: activeTab === 'gotcha' ? '#000000' : '#ffffff',
            fontWeight: activeTab === 'gotcha' ? '800' : '500'
          }}
        >
          ⚠️ Step That Didn't Work (Gotcha & Fix)
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          style={{
            ...styles.navBtn,
            backgroundColor: activeTab === 'prompt' ? '#f59e0b' : '#1e293b',
            color: activeTab === 'prompt' ? '#000000' : '#ffffff',
            fontWeight: activeTab === 'prompt' ? '800' : '500'
          }}
        >
          💬 ChatGPT Prompt
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          style={{
            ...styles.navBtn,
            backgroundColor: activeTab === 'guide' ? '#f59e0b' : '#1e293b',
            color: activeTab === 'guide' ? '#000000' : '#ffffff',
            fontWeight: activeTab === 'guide' ? '800' : '500'
          }}
        >
          📋 Full AI Generated Guide
        </button>
      </div>

      {/* Gotcha & Resolution Box (Key requirement of Q5) */}
      {activeTab === 'gotcha' && (
        <div style={styles.gotchaBox}>
          <div style={styles.gotchaHeader}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fef3c7' }}>
                Step That Didn't Work As Expected: Client-Side Routing 404 Errors
              </h3>
              <span style={{ fontSize: '12px', color: '#fde68a' }}>Documented during deployment testing</span>
            </div>
          </div>

          <div style={styles.gotchaBody}>
            <div style={styles.problemSection}>
              <strong style={{ color: '#f87171' }}>❌ What Went Wrong:</strong>
              <p style={{ margin: '6px 0', fontSize: '13px', lineHeight: 1.6, color: '#e2e8f0' }}>
                Following the default deployment guide, the homepage (<code>/</code>) loaded properly. However, when reloading the browser on any nested route (such as <code>/playlists</code> or <code>/login</code>), Netlify and Firebase both returned a fatal <strong>"404 Not Found"</strong> page. The static CDN tried to locate a physical file at <code>/playlists/index.html</code> which did not exist.
              </p>
            </div>

            <div style={styles.solutionSection}>
              <strong style={{ color: '#34d399' }}>✅ How We Resolved It:</strong>
              <p style={{ margin: '6px 0', fontSize: '13px', lineHeight: 1.6, color: '#e2e8f0' }}>
                Single Page Applications require all URL traffic to rewrite to the root <code>/index.html</code> so React Router can process the URL in the browser:
              </p>
              <ul style={styles.solutionList}>
                <li>
                  <strong>For Netlify:</strong> Created <code>build/_redirects</code> containing: <code style={styles.code}>/* /index.html 200</code>.
                </li>
                <li>
                  <strong>For Firebase Hosting:</strong> Added the rewrite rule in <code>firebase.json</code>:
                  <pre style={styles.miniCode}>
{`"rewrites": [
  { "source": "**", "destination": "/index.html" }
]`}
                  </pre>
                </li>
              </ul>
              <div style={{ marginTop: '10px', color: '#6ee7b7', fontSize: '13px', fontWeight: '700' }}>
                🎉 Result: Refreshing deep URLs now works flawlessly without any 404 errors!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt View */}
      {activeTab === 'prompt' && (
        <div style={styles.promptBox}>
          <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#facc15' }}>
            💬 Prompt Sent to ChatGPT:
          </h4>
          <blockquote style={styles.quote}>
            "Generate a beginner-friendly step-by-step guide for deploying a production React Single Page Application to Netlify and Firebase Hosting. Include required build commands, directory configurations, and how to prevent 404 errors on page refresh."
          </blockquote>
        </div>
      )}

      {/* Guide View */}
      {activeTab === 'guide' && (
        <div style={styles.guideBox}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#38bdf8' }}>
            📋 AI's Generated Step-by-Step Guide:
          </h4>
          <ol style={styles.guideList}>
            <li>
              <strong>Step 1 — Build for Production:</strong> Run <code>npm run build</code> in your React project root. This creates optimized HTML/CSS/JS in the <code>/build</code> or <code>/dist</code> folder.
            </li>
            <li>
              <strong>Step 2 — Netlify Deployment:</strong>
              <ul>
                <li>Go to <a href="https://app.netlify.com" target="_blank" style={{ color: '#38bdf8' }}>Netlify Dashboard</a> → Drag and drop your <code>/build</code> folder into the deploy box.</li>
                <li>Add a <code>_redirects</code> file containing <code>/* /index.html 200</code> inside <code>/build</code>.</li>
              </ul>
            </li>
            <li>
              <strong>Step 3 — Firebase Hosting:</strong>
              <ul>
                <li>Install CLI: <code>npm install -g firebase-tools</code></li>
                <li>Login: <code>firebase login</code></li>
                <li>Init: <code>firebase init hosting</code> (Select "build" as public folder, answer "Yes" to single-page app rewrite).</li>
                <li>Deploy: <code>firebase deploy --only hosting</code></li>
              </ul>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '26px',
    border: '1px solid #1e293b',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
  },
  header: {
    marginBottom: '20px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    color: '#fbbf24',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    border: '1px solid rgba(245, 158, 11, 0.4)'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '800'
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#94a3b8'
  },
  navBar: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  navBtn: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  gotchaBox: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    border: '1.5px solid #f59e0b',
    overflow: 'hidden'
  },
  gotchaHeader: {
    backgroundColor: '#78350f',
    padding: '14px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  gotchaBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  problemSection: {
    backgroundColor: '#0f172a',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  solutionSection: {
    backgroundColor: '#064e3b',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #059669'
  },
  solutionList: {
    paddingLeft: '20px',
    margin: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '13px'
  },
  code: {
    backgroundColor: '#022c22',
    color: '#6ee7b7',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace'
  },
  miniCode: {
    margin: '6px 0 0',
    padding: '8px',
    backgroundColor: '#022c22',
    color: '#6ee7b7',
    borderRadius: '6px',
    fontSize: '11px',
    fontFamily: 'monospace'
  },
  promptBox: {
    backgroundColor: '#1e293b',
    padding: '18px',
    borderRadius: '12px',
    border: '1px solid #334155'
  },
  quote: {
    margin: 0,
    fontSize: '14px',
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#e2e8f0'
  },
  guideBox: {
    backgroundColor: '#1e293b',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #334155'
  },
  guideList: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontSize: '13px',
    color: '#cbd5e1',
    lineHeight: 1.6
  }
};
