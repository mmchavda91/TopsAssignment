import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Question 4:
 * Persist the user's login session using Firebase Auth so that refreshing
 * the browser does not log out the user automatically.
 */
export default function SessionPersistenceIndicator() {
  const { currentUser } = useAuth();
  const [refreshCount, setRefreshCount] = useState(() => {
    return Number(sessionStorage.getItem('test_refresh_count') || 0);
  });

  const handleTestReload = () => {
    sessionStorage.setItem('test_refresh_count', String(refreshCount + 1));
    window.location.reload();
  };

  return (
    <div style={styles.card}>
      <div style={styles.badge}>Question 4: Session Persistence</div>
      <h3 style={styles.title}>🔄 Firebase Auth Session Persistence Indicator</h3>
      <p style={styles.subtitle}>
        Firebase Auth automatically preserves the session in <code>browserLocalPersistence</code> (IndexedDB / LocalStorage) so refreshing the page does not log out the user.
      </p>

      <div style={styles.statusBox}>
        <div style={styles.statusRow}>
          <span style={styles.statusKey}>Current Auth State:</span>
          <span style={{
            ...styles.statusVal,
            color: currentUser ? '#10b981' : '#f59e0b'
          }}>
            {currentUser ? '✅ Authenticated User Active' : '⏳ No User Signed In'}
          </span>
        </div>

        {currentUser && (
          <>
            <div style={styles.statusRow}>
              <span style={styles.statusKey}>Persisted User Email:</span>
              <span style={styles.statusVal}><code>{currentUser.email}</code></span>
            </div>
            <div style={styles.statusRow}>
              <span style={styles.statusKey}>Persistence Type:</span>
              <span style={styles.statusVal}><code>browserLocalPersistence (Standard)</code></span>
            </div>
            <div style={styles.statusRow}>
              <span style={styles.statusKey}>Page Refreshes Tested:</span>
              <span style={styles.statusVal}><strong>{refreshCount}</strong> times (Session stayed alive!)</span>
            </div>
          </>
        )}
      </div>

      <div style={styles.actionRow}>
        <button
          onClick={handleTestReload}
          disabled={!currentUser}
          style={{
            ...styles.reloadBtn,
            opacity: currentUser ? 1 : 0.6,
            cursor: currentUser ? 'pointer' : 'not-allowed'
          }}
        >
          🔄 Test Browser Refresh (F5 / Reload)
        </button>
        <span style={styles.hint}>
          {currentUser
            ? 'Click to reload the page and observe that you remain logged in!'
            : 'Sign in first via Q1 to test session persistence.'}
        </span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#181818',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #282828',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '18px',
    fontWeight: '800'
  },
  subtitle: {
    margin: '0 0 16px',
    fontSize: '13px',
    color: '#9ca3af',
    lineHeight: 1.5
  },
  statusBox: {
    backgroundColor: '#121212',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #2a2a2a',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px'
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    flexWrap: 'wrap',
    gap: '6px'
  },
  statusKey: {
    color: '#9ca3af'
  },
  statusVal: {
    fontWeight: '600'
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  reloadBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    transition: 'background-color 0.15s ease'
  },
  hint: {
    fontSize: '12px',
    color: '#6b7280'
  }
};
