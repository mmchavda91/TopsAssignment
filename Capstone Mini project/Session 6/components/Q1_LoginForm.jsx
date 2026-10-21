import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Question 1:
 * Set up Firebase Authentication in a new React app and implement
 * a simple login form that lets users sign in with their email and password.
 */
export default function LoginForm({ onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      // Firebase Auth signInWithEmailAndPassword via AuthContext
      await login(email.trim(), password);
      setSuccess('Signed in successfully! Redirecting to Spotify Dashboard...');
      if (onLoginSuccess) {
        setTimeout(() => onLoginSuccess(), 600);
      }
    } catch (err) {
      console.error("Login failed:", err);
      let message = 'Failed to sign in. Please verify your credentials.';
      if (err.code === 'auth/user-not-found') message = 'No account found with this email.';
      if (err.code === 'auth/wrong-password') message = 'Incorrect password.';
      if (err.code === 'auth/invalid-email') message = 'Invalid email address format.';
      if (err.code === 'auth/too-many-requests') message = 'Too many attempts. Please try again later.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for easy testing
  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.badge}>Question 1</div>
        <h2 style={styles.title}>🔐 Sign In to Spotify Music</h2>
        <p style={styles.subtitle}>
          Sign in with your email and password using Firebase Authentication.
        </p>
      </div>

      {/* Error / Success Feedback */}
      {error && (
        <div style={styles.errorAlert}>
          <span>⚠️ {error}</span>
          <button onClick={() => setError('')} style={styles.closeBtn}>×</button>
        </div>
      )}
      {success && (
        <div style={styles.successAlert}>
          <span>✅ {success}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="e.g. musiclover@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.submitBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Authenticating...' : 'Sign In with Firebase Auth'}
        </button>
      </form>

      {/* Quick Demo Test Bar */}
      <div style={styles.quickBar}>
        <span style={styles.quickLabel}>⚡ Quick Demo Fill:</span>
        <button
          type="button"
          onClick={() => handleQuickDemo('vip.user@spotify.com', 'password123')}
          style={styles.quickBtn}
        >
          vip.user@spotify.com
        </button>
        <button
          type="button"
          onClick={() => handleQuickDemo('arijit.fan@music.in', 'securepass')}
          style={styles.quickBtn}
        >
          arijit.fan@music.in
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#181818',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    maxWidth: '460px',
    margin: '0 auto',
    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
    border: '1px solid #282828',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    color: '#1db954',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    border: '1px solid rgba(29, 185, 84, 0.4)'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '800',
    color: '#ffffff'
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#a7a7a7'
  },
  errorAlert: {
    backgroundColor: '#7f1d1d',
    color: '#fecaca',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  successAlert: {
    backgroundColor: '#14532d',
    color: '#bbf7d0',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '13px'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#d1d5db'
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid #333333',
    backgroundColor: '#242424',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  submitBtn: {
    backgroundColor: '#1db954',
    color: '#000000',
    border: 'none',
    padding: '12px',
    borderRadius: '24px',
    fontSize: '15px',
    fontWeight: '800',
    marginTop: '6px',
    transition: 'transform 0.1s ease'
  },
  quickBar: {
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #282828',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  quickLabel: {
    fontSize: '11px',
    color: '#9ca3af',
    fontWeight: '600'
  },
  quickBtn: {
    backgroundColor: '#282828',
    color: '#1db954',
    border: '1px solid #3e3e3e',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: 'monospace'
  }
};
