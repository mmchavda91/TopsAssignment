import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, serverTimestamp } from '../firebase';

/**
 * Question 1:
 * Set up Firebase Firestore in your React app and create a new collection
 * called 'playlists' for a Spotify-style music app. Add at least one sample
 * playlist document with a name and an array of song titles.
 */
export default function SpotifyPlaylists({ dbInstance = db }) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [songsInput, setSongsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch playlists from Firestore 'playlists' collection
  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(dbInstance, 'playlists'));
      const list = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setPlaylists(list);
    } catch (err) {
      console.error("Error fetching playlists:", err);
      setMessage({ type: 'error', text: 'Error fetching playlists: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [dbInstance]);

  // Handle adding custom playlist
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!playlistName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a playlist name.' });
      return;
    }

    const songsArray = songsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (songsArray.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one song title (comma separated).' });
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(dbInstance, 'playlists'), {
        name: playlistName.trim(),
        songs: songsArray,
        createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
        genre: 'Acoustic / Pop'
      });
      setPlaylistName('');
      setSongsInput('');
      setMessage({ type: 'success', text: `Playlist "${playlistName}" added successfully to Firestore!` });
      await fetchPlaylists();
    } catch (err) {
      console.error("Error adding playlist:", err);
      setMessage({ type: 'error', text: 'Failed to add playlist: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  // Seed sample playlist (As specifically asked in Q1)
  const handleSeedSamplePlaylist = async () => {
    try {
      setLoading(true);
      await addDoc(collection(dbInstance, 'playlists'), {
        name: 'Bollywood Top Hits 2024',
        songs: [
          'Kesariya (Brahmastra)',
          'Apna Bana Le (Bhediya)',
          'Chaleya (Jawan)',
          'Heeriye (Jasleen Royal, Arijit Singh)',
          'Tere Vaaste (Zara Hatke Zara Bachke)'
        ],
        createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
        genre: 'Bollywood Melodies'
      });
      setMessage({ type: 'success', text: 'Sample Playlist document added to Firestore!' });
      await fetchPlaylists();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error adding sample playlist: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.spotifyIcon}>🎧</div>
          <div>
            <h2 style={styles.title}>Spotify Playlists (Firestore 'playlists' collection)</h2>
            <p style={styles.subtitle}>Question 1: Set up Firestore & store playlist documents with songs array.</p>
          </div>
        </div>
        <button
          onClick={handleSeedSamplePlaylist}
          disabled={loading}
          style={styles.sampleButton}
        >
          ➕ Add Sample Playlist
        </button>
      </div>

      {/* Status Message */}
      {message.text && (
        <div style={{
          ...styles.alert,
          backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: message.type === 'error' ? '#991b1b' : '#166534',
          borderColor: message.type === 'error' ? '#f87171' : '#86efac'
        }}>
          <span>{message.type === 'error' ? '⚠️' : '✅'} {message.text}</span>
          <button onClick={() => setMessage({ type: '', text: '' })} style={styles.dismissBtn}>✕</button>
        </div>
      )}

      {/* Form: Add New Playlist */}
      <form onSubmit={handleCreatePlaylist} style={styles.formCard}>
        <h3 style={styles.formTitle}>🎵 Create New Playlist</h3>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Playlist Name</label>
          <input
            type="text"
            placeholder="e.g. Chill Beats, Late Night Vibes"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Song Titles (Comma separated)</label>
          <input
            type="text"
            placeholder="e.g. Starboy, Blinding Lights, Save Your Tears"
            value={songsInput}
            onChange={(e) => setSongsInput(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Saving to Firestore...' : 'Save Playlist to Firestore'}
        </button>
      </form>

      {/* Playlist Grid */}
      <div style={styles.gridContainer}>
        <h3 style={styles.sectionHeading}>
          📚 Existing Playlists in Firestore ({playlists.length})
        </h3>
        {playlists.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No playlists found in Firestore 'playlists' collection.</p>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>Click "Add Sample Playlist" above to create one now!</p>
          </div>
        ) : (
          <div style={styles.cardsGrid}>
            {playlists.map((pl) => (
              <div key={pl.id} style={styles.playlistCard}>
                <div style={styles.playlistCover}>
                  <span style={{ fontSize: '32px' }}>🎵</span>
                  <span style={styles.badge}>Spotify Doc</span>
                </div>
                <div style={styles.cardBody}>
                  <h4 style={styles.playlistName}>{pl.name}</h4>
                  <p style={styles.docId}>Doc ID: <code style={styles.code}>{pl.id.slice(0, 8)}...</code></p>
                  <p style={styles.songCount}>🎧 {Array.isArray(pl.songs) ? pl.songs.length : 0} Songs:</p>
                  <ul style={styles.songList}>
                    {Array.isArray(pl.songs) && pl.songs.map((song, idx) => (
                      <li key={idx} style={styles.songItem}>
                        <span style={styles.songNumber}>{idx + 1}.</span> {song}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    borderBottom: '1px solid #282828',
    paddingBottom: '18px',
    marginBottom: '20px'
  },
  spotifyIcon: {
    fontSize: '32px',
    backgroundColor: '#1db954',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(29, 185, 84, 0.4)'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff'
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#a7a7a7'
  },
  sampleButton: {
    backgroundColor: '#1db954',
    color: '#000000',
    fontWeight: '700',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'transform 0.15s ease'
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
  dismissBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  formCard: {
    backgroundColor: '#181818',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #282828'
  },
  formTitle: {
    margin: '0 0 16px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1db954'
  },
  inputGroup: {
    marginBottom: '14px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#b3b3b3',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #333333',
    backgroundColor: '#242424',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none'
  },
  submitBtn: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '14px'
  },
  sectionHeading: {
    fontSize: '17px',
    margin: '0 0 16px',
    color: '#ffffff'
  },
  emptyState: {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#181818',
    borderRadius: '12px',
    border: '1px dashed #333333'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px'
  },
  playlistCard: {
    backgroundColor: '#181818',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #282828',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column'
  },
  playlistCover: {
    height: '110px',
    background: 'linear-gradient(135deg, #1db954 0%, #121212 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    color: '#1db954',
    fontWeight: '600'
  },
  cardBody: {
    padding: '16px',
    flex: 1
  },
  playlistName: {
    margin: '0 0 6px',
    fontSize: '16px',
    fontWeight: '700'
  },
  docId: {
    margin: '0 0 10px',
    fontSize: '11px',
    color: '#777777'
  },
  code: {
    backgroundColor: '#282828',
    padding: '2px 5px',
    borderRadius: '4px',
    color: '#a7a7a7'
  },
  songCount: {
    margin: '0 0 8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1db954'
  },
  songList: {
    margin: 0,
    paddingLeft: '0',
    listStyle: 'none',
    maxHeight: '140px',
    overflowY: 'auto'
  },
  songItem: {
    fontSize: '13px',
    color: '#b3b3b3',
    padding: '3px 0',
    borderBottom: '1px solid #222'
  },
  songNumber: {
    color: '#1db954',
    fontWeight: '600',
    marginRight: '6px'
  }
};
