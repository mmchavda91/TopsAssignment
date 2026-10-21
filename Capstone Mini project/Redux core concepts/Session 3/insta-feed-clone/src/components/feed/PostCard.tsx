/**
 * components/feed/PostCard.tsx
 * Individual Instagram-style post card component
 */
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PostCardProps {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export default function PostCard({
  id,
  username,
  userAvatar,
  imageUrl,
  caption,
  likes,
  comments,
  timestamp,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <article
      id={`post-${id}`}
      className="bg-white border border-gray-200 rounded-xl mb-6 max-w-[470px] w-full"
    >
      {/* Post Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="relative w-8 h-8">
          <Image
            src={userAvatar}
            alt={`${username}'s avatar`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="font-semibold text-sm text-gray-900">{username}</span>
        <span className="text-gray-400 text-xs ml-auto">{timestamp}</span>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={imageUrl}
          alt={`Post by ${username}`}
          fill
          className="object-cover"
          sizes="(max-width: 470px) 100vw, 470px"
        />
      </div>

      {/* Actions */}
      <div className="p-3">
        <button
          id={`like-btn-${id}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
          className="text-xl mb-1"
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <p className="font-semibold text-sm">{likeCount.toLocaleString()} likes</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">{username}</span> {caption}
        </p>
        <p className="text-gray-400 text-xs mt-1">View all {comments} comments</p>
      </div>
    </article>
  );
}
