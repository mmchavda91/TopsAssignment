/**
 * components/feed/FeedList.tsx
 * Feed container that renders a list of PostCards
 */
'use client';

import PostCard from './PostCard';

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface FeedListProps {
  posts: Post[];
}

export default function FeedList({ posts }: FeedListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No posts yet. Follow some accounts to see their posts here!
      </div>
    );
  }

  return (
    <section id="feed-list" className="flex flex-col items-center py-4 px-4">
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </section>
  );
}
