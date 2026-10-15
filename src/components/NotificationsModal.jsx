import React from 'react';
import { X } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 'n1', type: 'like', user: 'nadia.putri', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', text: 'menyukai postingan Anda.', time: '5m', preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&auto=format&fit=crop&q=80' },
  { id: 'n2', type: 'comment', user: 'dimas_lens', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', text: 'berkomentar: "Tone warnanya cakep!"', time: '25m', preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&auto=format&fit=crop&q=80' },
  { id: 'n3', type: 'follow', user: 'bintang_samudra', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', text: 'mulai mengikuti Anda.', time: '2j' },
  { id: 'n4', type: 'like', user: 'coffee_cult', avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80', text: 'menyukai postingan Anda.', time: '4j', preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&auto=format&fit=crop&q=80' },
  { id: 'n5', type: 'follow', user: 'clarissa.wanderer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', text: 'mulai mengikuti Anda.', time: '1h' },
];

export default function NotificationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 dark:border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
            Notifikasi & Aktivitas
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 max-h-[480px] overflow-y-auto flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
          {NOTIFICATIONS.map(n => (
            <div key={n.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <img src={n.avatar} alt={n.user} className="w-10 h-10 rounded-full object-cover" />
                <div className="text-xs">
                  <span className="font-semibold text-neutral-900 dark:text-white mr-1">
                    {n.user}
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {n.text}
                  </span>
                  <span className="text-neutral-400 text-[11px] ml-1">
                    {n.time}
                  </span>
                </div>
              </div>

              {n.preview ? (
                <img src={n.preview} alt="Post preview" className="w-10 h-10 rounded-lg object-cover ml-2" />
              ) : (
                <button className="text-xs bg-sky-500 text-white font-semibold px-3 py-1 rounded-lg ml-2 hover:bg-sky-600">
                  Ikuti Balik
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
