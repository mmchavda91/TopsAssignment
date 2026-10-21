import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, updateDoc, doc, deleteDoc, serverTimestamp, addDoc } from '../firebase';

/**
 * Question 4:
 * Implement an 'Edit Review' feature for your restaurant review app:
 * when a user clicks an edit button, let them update their comment and rating,
 * then save changes to Firestore.
 * Constraint: Use Firestore's updateDoc() method and ensure the UI updates after saving.
 */
export default function EditRestaurantReview({ dbInstance = db, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID of document currently being edited
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Fetch reviews from Firestore
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(dbInstance, 'reviews'));
      const list = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      // Sort newest first if timestamp exists
      list.sort((a, b) => {
        const timeA = a.createdAt?.seconds || (typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() : 0);
        const timeB = b.createdAt?.seconds || (typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() : 0);
        return timeB - timeA;
      });
      setReviews(list);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setStatusMessage({ type: 'error', text: 'Error loading reviews: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [dbInstance, refreshTrigger]);

  // Start editing a review
  const handleStartEdit = (review) => {
    setEditingId(review.id);
    setEditRating(review.rating || 5);
    setEditComment(review.comment || '');
    setStatusMessage({ type: '', text: '' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditComment('');
    setEditRating(5);
  };

  // 🚀 Save edits to Firestore using updateDoc() as required by Q4 Constraint
  const handleSaveEdit = async (reviewId) => {
    if (!editComment.trim()) {
      setStatusMessage({ type: 'error', text: 'Comment cannot be empty!' });
      return;
    }

    setSavingEdit(true);
    try {
      // 1. Reference the specific document
      const reviewRef = doc(dbInstance, 'reviews', reviewId);

      // 2. Call Firestore updateDoc()
      await updateDoc(reviewRef, {
        rating: Number(editRating),
        comment: editComment.trim(),
        updatedAt: serverTimestamp ? serverTimestamp() : new Date().toISOString()
      });

      // 3. Ensure UI updates immediately after saving (as constrained by Q4)
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r.id === reviewId
            ? { ...r, rating: Number(editRating), comment: editComment.trim(), isUpdated: true }
            : r
        )
      );

      setEditingId(null);
      setStatusMessage({
        type: 'success',
        text: `Review updated successfully in Firestore using updateDoc()!`
      });
    } catch (err) {
      console.error("Error updating review with updateDoc():", err);
      setStatusMessage({ type: 'error', text: 'Update failed: ' + err.message });
    } finally {
      setSavingEdit(false);
    }
  };

  // Quick Seed Review helper if collection is empty
  const handleSeedDemoReview = async () => {
    try {
      await addDoc(collection(dbInstance, 'reviews'), {
        restaurantName: 'Manek Chowk Night Market',
        rating: 4,
        comment: 'Amazing Gwalior Dosa and Chocolate Sandwich! Crowded but worth the wait.',
        createdAt: new Date().toISOString()
      });
      setStatusMessage({ type: 'success', text: 'Sample review added!' });
      fetchReviews();
    } catch (e) {
      setStatusMessage({ type: 'error', text: e.message });
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={styles.badge}>Question 4</div>
            <h3 style={styles.title}>⭐ Restaurant Reviews & Firestore Edit (`updateDoc`)</h3>
            <p style={styles.subtitle}>
              Click <strong>"✏️ Edit Review"</strong> to update rating & comment in Firestore with instant UI refresh.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSeedDemoReview} style={styles.secondaryBtn}>
              ➕ Seed Review
            </button>
            <button onClick={fetchReviews} disabled={loading} style={styles.refreshBtn}>
              🔄 {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {statusMessage.text && (
        <div style={{
          ...styles.alert,
          backgroundColor: statusMessage.type === 'error' ? '#fef2f2' : '#f0fdf4',
          borderColor: statusMessage.type === 'error' ? '#f87171' : '#4ade80',
          color: statusMessage.type === 'error' ? '#991b1b' : '#166534',
        }}>
          <span>{statusMessage.type === 'error' ? '⚠️' : '✅'} {statusMessage.text}</span>
          <button onClick={() => setStatusMessage({ type: '', text: '' })} style={styles.closeBtn}>×</button>
        </div>
      )}

      {/* Reviews List */}
      <div style={styles.list}>
        {reviews.length === 0 ? (
          <div style={styles.empty}>
            <p>No restaurant reviews found in Firestore yet.</p>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>
              Add a review using the form in Question 2 or click "Seed Review" above.
            </p>
          </div>
        ) : (
          reviews.map((rev) => {
            const isEditing = editingId === rev.id;

            return (
              <div key={rev.id} style={{ ...styles.reviewCard, borderColor: isEditing ? '#E23744' : '#e5e7eb' }}>
                {isEditing ? (
                  // Inline Edit Mode
                  <div style={styles.editForm}>
                    <div style={styles.editHeader}>
                      <span style={{ fontWeight: '700', color: '#E23744' }}>✏️ Editing: {rev.restaurantName}</span>
                      <span style={styles.miniDoc}>doc ID: {rev.id.slice(0, 8)}</span>
                    </div>

                    {/* Edit Rating */}
                    <div style={{ margin: '12px 0 8px' }}>
                      <label style={styles.miniLabel}>Update Rating:</label>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditRating(star)}
                            style={{
                              ...styles.starBtn,
                              backgroundColor: Number(editRating) === star ? '#E23744' : '#f3f4f6',
                              color: Number(editRating) === star ? '#ffffff' : '#374151'
                            }}
                          >
                            ★ {star}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Edit Comment */}
                    <div style={{ margin: '10px 0' }}>
                      <label style={styles.miniLabel}>Update Comment:</label>
                      <textarea
                        rows="3"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        style={styles.editTextarea}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                      <button
                        onClick={() => handleSaveEdit(rev.id)}
                        disabled={savingEdit}
                        style={styles.saveBtn}
                      >
                        💾 {savingEdit ? 'Saving (updateDoc)...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={savingEdit}
                        style={styles.cancelBtn}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal View Mode
                  <div>
                    <div style={styles.reviewHeader}>
                      <div>
                        <h4 style={styles.restaurantTitle}>{rev.restaurantName}</h4>
                        <div style={styles.ratingBadge}>
                          {'★'.repeat(rev.rating || 5)}{'☆'.repeat(5 - (rev.rating || 5))} ({rev.rating || 5}/5)
                        </div>
                      </div>
                      <button
                        onClick={() => handleStartEdit(rev)}
                        style={styles.editBtn}
                      >
                        ✏️ Edit Review
                      </button>
                    </div>
                    <p style={styles.commentText}>"{rev.comment}"</p>
                    <div style={styles.footerRow}>
                      <span style={styles.metaText}>
                        Document: <code>{rev.id}</code>
                        {rev.isUpdated && <span style={styles.updatedBadge}> (Updated via updateDoc)</span>}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
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
    marginBottom: '18px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#fef3c7',
    color: '#92400e',
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
  secondaryBtn: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  refreshBtn: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
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
    cursor: 'pointer'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  empty: {
    textAlign: 'center',
    padding: '36px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px dashed #d1d5db',
    color: '#6b7280'
  },
  reviewCard: {
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px'
  },
  restaurantTitle: {
    margin: '0 0 4px',
    fontSize: '17px',
    fontWeight: '700',
    color: '#111827'
  },
  ratingBadge: {
    color: '#f59e0b',
    fontSize: '14px',
    fontWeight: '600'
  },
  commentText: {
    margin: '0 0 12px',
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: 1.5,
    fontStyle: 'italic'
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '8px'
  },
  metaText: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  updatedBadge: {
    color: '#16a34a',
    fontWeight: '700'
  },
  editBtn: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  editForm: {
    backgroundColor: '#fff1f2',
    padding: '14px',
    borderRadius: '8px'
  },
  editHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  miniDoc: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  miniLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4b5563',
    display: 'block'
  },
  starBtn: {
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none'
  },
  editTextarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #fca5a5',
    fontSize: '14px',
    marginTop: '4px',
    outline: 'none',
    fontFamily: 'inherit'
  },
  saveBtn: {
    backgroundColor: '#E23744',
    color: '#ffffff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  cancelBtn: {
    backgroundColor: '#ffffff',
    color: '#4b5563',
    border: '1px solid #d1d5db',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};
