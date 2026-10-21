import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase';

/**
 * Question 2:
 * Build a form in React to add a new restaurant review
 * (restaurant name, rating, and comment) and save the data to Firestore when submitted.
 * Hint: Use Firestore's addDoc() method inside your form's onSubmit handler.
 */
export default function RestaurantReviewForm({ dbInstance = db, onReviewAdded }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!restaurantName.trim()) {
      setNotification({ type: 'error', text: 'Restaurant name is required!' });
      return;
    }
    if (!comment.trim()) {
      setNotification({ type: 'error', text: 'Please write a review comment!' });
      return;
    }

    setSubmitting(true);
    setNotification({ type: '', text: '' });

    try {
      // 🚀 Firestore addDoc() method as specified in Hint
      const docRef = await addDoc(collection(dbInstance, 'reviews'), {
        restaurantName: restaurantName.trim(),
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString()
      });

      // Clear input fields
      setRestaurantName('');
      setRating('5');
      setComment('');

      setNotification({
        type: 'success',
        text: `Review submitted successfully! (Firestore Document ID: ${docRef.id})`
      });

      // Notify parent to refresh reviews list if callback provided
      if (onReviewAdded) {
        onReviewAdded(docRef.id);
      }
    } catch (error) {
      console.error('Error adding document via addDoc():', error);
      setNotification({
        type: 'error',
        text: `Failed to save review: ${error.message}`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.badge}>Question 2</div>
        <h3 style={styles.title}>🍽️ Add Restaurant Review (Zomato Style)</h3>
        <p style={styles.subtitle}>
          Uses Firestore's <code>addDoc()</code> method inside <code>onSubmit</code> to store reviews.
        </p>
      </div>

      {notification.text && (
        <div style={{
          ...styles.alert,
          backgroundColor: notification.type === 'error' ? '#fef2f2' : '#f0fdf4',
          borderColor: notification.type === 'error' ? '#f87171' : '#4ade80',
          color: notification.type === 'error' ? '#991b1b' : '#166534',
        }}>
          <span>{notification.type === 'error' ? '❌' : '🎉'} {notification.text}</span>
          <button onClick={() => setNotification({ type: '', text: '' })} style={styles.closeBtn}>×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Restaurant Name */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Restaurant Name <span style={{ color: '#e11d48' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Honest Restaurant, Punjabi Tadka, Gwalia Sweets"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            style={styles.input}
            disabled={submitting}
          />
        </div>

        {/* Rating Selection */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Rating (1 to 5 Stars) <span style={{ color: '#e11d48' }}>*</span>
          </label>
          <div style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                style={{
                  ...styles.starOption,
                  backgroundColor: Number(rating) === star ? '#e23744' : '#f3f4f6',
                  color: Number(rating) === star ? '#ffffff' : '#374151'
                }}
              >
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={Number(rating) === star}
                  onChange={(e) => setRating(e.target.value)}
                  style={{ display: 'none' }}
                />
                ★ {star}
              </label>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Your Review / Comment <span style={{ color: '#e11d48' }}>*</span>
          </label>
          <textarea
            rows="3"
            placeholder="Describe your food experience, ambiance, taste, and service..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.textarea}
            disabled={submitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            ...styles.button,
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? 'Submitting to Firestore...' : 'Submit Review (addDoc)'}
        </button>
      </form>
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
    marginBottom: '20px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
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
  alert: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid',
    marginBottom: '18px',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    lineHeight: 1
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'inherit'
  },
  ratingRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  starOption: {
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    userSelect: 'none'
  },
  button: {
    backgroundColor: '#E23744', // Zomato brand red
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  }
};
