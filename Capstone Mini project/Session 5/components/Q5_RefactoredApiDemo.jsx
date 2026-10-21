import React, { useState } from 'react';
import { db, collection, getDocs } from '../firebase';

/**
 * Question 5:
 * Take an existing Firestore API call from your code (for example, the function
 * that fetches playlists or reviews), and ask ChatGPT:
 * "Refactor this API call with async/await and better error handling."
 * Paste ChatGPT's improved version into your code and test that it works as expected.
 */

// ============================================================================
// 1. BEFORE (Original API Call using basic Promise .then() / .catch() chain)
// ============================================================================
export function fetchPlaylistsOriginal(dbInstance) {
  return getDocs(collection(dbInstance, 'playlists'))
    .then((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    })
    .catch((error) => {
      console.log('Error:', error);
      return [];
    });
}

// ============================================================================
// 2. AFTER: ChatGPT's Refactored Version with async/await & Granular Error Handling
// ============================================================================
/**
 * Prompt sent to ChatGPT:
 * "Refactor this API call with async/await and better error handling."
 *
 * ChatGPT's Refactored Solution:
 * - Replaced raw promise chains with clean async/await
 * - Structured return object { success, data, error, code }
 * - Detailed error differentiation (permission-denied, unavailable, not-found)
 * - Safe validation to prevent undefined errors if collection is empty
 */
export async function fetchPlaylistsRefactored(dbInstance) {
  try {
    if (!dbInstance) {
      throw new Error("Firestore instance (db) is not initialized.");
    }

    const playlistsColRef = collection(dbInstance, 'playlists');
    const querySnapshot = await getDocs(playlistsColRef);

    // Handle empty state gracefully
    if (querySnapshot.empty) {
      return {
        success: true,
        data: [],
        message: "No playlists found in Firestore 'playlists' collection.",
        timestamp: new Date().toISOString()
      };
    }

    const playlists = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));

    return {
      success: true,
      data: playlists,
      count: playlists.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    // Categorize Firestore error codes for meaningful UI messages
    let userFriendlyMessage = "An unexpected error occurred while fetching playlists.";

    switch (error.code) {
      case 'permission-denied':
        userFriendlyMessage = "Access denied! Check your Firestore Security Rules.";
        break;
      case 'unavailable':
        userFriendlyMessage = "Firebase server is currently unreachable. Check your internet connection.";
        break;
      case 'not-found':
        userFriendlyMessage = "The requested collection or document does not exist.";
        break;
      default:
        userFriendlyMessage = error.message || userFriendlyMessage;
    }

    return {
      success: false,
      data: [],
      error: userFriendlyMessage,
      originalError: error.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString()
    };
  }
}

