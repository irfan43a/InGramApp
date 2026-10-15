import React, { useState } from 'react';
import { X, Search, Check, Copy, Share2 } from 'lucide-react';
import { SUGGESTIONS } from '../data/mockData';

export default function ShareModal({ post, isOpen, onClose }) {
  const [sentList, setSentList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen || !post) return null;

  const toggleSend = (id) => {
    if (sentList.includes(id)) {
      setSentList(sentList.filter(item => item !== id));
    } else {
      setSentList([...sentList, id]);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredUsers = SUGGESTIONS.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 dark:border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <span className="w-5" />
          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
            Bagikan Postingan
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-xl">
            <Search className="w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Cari teman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>
        </div>

        {/* User list to send */}
        <div className="max-h-60 overflow-y-auto p-2 flex flex-col gap-1">
          {filteredUsers.map((user) => {
            const isSent = sentList.includes(user.id);
            return (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <div className="flex items-center gap-2.5">
                  <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                      {user.username}
                    </span>
                    <span className="text-[11px] text-neutral-400 truncate max-w-[150px]">
                      {user.fullName}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSend(user.id)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                    isSent
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                      : 'bg-sky-500 hover:bg-sky-600 text-white'
                  }`}
                >
                  {isSent ? 'Terkirim' : 'Kirim'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick share actions */}
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-around">
          <button 
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-1 text-[11px] text-neutral-600 dark:text-neutral-300 hover:text-sky-500"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </div>
            <span>{copied ? 'Tersalin' : 'Salin Tautan'}</span>
          </button>

          <button 
            onClick={() => {
              alert('Dibagikan ke Cerita Anda!');
              onClose();
            }}
            className="flex flex-col items-center gap-1 text-[11px] text-neutral-600 dark:text-neutral-300 hover:text-sky-500"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <span>Ke Cerita</span>
          </button>
        </div>
      </div>
    </div>
  );
}
