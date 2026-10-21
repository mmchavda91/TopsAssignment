/**
 * utils/formatters.ts
 * Utility functions for formatting data in the insta-feed-clone app
 */

/**
 * Formats a large number into a short readable format
 * e.g. 1247 → "1.2K", 1000000 → "1M"
 */
export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

/**
 * Formats a timestamp into relative time
 * e.g. "2h ago", "3d ago", "Just now"
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Truncates caption text to a specified character limit
 * e.g. "A very long caption..." → "A very long..."
 */
export function truncateCaption(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Validates if a URL is a valid image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    const pathname = parsed.pathname.toLowerCase();
    return (
      ['http:', 'https:'].includes(parsed.protocol) &&
      imageExtensions.some(ext => pathname.endsWith(ext))
    );
  } catch {
    return false;
  }
}

/**
 * Generates a placeholder avatar URL from username initials
 * Uses DiceBear API for consistent avatar generation
 */
export function getAvatarUrl(username: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`;
}

/**
 * Extracts hashtags from a caption string
 * e.g. "Hello #world #react" → ["#world", "#react"]
 */
export function extractHashtags(caption: string): string[] {
  const regex = /#[\w]+/g;
  return caption.match(regex) ?? [];
}
