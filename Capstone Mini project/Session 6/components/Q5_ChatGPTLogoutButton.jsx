import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Question 5:
 * Use ChatGPT to generate a logout button component that updates
 * the Context state and signs out the user from Firebase Auth,
 * then test and integrate it into your app.
 *
 * Hint: Ask ChatGPT for a React logout button that works with
 * Firebase Auth and Context API.
 */
export default function ChatGPTLogoutButton({ onLoggedOut }) {
  const { logout, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPromptInfo, setShowPromptInfo] = useState(false);

  // ChatGPT Generated Logout Function
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (!confirmLogout) return;

    try {
      setLoading(true);
      // 1. Sign out from Firebase Auth
      // 2. Clear Context state (currentUser -> null)
      await logout();

      if (onLoggedOut) {
        onLoggedOut();
      }
    } catch (error) {
      console.error("ChatGPT Logout Component Error:", error);
      alert("Failed to log out: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={handleLogout}
        disabled={loading}
        title="Sign out with Firebase Auth & clear Context"
        style={styles.logoutBtn}
      >
        🚪 {loading ? 'Signing out...' : 'Sign Out'}
      </button>

      <button
        type="button"
        onClick={() => setShowPromptInfo(!showPromptInfo)}
        title="View ChatGPT Prompt & Code details"
        style={styles.infoBtn}
      >
        🤖 Q5 AI Code
      </button>

      {/* Modal/Popup showing ChatGPT Prompt & Solution */}
      {showPromptInfo && (
        <div style={styles.modalOverlay} onClick={() => setShowPromptInfo(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>🤖 ChatGPT Generated Logout Component (Q5)</h3>
              <button onClick={() => setShowPromptInfo(false)} style={styles.closeBtn}>✕</button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.promptBox}>
                <strong>Prompt Sent to ChatGPT:</strong>
                <p style={styles.promptText}>
                  "Generate a React logout button component that updates the Context state and signs out the user from Firebase Auth."
                </p>
              </div>

              <h4 style={{ fontSize: '13px', margin: '12px 0 6px', color: '#1db954' }}>Generated Code:</h4>
              <pre style={styles.codeSnippet}>
{`import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // 1. Signs out user from Firebase Auth
      // 2. Resets Context currentUser state to null
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Sign Out
    </button>
  );
}`}
              </pre>

              <div style={styles.checklist}>
                <div>✅ Firebase Auth <code>signOut()</code> called</div>
                <div>✅ React Context <code>currentUser</code> set to <code>null</code></div>
                <div>✅ Protected Route redirects immediately to Login page</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  logoutBtn: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    padding: '7px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease'
  },
  infoBtn: {
    backgroundColor: '#374151',
    color: '#1db954',
    border: '1px solid #4b5563',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  modalContent: {
    backgroundColor: '#181818',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '14px',
    maxWidth: '520px',
    width: '90%',
    border: '1px solid #333'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    paddingBottom: '10px'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '18px',
    cursor: 'pointer'
  },
  modalBody: {
    marginTop: '12px'
  },
  promptBox: {
    backgroundColor: '#242424',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #333',
    fontSize: '12px'
  },
  promptText: {
    margin: '4px 0 0',
    fontStyle: 'italic',
    color: '#1db954'
  },
  codeSnippet: {
    backgroundColor: '#0f172a',
    color: '#38bdf8',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '11px',
    overflowX: 'auto',
    margin: 0,
    fontFamily: 'monospace'
  },
  checklist: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#86efac',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
};