export default function RefactoredApiDemo({ dbInstance = db }) {
  const [activeView, setActiveView] = useState('diff'); // 'diff' | 'test'
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const [testMode, setTestMode] = useState('normal'); // 'normal' | 'simulate-error'

  const runTest = async (mode = 'normal') => {
    setTesting(true);
    setTestMode(mode);

    // Simulate either real call or intentional error test
    if (mode === 'simulate-error') {
      setTimeout(async () => {
        // Pass a dummy invalid object to trigger the refactored error handling branch
        const result = await fetchPlaylistsRefactored(null);
        setTestResult(result);
        setTesting(false);
      }, 400);
    } else {
      const result = await fetchPlaylistsRefactored(dbInstance);
      setTestResult(result);
      setTesting(false);
    }
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>Question 5</div>
          <h3 style={styles.title}>🤖 ChatGPT API Refactoring & async/await Verification</h3>
          <p style={styles.subtitle}>
            Prompt: <em>"Refactor this API call with async/await and better error handling."</em>
          </p>
        </div>

        <div style={styles.btnGroup}>
          <button
            onClick={() => setActiveView('diff')}
            style={{
              ...styles.tabBtn,
              backgroundColor: activeView === 'diff' ? '#6366f1' : '#f3f4f6',
              color: activeView === 'diff' ? '#ffffff' : '#374151'
            }}
          >
            📋 Code Comparison (Before vs After)
          </button>
          <button
            onClick={() => setActiveView('test')}
            style={{
              ...styles.tabBtn,
              backgroundColor: activeView === 'test' ? '#6366f1' : '#f3f4f6',
              color: activeView === 'test' ? '#ffffff' : '#374151'
            }}
          >
            🧪 Run Live Tests
          </button>
        </div>
      </div>

      {activeView === 'diff' ? (
        /* Diff / Code View */
        <div style={styles.diffContainer}>
          <div style={styles.promptBanner}>
            <span style={{ fontSize: '18px' }}>💬</span>
            <div>
              <strong>ChatGPT Prompt:</strong>
              <div style={styles.promptQuote}>
                "Refactor this API call with async/await and better error handling."
              </div>
            </div>
          </div>

          <div style={styles.codeColumns}>
            {/* Before Column */}
            <div style={styles.codeColumn}>
              <div style={styles.columnHeaderRed}>❌ Before: Promise Chain (Basic)</div>
              <pre style={styles.codeBlock}>
{`// Basic .then() / .catch() chain
function fetchPlaylists(db) {
  return getDocs(collection(db, 'playlists'))
    .then((snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      return list;
    })
    .catch((err) => {
      console.log(err);
      return []; // Silent failure!
    });
}`}
              </pre>
              <div style={styles.explanationRed}>
                ⚠️ <strong>Issues:</strong> No error differentiation, silent failures, hard to read nested promises, no empty state check.
              </div>
            </div>

            {/* After Column */}
            <div style={styles.codeColumn}>
              <div style={styles.columnHeaderGreen}>✅ After: ChatGPT Improved (async/await)</div>
              <pre style={styles.codeBlock}>
{`// Modern async/await + Detailed Error Handling
async function fetchPlaylists(db) {
  try {
    if (!db) throw new Error("DB not ready");

    const querySnapshot = 
      await getDocs(collection(db, 'playlists'));

    if (querySnapshot.empty) {
      return { success: true, data: [], message: 'Empty' };
    }

    const playlists = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data: playlists };
  } catch (error) {
    let msg = error.code === 'permission-denied'
      ? 'Access Denied! Check Security Rules.'
      : error.message;

    return { success: false, data: [], error: msg };
  }
}`}
              </pre>
              <div style={styles.explanationGreen}>
                ✨ <strong>Improvements:</strong> Clean async/await, structured return object, explicit permission & network error codes, empty check.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Live Interactive Testing View */
        <div style={styles.testContainer}>
          <div style={styles.testActions}>
            <button
              onClick={() => runTest('normal')}
              disabled={testing}
              style={styles.testRunBtn}
            >
              ▶️ Test Real Firestore Fetch (async/await)
            </button>
            <button
              onClick={() => runTest('simulate-error')}
              disabled={testing}
              style={styles.testErrorBtn}
            >
              ⚡ Test Error Handling Branch (Simulate Failure)
            </button>
          </div>

          {testing && (
            <div style={styles.loadingBox}>
              <span style={styles.spinner}>⏳</span> Running ChatGPT refactored API call...
            </div>
          )}

          {testResult && !testing && (
            <div style={styles.resultBox}>
              <div style={{
                ...styles.resultHeader,
                backgroundColor: testResult.success ? '#dcfce7' : '#fee2e2',
                color: testResult.success ? '#166534' : '#991b1b'
              }}>
                <span>
                  {testResult.success ? '✅ API Execution Success' : '⚠️ Gracefully Handled Error'}
                </span>
                <span style={{ fontSize: '12px' }}>Mode: {testMode}</span>
              </div>

              <div style={styles.resultBody}>
                <p><strong>Response Object:</strong></p>
                <pre style={styles.jsonBlock}>
                  {JSON.stringify(testResult, null, 2)}
                </pre>

                {testResult.success && (
                  <p style={{ marginTop: '10px', color: '#16a34a' }}>
                    🎉 Refactored async/await function fetched <strong>{testResult.data?.length || 0}</strong> playlists cleanly!
                  </p>
                )}
                {!testResult.success && (
                  <p style={{ marginTop: '10px', color: '#dc2626' }}>
                    🛡️ Caught error gracefully without crashing React app: <strong>"{testResult.error}"</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    border: '1px solid #f3f4f6',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    borderBottom: '1px solid #f3f4f6',
    paddingBottom: '16px',
    marginBottom: '20px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    fontSize: '11px',
    fontWeight: '700',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827'
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#6b7280'
  },
  btnGroup: {
    display: 'flex',
    gap: '8px'
  },
  tabBtn: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  diffContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  promptBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#f8fafc',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '13px',
    color: '#334155'
  },
  promptQuote: {
    fontStyle: 'italic',
    color: '#4f46e5',
    fontWeight: '600',
    marginTop: '2px'
  },
  codeColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '16px'
  },
  codeColumn: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid #1e293b',
    display: 'flex',
    flexDirection: 'column'
  },
  columnHeaderRed: {
    backgroundColor: '#7f1d1d',
    color: '#fecaca',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: '700'
  },
  columnHeaderGreen: {
    backgroundColor: '#14532d',
    color: '#bbf7d0',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: '700'
  },
  codeBlock: {
    margin: 0,
    padding: '14px',
    color: '#f8fafc',
    fontSize: '12px',
    fontFamily: 'monospace',
    lineHeight: 1.5,
    overflowX: 'auto',
    flex: 1
  },
  explanationRed: {
    backgroundColor: '#1e293b',
    padding: '10px 14px',
    fontSize: '12px',
    color: '#fca5a5',
    borderTop: '1px solid #334155'
  },
  explanationGreen: {
    backgroundColor: '#1e293b',
    padding: '10px 14px',
    fontSize: '12px',
    color: '#86efac',
    borderTop: '1px solid #334155'
  },
  testContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  testActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  testRunBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  testErrorBtn: {
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  loadingBox: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    color: '#6b7280'
  },
  spinner: {
    display: 'inline-block',
    animation: 'spin 1s infinite linear'
  },
  resultBox: {
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  resultHeader: {
    padding: '10px 16px',
    fontWeight: '700',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resultBody: {
    padding: '16px',
    backgroundColor: '#ffffff'
  },
  jsonBlock: {
    backgroundColor: '#0f172a',
    color: '#38bdf8',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '12px',
    overflowX: 'auto',
    fontFamily: 'monospace'
  }
};
