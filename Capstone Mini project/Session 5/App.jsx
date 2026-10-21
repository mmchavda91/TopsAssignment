import React, { useState } from 'react';
import SpotifyPlaylists from './components/Q1_SpotifyPlaylists';
import RestaurantReviewForm from './components/Q2_RestaurantReviewForm';
import MovieWatchlist from './components/Q3_MovieWatchlist';
import EditRestaurantReview from './components/Q4_EditRestaurantReview';
import RefactoredApiDemo from './components/Q5_RefactoredApiDemo';
import { db } from './firebase';

/**
 * Session 5: Complete Firebase Firestore Assignment
 * Hosts and demonstrates Questions 1 through 5 in an interactive, responsive dashboard.
 */
export default function Session5App() {
  const [activeTab, setActiveTab] = useState('all');
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);

  const handleReviewAdded = () => {
    // Increment to trigger reload in Q4 EditRestaurantReview
    setReviewsRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>
      {/* Top Banner Navigation */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.brandRow}>
            <div style={styles.firebaseLogo}>🔥</div>
            <div>
              <h1 style={styles.title}>Session 5: Firebase Firestore & React</h1>
              <p style={styles.subtitle}>
                Complete implementation of Questions 1 to 5 with Cloud Firestore, CRUD operations & async/await
              </p>
            </div>
          </div>

          {/* Quick Tab Filter */}
          <nav style={styles.navBar}>
            {[
              { id: 'all', label: 'All Questions', icon: '🌟' },
              { id: 'q1', label: 'Q1: Spotify Playlists', icon: '🎵' },
              { id: 'q2', label: 'Q2: Add Review Form', icon: '🍽️' },
              { id: 'q3', label: 'Q3: BookMyShow Watchlist', icon: '🎟️' },
              { id: 'q4', label: 'Q4: Edit Review (updateDoc)', icon: '✏️' },
              { id: 'q5', label: 'Q5: Refactored API (async)', icon: '🤖' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabButton,
                  backgroundColor: activeTab === tab.id ? '#FFA000' : 'rgba(255,255,255,0.12)',
                  color: activeTab === tab.id ? '#000000' : '#ffffff',
                  fontWeight: activeTab === tab.id ? '700' : '500'
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
        {/* Q1 Section */}
        {(activeTab === 'all' || activeTab === 'q1') && (
          <section style={styles.section}>
            <SpotifyPlaylists dbInstance={db} />
          </section>
        )}

        {/* Q2 & Q4 Sections: Reviews Combo */}
        {(activeTab === 'all' || activeTab === 'q2' || activeTab === 'q4') && (
          <div style={styles.gridTwoCols}>
            {(activeTab === 'all' || activeTab === 'q2') && (
              <section style={styles.section}>
                <RestaurantReviewForm
                  dbInstance={db}
                  onReviewAdded={handleReviewAdded}
                />
              </section>
            )}

            {(activeTab === 'all' || activeTab === 'q4') && (
              <section style={styles.section}>
                <EditRestaurantReview
                  dbInstance={db}
                  refreshTrigger={reviewsRefreshKey}
                />
              </section>
            )}
          </div>
        )}

        {/* Q3 Section */}
        {(activeTab === 'all' || activeTab === 'q3') && (
          <section style={styles.section}>
            <MovieWatchlist dbInstance={db} />
          </section>
        )}

        {/* Q5 Section */}
        {(activeTab === 'all' || activeTab === 'q5') && (
          <section style={styles.section}>
            <RefactoredApiDemo dbInstance={db} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
          Capstone Mini Project — Session 5 • Firebase Firestore & React 18 / Next.js
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#0f172a',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderBottom: '1px solid #334155',
    color: '#ffffff',
    padding: '24px 20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
  },
  headerContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  firebaseLogo: {
    fontSize: '34px',
    backgroundColor: 'rgba(255, 160, 0, 0.15)',
    border: '2px solid #FFA000',
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#f8fafc'
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#94a3b8'
  },
  navBar: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tabButton: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
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
  gridTwoCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: '24px',
    alignItems: 'start'
  },
  footer: {
    borderTop: '1px solid #1e293b',
    backgroundColor: '#090d16',
    padding: '20px',
    textAlign: 'center',
    marginTop: 'auto'
  }
};
