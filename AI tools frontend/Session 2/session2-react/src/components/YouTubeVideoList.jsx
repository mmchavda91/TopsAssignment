/**
 * Q4. YouTube Video List — useVideos Custom Hook
 * ────────────────────────────────────────────────
 * Refactored using GitHub Copilot's auto-suggestions to move
 * data fetching logic into a separate useVideos hook.
 */

import { useState, useEffect } from "react";

// =========================================================
// Custom Hook: useVideos
// Separated data fetching logic from the component
// =========================================================
const useVideos = (searchQuery = "") => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 600));

        let filteredVideos = MOCK_VIDEOS;

        // Filter by search query if provided
        if (searchQuery.trim()) {
          filteredVideos = MOCK_VIDEOS.filter((video) =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setVideos(filteredVideos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return { videos, loading, error };
};

// =========================================================
// Mock YouTube Video Data
// =========================================================
const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "React 19 — Complete Tutorial for Beginners 2026",
    channel: "Traversy Media",
    views: "2.4M views",
    uploadedAt: "3 weeks ago",
    duration: "2:15:30",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop",
    verified: true,
  },
  {
    id: "v2",
    title: "Build a Full Stack App with Next.js 15 & MongoDB",
    channel: "JavaScript Mastery",
    views: "890K views",
    uploadedAt: "5 days ago",
    duration: "3:42:15",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop",
    channelAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=40&h=40&fit=crop",
    verified: true,
  },
  {
    id: "v3",
    title: "CSS Grid & Flexbox — Master Modern Layouts",
    channel: "Kevin Powell",
    views: "1.1M views",
    uploadedAt: "2 months ago",
    duration: "1:28:45",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
    channelAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop",
    verified: true,
  },
  {
    id: "v4",
    title: "Node.js Crash Course 2026 — Express, REST APIs",
    channel: "Academind",
    views: "560K views",
    uploadedAt: "1 month ago",
    duration: "1:55:20",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
    channelAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop",
    verified: false,
  },
  {
    id: "v5",
    title: "Python for Data Science — Pandas & NumPy Guide",
    channel: "Corey Schafer",
    views: "3.2M views",
    uploadedAt: "6 months ago",
    duration: "4:10:00",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    channelAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=40&h=40&fit=crop",
    verified: true,
  },
  {
    id: "v6",
    title: "TypeScript for React Developers — The Complete Guide",
    channel: "Net Ninja",
    views: "420K views",
    uploadedAt: "2 weeks ago",
    duration: "2:30:10",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    verified: true,
  },
];

// =========================================================
// VideoCard Component
// =========================================================
const VideoCard = ({ video }) => {
  const { title, channel, views, uploadedAt, duration, thumbnail, channelAvatar, verified } = video;

  return (
    <div className="yt-video-card">
      <div className="yt-thumbnail-wrapper">
        <img src={thumbnail} alt={title} className="yt-thumbnail" loading="lazy" />
        <span className="yt-duration">{duration}</span>
      </div>
      <div className="yt-video-info">
        <img src={channelAvatar} alt={channel} className="yt-channel-avatar" />
        <div className="yt-video-meta">
          <h3 className="yt-video-title">{title}</h3>
          <p className="yt-channel-name">
            {channel}
            {verified && <span className="yt-verified" title="Verified">✓</span>}
          </p>
          <p className="yt-video-stats">
            {views} • {uploadedAt}
          </p>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// Main Component: YouTubeVideoList (uses useVideos hook)
// =========================================================
const YouTubeVideoList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { videos, loading, error } = useVideos(searchQuery);

  return (
    <div className="yt-container">
      {/* Search */}
      <div className="yt-search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="yt-search-input"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="yt-loading">
          <div className="yt-spinner"></div>
          <p>Loading videos...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="yt-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* Video Grid */}
      {!loading && !error && (
        <div className="yt-video-grid">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video.id} video={video} />)
          ) : (
            <p className="yt-no-results">No videos found for "{searchQuery}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export { useVideos };
export default YouTubeVideoList;
