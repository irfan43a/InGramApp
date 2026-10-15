import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import FeedView from './components/FeedView';
import ExploreView from './components/ExploreView';
import ReelsView from './components/ReelsView';
import ProfileView from './components/ProfileView';
import StoryViewerModal from './components/StoryViewerModal';
import CreatePostModal from './components/CreatePostModal';
import CommentModal from './components/CommentModal';
import ShareModal from './components/ShareModal';
import NotificationsModal from './components/NotificationsModal';
import MessagesModal from './components/MessagesModal';

import { CURRENT_USER, INITIAL_STORIES, INITIAL_POSTS } from './data/mockData';
import { generateNextPosts } from './utils/generator';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);

  // Feed & Stories state
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [savedPosts, setSavedPosts] = useState(
    INITIAL_POSTS.filter(p => p.isSaved)
  );

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [activeSharePost, setActiveSharePost] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  // Manage Dark Mode HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Infinite Scroll loader
  const loadMorePosts = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    // Realistic network delay for smooth UX
    setTimeout(() => {
      const newBatch = generateNextPosts(4);
      setPosts(prev => [...prev, ...newBatch]);
      setIsLoadingMore(false);
    }, 600);
  }, [isLoadingMore]);

  // Toggle Like
  const handleLikeToggle = (postId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1
          };
        }
        return post;
      })
    );
  };

  // Toggle Save
  const handleSaveToggle = (postId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isSaved = !post.isSaved;
          const updated = { ...post, isSaved };

          if (isSaved) {
            setSavedPosts(s => [updated, ...s.filter(p => p.id !== postId)]);
          } else {
            setSavedPosts(s => s.filter(p => p.id !== postId));
          }

          return updated;
        }
        return post;
      })
    );
  };

  // Add Comment to Post
  const handleAddComment = (postId, comment) => {
    const newComment = {
      ...comment,
      id: `c-${Date.now()}`
    };

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const updatedComments = [...(post.comments || []), newComment];
          return {
            ...post,
            comments: updatedComments
          };
        }
        return post;
      })
    );

    // Also update active comment modal if currently open
    if (activeCommentPost && activeCommentPost.id === postId) {
      setActiveCommentPost(prev => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
    }
  };

  // New Post Created
  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      postsCount: prev.postsCount + 1
    }));
    setActiveTab('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Story
  const handleOpenStory = (story) => {
    setActiveStory(story);
  };

  // Mark Story as Seen
  const handleStorySeen = (storyId) => {
    setStories(prev =>
      prev.map(s => (s.id === storyId ? { ...s, seen: true } : s))
    );
  };

  // Add new story
  const handleAddStory = () => {
    const promptUrl = prompt(
      'Masukkan URL foto untuk Cerita Anda:',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
    );
    if (promptUrl) {
      setStories(prev =>
        prev.map(s => {
          if (s.isSelf) {
            return {
              ...s,
              items: [
                ...s.items,
                {
                  id: `si-${Date.now()}`,
                  url: promptUrl,
                  timestamp: 'Baru saja',
                  caption: 'Cerita baru ✨'
                }
              ]
            };
          }
          return s;
        })
      );
      alert('Cerita Anda berhasil ditambahkan!');
    }
  };

  // Navigation handlers
  const handleTabChange = (tabId) => {
    if (tabId === 'notifications') {
      setIsNotificationsOpen(true);
    } else if (tabId === 'messages') {
      setIsMessagesOpen(true);
    } else if (tabId === 'search') {
      setActiveTab('explore');
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        openCreateModal={() => setIsCreateModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:pl-20 xl:pl-64 pt-16 md:pt-4 pb-16 md:pb-4 flex justify-center">
        <div className="w-full flex justify-center gap-8">
          {/* Main Feed / Tab Views */}
          <div className="w-full max-w-[630px] flex justify-center">
            {activeTab === 'feed' && (
              <FeedView
                posts={posts}
                stories={stories}
                onOpenStory={handleOpenStory}
                onAddStory={handleAddStory}
                onLikeToggle={handleLikeToggle}
                onSaveToggle={handleSaveToggle}
                onAddComment={handleAddComment}
                onOpenComments={(post) => setActiveCommentPost(post)}
                onSharePost={(post) => setActiveSharePost(post)}
                currentUser={currentUser}
                isLoadingMore={isLoadingMore}
                loadMorePosts={loadMorePosts}
              />
            )}

            {activeTab === 'explore' && (
              <ExploreView 
                onSelectMedia={(item) => alert(`Explore item: ${item.likes} suka`)} 
              />
            )}

            {activeTab === 'reels' && (
              <ReelsView />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                posts={posts}
                savedPosts={savedPosts}
                currentUser={currentUser}
              />
            )}
          </div>

          {/* Right Sidebar for Desktop Feed View */}
          {activeTab === 'feed' && (
            <RightSidebar currentUser={currentUser} />
          )}
        </div>
      </main>

      {/* Full-Screen Interactive Story Viewer */}
      {activeStory && (
        <StoryViewerModal
          story={activeStory}
          allStories={stories}
          onClose={() => setActiveStory(null)}
          onStorySeen={handleStorySeen}
        />
      )}

      {/* Create New Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
        currentUser={currentUser}
      />

      {/* Detailed Comment Modal */}
      {activeCommentPost && (
        <CommentModal
          post={activeCommentPost}
          isOpen={!!activeCommentPost}
          onClose={() => setActiveCommentPost(null)}
          onAddComment={handleAddComment}
          currentUser={currentUser}
        />
      )}

      {/* Share Post Sheet Modal */}
      {activeSharePost && (
        <ShareModal
          post={activeSharePost}
          isOpen={!!activeSharePost}
          onClose={() => setActiveSharePost(null)}
        />
      )}

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Direct Messages Modal */}
      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
      />
    </div>
  );
}
