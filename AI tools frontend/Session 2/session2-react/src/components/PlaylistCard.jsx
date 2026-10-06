/**
 * Q1. PlaylistCard Component
 * -------------------------------------------------
 * A React functional component that displays a music
 * playlist's name, creator, and song count.
 * Generated with the help of GitHub Copilot.
 */

import React from "react";
import PropTypes from "prop-types";
import "./PlaylistCard.css";

const PlaylistCard = ({ name, creator, songCount, coverImage }) => {
  return (
    <div className="playlist-card">
      {/* Cover Image */}
      <div className="playlist-cover">
        <img
          src={
            coverImage ||
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop"
          }
          alt={`${name} playlist cover`}
          className="playlist-cover-img"
        />
        <div className="playlist-overlay">
          <button className="play-btn" aria-label="Play playlist">
            ▶
          </button>
        </div>
      </div>

      {/* Playlist Info */}
      <div className="playlist-info">
        <h3 className="playlist-name">{name}</h3>
        <p className="playlist-creator">by {creator}</p>
        <span className="playlist-song-count">🎵 {songCount} songs</span>
      </div>
    </div>
  );
};

// PropTypes for type checking
PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  songCount: PropTypes.number.isRequired,
  coverImage: PropTypes.string,
};

// Default props
PlaylistCard.defaultProps = {
  coverImage: "",
};

export default PlaylistCard;
