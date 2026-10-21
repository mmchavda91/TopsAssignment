# 📘 Redux Core Concepts — Session 3 Assignment Answers

**Course:** React & Redux Capstone Mini Project  
**Session:** 3  
**Date:** October 2026

---

## 📋 Table of Contents

1. [Q1: Install Node.js & Create Next.js App](#q1)
2. [Q2: Organize src Folder for Scalable Structure](#q2)
3. [Q3: .env.local Setup & Accessing Env Variables](#q3)
4. [Q4: Secure .env Config for Spotify & Firebase APIs](#q4)

---

## Q1 — Install Node.js & Create Next.js App `insta-feed-clone`

> **Question:** Install Node.js and use npx to create a new Next.js app named insta-feed-clone, then run it locally and verify the default homepage loads.

### Step 1: Verify Node.js Installation

```bash
node --version    # v24.16.0 ✅
npm --version     # 11.13.0  ✅
```

### Step 2: Create Next.js App

```bash
npx create-next-app@latest insta-feed-clone ^
  --typescript --tailwind --eslint --app --src-dir ^
  --import-alias "@/*" --use-npm
```

| Flag | Purpose |
|------|---------|
| `--typescript` | TypeScript support |
| `--tailwind` | Tailwind CSS for styling |
| `--app` | App Router (Next.js 13+) |
| `--src-dir` | Source files inside `/src` folder |
| `--import-alias "@/*"` | Clean import paths |

### Step 3: Run & Verify

```bash
cd insta-feed-clone
npm run dev
# ▲ Next.js 16.4.2 (Turbopack)
# - Local: http://localhost:3000
# ✓ Ready in 1208ms
```

**Result:** Default Next.js homepage loads successfully at `http://localhost:3000` ✅

---

## Q2 — Organize src Folder for Scalable Structure

> **Question:** Inside your insta-feed-clone project, organize the src folder to include separate folders for components, pages, and utils to prepare for a scalable structure.

### Commands Used (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "src\components\feed"
New-Item -ItemType Directory -Force -Path "src\components\layout"
New-Item -ItemType Directory -Force -Path "src\components\ui"
New-Item -ItemType Directory -Force -Path "src\pages"
New-Item -ItemType Directory -Force -Path "src\utils"
New-Item -ItemType Directory -Force -Path "src\store\slices"
New-Item -ItemType Directory -Force -Path "src\hooks"
New-Item -ItemType Directory -Force -Path "src\types"
New-Item -ItemType Directory -Force -Path "src\lib"
```

### Final Organized src Structure:

```
src/
├── app/                           ← Next.js App Router (routing)
│   ├── layout.tsx                 ← Root HTML layout
│   ├── page.tsx                   ← Home page (/)
│   ├── globals.css                ← Global styles
│   └── api/
│       └── posts/
│           └── route.ts           ← API Route (/api/posts)
│
├── components/                    ← Reusable React components
│   ├── feed/
│   │   ├── PostCard.tsx           ← Instagram-style post with like toggle
│   │   └── FeedList.tsx           ← Renders array of PostCards
│   ├── layout/
│   │   └── Navbar.tsx             ← Sticky top nav with active route
│   └── ui/
│       └── Button.tsx             ← Reusable button (primary/outline/ghost)
│
├── pages/                         ← Page-level demo components
│   └── env-demo.tsx               ← Env variable demo page (/env-demo)
│
├── utils/                         ← Pure helper functions
│   ├── formatters.ts              ← formatCount, formatRelativeTime, extractHashtags
│   └── constants.ts               ← ROUTES, API paths, APP_NAME
│
├── store/                         ← Redux Toolkit (ready to add)
│   └── slices/
├── hooks/                         ← Custom React hooks
├── types/                         ← TypeScript interfaces
└── lib/                           ← Firebase, external lib configs
```

### Key Files Created:

**1. PostCard.tsx** (`src/components/feed/PostCard.tsx`)
```tsx
'use client';
import { useState } from 'react';

interface PostCardProps {
  id: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  color: string;
}

export default function PostCard({ id, username, caption, likes, comments, timestamp, color }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <article id={`post-${id}`} className="bg-white border rounded-xl mb-4 overflow-hidden">
      {/* Header: avatar + username */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center"
             style={{ backgroundColor: color }}>
          {username[0].toUpperCase()}
        </div>
        <span className="font-semibold text-sm">{username}</span>
        <span className="text-gray-400 text-xs ml-auto">{timestamp}</span>
      </div>
      {/* Post image placeholder */}
      <div className="w-full aspect-square flex items-center justify-center text-6xl"
           style={{ backgroundColor: color }}>📷</div>
      {/* Like button + caption */}
      <div className="p-3">
        <button onClick={handleLike} className="text-2xl">{isLiked ? '❤️' : '🤍'}</button>
        <p className="font-semibold text-sm">{likeCount.toLocaleString()} likes</p>
        <p className="text-sm mt-1"><span className="font-semibold">{username}</span> {caption}</p>
        <p className="text-gray-400 text-xs mt-1">View all {comments} comments</p>
      </div>
    </article>
  );
}
```

**2. Navbar.tsx** (`src/components/layout/Navbar.tsx`)
```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-white border-b px-4 py-3">
      <div className="max-w-[470px] mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">InstaFeed</Link>
        <nav className="flex items-center gap-5">
          <Link href="/" className={pathname === '/' ? 'text-black' : 'text-gray-400'}>🏠</Link>
          <Link href="/explore" className={pathname === '/explore' ? 'text-black' : 'text-gray-400'}>🔍</Link>
          <Link href="/reels" className={pathname === '/reels' ? 'text-black' : 'text-gray-400'}>🎬</Link>
          <Link href="/notifications" className={pathname === '/notifications' ? 'text-black' : 'text-gray-400'}>🔔</Link>
          <Link href="/profile/me" className={pathname?.startsWith('/profile') ? 'text-black' : 'text-gray-400'}>👤</Link>
        </nav>
      </div>
    </header>
  );
}
```

**3. formatters.ts** (`src/utils/formatters.ts`)
```typescript
// Format numbers: 1247 → "1.2K" | 1000000 → "1M"
export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

// Relative time: "Just now" | "2h ago" | "3d ago"
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 60) return 'Just now';
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
  if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
  return `${Math.floor(diffSecs / 86400)}d ago`;
}

