import React, { useState } from 'react';

/**
 * Question 4:
 * Write a short explanation (3-4 sentences) of what CI/CD means
 * and list two ways it could help you manage future updates to your deployed React apps.
 */
export default function CiCdPipelineExplainer() {
  const [activeStep, setActiveStep] = useState(2);

  const pipelineSteps = [
    { num: 1, title: '1. Git Push', desc: 'Developer commits code to GitHub', icon: '💻' },
    { num: 2, title: '2. CI Build & Test', desc: 'Runs linter, unit tests & npm run build', icon: '⚙️' },
    { num: 3, title: '3. Quality Gate', desc: 'Verifies bundle size & zero errors', icon: '🛡️' },
    { num: 4, title: '4. CD Production Deploy', desc: 'Deploys to Netlify / Firebase CDN', icon: '🚀' }
  ];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Question 4: DevOps & Automation</span>
        <h2 style={styles.title}>🔄 CI/CD Pipeline & Modern React Release Management</h2>
        <p style={styles.subtitle}>
          Continuous Integration (CI) and Continuous Deployment (CD) principles for modern software delivery.
        </p>
      </div>

      {/* 3-4 Sentence CI/CD Explanation (Q4 Requirement) */}
      <div style={styles.explanationBox}>
        <h3 style={{ margin: '0 0 10px', fontSize: '16px', color: '#38bdf8' }}>
          📖 What is CI/CD? (Short Explanation)
        </h3>
        <p style={styles.explanationText}>
          <strong>CI/CD stands for Continuous Integration and Continuous Deployment.</strong> It is an automated software engineering practice where code changes pushed by developers are automatically built, linted, and tested against a test suite (Continuous Integration). Once all automated checks pass, the updated application is automatically packaged and deployed to live production edge servers like Netlify or Firebase without requiring manual commands (Continuous Deployment). This completely eliminates human deployment errors and keeps your web application continuously updated, stable, and production-ready.
        </p>
      </div>

      {/* Two Ways CI/CD Helps Manage Future Updates (Q4 Requirement) */}
      <div style={styles.benefitsGrid}>
        <div style={styles.benefitCard}>
          <div style={styles.benefitIcon}>🛡️</div>
          <div>
            <h4 style={styles.benefitTitle}>1. Automated Testing & Broken Code Prevention</h4>
            <p style={styles.benefitDesc}>
              Whenever you push a bug fix or new feature, the CI server automatically executes <code>npm test</code> and <code>npm run build</code>. If any component crashes, syntax breaks, or dependencies fail, the deployment is instantly aborted, guaranteeing that broken code never reaches live users.
            </p>
          </div>
        </div>

        <div style={styles.benefitCard}>
          <div style={styles.benefitIcon}>⚡</div>
          <div>
            <h4 style={styles.benefitTitle}>2. Zero-Downtime Instant Releases & 1-Click Rollbacks</h4>
            <p style={styles.benefitDesc}>
              Merging a pull request automatically updates your Netlify or Firebase CDN nodes worldwide within seconds without server downtime. If an unexpected runtime bug slips through, Netlify/Firebase allows you to rollback to any previous working commit with a single click.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Interactive Diagram */}
      <div style={styles.pipelineBox}>
        <h4 style={{ margin: '0 0 14px', fontSize: '13px', color: '#94a3b8' }}>
          Interactive CI/CD Pipeline Flowchart:
        </h4>
        <div style={styles.pipelineRow}>
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div
                onClick={() => setActiveStep(step.num)}
                style={{
                  ...styles.stepNode,
                  borderColor: activeStep === step.num ? '#38bdf8' : '#334155',
                  backgroundColor: activeStep === step.num ? '#1e293b' : '#0f172a'
                }}
              >
                <span style={{ fontSize: '24px' }}>{step.icon}</span>
                <strong style={{ fontSize: '13px', color: activeStep === step.num ? '#38bdf8' : '#f8fafc' }}>
                  {step.title}
                </strong>
                <span style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
                  {step.desc}
                </span>
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div style={styles.connectorArrow}>➔</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
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
    backgroundColor: 'rgba(129, 140, 248, 0.2)',
    color: '#818cf8',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    border: '1px solid rgba(129, 140, 248, 0.4)'
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
  explanationBox: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
    marginBottom: '20px'
  },
  explanationText: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.7,
    color: '#e2e8f0'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '22px'
  },
  benefitCard: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '18px',
    border: '1px solid #334155',
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start'
  },
  benefitIcon: {
    fontSize: '28px',
    backgroundColor: '#0f172a',
    width: '46px',
    height: '46px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  benefitTitle: {
    margin: '0 0 6px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#38bdf8'
  },
  benefitDesc: {
    margin: 0,
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#cbd5e1'
  },
  pipelineBox: {
    backgroundColor: '#020617',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #334155'
  },
  pipelineRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    overflowX: 'auto',
    paddingBottom: '8px'
  },
  stepNode: {
    flex: '1 1 180px',
    padding: '16px 12px',
    borderRadius: '10px',
    border: '1.5px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  connectorArrow: {
    fontSize: '18px',
    color: '#64748b'
  }
};
