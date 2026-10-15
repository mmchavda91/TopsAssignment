// utils/index.js
// This folder contains helper functions, API calls, and utility methods
// Example utilities: formatDate, truncateText, fetchPlaylists

// Placeholder utility function
export function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default formatDuration;