// Extract hashtags from caption
export function extractHashtags(caption: string): string[] {
  return caption.match(/#[\w]+/g) ?? [];
}
```

**4. API Route** (`src/app/api/posts/route.ts`)
```typescript
import { NextResponse } from 'next/server';

const posts = [
  { id: '1', username: 'travel_diaries', caption: 'Mountains 🏔️', likes: 2453, comments: 89, timestamp: '2h ago', color: '#FF6B6B' },
  { id: '2', username: 'foodie_mamta', caption: 'Pasta night 🍝', likes: 1200, comments: 45, timestamp: '5h ago', color: '#4ECDC4' },
  // ... more posts
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
  return NextResponse.json({ success: true, count: posts.length, data: posts });
}
```

**5. Homepage with API fetch** (`src/app/page.tsx`)
```tsx
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Log env variable (Q3)
    console.log('NEXT_PUBLIC_MAPS_API_KEY:', process.env.NEXT_PUBLIC_MAPS_API_KEY);

    // Fetch from API route
    fetch('/api/posts')
      .then(res => res.json())
      .then(json => { setPosts(json.data); setLoading(false); })
      .catch(err => console.error('API Error:', err));
  }, []);

  // Renders Navbar + env card + feed posts from API
}
```

### Benefits of This Structure:

| Benefit | How |
|---------|-----|
| Separation of concerns | UI, state, routing, utilities all in separate folders |
| Easy navigation | Developers know exactly where each file type lives |
| Scalability | New features go in their own subfolder (e.g., `components/stories/`) |
| Reusability | `Button.tsx` and `formatters.ts` shared across all pages |

---

## Q3 — .env.local Setup & Accessing Env Variables

> **Question:** Create a .env.local file in your project root and add a variable NEXT_PUBLIC_MAPS_API_KEY with a fake value (e.g., 'test123'), then access and log this variable inside pages/index.tsx using process.env.NEXT_PUBLIC_MAPS_API_KEY.
> **Hint:** Remember to restart the dev server after adding or changing .env.local.

### Created `.env.local` File (project root):

```env
# =====================================================
# insta-feed-clone — Environment Variables
# ⚠️ NEVER commit this file to GitHub!
# =====================================================

