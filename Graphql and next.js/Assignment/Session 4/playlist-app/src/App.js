// ============================================================
// SESSION 4 - App.js  (Main React Component)
// ============================================================
// This file demonstrates ALL 5 questions:
//   Q1 - addSong mutation + useMutation hook
//   Q2 - updateSong mutation (edit title in place)
//   Q3 - deleteSong mutation (Delete button)
//   Q4 - Optimistic UI (song appears before server responds)
//   Q5 - Live song count (auto-updates on add/delete)
// ============================================================

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./App.css";
import { GET_SONGS, ADD_SONG, UPDATE_SONG, DELETE_SONG } from "./operations";

// ============================================================
// MAIN APP COMPONENT
// ============================================================
function App() {
  // Form state for adding a new song (Q1)
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  // Track which song is being edited (Q2)
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Show optimistic notice (Q4)
  const [showOptimisticNotice, setShowOptimisticNotice] = useState(false);

  // -------------------------------------------------------
  // QUERY: Fetch all songs from GraphQL server
  // -------------------------------------------------------
  const { loading, error, data } = useQuery(GET_SONGS);

  // -------------------------------------------------------
  // Q1: useMutation - addSong
  // optimisticResponse = song appears instantly before server reply (Q4)
  // update = manually update Apollo cache so UI re-renders (Q5)
  // -------------------------------------------------------
  const [addSong, { loading: addLoading }] = useMutation(ADD_SONG, {
    // Q4: Optimistic UI - fake response shown instantly
    optimisticResponse: ({ title, artist }) => ({
      addSong: {
        __typename: "Song",
        id: `optimistic-${Date.now()}`, // Temporary fake ID
        title,
        artist,
      },
    }),

    // Q5: Update Apollo cache → triggers automatic re-render with new count
    update(cache, { data: { addSong } }) {
      const existing = cache.readQuery({ query: GET_SONGS });
      if (existing) {
        cache.writeQuery({
          query: GET_SONGS,
          data: { getSongs: [...existing.getSongs, addSong] },
        });
      }
    },
  });

  // -------------------------------------------------------
  // Q2: useMutation - updateSong
  // After update, Apollo cache auto-refreshes via refetchQueries
  // -------------------------------------------------------
  const [updateSong, { loading: updateLoading }] = useMutation(UPDATE_SONG, {
    refetchQueries: [{ query: GET_SONGS }], // Re-fetch → UI shows new title
  });

  // -------------------------------------------------------
  // Q3: useMutation - deleteSong
  // Cache updated manually so count drops instantly (Q5)
  // -------------------------------------------------------
  const [deleteSong] = useMutation(DELETE_SONG, {
    update(cache, { data: { deleteSong } }) {
      const existing = cache.readQuery({ query: GET_SONGS });
      if (existing) {
        cache.writeQuery({
          query: GET_SONGS,
          data: {
            getSongs: existing.getSongs.filter(
              (s) => s.id !== deleteSong.id
            ),
          },
        });
      }
    },
  });

  // -------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------

  // Q1: Handle form submit → call addSong mutation
  const handleAddSong = async (e) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;

    // Show the optimistic notice briefly (Q4 demo)
    setShowOptimisticNotice(true);
    setTimeout(() => setShowOptimisticNotice(false), 3000);

    await addSong({ variables: { title: title.trim(), artist: artist.trim() } });
    setTitle("");
    setArtist("");
  };

  // Q2: Start editing a song
  const handleEditClick = (song) => {
    setEditingId(song.id);
    setEditTitle(song.title);
  };

  // Q2: Save updated title
  const handleSaveEdit = async (id) => {
    if (!editTitle.trim()) return;
    await updateSong({ variables: { id, title: editTitle.trim() } });
    setEditingId(null);
    setEditTitle("");
  };

  // Q2: Cancel edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // Q3: Delete a song
  const handleDelete = async (id) => {
    await deleteSong({ variables: { id } });
  };

  // -------------------------------------------------------
  // DERIVED DATA
  // Q5: Total count from Apollo cache (auto-updates)
  // -------------------------------------------------------
  const songs = data?.getSongs || [];
  const totalSongs = songs.length; // Q5: This re-renders whenever songs changes

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="app">
      {/* --- HEADER --- */}
      <header className="app-header">
        <span className="logo">🎵</span>
        <h1>My Playlist App</h1>
        <p>Session 4 – GraphQL Mutations with Apollo Client</p>
      </header>

      {/* =====================================================
          Q5: Total Song Count Banner
          Automatically re-renders when songs are added/deleted
          ===================================================== */}
      <div className="song-count-banner">
        <div>
          <div className="count-label">Total Songs in Playlist</div>
          <div className="count-number">{totalSongs}</div>
        </div>
        <div className="count-icon">📀</div>
      </div>

      {/* =====================================================
          Q1 + Q4: Add Song Form
          useMutation(ADD_SONG) + optimisticResponse
          ===================================================== */}
      <div className="card">
        <div className="card-title">
          ➕ Add New Song
          <span className="badge">Q1 + Q4</span>
        </div>
        <form className="add-form" onSubmit={handleAddSong}>
          <div className="input-row">
            <input
              id="song-title-input"
              type="text"
              placeholder="Song Title (e.g. Blinding Lights)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              id="song-artist-input"
              type="text"
              placeholder="Artist (e.g. The Weeknd)"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          <button
            id="add-song-btn"
            type="submit"
            className="btn btn-primary"
            disabled={addLoading || !title.trim() || !artist.trim()}
          >
            {addLoading ? "Adding..." : "🎵 Add Song"}
          </button>
        </form>

        {/* Q4: Optimistic UI Notice */}
        {showOptimisticNotice && (
          <div className="optimistic-notice">
            ⚡ <strong>Optimistic UI (Q4):</strong> Song shown instantly before
            server responds!
          </div>
        )}
      </div>

      {/* =====================================================
          Q2 + Q3: Song List with Edit & Delete
          ===================================================== */}
      <div className="card">
        <div className="card-title">
          🎧 Playlist
          <span className="badge">Q2 + Q3</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading songs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            ❌ Error: {error.message}
            <br />
            <small>Is the server running? node server.js</small>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && songs.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🎵</span>
            No songs yet. Add one above!
          </div>
        )}

        {/* Song List */}
        {!loading && !error && songs.length > 0 && (
          <div className="song-list">
            {songs.map((song, index) => (
              <div className="song-item" key={song.id}>
                {/* Song Number */}
                <div className="song-number">{index + 1}</div>

                {/* Song Info / Edit Mode */}
                {editingId === song.id ? (
                  /* Q2: Edit Mode - inline title editor */
                  <div className="edit-row">
                    <input
                      id={`edit-input-${song.id}`}
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(song.id);
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      id={`save-btn-${song.id}`}
                      className="btn btn-save"
                      onClick={() => handleSaveEdit(song.id)}
                      disabled={updateLoading}
                    >
                      {updateLoading ? "..." : "✅ Save"}
                    </button>
                    <button
                      id={`cancel-btn-${song.id}`}
                      className="btn btn-cancel"
                      onClick={handleCancelEdit}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  /* Normal display mode */
                  <div className="song-info">
                    <div className="song-title">
                      {song.title}
                      {/* Q4: Optimistic placeholder tag */}
                      {song.id.startsWith("optimistic-") && (
                        <span className="optimistic-tag" style={{ marginLeft: 8 }}>
                          ⏳ Saving...
                        </span>
                      )}
                    </div>
                    <div className="song-artist">🎤 {song.artist}</div>
                  </div>
                )}

                {/* Action Buttons */}
                {editingId !== song.id && (
                  <div className="song-actions">
                    {/* Q2: Edit Button */}
                    <button
                      id={`edit-btn-${song.id}`}
                      className="btn btn-edit"
                      onClick={() => handleEditClick(song)}
                      title="Edit song title"
                    >
                      ✏️
                    </button>
                    {/* Q3: Delete Button */}
                    <button
                      id={`delete-btn-${song.id}`}
                      className="btn btn-danger"
                      onClick={() => handleDelete(song.id)}
                      disabled={song.id.startsWith("optimistic-")}
                      title="Delete song"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================================
          Q4 + Q5: Info Cards (Explanation)
          ===================================================== */}
      <div className="card">
        <div className="card-title">📚 How It Works</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            {
              q: "Q1",
              icon: "➕",
              text: "addSong mutation – useMutation hook sends title + artist to server",
            },
            {
              q: "Q2",
              icon: "✏️",
              text: "updateSong mutation – Click ✏️ to edit title inline, saves on ✅",
            },
            {
              q: "Q3",
              icon: "🗑️",
              text: "deleteSong mutation – Click 🗑️ removes from server + UI instantly",
            },
            {
              q: "Q4",
              icon: "⚡",
              text: "Optimistic UI – Song appears immediately with 'Saving...' tag before server confirms",
            },
            {
              q: "Q5",
              icon: "🔢",
              text: "Live Count – Apollo cache auto re-renders count on every add/delete",
            },
          ].map(({ q, icon, text }) => (
            <div
              key={q}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                fontSize: "0.88rem",
                color: "#94a3b8",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{icon}</span>
              <div>
                <strong style={{ color: "#a78bfa" }}>{q}</strong> — {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
