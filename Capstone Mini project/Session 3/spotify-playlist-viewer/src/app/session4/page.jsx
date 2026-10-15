'use client';

import React, { useState } from 'react';

// ==========================================
// Q1: Zomato-Style Reusable Navbar Component
// ==========================================
function Navbar({ activeTab = 'home', onTabChange }) {
  const navLinks = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'cart', label: 'Cart', icon: '🛒', badge: 2 },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoRed}>zomato</span>
      </div>
      <ul style={styles.navList}>
        {navLinks.map((link) => {
          const isActive = activeTab.toLowerCase() === link.id;
          return (
            <li key={link.id} style={{ listStyle: 'none' }}>
              <button
                type="button"
                onClick={() => onTabChange && onTabChange(link.id)}
                style={{
                  ...styles.navButton,
                  ...(isActive ? styles.activeButton : {}),
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {link.badge && <span style={styles.badge}>{link.badge}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ==========================================
// Q2: Spotify-Style Playlist Card Component
// ==========================================
function PlaylistCard({ title, songCount, image, curator, category }) {
  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.imageContainer}>
        <img src={image} alt={title} style={cardStyles.image} />
        <button style={cardStyles.playButton} title="Play">▶</button>
      </div>
      <div style={cardStyles.info}>
        <span style={cardStyles.category}>{category}</span>
        <h4 style={cardStyles.title}>{title}</h4>
        <p style={cardStyles.meta}>
          By {curator} • <span style={cardStyles.songCount}>{songCount} songs</span>
        </p>
      </div>
    </div>
  );
}

function PlaylistSection() {
  const playlists = [
    {
      id: 1,
      title: 'Bollywood Romance Top 50',
      songCount: 50,
      curator: 'Spotify India',
      category: 'Romantic',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    },
    {
      id: 2,
      title: 'Coding & Chill Beats',
      songCount: 38,
      curator: 'Lo-Fi Lounge',
      category: 'Focus',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    },
    {
      id: 3,
      title: 'Gujarati Garba Hits',
      songCount: 45,
      curator: 'Dandiya Vibes',
      category: 'Folk & Festive',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#121212', borderRadius: '12px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>🎧 Q2: Spotify-Style Playlists (Rendered via Props)</h2>
        <span style={{ fontSize: '12px', color: '#1DB954', backgroundColor: 'rgba(29, 185, 84, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>3 Unique Playlists</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {playlists.map((pl) => (
          <PlaylistCard
            key={pl.id}
            title={pl.title}
            songCount={pl.songCount}
            image={pl.image}
            curator={pl.curator}
            category={pl.category}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Q4: BookMyShow Modal Component
// ==========================================
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={handleBackdropClick}>
      <div style={modalStyles.modalBox}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>{title}</h3>
          <button style={modalStyles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div style={modalStyles.body}>{children}</div>
      </div>
    </div>
  );
}

function BookTicketSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState(2);
  const [selectedSeat, setSelectedSeat] = useState('Prime - Rs. 250');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsModalOpen(false);
    }, 1800);
  };

  return (
    <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <h2 style={{ margin: '0 0 6px', color: '#111827', fontSize: '20px' }}>🎬 Q4: BookMyShow Ticket Booking Modal</h2>
      <p style={{ color: '#6b7280', margin: '0 0 16px', fontSize: '14px' }}>Fighter (3D Hindi) • PVR Cinemas • Today 7:30 PM</p>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        style={modalStyles.bookNowButton}
      >
        🎟️ Click here to Book Tickets
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Tickets - Fighter"
      >
        {bookingSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#16a34a' }}>
            <h3 style={{ margin: '0 0 8px' }}>🎉 Tickets Confirmed!</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>{tickets} Ticket(s) booked for {selectedSeat}.</p>
          </div>
        ) : (
          <form onSubmit={handleBook} style={modalStyles.form}>
            <label style={modalStyles.label}>
              Number of Tickets:
              <select
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                style={modalStyles.input}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} Ticket(s)</option>
                ))}
              </select>
            </label>

            <label style={modalStyles.label}>
              Seat Category:
              <select
                value={selectedSeat}
                onChange={(e) => setSelectedSeat(e.target.value)}
                style={modalStyles.input}
              >
                <option value="Classic - Rs. 180">Classic (Rs. 180)</option>
                <option value="Prime - Rs. 250">Prime (Rs. 250)</option>
                <option value="Recliner - Rs. 400">Recliner (Rs. 400)</option>
              </select>
            </label>

            <div style={modalStyles.footerAction}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={modalStyles.cancelBtn}
              >
                Cancel
              </button>
              <button type="submit" style={modalStyles.confirmBtn}>
                Confirm & Pay
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

// ==========================================
// Q5: Dynamic Form (IPL Fantasy Sign-Up)
// ==========================================
function DynamicForm({ title, fields = [], onSubmit, submitText = 'Submit' }) {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.defaultValue || '';
    });
    return initial;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div style={formStyles.container}>
      {title && <h3 style={formStyles.title}>{title}</h3>}
      <form onSubmit={handleSubmit} style={formStyles.form}>
        {fields.map((field) => (
          <div key={field.name} style={formStyles.fieldGroup}>
            <label style={formStyles.label}>
              {field.label} {field.required && <span style={{ color: '#dc2626' }}>*</span>}
            </label>

            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                style={formStyles.input}
              >
                <option value="">-- Select an option --</option>
                {field.options &&
                  field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', color: '#4b5563' }}>{field.checkboxText}</span>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                style={formStyles.input}
              />
            )}
          </div>
        ))}

        <button type="submit" style={formStyles.submitBtn}>
          {submitText}
        </button>
      </form>
    </div>
  );
}

