import React, { useState } from 'react';
import { SUGGESTIONS } from '../data/mockData';

export default function RightSidebar({ currentUser, _onSelectUser }) {
  const [suggestions, setSuggestions] = useState(SUGGESTIONS);

  const toggleFollow = (id) => {
    setSuggestions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, following: !item.following } : item
      )
    );
  };

  return (
    <aside className="hidden lg:block w-80 py-8 px-4 text-xs select-none">
      {/* Current User Switcher */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 border border-neutral-200 dark:border-neutral-700">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer">
              {currentUser.username}
            </span>
            <span className="text-neutral-500 text-xs">
              {currentUser.fullName}
            </span>
          </div>
        </div>
        <button className="text-sky-500 font-semibold text-xs hover:text-sky-700 dark:hover:text-sky-400">
          Ganti
        </button>
      </div>

      {/* Suggestions Header */}
      <div className="flex items-center justify-between mb-3 text-neutral-500 font-semibold">
        <span className="text-sm">Disarankan untuk Anda</span>
        <button className="text-neutral-900 dark:text-neutral-300 font-semibold hover:text-neutral-500 text-xs">
          Lihat Semua
        </button>
      </div>

      {/* Suggestions List */}
      <div className="flex flex-col gap-3 mb-8">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col max-w-[140px]">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate hover:underline cursor-pointer">
                    {user.username}
                  </span>
                  {user.verified && (
                    <span className="text-sky-500 text-[10px]">●</span>
                  )}
                </div>
                <span className="text-neutral-500 text-[11px] truncate">
                  {user.subtitle}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleFollow(user.id)}
              className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                user.following
                  ? 'text-neutral-500 dark:text-neutral-400 hover:text-rose-500'
                  : 'text-sky-500 hover:text-sky-700 dark:hover:text-sky-400'
              }`}
            >
              {user.following ? 'Mengikuti' : 'Ikuti'}
            </button>
          </div>
        ))}
      </div>

      {/* Instagram Footer Links */}
      <footer className="text-neutral-400 dark:text-neutral-600 text-[11px] leading-relaxed">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
          <a href="#" className="hover:underline">Tentang</a> •
          <a href="#" className="hover:underline">Bantuan</a> •
          <a href="#" className="hover:underline">Pers</a> •
          <a href="#" className="hover:underline">API</a> •
          <a href="#" className="hover:underline">Karier</a> •
          <a href="#" className="hover:underline">Privasi</a> •
          <a href="#" className="hover:underline">Ketentuan</a> •
          <a href="#" className="hover:underline">Lokasi</a> •
          <a href="#" className="hover:underline">Bahasa Indonesia</a>
        </div>
        <p>© 2026 INSTAGRAM FROM META (CLONE DEMO)</p>
      </footer>
    </aside>
  );
}
