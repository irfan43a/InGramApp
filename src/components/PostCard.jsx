import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Smile 
} from 'lucide-react';

export default function PostCard({ 
  post, 
  onLikeToggle, 
  onSaveToggle, 
  onAddComment, 
  onOpenComments,
  onSharePost,
  currentUser 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [isExpandedCaption, setIsExpandedCaption] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const lastTapRef = useRef(0);
  const inputRef = useRef(null);

  const images = post.images && post.images.length > 0 ? post.images : [post.image];
  const hasMultipleImages = images.length > 1;

  // Trigger double-tap / double-click like with heart animation
  const handleDoubleTap = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 900);

    if (!post.isLiked) {
      onLikeToggle(post.id);
    }
  };

  const handleMediaClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleDoubleTap();
    }
    lastTapRef.current = now;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    onAddComment(post.id, {
      username: currentUser.username,
      text: commentInput.trim(),
      likes: 0,
      timestamp: 'Baru saja'
    });

    setCommentInput('');
  };

  const addEmoji = (emoji) => {
    setCommentInput(prev => prev + emoji);
    if (inputRef.current) inputRef.current.focus();
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const copyPostLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowMenuModal(false);
    triggerToast('Tautan disalin ke papan klip');
  };

  return (
    <article className="w-full max-w-[470px] mx-auto mb-5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-xs transition-colors">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2.5 rounded-full text-xs font-medium shadow-xl z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Post Header */}
      <header className="flex items-center justify-between px-3.5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full p-[2px] story-ring-gradient cursor-pointer">
            <div className="w-full h-full rounded-full bg-white dark:bg-black p-[1px]">
              <img 
                src={post.user.avatar} 
                alt={post.user.username} 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer">
                {post.user.username}
              </span>
              {post.user.verified && (
                <span className="text-sky-500 text-xs">●</span>
              )}
              <span className="text-neutral-400 text-xs">•</span>
              <span className="text-neutral-500 text-xs">{post.timestamp}</span>
            </div>

            {post.location && (
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:underline cursor-pointer truncate max-w-[240px]">
                {post.location}
              </span>
            )}
          </div>
        </div>

        <button 
          onClick={() => setShowMenuModal(true)}
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 p-1 rounded-full"
        >
          <MoreHorizontal className="w-5 h-5 stroke-[1.8px]" />
        </button>
      </header>

      {/* Media Carousel / Image Container */}
      <div 
        className="relative w-full aspect-square bg-neutral-100 dark:bg-neutral-900 select-none overflow-hidden cursor-pointer"
        onClick={handleMediaClick}
      >
        <img 
          src={images[currentImageIndex]} 
          alt="Post media" 
          className="w-full h-full object-cover transition-opacity duration-200"
          loading="lazy"
        />

        {/* Carousel indicator badge */}
        {hasMultipleImages && (
          <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-full z-10">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}

        {/* Carousel Prev Button */}
        {hasMultipleImages && currentImageIndex > 0 && (
          <button 
            onClick={prevImage}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow-md text-neutral-800 dark:text-neutral-100 flex items-center justify-center hover:scale-105 transition-transform z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Carousel Next Button */}
        {hasMultipleImages && currentImageIndex < images.length - 1 && (
          <button 
            onClick={nextImage}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow-md text-neutral-800 dark:text-neutral-100 flex items-center justify-center hover:scale-105 transition-transform z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Big Heart Burst Animation on Double Tap */}
        {showHeartAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Heart className="w-28 h-28 text-white fill-white drop-shadow-2xl animate-heart-pop" />
          </div>
        )}

        {/* Carousel Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  idx === currentImageIndex 
                    ? 'bg-sky-500 scale-125' 
                    : 'bg-white/60 dark:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Action Bar (Like, Comment, Share, Save) */}
      <div className="px-3.5 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLikeToggle(post.id)}
              className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-125"
            >
              <Heart 
                className={`w-6 h-6 transition-colors ${
                  post.isLiked 
                    ? 'fill-rose-500 text-rose-500' 
                    : 'stroke-[1.8px]'
                }`} 
              />
            </button>

            <button 
              onClick={() => {
                if (onOpenComments) onOpenComments(post);
                else if (inputRef.current) inputRef.current.focus();
              }}
              className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-95"
            >
              <MessageCircle className="w-6 h-6 stroke-[1.8px] -scale-x-100" />
            </button>

            <button 
              onClick={() => onSharePost(post)}
              className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-95"
            >
              <Send className="w-6 h-6 stroke-[1.8px]" />
            </button>
          </div>

          <button 
            onClick={() => {
              onSaveToggle(post.id);
              triggerToast(post.isSaved ? 'Dihapus dari Tersimpan' : 'Disimpan ke Koleksi');
            }}
            className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-95"
          >
            <Bookmark 
              className={`w-6 h-6 ${
                post.isSaved 
                  ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white' 
                  : 'stroke-[1.8px]'
              }`} 
            />
          </button>
        </div>

        {/* Likes Count */}
        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
          {post.likesCount.toLocaleString('id-ID')} suka
        </div>

        {/* Caption */}
        <div className="text-xs text-neutral-800 dark:text-neutral-200 mb-1.5 leading-relaxed">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 mr-2 hover:underline cursor-pointer">
            {post.user.username}
          </span>
          
          <span className="whitespace-pre-line">
            {isExpandedCaption || post.caption.length <= 110
              ? post.caption
              : `${post.caption.slice(0, 110)}...`}
          </span>

          {post.caption.length > 110 && !isExpandedCaption && (
            <button 
              onClick={() => setIsExpandedCaption(true)}
              className="text-neutral-400 dark:text-neutral-500 font-medium ml-1 hover:underline cursor-pointer"
            >
              selengkapnya
            </button>
          )}
        </div>

        {/* Comments Count & Previews */}
        {post.comments && post.comments.length > 0 && (
          <div className="mb-2">
            {post.comments.length > 2 && (
              <button 
                onClick={() => onOpenComments && onOpenComments(post)}
                className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 hover:underline block"
              >
                Lihat semua {post.comments.length} komentar
              </button>
            )}

            {/* Top 2 Comments preview */}
            <div className="flex flex-col gap-0.5">
              {post.comments.slice(-2).map((comment) => (
                <div key={comment.id} className="text-xs flex items-baseline justify-between text-neutral-800 dark:text-neutral-200">
                  <div className="truncate max-w-[390px]">
                    <span className="font-semibold mr-1.5 text-neutral-900 dark:text-neutral-100">
                      {comment.username}
                    </span>
                    <span>{comment.text}</span>
                  </div>
                  <Heart className="w-3 h-3 text-neutral-400 hover:text-rose-500 cursor-pointer flex-shrink-0 ml-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Emoji bar */}
        <div className="flex items-center gap-2 py-1 border-t border-neutral-100 dark:border-neutral-900 text-base">
          {['❤️', '🙌', '🔥', '👏', '😍', '✨'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => addEmoji(emoji)}
              className="hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Comment Input Field */}
        <form 
          onSubmit={handleCommentSubmit}
          className="flex items-center justify-between py-2 border-t border-neutral-100 dark:border-neutral-900"
        >
          <div className="flex items-center gap-2 flex-1">
            <button 
              type="button"
              onClick={() => addEmoji('😊')}
              className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <Smile className="w-4 h-4 stroke-[1.8px]" />
            </button>

            <input 
              ref={inputRef}
              type="text" 
              placeholder="Tambahkan komentar..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none"
            />
          </div>

          {commentInput.trim() && (
            <button 
              type="submit"
              className="text-sky-500 hover:text-sky-600 font-semibold text-xs transition-colors"
            >
              Kirim
            </button>
          )}
        </form>
      </div>

      {/* Menu / Options Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl flex flex-col text-center text-xs divide-y divide-neutral-200 dark:divide-neutral-800">
            <button 
              onClick={() => {
                setShowMenuModal(false);
                triggerToast('Laporan telah dikirim');
              }}
              className="py-3.5 text-rose-500 font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Laporkan
            </button>

            <button 
              onClick={() => {
                setShowMenuModal(false);
                triggerToast(`Batal mengikuti @${post.user.username}`);
              }}
              className="py-3.5 text-rose-500 font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Batal Mengikuti
            </button>

            <button 
              onClick={copyPostLink}
              className="py-3.5 text-neutral-900 dark:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Salin Tautan
            </button>

            <button 
              onClick={() => {
                setShowMenuModal(false);
                onSharePost(post);
              }}
              className="py-3.5 text-neutral-900 dark:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Bagikan ke...
            </button>

            <button 
              onClick={() => setShowMenuModal(false)}
              className="py-3.5 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