# PUBLIC VARIABLES — browser-safe (NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_MAPS_API_KEY=test123
NEXT_PUBLIC_APP_NAME=InstaFeed Clone
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# SERVER-ONLY — never exposed to browser (no prefix)
DATABASE_URL=postgresql://user:password@localhost:5432/insta_feed_dev
JWT_SECRET=dev-super-secret-jwt-key
```

### How Env Variables Work in Next.js:

```
          .env.local
              │
 ┌────────────┴────────────┐
 │                         │
NEXT_PUBLIC_*             No prefix
 │                         │
 ▼                         ▼
✅ Browser + Server      ✅ Server Only
                         ❌ undefined in browser
```

### Accessing & Logging in Code:

```tsx
// src/pages/env-demo.tsx (also used in app/page.tsx)
'use client';
import { useEffect } from 'react';

export default function EnvDemo() {
  useEffect(() => {
    console.log('=================================================');
    console.log('📦 Environment Variables Loaded:');
    console.log('NEXT_PUBLIC_MAPS_API_KEY :', process.env.NEXT_PUBLIC_MAPS_API_KEY);
    // Output: "test123" ✅
    console.log('=================================================');
  }, []);

  return (
    <div>
      <h1>Env Demo</h1>
      <code>{process.env.NEXT_PUBLIC_MAPS_API_KEY ?? 'Not set'}</code>
    </div>
  );
}
```

### Steps to Apply Changes:

```bash
# 1. Create/edit .env.local
# 2. Stop dev server: Ctrl + C
# 3. Restart: npm run dev
# 4. Open http://localhost:3000 → F12 → Console
# Output: NEXT_PUBLIC_MAPS_API_KEY : test123 ✅
```

> **Why restart?** Next.js reads `.env.local` only at server startup. Changes are NOT hot-reloaded.

### Common Mistakes:

| Mistake | Result | Fix |
|---------|--------|-----|
| No `NEXT_PUBLIC_` prefix | `undefined` in browser | Add `NEXT_PUBLIC_` prefix |
| Changed `.env.local` without restart | Old value shown | `Ctrl+C` → `npm run dev` |
| Extra space: `KEY= value` | `" value"` with space | `KEY=value` (no spaces) |

---

## Q4 — Secure .env Config for Spotify & Firebase APIs

> **Question:** Use ChatGPT to generate a secure .env configuration for a React app that will use Spotify and Firebase APIs. Copy the suggested structure, adapt it for your project, and explain one way to avoid accidentally uploading your .env.local file to GitHub.

### AI-Generated & Adapted `.env` Configuration:

```env
# ========================================================
# insta-feed-clone — Complete Secure .env Configuration
# ========================================================
#
# 🔴 SECURITY RULES:
#   1. NEVER commit this file to Git
#   2. NEVER share values in chat/email
#   3. Use different keys for dev/staging/production
#   4. Rotate any key that was accidentally exposed
# ========================================================

# ── APPLICATION ──────────────────────────────────────────
NEXT_PUBLIC_APP_NAME=InstaFeed Clone
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ── SPOTIFY API (OAuth 2.0) ──────────────────────────────
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-spotify-client-id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback
NEXT_PUBLIC_SPOTIFY_SCOPES=user-read-private user-read-email streaming

