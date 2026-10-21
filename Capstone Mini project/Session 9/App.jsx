import React, { useState } from 'react';
import NetlifyDeployment from './components/Q1_NetlifyDeployment';
import FirebaseHostingConfig from './components/Q2_FirebaseHostingConfig';
import CustomDomainManager from './components/Q3_CustomDomainManager';
import CiCdPipelineExplainer from './components/Q4_CiCdPipelineExplainer';
import ChatGptDeploymentGuide from './components/Q5_ChatGptDeploymentGuide';

/**
 * Session 9: Cloud Deployment, Hosting, Custom Domains & CI/CD Pipelines
 * Combines Questions 1 through 5 in an interactive, responsive dashboard.
 */
export default function Session9App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandRow}>
            <div style={styles.logoBadge}>🚀</div>
            <div>
              <h1 style={styles.title}>Session 9: Production Deployment & CI/CD Pipelines</h1>
              <p style={styles.subtitle}>
                Netlify, Firebase Hosting, Custom Domains (DNS & SSL), CI/CD Automation & AI Deployment Guides
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav style={styles.navRow}>
            {[
              { id: 'all', label: 'All Deployment Questions', icon: '🌟' },
              { id: 'q1', label: 'Q1: Netlify Deploy ("React Deployment Test")', icon: '🌐' },
              { id: 'q2', label: 'Q2: Firebase Hosting (No 404s)', icon: '🔥' },
              { id: 'q3', label: 'Q3: Custom Domain & DNS', icon: '🌍' },
              { id: 'q4', label: 'Q4: CI/CD Pipeline Benefits', icon: '🔄' },
              { id: 'q5', label: 'Q5: AI Guide & Gotcha Fix', icon: '🤖' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabBtn,
                  backgroundColor: activeTab === tab.id ? '#38bdf8' : '#1e293b',
                  color: activeTab === tab.id ? '#0f172a' : '#ffffff',
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
            <NetlifyDeployment />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q2') && (
          <section style={styles.section}>
            <FirebaseHostingConfig />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q3') && (
          <section style={styles.section}>
            <CustomDomainManager />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q4') && (
          <section style={styles.section}>
            <CiCdPipelineExplainer />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'q5') && (
          <section style={styles.section}>
            <ChatGptDeploymentGuide />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
          Capstone Mini Project — Session 9 • Cloud Hosting, Edge CDNs, DNS Architecture & DevOps
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#020617',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  header: {
    background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
    borderBottom: '1px solid #1e293b',
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
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #38bdf8'
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
    borderTop: '1px solid #1e293b',
    backgroundColor: '#020617',
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto'
  }
};
