/**
 * pages/index.tsx
 *
 * NOTE: In Next.js App Router, this is NOT a route file.
 * It lives in src/pages/ as a reference/organizational folder.
 * The actual home route is src/app/page.tsx
 *
 * This file demonstrates how to access NEXT_PUBLIC_ environment
 * variables inside a Next.js page component.
 *
 * To use as an actual page, it would be placed at:
 * src/app/page.tsx  OR  pages/index.tsx (Pages Router)
 */

'use client';

import { useEffect } from 'react';
import { MAPS_API_KEY, APP_NAME, APP_URL } from '@/utils/constants';

export default function IndexPage() {
  useEffect(() => {
    // ✅ Accessing NEXT_PUBLIC_ env variable via process.env
    const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
    const appName = process.env.NEXT_PUBLIC_APP_NAME;
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

    console.log('=================================================');
    console.log('📦 Environment Variables Loaded (process.env):');
    console.log('=================================================');
    console.log('NEXT_PUBLIC_MAPS_API_KEY :', mapsApiKey);
    console.log('NEXT_PUBLIC_APP_NAME     :', appName);
    console.log('NEXT_PUBLIC_API_BASE_URL :', apiBase);
    console.log('=================================================');
    console.log('📦 Environment Variables via constants.ts:');
    console.log('=================================================');
    console.log('MAPS_API_KEY  :', MAPS_API_KEY);
    console.log('APP_NAME      :', APP_NAME);
    console.log('APP_URL       :', APP_URL);
    console.log('=================================================');

    if (!mapsApiKey) {
      console.warn('⚠️  NEXT_PUBLIC_MAPS_API_KEY is not set in .env.local');
    } else {
      console.log('✅ Maps API Key loaded successfully:', mapsApiKey);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        🔐 Environment Variables Demo
      </h1>
      <p className="text-gray-500 mb-6 text-sm">
        Open browser console (F12) to see all logged env values
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full space-y-4">
        {/* MAPS API KEY */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            NEXT_PUBLIC_MAPS_API_KEY
          </span>
          <code
            id="env-maps-key"
            className="bg-green-50 border border-green-200 rounded px-3 py-2 text-green-700 font-mono text-sm"
          >
            {process.env.NEXT_PUBLIC_MAPS_API_KEY ?? '❌ Not set'}
          </code>
        </div>

        {/* APP NAME */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            NEXT_PUBLIC_APP_NAME
          </span>
          <code
            id="env-app-name"
            className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-blue-700 font-mono text-sm"
          >
            {process.env.NEXT_PUBLIC_APP_NAME ?? '❌ Not set'}
          </code>
        </div>

        {/* API BASE URL */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            NEXT_PUBLIC_API_BASE_URL
          </span>
          <code
            id="env-api-url"
            className="bg-purple-50 border border-purple-200 rounded px-3 py-2 text-purple-700 font-mono text-sm"
          >
            {process.env.NEXT_PUBLIC_API_BASE_URL ?? '❌ Not set'}
          </code>
        </div>

        {/* Server-only note */}
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-xs text-red-600">
            <strong>⚠️ Server-only variables</strong> (like DATABASE_URL, JWT_SECRET) are
            <strong> undefined</strong> in this client component — they never reach the browser.
          </p>
        </div>
      </div>
    </div>
  );
}
