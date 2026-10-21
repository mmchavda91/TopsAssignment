/**
 * components/layout/Navbar.tsx
 * Top navigation bar — Instagram-style header
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3"
    >
      <div className="max-w-[470px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" id="nav-logo" className="text-2xl font-bold tracking-tighter">
          InstaFeed
        </Link>

        {/* Nav icons */}
        <nav className="flex items-center gap-5">
          <Link
            href="/"
            id="nav-home"
            aria-label="Home"
            className={pathname === '/' ? 'text-black' : 'text-gray-400'}
          >
            🏠
          </Link>
          <Link
            href="/explore"
            id="nav-explore"
            aria-label="Explore"
            className={pathname === '/explore' ? 'text-black' : 'text-gray-400'}
          >
            🔍
          </Link>
          <Link
            href="/reels"
            id="nav-reels"
            aria-label="Reels"
            className={pathname === '/reels' ? 'text-black' : 'text-gray-400'}
          >
            🎬
          </Link>
          <Link
            href="/notifications"
            id="nav-notifications"
            aria-label="Notifications"
            className={pathname === '/notifications' ? 'text-black' : 'text-gray-400'}
          >
            🔔
          </Link>
          <Link
            href="/profile/me"
            id="nav-profile"
            aria-label="Profile"
            className={pathname.startsWith('/profile') ? 'text-black' : 'text-gray-400'}
          >
            👤
          </Link>
        </nav>
      </div>
    </header>
  );
}
