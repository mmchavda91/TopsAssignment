import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PlaylistSection from './components/PlaylistCard';
import Footer from './components/Footer';
import BookTicketSection from './components/BookTicketModal';
import FantasyLeagueSignUp from './components/DynamicForm';

/**
 * Session 4: Main Demo Application
 * Combines all 5 Reusable Components into one interactive view.
 */
export default function Session4App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Q1: Zomato-Style Navbar */}
      <Navbar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Main Container */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '36px', flex: 1 }}>
        <header style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#111827', margin: '0 0 8px' }}>Session 4: Reusable React Components</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Active Navigation Tab: <strong style={{ color: '#E23744' }}>{activeTab.toUpperCase()}</strong></p>
        </header>

        {/* Q2: Spotify Playlist Cards */}
        <section>
          <PlaylistSection />
        </section>

        {/* Q4: BookMyShow Modal */}
        <section>
          <BookTicketSection />
        </section>

        {/* Q5: Cricket Fantasy Dynamic Form */}
        <section>
          <FantasyLeagueSignUp />
        </section>
      </main>

      {/* Q3: Flipkart-Style Footer */}
      <Footer />
    </div>
  );
}
