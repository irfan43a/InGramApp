import React, { useState } from 'react';
import { Grid, Bookmark, Tag, Settings, Link as LinkIcon, Heart, MessageCircle } from 'lucide-react';

const HIGHLIGHTS = [
  { id: 'h1', title: 'Bali 🌴', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=150&auto=format&fit=crop&q=80' },
  { id: 'h2', title: 'Japan ⛩️', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=150&auto=format&fit=crop&q=80' },
  { id: 'h3', title: 'Coffee ☕', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80' },
  { id: 'h4', title: 'Setups 💻', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80' },
  { id: 'h5', title: 'Food 🍜', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&auto=format&fit=crop&q=80' },
];

export default function ProfileView({ posts, savedPosts, currentUser }) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'tagged'

  // Filter posts created by current user or show initial sample
  const userPosts = posts.filter(p => p.user.username === currentUser.username);
  const displayPosts = userPosts.length > 0 ? userPosts : posts.slice(0, 6);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-1 story-ring-gradient flex-shrink-0 cursor-pointer">
          <div className="w-full h-full rounded-full bg-white dark:bg-black p-1">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username} 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-normal text-neutral-900 dark:text-white">
                {currentUser.username}
              </h2>
              {currentUser.verified && (
                <span className="text-sky-500 font-bold">●</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Fitur Edit Profil')}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
              >
                Edit profil
              </button>
              <button 
                onClick={() => alert('Lihat arsip')}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
              >
                Lihat arsip
              </button>
              <button className="p-1.5 text-neutral-700 dark:text-neutral-300">
                <Settings className="w-5 h-5 stroke-[1.8px]" />
              </button>
            </div>
          </div>

          {/* Followers / Following counts */}
          <div className="flex justify-center md:justify-start gap-8 text-sm">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white mr-1">
                {currentUser.postsCount + userPosts.length}
              </span> 
              <span className="text-neutral-600 dark:text-neutral-400">kiriman</span>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white mr-1">
                {currentUser.followersCount}
              </span> 
              <span className="text-neutral-600 dark:text-neutral-400">pengikut</span>
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white mr-1">
                {currentUser.followingCount}
              </span> 
              <span className="text-neutral-600 dark:text-neutral-400">diikuti</span>
            </div>
          </div>

          {/* Bio & Link */}
          <div className="text-xs leading-relaxed max-w-md">
            <span className="font-bold text-neutral-900 dark:text-white block">
              {currentUser.fullName}
            </span>
            <p className="text-neutral-800 dark:text-neutral-200 whitespace-pre-line mt-0.5">
              {currentUser.bio}
            </p>
            {currentUser.website && (
              <a 
                href={currentUser.website} 
                target="_blank" 
                rel="noreferrer"
                className="text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1 mt-1"
              >
                <LinkIcon className="w-3 h-3" />
                {currentUser.website.replace('https://', '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Story Highlights */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-6 mb-6">
        {HIGHLIGHTS.map(hl => (
          <div key={hl.id} className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group">
            <div className="w-16 h-16 rounded-full p-[2px] border border-neutral-300 dark:border-neutral-700 group-hover:scale-105 transition-transform">
              <img src={hl.image} alt={hl.title} className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
              {hl.title}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs (Posts, Saved, Tagged) */}
      <div className="flex justify-center border-t border-neutral-200 dark:border-neutral-800 gap-12 text-xs tracking-wider uppercase font-semibold text-neutral-500">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 py-4 border-t transition-colors ${
            activeTab === 'posts' 
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white' 
              : 'border-transparent hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          KIRIMAN
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 py-4 border-t transition-colors ${
            activeTab === 'saved' 
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white' 
              : 'border-transparent hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          TERSIMPAN
        </button>

        <button
          onClick={() => setActiveTab('tagged')}
          className={`flex items-center gap-2 py-4 border-t transition-colors ${
            activeTab === 'tagged' 
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white' 
              : 'border-transparent hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          DITANDAI
        </button>
      </div>

      {/* Tab Content Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 mt-2">
        {activeTab === 'posts' && (
          displayPosts.map(post => (
            <div key={post.id} className="relative aspect-square bg-neutral-200 dark:bg-neutral-800 group overflow-hidden cursor-pointer md:rounded-md">
              <img 
                src={post.images ? post.images[0] : post.image} 
                alt="Post" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likesCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 fill-white -scale-x-100" />
                  <span>{post.comments ? post.comments.length : 0}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {activeTab === 'saved' && (
          savedPosts.length > 0 ? (
            savedPosts.map(post => (
              <div key={post.id} className="relative aspect-square bg-neutral-200 dark:bg-neutral-800 group overflow-hidden cursor-pointer md:rounded-md">
                <img 
                  src={post.images ? post.images[0] : post.image} 
                  alt="Saved Post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-neutral-400 text-xs">
              Belum ada kiriman yang disimpan. Tekan ikon bookmark untuk menyimpan kiriman ke koleksi Anda.
            </div>
          )
        )}

        {activeTab === 'tagged' && (
          <div className="col-span-3 text-center py-12 text-neutral-400 text-xs">
            Foto yang menandai Anda akan muncul di sini.
          </div>
        )}
      </div>
    </div>
  );
}
