/**
 * utils/constants.ts
 * App-wide constants and configuration values for insta-feed-clone
 */

// Application Metadata
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'InstaFeed Clone';
export const APP_DESCRIPTION = 'A Next.js Instagram-inspired feed app built with Redux Toolkit';
export const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

// API Keys (Public — safe for browser)
export const MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Feed Configuration
export const POSTS_PER_PAGE = 10;
export const MAX_CAPTION_LENGTH = 2200;
export const MAX_HASHTAGS = 30;
export const POST_IMAGE_MAX_SIZE_MB = 8;

// Supported Media Types
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Route Paths
export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  REELS: '/reels',
  NOTIFICATIONS: '/notifications',
  MESSAGES: '/messages',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: (username: string) => `/profile/${username}`,
  POST: (postId: string) => `/p/${postId}`,
  CHAT: (chatId: string) => `/messages/${chatId}`,
} as const;

// API Endpoints
export const API = {
  POSTS: '/api/posts',
  STORIES: '/api/stories',
  USERS: '/api/users',
  AUTH: '/api/auth',
  POST_BY_ID: (id: string) => `/api/posts/${id}`,
  USER_BY_USERNAME: (username: string) => `/api/users/${username}`,
} as const;

// Placeholder images for development (picsum.photos)
export const PLACEHOLDER_POSTS = [
  { seed: 'insta1', caption: 'Golden hour vibes 🌅 #photography #sunset' },
  { seed: 'insta2', caption: 'Morning coffee ritual ☕ #aesthetic #daily' },
  { seed: 'insta3', caption: 'City lights at night 🌃 #urban #cityscape' },
  { seed: 'insta4', caption: 'Fresh from the garden 🌿 #nature #green' },
  { seed: 'insta5', caption: 'Weekend adventures 🏔️ #travel #explore' },
];