# 🔒 SERVER ONLY — token exchange
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_TOKEN_ENDPOINT=https://accounts.spotify.com/api/token

# ── FIREBASE CLIENT SDK (browser-safe) ───────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy-your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXX

# ── FIREBASE ADMIN SDK (🔒 SERVER ONLY) ──────────────────
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nKEY_HERE\n-----END PRIVATE KEY-----\n"

# ── DATABASE & AUTH SECRETS ──────────────────────────────
DATABASE_URL=postgresql://user:pass@localhost:5432/insta_feed_dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
JWT_SECRET=strong-random-secret-min-32-chars

# ── GOOGLE MAPS ──────────────────────────────────────────
NEXT_PUBLIC_MAPS_API_KEY=test123
```

### Using Spotify in Code (Server-Side Only):

```typescript
// src/app/api/auth/spotify/route.ts
export async function POST(request: Request) {
  const { code } = await request.json();

  const response = await fetch(process.env.SPOTIFY_TOKEN_ENDPOINT!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!, // 🔒 Server only!
    }),
  });

  return Response.json(await response.json());
}
```

### Using Firebase in Code (Client-Side):

```typescript
// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default app;
```

### ✅ How to Avoid Uploading .env.local to GitHub:

**Method 1 — `.gitignore` (Primary Defence — Already Active!)**

Next.js `create-next-app` automatically adds `.env*` to `.gitignore`:

```gitignore
# env files
.env*
```

This one pattern protects ALL env files: `.env`, `.env.local`, `.env.development.local`, `.env.production`

```bash
# Verify protection:
git check-ignore -v .env.local
# Output: .gitignore:34:.env*  .env.local  ✅

git status
# .env.local will NOT appear in "Untracked files"
```

**Method 2 — `git-secrets` (Pre-commit Hook)**
```bash
git secrets --install       # Adds pre-commit hook
git secrets --register-aws  # Auto-detects AWS key patterns
# Blocks any commit that contains secret patterns
```

**Method 3 — GitHub Secret Scanning**
GitHub scans public repos for leaked API keys automatically and alerts you.

**Method 4 — `.env.example` (Team Best Practice)**
```bash
# Commit this SAFE template with no real values:
NEXT_PUBLIC_MAPS_API_KEY=your-google-maps-api-key
SPOTIFY_CLIENT_SECRET=your-spotify-secret
FIREBASE_ADMIN_PRIVATE_KEY=your-firebase-key

# Teammates copy it:
cp .env.example .env.local   # Then fill in real values
```

| Method | What it does | Strength |
|--------|-------------|----------|
| `.gitignore` with `.env*` | Git ignores all env files | 🔒🔒🔒 Essential |
| `git-secrets` hook | Blocks commits with secret patterns | 🔒🔒🔒 Strong |
| GitHub Secret Scanning | Auto-alerts if secrets pushed | 🔒🔒 Reactive |
| `.env.example` template | Documents structure safely | 🔒 Best practice |

> ⚠️ **Important:** Add `.env.local` to `.gitignore` BEFORE your first `git add .` — once a secret is committed, it exists in git history even after deletion. If exposed, use BFG Repo-Cleaner and rotate all keys immediately.

---

## Summary — Session 3 Tasks

| Question | Task | Status |
|---------|------|--------|
| **Q1** | Install Node.js + Create `insta-feed-clone` with `npx create-next-app` | ✅ |
| **Q2** | Organize `src/` with components/, pages/, utils/ + all files created | ✅ |
| **Q3** | Create `.env.local` with `NEXT_PUBLIC_MAPS_API_KEY=test123`, log in code | ✅ |
| **Q4** | AI-generated secure `.env` for Spotify + Firebase, `.gitignore` protection | ✅ |

---

*Assignment completed for TOPS Technology — React & Redux Capstone Course.*
