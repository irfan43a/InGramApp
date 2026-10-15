import React from 'react';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  Send, 
  Heart, 
  PlusSquare, 
  User, 
  Sun, 
  Moon, 
  Menu
} from 'lucide-react';

function InstagramLogo({ className = "w-7 h-7" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  openCreateModal, 
  darkMode, 
  setDarkMode,
  unreadMessagesCount = 3,
  unreadNotificationsCount = 5,
  currentUser
}) {
  const navItems = [
    { id: 'feed', label: 'Beranda', icon: Home },
    { id: 'search', label: 'Cari', icon: Search },
    { id: 'explore', label: 'Jelajahi', icon: Compass },
    { id: 'reels', label: 'Reels', icon: Film },
    { 
      id: 'messages', 
      label: 'Pesan', 
      icon: Send, 
      badge: unreadMessagesCount 
    },
    { 
      id: 'notifications', 
      label: 'Notifikasi', 
      icon: Heart, 
      badge: unreadNotificationsCount 
    },
    { 
      id: 'create', 
      label: 'Buat', 
      icon: PlusSquare, 
      onClick: openCreateModal 
    },
    { 
      id: 'profile', 
      label: 'Profil', 
      icon: User, 
      isAvatar: true 
    },
  ];

  return (
    <>
      {/* Desktop Sidebar (Left) */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-18 xl:w-60 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black z-30 px-3 py-6 justify-between transition-all duration-300">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('feed')}
            className="cursor-pointer px-3 py-2 flex items-center gap-3 select-none"
          >
            <div className="hidden xl:block">
              <span className="text-2xl font-serif italic tracking-wide font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
                Instagram
              </span>
            </div>
            <div className="xl:hidden flex justify-center w-full">
              <InstagramLogo className="w-7 h-7 text-neutral-900 dark:text-neutral-100" />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 relative group
                    ${isActive 
                      ? 'font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                >
                  <div className="relative flex items-center justify-center">
                    {item.isAvatar ? (
                      <div className={`w-6 h-6 rounded-full overflow-hidden border-2 ${isActive ? 'border-neutral-900 dark:border-white' : 'border-transparent'}`}>
                        <img 
                          src={currentUser.avatar} 
                          alt="Profil" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <Icon 
                        className={`w-6 h-6 transition-transform group-hover:scale-105 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} 
                      />
                    )}

                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span className="hidden xl:inline text-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions (Theme Toggle & More) */}
        <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-4 px-3 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-amber-400 stroke-[1.8px]" />
            ) : (
              <Moon className="w-6 h-6 text-neutral-700 stroke-[1.8px]" />
            )}
            <span className="hidden xl:inline text-sm">
              {darkMode ? 'Mode Terang' : 'Mode Gelap'}
            </span>
          </button>

          <button
            onClick={() => alert('Instagram Clone v1.0 • Unlimited Scroll Feed')}
            className="flex items-center gap-4 px-3 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <Menu className="w-6 h-6 stroke-[1.8px]" />
            <span className="hidden xl:inline text-sm">Lainnya</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 z-30">
        <div 
          onClick={() => setActiveTab('feed')}
          className="cursor-pointer"
        >
          <span className="text-2xl font-serif italic tracking-wide font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            Instagram
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 text-neutral-700 dark:text-neutral-300"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-1.5 text-neutral-800 dark:text-neutral-200"
          >
            <Heart className="w-6 h-6 stroke-[1.8px]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-black"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className="relative p-1.5 text-neutral-800 dark:text-neutral-200"
          >
            <Send className="w-6 h-6 stroke-[1.8px]" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-black"></span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around px-2 z-30">
        <button
          onClick={() => setActiveTab('feed')}
          className={`p-2 ${activeTab === 'feed' ? 'text-black dark:text-white' : 'text-neutral-500'}`}
        >
          <Home className={`w-6 h-6 ${activeTab === 'feed' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`p-2 ${activeTab === 'explore' ? 'text-black dark:text-white' : 'text-neutral-500'}`}
        >
          <Search className={`w-6 h-6 ${activeTab === 'explore' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </button>

        <button
          onClick={openCreateModal}
          className="p-2 text-neutral-900 dark:text-neutral-100 hover:scale-110 active:scale-95 transition-transform"
        >
          <PlusSquare className="w-6 h-6 stroke-[1.8px]" />
        </button>

        <button
          onClick={() => setActiveTab('reels')}
          className={`p-2 ${activeTab === 'reels' ? 'text-black dark:text-white' : 'text-neutral-500'}`}
        >
          <Film className={`w-6 h-6 ${activeTab === 'reels' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className="p-2"
        >
          <div className={`w-7 h-7 rounded-full overflow-hidden border-2 ${activeTab === 'profile' ? 'border-black dark:border-white' : 'border-transparent'}`}>
            <img 
              src={currentUser.avatar} 
              alt="Profil" 
              className="w-full h-full object-cover" 
            />
          </div>
        </button>
      </nav>
    </>
  );
}
