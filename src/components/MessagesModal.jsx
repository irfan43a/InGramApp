import React, { useState } from 'react';
import { X, Send, Phone, Video } from 'lucide-react';

const CHATS = [
  {
    id: 'dm-1',
    user: 'nadia.putri',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Kapan rencana hunting foto lagi gung?',
    time: '12m',
    messages: [
      { id: 'm1', fromMe: false, text: 'Halo Agung! Postingan Bali kamu keren banget' },
      { id: 'm2', fromMe: true, text: 'Thank you Nadia! Kamu lagi di Ubud juga ya?' },
      { id: 'm3', fromMe: false, text: 'Kapan rencana hunting foto lagi gung?' }
    ]
  },
  {
    id: 'dm-2',
    user: 'dimas_lens',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Preset lightroom yang kemarin boleh minta linknya bro?',
    time: '2j',
    messages: [
      { id: 'm4', fromMe: false, text: 'Preset lightroom yang kemarin boleh minta linknya bro?' }
    ]
  },
  {
    id: 'dm-3',
    user: 'coffee_cult',
    avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Ada beans baru dari Toraja nih, mampir yuk!',
    time: '1h',
    messages: [
      { id: 'm5', fromMe: false, text: 'Ada beans baru dari Toraja nih, mampir yuk!' }
    ]
  }
];

export default function MessagesModal({ isOpen, onClose }) {
  const [conversations, setConversations] = useState(CHATS);
  const [selectedChat, setSelectedChat] = useState(CHATS[0]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      fromMe: true,
      text: inputText.trim()
    };

    const updatedChats = conversations.map(c => {
      if (c.id === selectedChat.id) {
        return {
          ...c,
          lastMessage: inputText.trim(),
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setConversations(updatedChats);
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2 z-50">
        <X className="w-6 h-6" />
      </button>

      <div className="bg-white dark:bg-neutral-900 w-full max-w-4xl h-[85vh] max-h-[640px] rounded-2xl overflow-hidden shadow-2xl flex border border-neutral-200 dark:border-neutral-800">
        {/* Left: Chats List */}
        <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 font-bold text-sm text-neutral-900 dark:text-white flex items-center justify-between">
            <span>Pesan Langsung</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {conversations.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedChat.id === chat.id 
                    ? 'bg-neutral-100 dark:bg-neutral-800' 
                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                }`}
              >
                <img src={chat.avatar} alt={chat.user} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-semibold text-xs text-neutral-900 dark:text-white truncate">
                    {chat.user}
                  </span>
                  <span className="text-[11px] text-neutral-500 truncate">
                    {chat.lastMessage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div className="w-2/3 flex flex-col justify-between bg-white dark:bg-black">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <img src={selectedChat.avatar} alt={selectedChat.user} className="w-8 h-8 rounded-full object-cover" />
              <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                {selectedChat.user}
              </span>
            </div>

            <div className="flex items-center gap-3 text-neutral-500">
              <Phone className="w-4 h-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white" />
              <Video className="w-4 h-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white" />
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {selectedChat.messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.fromMe 
                      ? 'bg-sky-500 text-white rounded-br-xs' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <input 
              type="text" 
              placeholder={`Kirim pesan ke ${selectedChat.user}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="p-2 text-sky-500 hover:text-sky-600 disabled:opacity-40"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
