import React, { useState } from 'react';
import MobileSimulator from './components/Q1_MobileSimulator';
import TabletDesktopComparison from './components/Q2_TabletDesktopComparison';
import CrossBrowserInspector from './components/Q3_CrossBrowserInspector';
import LighthouseAuditScore from './components/Q4_LighthouseAuditScore';
import ChatGptLighthouseFix from './components/Q5_ChatGptLighthouseFix';

/**
 * Session 8: Responsive Testing, Cross-Browser Compatibility & Lighthouse Audits
 * Combines Questions 1 through 5 in an interactive, responsive dashboard.
 */
export default function Session8App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandRow}>
            <div style={styles.logoBadge}>🚀</div>
            <div>
              <h1 style={styles.title}>Session 8: Responsive Design, Cross-Browser & Lighthouse Audit</h1>
              <p style={styles.subtitle}>
                Mobile & Tablet Emulation (iPhone X, iPad), Chrome vs Firefox Compatibility, and Lighthouse Performance Engineering
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav style={styles.navRow}>
            {[
              { id: 'all', label: 'All Questions', icon: '🌟' },
              { id: 'q1', label: 'Q1: iPhone X Mobile View', icon: '📱' },
              { id: 'q2', label: 'Q2: Tablet vs Desktop Layouts', icon: '💻' },
              { id: 'q3', label: 'Q3: Chrome vs Firefox Issues', icon: '🌐' },
              { id: 'q4', label: 'Q4: Lighthouse Performance Score', icon: '⚡' },
              { id: 'q5', label: 'Q5: ChatGPT Fix & Code Diff', icon: '🤖' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabBtn,
                  backgroundColor: activeTab === tab.id ? '#3b82f6' : '#1f2937',
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
        {(activeTab === 'all' || activeTab === 'q1') && (
          <section style={styles.section}>
            <MobileSimulator />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q2') && (
          <section style={styles.section}>
            <TabletDesktopComparison />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q3') && (
          <section style={styles.section}>
            <CrossBrowserInspector />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q4') && (
          <section style={styles.section}>
            <LighthouseAuditScore />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q5') && (
          <section style={styles.section}>
            <ChatGptLighthouseFix />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
          Capstone Mini Project — Session 8 • Performance Optimization, DevTools Emulation & Web Vitals
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#030712',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  header: {
    background: 'linear-gradient(135deg, #111827 0%, #030712 100%)',
    borderBottom: '1px solid #1f2937',
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
  logoBadge: {
    fontSize: '28px',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #3b82f6'
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
    color: '#9ca3af'
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
    borderTop: '1px solid #1f2937',
    backgroundColor: '#020617',
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto'
  }
};
