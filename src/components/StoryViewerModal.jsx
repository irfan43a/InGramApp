import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export default function StoryViewerModal({ story, allStories, onClose, onStorySeen }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    allStories.findIndex(s => s.id === story.id) >= 0 
      ? allStories.findIndex(s => s.id === story.id) 
      : 0
  );
  const [itemIndex, setItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  const activeStory = allStories[currentStoryIndex] || story;
  const currentItem = activeStory.items[itemIndex] || activeStory.items[0];
  const DURATION_MS = 5000;
  const progressIntervalRef = useRef(null);

  // Next item or next user story
  const handleNextItem = useCallback(() => {
    if (itemIndex < activeStory.items.length - 1) {
      setItemIndex(prev => prev + 1);
    } else if (currentStoryIndex < allStories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setItemIndex(0);
    } else {
      onClose();
    }
  }, [itemIndex, currentStoryIndex, activeStory.items.length, allStories.length, onClose]);

  // Prev item or prev user story
  const handlePrevItem = useCallback(() => {
    if (itemIndex > 0) {
      setItemIndex(prev => prev - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      const prevStory = allStories[currentStoryIndex - 1];
      setItemIndex(prevStory.items.length - 1);
    }
  }, [itemIndex, currentStoryIndex, allStories]);

  // Mark active story as seen
  useEffect(() => {
    if (activeStory && onStorySeen) {
      onStorySeen(activeStory.id);
    }
  }, [currentStoryIndex, activeStory, onStorySeen]);

  // Handle story progress timer
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const interval = 50;

    progressIntervalRef.current = setInterval(() => {
      if (isPaused) return;
      const elapsed = Date.now() - startTime;
      const currentPct = (elapsed / DURATION_MS) * 100;

      if (currentPct >= 100) {
        clearInterval(progressIntervalRef.current);
        handleNextItem();
      } else {
        setProgress(currentPct);
      }
    }, interval);

    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [currentStoryIndex, itemIndex, isPaused, handleNextItem]);

  const sendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Balasan terkirim ke @${activeStory.user.username}: "${replyText}"`);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center backdrop-blur-md">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-black/40 z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Story Button (Desktop) */}
      {currentStoryIndex > 0 && (
        <button
          onClick={handlePrevItem}
          className="hidden md:flex absolute left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-40"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Story Player Container */}
      <div 
        className="relative w-full max-w-sm h-[88vh] max-h-[780px] bg-neutral-900 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Background Media */}
        <div className="absolute inset-0">
          <img 
            src={currentItem.url} 
            alt="Story" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Top Progress Bars & Header */}
        <div className="relative z-20 p-3 pt-3 flex flex-col gap-3">
          {/* Progress Indicators */}
          <div className="flex gap-1.5 w-full">
            {activeStory.items.map((_, idx) => {
              let width = '0%';
              if (idx < itemIndex) width = '100%';
              else if (idx === itemIndex) width = `${progress}%`;

              return (
                <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-75"
                    style={{ width }}
                  />
                </div>
              );
            })}
          </div>

          {/* User info Header */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img 
                src={activeStory.user.avatar} 
                alt={activeStory.user.username} 
                className="w-8 h-8 rounded-full border border-white/50 object-cover" 
              />
              <span className="font-semibold text-sm drop-shadow">
                {activeStory.user.username}
              </span>
              <span className="text-white/70 text-xs drop-shadow">
                {currentItem.timestamp}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(!isPaused);
                }} 
                className="text-white/80 hover:text-white p-1"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tap area left & right to navigate */}
        <div className="absolute inset-y-16 inset-x-0 z-10 flex">
          <div 
            onClick={handlePrevItem}
            className="w-1/3 h-full cursor-pointer" 
          />
          <div 
            onClick={handleNextItem}
            className="w-2/3 h-full cursor-pointer" 
          />
        </div>

        {/* Story Caption and Bottom Reply Bar */}
        <div className="relative z-20 p-4 pb-5 flex flex-col gap-3">
          {currentItem.caption && (
            <p className="text-white text-sm font-medium drop-shadow bg-black/30 p-2.5 rounded-xl backdrop-blur-xs">
              {currentItem.caption}
            </p>
          )}

          <div className="flex items-center gap-2">
            <form onSubmit={sendReply} className="flex-1 flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <input
                type="text"
                placeholder={`Kirim pesan ke ${activeStory.user.username}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                className="w-full bg-transparent text-white text-xs placeholder-white/70 outline-none"
              />
              {replyText && (
                <button type="submit" className="text-white text-xs font-semibold ml-2">
                  Kirim
                </button>
              )}
            </form>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-transform"
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Next Story Button (Desktop) */}
      {(currentStoryIndex < allStories.length - 1 || itemIndex < activeStory.items.length - 1) && (
        <button
          onClick={handleNextItem}
          className="hidden md:flex absolute right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-40"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
