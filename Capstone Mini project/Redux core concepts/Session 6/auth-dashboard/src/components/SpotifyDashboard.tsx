"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

const featuredTracks: Track[] = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    duration: "3:50",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "Divide",
    duration: "3:53",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
  },
];

export default function SpotifyDashboard() {
  const { user, logout } = useAuth();
  const reduxAuth = useSelector((state: RootState) => state.auth);

  const [currentTrack, setCurrentTrack] = useState<Track>(featuredTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden select-none">
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 bg-zinc-950 p-6 flex flex-col justify-between border-r border-zinc-900/80 z-20">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-[#1DB954] text-black font-black rounded-full flex items-center justify-center text-xl shadow-lg shadow-[#1DB954]/20">
              ♫
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Spotify
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 text-sm font-semibold">
            {["Home", "Search", "Your Library"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`flex items-center space-x-3.5 px-3 py-2.5 rounded-lg w-full text-left transition duration-150 ${
                  activeTab === item
                    ? "bg-zinc-800/80 text-white font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <span className="text-base">
                  {item === "Home" ? "🏠" : item === "Search" ? "🔍" : "📚"}
                </span>
                <span>{item}</span>
              </button>
            ))}
          </nav>

          {/* Playlists */}
          <div className="mt-8 pt-6 border-t border-zinc-900">
            <h4 className="text-xs uppercase font-extrabold text-zinc-500 mb-3 tracking-wider">
              Your Playlists
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="hover:text-white cursor-pointer transition flex items-center space-x-2">
                <span className="text-[#1DB954]">●</span>
                <span>Discover Weekly</span>
              </li>
              <li className="hover:text-white cursor-pointer transition flex items-center space-x-2">
                <span className="text-zinc-600">●</span>
                <span>Coding Chill Beats</span>
              </li>
              <li className="hover:text-white cursor-pointer transition flex items-center space-x-2">
                <span className="text-zinc-600">●</span>
                <span>Top 50 - Global</span>
              </li>
              <li className="hover:text-white cursor-pointer transition flex items-center space-x-2">
                <span className="text-zinc-600">●</span>
                <span>Redux & React Jam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* User Profile Card & Logout Button */}
        <div className="pt-4 border-t border-zinc-900/80">
          <div className="flex items-center justify-between bg-zinc-900/70 p-2.5 rounded-xl border border-zinc-800">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <img
                src={user?.avatarUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                alt="User"
                className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex-shrink-0"
              />
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate max-w-[90px]">
                  {user?.displayName || "User"}
                </p>
                <p className="text-[10px] text-zinc-400 truncate max-w-[90px]">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log Out"
              className="px-2 py-1 text-[11px] font-bold bg-zinc-800 hover:bg-red-500/90 text-zinc-200 hover:text-white rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Dashboard */}
      <main className="flex-1 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 overflow-y-auto pb-28">
        {/* Header Bar */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Good evening, {user?.displayName}! 👋
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Spotify Protected Dashboard • Firebase Auth & Context API Active
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Redux Sync Status Tag */}
            <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-zinc-300 font-medium">Redux:</span>
              <span className="text-emerald-400 font-bold">
                {reduxAuth.isAuthenticated ? "Connected" : "Idle"}
              </span>
            </div>

            {/* Session Persistence Badge */}
            <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300">
              💾 <span className="text-zinc-400">localStorage:</span> <span className="text-[#1DB954] font-semibold">Persisted</span>
            </div>
          </div>
        </header>

        {/* Hero Card */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-emerald-900/60 via-zinc-900/60 to-zinc-950 border border-emerald-500/20 mb-8 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <span className="text-[11px] uppercase tracking-widest font-black text-[#1DB954]">
              Featured Playlist
            </span>
            <h2 className="text-3xl font-black text-white mt-1 mb-2">
              Today's Top Hits 2026
            </h2>
            <p className="text-xs text-zinc-300 mb-4 line-clamp-2">
              The hottest tracks right now. Featuring The Weeknd, Dua Lipa, Harry Styles, and more.
            </p>
            <button
              onClick={() => {
                setCurrentTrack(featuredTracks[0]);
                setIsPlaying(true);
              }}
              className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold rounded-full text-xs tracking-wider uppercase transition shadow-lg shadow-[#1DB954]/25 flex items-center space-x-2"
            >
              <span>▶</span>
              <span>Play Playlist</span>
            </button>
          </div>
        </div>

        {/* Tracks Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-black text-white">Popular Releases</h3>
            <span className="text-xs text-zinc-400">Click any card to play</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredTracks.map((track) => {
              const isCurrent = currentTrack.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                  }}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 group border ${
                    isCurrent
                      ? "bg-zinc-800/90 border-[#1DB954]/50 shadow-lg shadow-[#1DB954]/10"
                      : "bg-zinc-900/40 hover:bg-zinc-800/60 border-zinc-800/50"
                  }`}
                >
                  <div className="relative mb-3 aspect-square rounded-lg overflow-hidden">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div
                      className={`absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#1DB954] text-black font-black flex items-center justify-center shadow-lg transition duration-200 ${
                        isCurrent && isPlaying
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                      }`}
                    >
                      {isCurrent && isPlaying ? "❚❚" : "▶"}
                    </div>
                  </div>
                  <h4 className="font-bold text-xs text-white truncate">{track.title}</h4>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{track.artist}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 3. Bottom Player Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-22 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 px-6 py-3 flex items-center justify-between text-white z-50">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-1/4">
          <img
            src={currentTrack.cover}
            alt="Now Playing"
            className="w-12 h-12 rounded-lg object-cover border border-zinc-800"
          />
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
            <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Play Controls & Progress */}
        <div className="flex flex-col items-center w-2/4 max-w-md">
          <div className="flex items-center space-x-5 mb-1.5">
            <button
              onClick={() => {
                const prevIndex = (featuredTracks.findIndex((t) => t.id === currentTrack.id) - 1 + featuredTracks.length) % featuredTracks.length;
                setCurrentTrack(featuredTracks[prevIndex]);
              }}
              className="text-zinc-400 hover:text-white transition"
              title="Previous"
            >
              ⏮
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-white hover:bg-zinc-200 text-black font-black flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button
              onClick={() => {
                const nextIndex = (featuredTracks.findIndex((t) => t.id === currentTrack.id) + 1) % featuredTracks.length;
                setCurrentTrack(featuredTracks[nextIndex]);
              }}
              className="text-zinc-400 hover:text-white transition"
              title="Next"
            >
              ⏭
            </button>
          </div>

          <div className="w-full flex items-center space-x-2 text-[10px] text-zinc-500 font-mono">
            <span>{isPlaying ? "1:15" : "0:00"}</span>
            <div className="flex-1 bg-zinc-800 h-1 rounded-full overflow-hidden cursor-pointer group">
              <div
                className={`h-full bg-[#1DB954] rounded-full transition-all duration-300 ${
                  isPlaying ? "w-2/5" : "w-1/12"
                }`}
              ></div>
            </div>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="w-1/4 flex items-center justify-end space-x-2 text-xs text-zinc-400">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 h-1 bg-zinc-800 accent-[#1DB954] rounded-lg cursor-pointer"
          />
          <span className="w-8 text-right font-mono text-[10px]">{volume}%</span>
        </div>
      </footer>
    </div>
  );
}
