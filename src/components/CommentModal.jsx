import React, { useState } from 'react';
import { X, Heart, Smile, MoreHorizontal } from 'lucide-react';

export default function CommentModal({ post, isOpen, onClose, onAddComment, currentUser }) {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, {
      username: currentUser.username,
      text: commentText.trim(),
      likes: 0,
      timestamp: 'Baru saja'
    });

    setCommentText('');
  };

  const images = post.images && post.images.length > 0 ? post.images : [post.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 md:p-6">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2 z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="bg-white dark:bg-neutral-900 w-full max-w-4xl h-[85vh] max-h-[640px] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-neutral-200 dark:border-neutral-800">
        {/* Left: Image */}
        <div className="hidden md:flex w-1/2 bg-black items-center justify-center overflow-hidden">
          <img 
            src={images[0]} 
            alt="Post preview" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Right: Comments section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full bg-white dark:bg-black">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <img 
                src={post.user.avatar} 
                alt={post.user.username} 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">
                  {post.user.username}
                </span>
                {post.location && (
                  <span className="text-[10px] text-neutral-500">
                    {post.location}
                  </span>
                )}
              </div>
            </div>

            <button className="text-neutral-500 hover:text-neutral-700">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* Main Post Caption */}
            <div className="flex gap-3 text-xs leading-relaxed">
              <img 
                src={post.user.avatar} 
                alt={post.user.username} 
                className="w-8 h-8 rounded-full object-cover flex-shrink-0" 
              />
              <div className="flex flex-col flex-1">
                <div>
                  <span className="font-semibold mr-1.5 text-neutral-900 dark:text-white">
                    {post.user.username}
                  </span>
                  <span className="text-neutral-800 dark:text-neutral-200 whitespace-pre-line">
                    {post.caption}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 mt-1">
                  {post.timestamp}
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-neutral-100 dark:bg-neutral-800 my-1" />

            {/* Comments */}
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 text-xs group">
                  <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 flex-shrink-0 text-[10px]">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div>
                      <span className="font-semibold mr-1.5 text-neutral-900 dark:text-white">
                        {comment.username}
                      </span>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        {comment.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 mt-1">
                      <span>{comment.timestamp}</span>
                      {comment.likes > 0 && <span>{comment.likes} suka</span>}
                      <button className="font-semibold hover:underline">Balas</button>
                    </div>
                  </div>

                  <button className="text-neutral-400 hover:text-rose-500 self-center">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-neutral-400 text-xs">
                Belum ada komentar. Jadilah yang pertama berkomentar!
              </div>
            )}
          </div>

          {/* Comment Form */}
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-neutral-400 cursor-pointer" />
              <input 
                type="text" 
                placeholder="Tambahkan komentar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
              />
              <button 
                type="submit"
                disabled={!commentText.trim()}
                className="text-sky-500 disabled:opacity-40 font-semibold text-xs"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
