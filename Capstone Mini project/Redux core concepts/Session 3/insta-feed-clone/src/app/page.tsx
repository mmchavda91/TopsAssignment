/**
 * app/page.tsx
 * Home page — fetches posts from /api/posts and displays them
 * Demonstrates: API fetch, env variables, components, utils
 */
'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { formatCount } from '@/utils/formatters';

// Post type
interface Post {
  id: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  color: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Q3 — Log environment variable + Fetch posts from API
  useEffect(() => {
    // Log env variables
    console.log('=================================================');
    console.log('📦 Environment Variables (Session 3 - Q3):');
    console.log('NEXT_PUBLIC_MAPS_API_KEY :', process.env.NEXT_PUBLIC_MAPS_API_KEY);
    console.log('NEXT_PUBLIC_APP_NAME     :', process.env.NEXT_PUBLIC_APP_NAME);
    console.log('=================================================');

    // Fetch posts from API route
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts');
      const json = await res.json();

      if (json.success) {
        setPosts(json.data);
        console.log(`✅ Fetched ${json.count} posts from /api/posts`);
      } else {
        setError('API returned error');
      }
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('❌ API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-[470px] mx-auto py-6 px-4">

        {/* Env Variables Card — Q3 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-6 text-white shadow-lg">
          <h2 className="font-bold text-lg mb-2">📦 Q3: Env Variables</h2>
          <div className="bg-white/20 rounded-lg p-3 font-mono text-sm">
            <p>MAPS_API_KEY = <span className="font-bold text-yellow-200">{process.env.NEXT_PUBLIC_MAPS_API_KEY ?? 'not set'}</span></p>
            <p>APP_NAME = <span className="font-bold text-yellow-200">{process.env.NEXT_PUBLIC_APP_NAME ?? 'not set'}</span></p>
          </div>
        </div>

        {/* API Status Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <h2 className="font-bold text-lg mb-2">🔗 API Route: <code className="text-purple-600 bg-purple-50 px-2 py-1 rounded text-sm">/api/posts</code></h2>
          <p className="text-sm text-gray-600">
            {loading ? '⏳ Loading...' : error ? `❌ ${error}` : `✅ ${posts.length} posts fetched successfully from API!`}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Browser માં try કરો: <a href="/api/posts" target="_blank" className="text-blue-500 underline">http://localhost:3000/api/posts</a>
          </p>
        </div>

        {/* Feed */}
        <h2 className="font-bold text-lg mb-4">📸 Instagram Feed <span className="text-sm font-normal text-gray-400">(from API)</span></h2>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                </div>
                <div className="w-full aspect-square bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-center">
            <p className="font-bold">❌ {error}</p>
            <button onClick={fetchPosts} className="mt-2 text-sm underline">Retry</button>
          </div>
        )}

        {/* Posts from API */}
        {!loading && !error && posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs py-8">
          <p>InstaFeed Clone — TOPS Technology Session 3</p>
          <p>Next.js 16 + API Routes + TypeScript + Tailwind CSS</p>
        </div>
      </main>
    </div>
  );
}

/** PostCard — displays a single post fetched from API */
function PostCard({
  id, username, caption, likes, comments, timestamp, color,
}: Post) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <article
      id={`post-${id}`}
      className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: color }}
        >
          {username[0].toUpperCase()}
        </div>
        <span className="font-semibold text-sm text-gray-900">{username}</span>
        <span className="text-gray-400 text-xs ml-auto">{timestamp}</span>
      </div>

      {/* Image Placeholder */}
      <div
        className="w-full aspect-square flex items-center justify-center text-white text-6xl"
        style={{ backgroundColor: color }}
      >
        📷
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex gap-4 mb-2">
          <button
            id={`like-btn-${id}`}
            onClick={handleLike}
            className="text-2xl hover:scale-110 transition-transform active:scale-95"
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button className="text-2xl hover:scale-110 transition-transform">💬</button>
          <button className="text-2xl hover:scale-110 transition-transform">📤</button>
        </div>
        <p className="font-semibold text-sm">{formatCount(likeCount)} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">{username}</span> {caption}
        </p>
        <p className="text-gray-400 text-xs mt-1 cursor-pointer hover:text-gray-600">
          View all {comments} comments
        </p>
      </div>
    </article>
  );
}
