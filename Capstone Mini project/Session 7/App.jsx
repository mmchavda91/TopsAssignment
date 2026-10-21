import React, { useState } from 'react';
import AiQuoteGenerator from './components/AiQuoteGenerator';
import ResumeSummaryForm from './components/ResumeSummaryForm';
import BlogSummarizer from './components/BlogSummarizer';

/**
 * Session 7: AI APIs & Integration (Q1 to Q5)
 * Combines Hugging Face Inference API, OpenAI /completions,
 * Prompt Tuning, and Error Handling.
 */
export default function Session7App() {
  const [activeTab, setActiveTab] = useState('all');
  const [sharedHfToken, setSharedHfToken] = useState('');
  const [sharedOpenAiKey, setSharedOpenAiKey] = useState('');

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandRow}>
            <div style={styles.aiLogo}>✨</div>
            <div>
              <h1 style={styles.title}>Session 7: Generative AI APIs & React Integration</h1>
              <p style={styles.subtitle}>
                Hugging Face (gpt2), OpenAI (/completions), Prompt Tuning, Error Handling & Summarization
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav style={styles.navRow}>
            {[
              { id: 'all', label: 'All AI Questions', icon: '🌟' },
              { id: 'q1_q3', label: 'Q1 & Q3: Hugging Face Quotes (Tuning)', icon: '💡' },
              { id: 'q2_q5', label: 'Q2 & Q5: Resume Summary (OpenAI & Errors)', icon: '📄' },
              { id: 'q4', label: 'Q4: Blog Summarizer (fetchBlogSummary)', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabBtn,
                  backgroundColor: activeTab === tab.id ? '#6366f1' : '#1e1e2f',
                  color: activeTab === tab.id ? '#ffffff' : '#9ca3af',
                  fontWeight: activeTab === tab.id ? '800' : '500'
                }}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={styles.main}>
        {/* Q1 & Q3 Section */}
        {(activeTab === 'all' || activeTab === 'q1_q3') && (
          <section style={styles.section}>
            <AiQuoteGenerator defaultToken={sharedHfToken} />
          </section>
        )}

        {/* Q2 & Q5 Section */}
        {(activeTab === 'all' || activeTab === 'q2_q5') && (
          <section style={styles.section}>
            <ResumeSummaryForm defaultOpenAiKey={sharedOpenAiKey} />
          </section>
        )}

        {/* Q4 Section */}
        {(activeTab === 'all' || activeTab === 'q4') && (
          <section style={styles.section}>
            <BlogSummarizer defaultOpenAiKey={sharedOpenAiKey} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          Capstone Mini Project — Session 7 • AI Inference APIs & Modern React Integrations
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a14',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  header: {
    background: 'linear-gradient(135deg, #131326 0%, #0a0a14 100%)',
    borderBottom: '1px solid #1f1f38',
    padding: '24px 20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  aiLogo: {
    fontSize: '28px',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #6366f1'
  },
  title: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#94a3b8'
  },
  navRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tabBtn: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.15s ease'
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '28px 20px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    flex: 1
  },
  section: {
    width: '100%'
  },
  footer: {
    borderTop: '1px solid #1a1a2e',
    backgroundColor: '#07070e',
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto'
  }
};
