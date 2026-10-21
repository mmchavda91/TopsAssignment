import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavbarUserHeader from './components/Q2_NavbarUserHeader';
import LoginForm from './components/Q1_LoginForm';
import SpotifyDashboard from './components/Q3_SpotifyDashboard';
import SessionPersistenceIndicator from './components/Q4_SessionPersistenceIndicator';
import ChatGPTLogoutButton from './components/Q5_ChatGPTLogoutButton';

function MainAppContent() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(() => (currentUser ? 'dashboard' : 'login'));

  // Sync activeTab when user logs in or out
  React.useEffect(() => {
    if (currentUser && activeTab === 'login') {
      setActiveTab('dashboard');
    }
  }, [currentUser]);

  return (
    <div style={styles.layout}>
      {/* Q2: Top Navbar displaying current user email & Q5 logout */}
      <NavbarUserHeader />

      {/* Navigation Sub-bar */}
      <nav style={styles.subnav}>
        <div style={styles.subnavContainer}>
          {[
            { id: 'dashboard', label: 'Q3: Spotify Dashboard (Protected)', icon: '🎵', badge: currentUser ? 'Unlocked' : 'Locked' },
            { id: 'login', label: 'Q1: Login Form', icon: '🔐' },
            { id: 'persistence', label: 'Q4: Session Persistence', icon: '🔄' },
            { id: 'logoutInfo', label: 'Q5: ChatGPT Logout Info', icon: '🤖' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.navBtn,
                backgroundColor: activeTab === tab.id ? '#1db954' : '#1e1e1e',
                color: activeTab === tab.id ? '#000000' : '#ffffff',
                fontWeight: activeTab === tab.id ? '800' : '500'
              }}
            >
              <span>{tab.icon}</span> {tab.label}
              {tab.badge && (
                <span style={{
                  ...styles.miniBadge,
                  backgroundColor: tab.badge === 'Unlocked' ? 'rgba(0,0,0,0.2)' : '#7f1d1d',
                  color: tab.badge === 'Unlocked' ? '#000000' : '#fecaca'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Tab Content */}
      <main style={styles.main}>
        {activeTab === 'login' && (
          <div style={{ maxWidth: '480px', margin: '20px auto', width: '100%' }}>
            {currentUser ? (
              <div style={styles.alreadyLoggedInCard}>
                <p>✅ You are already signed in as <strong>{currentUser.email}</strong>.</p>
                <div style={{ marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button onClick={() => setActiveTab('dashboard')} style={styles.greenBtn}>
                    Go to Spotify Dashboard
                  </button>
                  <ChatGPTLogoutButton onLoggedOut={() => setActiveTab('login')} />
                </div>
              </div>
            ) : (
              <LoginForm onLoginSuccess={() => setActiveTab('dashboard')} />
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <SpotifyDashboard onRedirectToLogin={() => setActiveTab('login')} />
        )}

        {activeTab === 'persistence' && (
          <div style={{ maxWidth: '640px', margin: '20px auto', width: '100%' }}>
            <SessionPersistenceIndicator />
          </div>
        )}

        {activeTab === 'logoutInfo' && (
          <div style={{ maxWidth: '640px', margin: '20px auto', width: '100%' }}>
            <div style={styles.infoCard}>
              <div style={styles.q5Badge}>Question 5: ChatGPT Integration</div>
              <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>
                🤖 ChatGPT Generated Logout Button Component
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6 }}>
                Prompt: <em>"Generate a React logout button component that updates the Context state and signs out the user from Firebase Auth."</em>
              </p>

              <div style={{ margin: '16px 0', padding: '16px', backgroundColor: '#121212', borderRadius: '10px', border: '1px solid #282828' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#1db954' }}>Live Logout Button Demo:</h4>
                {currentUser ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>Active User: <strong>{currentUser.email}</strong></span>
                    <ChatGPTLogoutButton onLoggedOut={() => setActiveTab('login')} />
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#f59e0b' }}>
                    User is logged out. Please <a href="#login" onClick={() => setActiveTab('login')} style={{ color: '#1db954' }}>Sign in first</a> to test the logout button.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Session6App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  subnav: {
    backgroundColor: '#181818',
    borderBottom: '1px solid #282828',
    padding: '10px 20px'
  },
  subnavContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  navBtn: {
    border: 'none',
    padding: '7px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.15s ease'
  },
  miniBadge: {
    fontSize: '10px',
    padding: '1px 6px',
    borderRadius: '8px',
    fontWeight: '700'
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px 20px',
    width: '100%',
    boxSizing: 'border-box',
    flex: 1
  },
  alreadyLoggedInCard: {
    backgroundColor: '#181818',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #282828',
    textAlign: 'center'
  },
  greenBtn: {
    backgroundColor: '#1db954',
    color: '#000',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer'
  },
  infoCard: {
    backgroundColor: '#181818',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #282828'
  },
  q5Badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    color: '#1db954',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  }
};
