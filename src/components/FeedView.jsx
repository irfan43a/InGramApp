import React, { useRef, useEffect } from 'react';
import StoriesBar from './StoriesBar';
import PostCard from './PostCard';
import { Loader2, ArrowUp } from 'lucide-react';

export default function FeedView({
  posts,
  stories,
  onOpenStory,
  onAddStory,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onOpenComments,
  onSharePost,
  currentUser,
  isLoadingMore,
  loadMorePosts,
  hasMore = true
}) {
  const sentinelRef = useRef(null);
  const topRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // IntersectionObserver for Infinite Unlimited Scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore) {
          loadMorePosts();
        }
      },
      {
        root: null,
        rootMargin: '600px', // Pre-fetch 600px before reaching absolute bottom for seamless unlimited feel
        threshold: 0.1
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoadingMore, hasMore, loadMorePosts]);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-[630px] mx-auto py-2 px-2 sm:px-4">
      <div ref={topRef} />

      {/* Stories Bar */}
      <StoriesBar 
        stories={stories} 
        onOpenStory={onOpenStory} 
        onAddStory={onAddStory}
      />

      {/* Feed Posts */}
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeToggle={onLikeToggle}
            onSaveToggle={onSaveToggle}
            onAddComment={onAddComment}
            onOpenComments={onOpenComments}
            onSharePost={onSharePost}
            currentUser={currentUser}
          />
        ))}

        {/* Loading Skeletons when fetching next batch in infinite scroll */}
        {isLoadingMore && (
          <div className="w-full max-w-[470px] flex flex-col gap-5 mb-8">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden p-3 animate-pulse"
              >
                {/* Header skeleton */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="w-28 h-3 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                    <div className="w-20 h-2.5 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                </div>

                {/* Media skeleton */}
                <div className="w-full aspect-square rounded-lg bg-neutral-200 dark:bg-neutral-800 mb-3" />

                {/* Actions & caption skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="w-24 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                    <div className="w-6 h-4 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                  <div className="w-36 h-3 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-full h-3 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-3/4 h-3 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center gap-2 py-4 text-xs font-medium text-neutral-500">
              <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
              <span>Memuat konten baru (Scroll Unlimited)...</span>
            </div>
          </div>
        )}

        {/* Sentinel element observed for infinite scroll trigger */}
        <div ref={sentinelRef} className="h-20 w-full" />
      </div>

      {/* Floating Back to Top / Infinite status button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-8 right-6 z-40 bg-neutral-900/90 dark:bg-neutral-100/90 text-white dark:text-neutral-900 px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Kembali ke Atas</span>
        </button>
      )}
    </div>
  );
}
