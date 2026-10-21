import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChatGPTLogoutButton from './Q5_ChatGPTLogoutButton';

/**
 * Question 2:
 * Use React Context API to store the current user's login state
 * and display the user's email at the top of the page when logged in.
 */
export default function NavbarUserHeader() {
  const { currentUser } = useAuth();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.brand}>
          <span style={styles.spotifyLogo}>🎧</span>
          <div>
            <div style={styles.appName}>Spotify Stream</div>
            <span style={styles.badge}>Session 6 Auth</span>
          </div>
        </div>

        {/* User Status Section (Q2 Requirement: Display user's email at the top of the page) */}
        <div style={styles.userSection}>
          {currentUser ? (
            <div style={styles.loggedInRow}>
              <div style={styles.userInfo}>
                <span style={styles.activeDot}></span>
                <div>
                  <span style={styles.label}>Logged in as:</span>
                  <div style={styles.emailText}>
                    ✉️ <strong>{currentUser.email}</strong>
                  </div>
                </div>
              </div>

              {/* Q5 Logout Button Integration */}
              <ChatGPTLogoutButton />
            </div>
          ) : (
            <div style={styles.guestRow}>
              <span style={styles.guestDot}></span>
              <span style={styles.guestText}>👤 Guest (Not Authenticated)</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#000000',
    color: '#ffffff',
    borderBottom: '1px solid #282828',
    padding: '14px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  spotifyLogo: {
    fontSize: '26px',
    backgroundColor: '#1db954',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  appName: {
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },
  badge: {
    fontSize: '10px',
    backgroundColor: '#1db954',
    color: '#000000',
    fontWeight: '800',
    padding: '2px 6px',
    borderRadius: '8px',
    textTransform: 'uppercase'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center'
  },
  loggedInRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#181818',
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid #282828'
  },
  activeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#1db954',
    boxShadow: '0 0 8px #1db954'
  },
  label: {
    fontSize: '10px',
    color: '#9ca3af',
    display: 'block'
  },
  emailText: {
    fontSize: '13px',
    color: '#ffffff'
  },
  guestRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#181818',
    padding: '8px 14px',
    borderRadius: '20px',
    border: '1px solid #333'
  },
  guestDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#9ca3af'
  },
  guestText: {
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: '500'
  }
};
