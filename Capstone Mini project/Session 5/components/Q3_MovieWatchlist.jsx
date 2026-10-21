import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from '../firebase';

/**
 * Question 3:
 * Fetch all movie watchlist items from your Firestore 'watchlists' collection
 * and display them in a list, showing movie name and status (watched/not watched)
 * like BookMyShow.
 */
export default function MovieWatchlist({ dbInstance = db }) {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'watched' | 'not watched'
  const [newMovieName, setNewMovieName] = useState('');
  const [newMovieGenre, setNewMovieGenre] = useState('Action / Thriller');
  const [newStatus, setNewStatus] = useState('not watched');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // 🚀 Fetch watchlist items from Firestore 'watchlists' collection
  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(dbInstance, 'watchlists'));
      const items = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      setMovies(items);
    } catch (err) {
      console.error("Error fetching watchlists:", err);
      setStatusMessage({ type: 'error', text: 'Error loading watchlist: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [dbInstance]);

  // Toggle Watched / Not Watched status in Firestore
  const handleToggleStatus = async (movie) => {
    const nextStatus = movie.status === 'watched' ? 'not watched' : 'watched';
    try {
      const movieRef = doc(dbInstance, 'watchlists', movie.id);
      await updateDoc(movieRef, {
        status: nextStatus,
        updatedAt: serverTimestamp ? serverTimestamp() : new Date().toISOString()
      });

      // Optimistic UI update
      setMovies((prev) =>
        prev.map((m) => (m.id === movie.id ? { ...m, status: nextStatus } : m))
      );
    } catch (err) {
      console.error("Error toggling status:", err);
      setStatusMessage({ type: 'error', text: 'Failed to update status: ' + err.message });
    }
  };

  // Add new movie to watchlist
  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovieName.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a movie title.' });
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(dbInstance, 'watchlists'), {
        movieName: newMovieName.trim(),
        genre: newMovieGenre,
        status: newStatus,
        createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString()
      });
      setNewMovieName('');
      setStatusMessage({ type: 'success', text: `Added "${newMovieName}" to your Watchlist!` });
      await fetchWatchlist();
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to add movie: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  // Seed sample BookMyShow watchlist items
  const handleSeedSampleWatchlist = async () => {
    try {
      setLoading(true);
      const sampleMovies = [
        { movieName: 'Kalki 2898 AD', genre: 'Sci-Fi / Action', status: 'watched' },
        { movieName: 'Stree 2', genre: 'Horror / Comedy', status: 'watched' },
        { movieName: 'Pushpa 2: The Rule', genre: 'Action / Drama', status: 'not watched' },
        { movieName: 'Devara: Part 1', genre: 'Action / Thriller', status: 'not watched' },
        { movieName: 'Singham Again', genre: 'Action / Cop Universe', status: 'not watched' }
      ];

      for (const m of sampleMovies) {
        await addDoc(collection(dbInstance, 'watchlists'), {
          ...m,
          createdAt: new Date().toISOString()
        });
      }
      setStatusMessage({ type: 'success', text: 'Loaded 5 sample BookMyShow movies to Firestore!' });
      await fetchWatchlist();
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Seed failed: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.bmsIcon}>🎟️</div>
          <div>
            <div style={styles.badge}>Question 3</div>
            <h3 style={styles.title}>BookMyShow Movie Watchlist</h3>
            <p style={styles.subtitle}>
              Fetches all movies from Firestore <code>'watchlists'</code> collection with watched/not watched status.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSeedSampleWatchlist} disabled={loading} style={styles.seedBtn}>
            🎬 Seed Sample Movies
          </button>
          <button onClick={fetchWatchlist} disabled={loading} style={styles.refreshBtn}>
            🔄 Refresh
          </button>
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

      {/* Add Movie Quick Bar */}
      <form onSubmit={handleAddMovie} style={styles.quickForm}>
        <input
          type="text"
          placeholder="Movie Name (e.g. Fighter, Dunki, Animal)..."
          value={newMovieName}
          onChange={(e) => setNewMovieName(e.target.value)}
          style={styles.formInput}
        />
        <select
          value={newMovieGenre}
          onChange={(e) => setNewMovieGenre(e.target.value)}
          style={styles.formSelect}
        >
          <option value="Action / Thriller">Action / Thriller</option>
          <option value="Comedy / Romance">Comedy / Romance</option>
          <option value="Sci-Fi / Drama">Sci-Fi / Drama</option>
          <option value="Horror / Mystery">Horror / Mystery</option>
        </select>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={styles.formSelect}
        >
          <option value="not watched">Not Watched</option>
          <option value="watched">Watched</option>
        </select>
        <button type="submit" disabled={loading} style={styles.addBtn}>
          + Add to Watchlist
        </button>
      </form>

      {/* Filter Tabs */}
      <div style={styles.filterBar}>
        <div style={styles.tabGroup}>
          {['all', 'not watched', 'watched'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterTab,
                backgroundColor: filter === f ? '#e11d48' : '#f3f4f6',
                color: filter === f ? '#ffffff' : '#4b5563',
                fontWeight: filter === f ? '700' : '500'
              }}
            >
              {f === 'all' && `All Movies (${movies.length})`}
              {f === 'not watched' && `⏳ Not Watched (${movies.filter(m => m.status === 'not watched').length})`}
              {f === 'watched' && `✅ Watched (${movies.filter(m => m.status === 'watched').length})`}
            </button>
          ))}
        </div>
        <span style={styles.docCountBadge}>Firestore docs: {filteredMovies.length}</span>
      </div>

      {/* Watchlist Items */}
      <div style={styles.list}>
        {filteredMovies.length === 0 ? (
          <div style={styles.empty}>
            <p>No movies in watchlist for this filter.</p>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>Click "Seed Sample Movies" to load demo data!</p>
          </div>
        ) : (
          filteredMovies.map((movie) => {
            const isWatched = movie.status === 'watched';
            return (
              <div key={movie.id} style={styles.movieRow}>
                <div style={styles.movieInfo}>
                  <div style={styles.movieIcon}>{isWatched ? '🎬' : '🍿'}</div>
                  <div>
                    <h4 style={styles.movieTitle}>{movie.movieName}</h4>
                    <p style={styles.movieGenre}>
                      {movie.genre || 'Action / Drama'} • <span style={styles.docId}>Doc ID: {movie.id.slice(0, 8)}</span>
                    </p>
                  </div>
                </div>

                <div style={styles.statusSection}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: isWatched ? '#dcfce7' : '#fef3c7',
                    color: isWatched ? '#166534' : '#92400e',
                    borderColor: isWatched ? '#86efac' : '#fde68a'
                  }}>
                    {isWatched ? '✅ Watched' : '⏳ Not Watched'}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(movie)}
                    style={{
                      ...styles.toggleBtn,
                      backgroundColor: isWatched ? '#f3f4f6' : '#fee2e2',
                      color: isWatched ? '#4b5563' : '#b91c1c'
                    }}
                    title="Toggle watched status in Firestore"
                  >
                    {isWatched ? 'Mark Unwatched' : 'Mark Watched'}
                  </button>
                </div>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    borderBottom: '1px solid #f3f4f6',
    paddingBottom: '16px',
    marginBottom: '16px'
  },
  bmsIcon: {
    fontSize: '28px',
    backgroundColor: '#f43f5e',
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '10px',
    textTransform: 'uppercase',
    marginBottom: '4px'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827'
  },
  subtitle: {
    margin: '3px 0 0',
    fontSize: '13px',
    color: '#6b7280'
  },
  seedBtn: {
    backgroundColor: '#f43f5e',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  refreshBtn: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  alert: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid',
    marginBottom: '14px',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  quickForm: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '16px',
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  formInput: {
    flex: '2 1 200px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '13px'
  },
  formSelect: {
    flex: '1 1 140px',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '13px',
    backgroundColor: '#ffffff'
  },
  addBtn: {
    backgroundColor: '#111827',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tabGroup: {
    display: 'flex',
    gap: '6px'
  },
  filterTab: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  docCountBadge: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  empty: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    border: '1px dashed #d1d5db',
    color: '#6b7280'
  },
  movieRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    transition: 'transform 0.1s ease',
    flexWrap: 'wrap',
    gap: '10px'
  },
  movieInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  movieIcon: {
    fontSize: '22px',
    backgroundColor: '#f3f4f6',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  movieTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '700',
    color: '#111827'
  },
  movieGenre: {
    margin: '2px 0 0',
    fontSize: '12px',
    color: '#6b7280'
  },
  docId: {
    fontFamily: 'monospace',
    color: '#9ca3af'
  },
  statusSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '700',
    border: '1px solid'
  },
  toggleBtn: {
    border: 'none',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};