function FantasyLeagueSection() {
  const [submittedData, setSubmittedData] = useState(null);

  const fantasyFields = [
    {
      name: 'teamName',
      label: 'Fantasy Team Name',
      type: 'text',
      placeholder: 'e.g. Gujarat Titans Warriors',
      required: true,
    },
    {
      name: 'captainName',
      label: 'Team Captain (Real Name)',
      type: 'text',
      placeholder: 'e.g. Hardik Pandya / Shubman Gill',
      required: true,
    },
    {
      name: 'email',
      label: 'Registered Email Address',
      type: 'email',
      placeholder: 'yourname@example.com',
      required: true,
    },
    {
      name: 'favTeam',
      label: 'Favorite IPL Franchise',
      type: 'select',
      options: [
        'Gujarat Titans',
        'Mumbai Indians',
        'Chennai Super Kings',
        'Royal Challengers Bengaluru',
        'Kolkata Knight Riders',
      ],
      required: true,
    },
    {
      name: 'agreeTerms',
      label: 'Terms & Conditions',
      type: 'checkbox',
      checkboxText: 'I confirm I am 18+ and agree to IPL Fantasy Fair Play rules',
      required: true,
    },
  ];

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <DynamicForm
        title="🏏 Q5: Generic Form (IPL Fantasy Sign Up)"
        fields={fantasyFields}
        onSubmit={handleFormSubmit}
        submitText="Create Fantasy Team 🚀"
      />
      {submittedData && (
        <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #10b981', borderRadius: '8px', padding: '16px', maxWidth: '460px', width: '100%' }}>
          <h4 style={{ margin: '0 0 6px', color: '#065f46' }}>✅ Submitted Team Data:</h4>
          <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>Team Name:</strong> {submittedData.teamName}</p>
          <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>Captain:</strong> {submittedData.captainName}</p>
          <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>Email:</strong> {submittedData.email}</p>
          <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>Franchise:</strong> {submittedData.favTeam}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Q3: Flipkart-Style Footer Component
// ==========================================
function Footer({
  socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com', icon: '🌐' },
    { platform: 'Twitter / X', url: 'https://twitter.com', icon: '🐦' },
    { platform: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: '📷' },
  ],
  companyName = 'Flipkart Internet Pvt Ltd',
}) {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h4 style={styles.heading}>ABOUT</h4>
          <ul style={styles.list}>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>HELP</h4>
          <ul style={styles.list}>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>CONNECT WITH US (Props)</h4>
          <div style={styles.socialGrid}>
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                title={item.platform}
              >
                <span style={styles.socialIcon}>{item.icon}</span>
                <span style={styles.socialLabel}>{item.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>© 2026 {companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ==========================================
// Main Session 4 Interactive Page
// ==========================================
export default function Session4Page() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Q1 Navbar */}
      <Navbar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Main Content Area */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
        <div style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h1 style={{ color: '#111827', margin: '0 0 8px', fontSize: '26px' }}>🚀 Session 4: React Components Live Output</h1>
          <p style={{ color: '#4b5563', margin: 0, fontSize: '15px' }}>
            Current Active Navbar Tab (via Props): <strong style={{ color: '#E23744', textTransform: 'uppercase' }}>{activeTab}</strong>
          </p>
        </div>

        {/* Q2 Playlists */}
        <PlaylistSection />

        {/* Q4 Modal */}
        <BookTicketSection />

        {/* Q5 Dynamic Form */}
        <FantasyLeagueSection />
      </main>

      {/* Q3 Footer */}
      <Footer />
    </div>
  );
}

// STYLES
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: { fontSize: '24px', fontWeight: 'bold' },
  logoRed: { color: '#E23744', letterSpacing: '-1px' },
  navList: { display: 'flex', listStyle: 'none', gap: '10px', margin: 0, padding: 0 },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    color: '#4b5563',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeButton: {
    backgroundColor: '#E23744',
    color: '#ffffff',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(226, 55, 68, 0.3)',
  },
  badge: {
    backgroundColor: '#ffffff',
    color: '#E23744',
    borderRadius: '10px',
    padding: '2px 6px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  footer: { backgroundColor: '#172337', color: '#878787', padding: '36px 20px 16px', fontSize: '13px' },
  container: { maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' },
  section: { display: 'flex', flexDirection: 'column', gap: '10px' },
  heading: { color: '#878787', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px', color: '#ffffff' },
  socialGrid: { display: 'flex', flexDirection: 'column', gap: '8px' },
  socialLink: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', textDecoration: 'none', fontSize: '13px' },
  socialIcon: { fontSize: '16px' },
  socialLabel: { color: '#ffffff' },
  copyright: { borderTop: '1px solid #2d3b53', marginTop: '30px', paddingTop: '15px', textAlign: 'center', fontSize: '12px' },
};

const cardStyles = {
  card: {
    backgroundColor: '#181818',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  imageContainer: { position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: '12px' },
  image: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' },
  playButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1DB954',
    color: '#000000',
    border: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  },
  info: { display: 'flex', flexDirection: 'column', gap: '4px' },
  category: { fontSize: '11px', textTransform: 'uppercase', color: '#1DB954', fontWeight: 'bold' },
  title: { color: '#ffffff', fontSize: '15px', margin: 0, fontWeight: '600' },
  meta: { color: '#b3b3b3', fontSize: '12px', margin: 0 },
  songCount: { color: '#ffffff' },
};

const modalStyles = {
  bookNowButton: {
    backgroundColor: '#F84464',
    color: '#ffffff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(248, 68, 100, 0.3)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '440px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #eeeeee',
    backgroundColor: '#f8f9fa',
  },
  title: { margin: 0, fontSize: '17px', color: '#222222' },
  closeBtn: { background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#666666' },
  body: { padding: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  label: { display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#444' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #cccccc', fontSize: '14px' },
  footerAction: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
  cancelBtn: { padding: '8px 16px', background: '#eeeeee', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  confirmBtn: { padding: '8px 20px', background: '#F84464', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },
};

const formStyles = {
  container: {
    maxWidth: '460px',
    width: '100%',
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
  },
  title: { textAlign: 'center', color: '#1e3a8a', margin: '0 0 18px', fontSize: '17px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '6px',
  },
};
