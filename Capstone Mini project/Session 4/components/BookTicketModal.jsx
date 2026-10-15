import React, { useState } from 'react';

/**
 * Q4: Reusable Modal Component (BookMyShow-style)
 * @param {boolean} isOpen - Whether modal is visible
 * @param {function} onClose - Callback function to close modal
 * @param {string} title - Header title for modal
 * @param {ReactNode} children - Content inside modal
 */
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // Backdrop click handler — closes modal when clicking on dark area outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={handleBackdropClick}>
      <div style={modalStyles.modalBox}>
        {/* Header */}
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>{title}</h3>
          <button style={modalStyles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Content Body */}
        <div style={modalStyles.body}>{children}</div>
      </div>
    </div>
  );
}

/**
 * Demo Movie Booking Section with state controlling Modal visibility
 */
export default function BookTicketSection() {
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
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
      <h2 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>🎬 BookMyShow Quick Booking</h2>
      <p style={{ color: '#666', marginBottom: '18px' }}>Fighter (3D Hindi) • PVR Cinemas • Today 7:30 PM</p>

      {/* Button to Open Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={modalStyles.bookNowButton}
      >
        🎟️ Book Tickets Now
      </button>

      {/* Reusable Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Tickets - Fighter"
      >
        {bookingSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#2e7d32' }}>
            <h3 style={{ margin: '0 0 8px' }}>🎉 Booking Confirmed!</h3>
            <p style={{ margin: 0 }}>{tickets} Ticket(s) booked for {selectedSeat}.</p>
          </div>
        ) : (
          <form onSubmit={handleBook} style={modalStyles.form}>
            <label style={modalStyles.label}>
              Number of Tickets:
              <select
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
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
