import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Film } from 'lucide-react';
import { EXPLORE_GRID_ITEMS } from '../data/mockData';

export default function ExploreView({ onSelectMedia }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto py-2 px-2 md:px-4">
      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 bg-neutral-100 dark:bg-neutral-800 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <Search className="w-4 h-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Cari akun, tempat, atau hashtag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 outline-none"
          />
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {EXPLORE_GRID_ITEMS.map((item, index) => {
          // Every 6 items make one larger for classic Instagram Explore mosaic feel
          const isLarge = index % 10 === 1 || index % 10 === 7;

          return (
            <div
              key={item.id}
              onClick={() => onSelectMedia && onSelectMedia(item)}
              className={`relative group overflow-hidden bg-neutral-200 dark:bg-neutral-800 cursor-pointer ${
                isLarge ? 'col-span-2 row-span-2 aspect-square md:rounded-lg' : 'aspect-square md:rounded-lg'
              }`}
            >
              <img 
                src={item.image} 
                alt="Explore" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {item.isVideo && (
                <div className="absolute top-2 right-2 text-white drop-shadow">
                  <Film className="w-4 h-4 fill-white" />
                </div>
              )}

              {/* Hover overlay with likes and comments */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-bold text-xs md:text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white -scale-x-100" />
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
