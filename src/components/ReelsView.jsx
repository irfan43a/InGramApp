import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, Music } from 'lucide-react';
import { REELS_DATA } from '../data/mockData';

export default function ReelsView() {
  const [reels] = useState(REELS_DATA);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState({});
  const [savedReels, setSavedReels] = useState({});

  const toggleLike = (id) => {
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSave = (id) => {
    setSavedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full max-w-sm mx-auto h-[calc(100vh-80px)] overflow-y-scroll snap-y snap-mandatory no-scrollbar py-2">
      {reels.map((reel) => {
        const isLiked = likedReels[reel.id];
        const isSaved = savedReels[reel.id];

        return (
          <div 
            key={reel.id}
            className="w-full h-full snap-start relative bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between my-2 select-none"
          >
            {/* Background Image / Reel Video Simulation */}
            <div className="absolute inset-0">
              <img 
                src={reel.videoUrl} 
                alt="Reel content" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Top Mute Control */}
            <div className="relative z-10 p-4 flex justify-between items-center text-white">
              <span className="font-bold text-lg drop-shadow">Reels</span>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white hover:bg-black/60"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Bottom Content & Right Floating Actions */}
            <div className="relative z-10 p-4 flex items-end justify-between">
              {/* Creator info & caption */}
              <div className="flex-1 mr-4 text-white">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <img 
                    src={reel.user.avatar} 
                    alt={reel.user.username} 
                    className="w-8 h-8 rounded-full border border-white/40 object-cover" 
                  />
                  <span className="font-semibold text-xs drop-shadow">
                    {reel.user.username}
                  </span>
                  <button className="text-[11px] font-semibold border border-white/60 px-2.5 py-0.5 rounded-lg backdrop-blur-xs hover:bg-white hover:text-black transition-colors">
                    Ikuti
                  </button>
                </div>

                <p className="text-xs font-normal mb-3 line-clamp-2 drop-shadow text-neutral-100">
                  {reel.description}
                </p>

                {/* Music track ticker */}
                <div className="flex items-center gap-2 text-[11px] text-white/90 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit">
                  <Music className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{reel.audio}</span>
                </div>
              </div>

              {/* Right Vertical Action Buttons */}
              <div className="flex flex-col items-center gap-4 text-white pb-1">
                <button 
                  onClick={() => toggleLike(reel.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-xs group-hover:scale-110 active:scale-90 transition-transform">
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                  </div>
                  <span className="text-[11px] font-medium">{isLiked ? '89.5K' : reel.likes}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-xs group-hover:scale-110 active:scale-90 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white -scale-x-100" />
                  </div>
                  <span className="text-[11px] font-medium">{reel.comments}</span>
                </button>

                <button 
                  onClick={() => alert('Dibagikan ke teman')}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-xs group-hover:scale-110 active:scale-90 transition-transform">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-medium">{reel.shares}</span>
                </button>

                <button 
                  onClick={() => toggleSave(reel.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-xs group-hover:scale-110 active:scale-90 transition-transform">
                    <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
                  </div>
                </button>

                {/* Spinning audio vinyl disc */}
                <div className="w-8 h-8 rounded-full border-2 border-white/60 overflow-hidden animate-spin duration-3000 mt-1">
                  <img src={reel.user.avatar} alt="Audio" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
