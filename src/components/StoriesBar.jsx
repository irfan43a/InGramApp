import React, { useRef } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoriesBar({ stories, onOpenStory, onAddStory }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-[630px] mx-auto mb-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs select-none">
      {/* Scroll Left Button */}
      <button 
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-md text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Stories list */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
      >
        {stories.map((story) => {
          const isUser = story.isSelf;
          const ringClass = story.seen ? 'story-ring-gray' : 'story-ring-gradient';

          return (
            <div
              key={story.id}
              onClick={() => onOpenStory(story)}
              className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
            >
              <div className="relative">
                {/* Gradient Ring */}
                <div className={`w-[66px] h-[66px] rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105 ${ringClass}`}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-black p-[2px]">
                    <img
                      src={story.user.avatar}
                      alt={story.user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Self + Badge */}
                {isUser && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddStory) onAddStory();
                    }}
                    className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-sky-500 border-2 border-white dark:border-black flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                  </button>
                )}
              </div>

              <span className="text-[11px] font-medium text-neutral-800 dark:text-neutral-300 max-w-[68px] truncate text-center">
                {isUser ? 'Cerita Anda' : story.user.username}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button 
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-md text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
