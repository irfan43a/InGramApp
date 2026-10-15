// Mock data for Instagram Clone

export const CURRENT_USER = {
  id: 'current_user',
  username: 'agung_saputra',
  fullName: 'Agung Saputra',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: '📸 Visual Storyteller | Exploring Nusantara & Beyond ☕ Tech & Code Enthusiast 📍 Jakarta - Bali',
  postsCount: 142,
  followersCount: '18.4K',
  followingCount: '892',
  website: 'https://github.com/intagapp',
  verified: true
};

export const INITIAL_STORIES = [
  {
    id: 's-user',
    user: CURRENT_USER,
    hasStory: true,
    isSelf: true,
    seen: false,
    items: [
      {
        id: 'si-self-1',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        timestamp: '15m',
        caption: 'Late night coding session 💻☕'
      }
    ]
  },
  {
    id: 's-1',
    user: {
      username: 'nadia.putri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    hasStory: true,
    seen: false,
    items: [
      {
        id: 'si-1',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        timestamp: '1j',
        caption: 'Pantai Kuta sore ini magical banget 🌅✨'
      },
      {
        id: 'si-2',
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
        timestamp: '45m',
        caption: 'Sunset vibes in Bali 🌴'
      }
    ]
  },
  {
    id: 's-2',
    user: {
      username: 'dimas_lens',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: false
    },
    hasStory: true,
    seen: false,
    items: [
      {
        id: 'si-3',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
        timestamp: '2j',
        caption: 'Camping under the stars 🌌 Yosemite'
      }
    ]
  },
  {
    id: 's-3',
    user: {
      username: 'coffee_cult',
      avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    hasStory: true,
    seen: false,
    items: [
      {
        id: 'si-4',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
        timestamp: '3j',
        caption: 'Manual brew single origin Gayo ☕'
      }
    ]
  },
  {
    id: 's-4',
    user: {
      username: 'tessa.travels',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    hasStory: true,
    seen: false,
    items: [
      {
        id: 'si-5',
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
        timestamp: '4j',
        caption: 'Kyoto bamboo forest morning walk 🎋⛩️'
      }
    ]
  },
  {
    id: 's-5',
    user: {
      username: 'arch.daily.id',
      avatar: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    hasStory: true,
    seen: false,
    items: [
      {
        id: 'si-6',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
        timestamp: '6j',
        caption: 'Minimalist villa design in Ubud 🏡'
      }
    ]
  },
  {
    id: 's-6',
    user: {
      username: 'kuliner_nusantara',
      avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80',
      verified: false
    },
    hasStory: true,
    seen: false,
    items: [
      {
        id: 'si-7',
        url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        timestamp: '7j',
        caption: 'Sate Maranggi Purwakarta yang juicy bgt! 🍢'
      }
    ]
  },
  {
    id: 's-7',
    user: {
      username: 'urban_street_id',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      verified: false
    },
    hasStory: true,
    seen: true,
    items: [
      {
        id: 'si-8',
        url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
        timestamp: '10j',
        caption: 'City lights from SCBD rooftop 🏙️'
      }
    ]
  }
];

export const SUGGESTIONS = [
  {
    id: 'sug-1',
    username: 'indonesia.travel',
    fullName: 'Wonderful Indonesia',
    avatar: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Diikuti oleh nadia.putri + 12 lainnya',
    verified: true,
    following: false
  },
  {
    id: 'sug-2',
    username: 'techminimalist',
    fullName: 'Clean Desk Setups',
    avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Populer di bidang Desain & Tech',
    verified: false,
    following: false
  },
  {
    id: 'sug-3',
    username: 'jakarta_foodies',
    fullName: 'JKT Food Exploration',
    avatar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Baru di Instagram',
    verified: false,
    following: false
  },
  {
    id: 'sug-4',
    username: 'pixel_art_daily',
    fullName: 'Digital Canvas Art',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=80',
    subtitle: 'Disarankan untuk Anda',
    verified: true,
    following: false
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    user: {
      username: 'nadia.putri',
      fullName: 'Nadia Putri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    location: 'Ubud, Bali, Indonesia',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80'
    ],
    caption: 'Menikmati pagi yang tenang di pedesaan Ubud. Suara gemericik air dan udara segar selalu bikin ingin kembali lagi ke pulau dewata ini 🌿💚 Siapa yang rindu liburan ke Bali?\n\n#bali #ubud #indonesia #travelgram #naturelovers #wonderfulindonesia',
    likesCount: 3842,
    isLiked: false,
    isSaved: false,
    timestamp: '2 jam lalu',
    comments: [
      { id: 'c-1', username: 'dimas_lens', text: 'Tone warnanya cakep banget Nad! Pake kamera apa?', likes: 14, timestamp: '1j lalu' },
      { id: 'c-2', username: 'tessa.travels', text: 'Ubud selalu punya tempat di hati! 🍃', likes: 6, timestamp: '30m lalu' }
    ]
  },
  {
    id: 'post-2',
    user: {
      username: 'coffee_cult',
      fullName: 'Specialty Coffee Lab',
      avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    location: 'Senopati, Jakarta Selatan',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1080&auto=format&fit=crop&q=80'
    ],
    caption: 'Espresso extraction process ☕ Rasio 1:2 dengan biji kopi washed asal Flores Bajawa. Notes: floral jasmine, sweet citrus, and delicate brown sugar finish. Barista on duty: @rizky_barista 🧑‍🍳\n\n#coffee #specialtycoffee #jakartacoffeeshop #baristadaily #latteart #caffeineaddict',
    likesCount: 1520,
    isLiked: true,
    isSaved: true,
    timestamp: '4 jam lalu',
    comments: [
      { id: 'c-3', username: 'budi_santoso', text: 'Wajib mampir weekend ini nih 🔥', likes: 3, timestamp: '2j lalu' },
      { id: 'c-4', username: 'agung_saputra', text: 'Flores Bajawa favorit bgt buat v60 👍', likes: 8, timestamp: '1j lalu' }
    ]
  },
  {
    id: 'post-3',
    user: {
      username: 'urban_street_id',
      fullName: 'Indonesian Street Photography',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      verified: false
    },
    location: 'Bundaran HI, Jakarta Pusat',
    images: [
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1080&auto=format&fit=crop&q=80'
    ],
    caption: 'Laju metropolitan yang tak pernah terlelap. Sudut kota Jakarta saat senja berganti malam 🌃🚇 Selamat berakhir pekan pejuang impian!\n\n#streetphotography #jakarta #cityscape #indonesia #nightphotography #sonyalpha',
    likesCount: 5690,
    isLiked: false,
    isSaved: false,
    timestamp: '7 jam lalu',
    comments: [
      { id: 'c-5', username: 'lensakota', text: 'Komposisi dan long exposure-nya mantap!', likes: 21, timestamp: '5j lalu' }
    ]
  },
  {
    id: 'post-4',
    user: {
      username: 'tessa.travels',
      fullName: 'Tessa Amalia',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    location: 'Mount Fuji, Shizuoka, Japan',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1080&auto=format&fit=crop&q=80'
    ],
    caption: 'First time seeing Mt. Fuji without any clouds covering the peak! 🗻🌸 Chasing the autumn foliage around Lake Kawaguchiko. One item checked off the bucket list.\n\n#japan #mtfuji #traveljapan #wanderlust #autumnvibes #japantrip',
    likesCount: 9240,
    isLiked: false,
    isSaved: false,
    timestamp: '12 jam lalu',
    comments: [
      { id: 'c-6', username: 'nadia.putri', text: 'Mupeng banget pengen kesana jugaa 😍', likes: 12, timestamp: '10j lalu' },
      { id: 'c-7', username: 'japan_explorer', text: 'Best timing of the year! Enjoy your trip! 🇯🇵', likes: 5, timestamp: '8j lalu' }
    ]
  }
];

export const EXPLORE_GRID_ITEMS = [
  { id: 'ex-1', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80', likes: '14.2K', comments: 340, isVideo: false },
  { id: 'ex-2', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80', likes: '8.9K', comments: 128, isVideo: true },
  { id: 'ex-3', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80', likes: '22.1K', comments: 852, isVideo: false },
  { id: 'ex-4', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80', likes: '5.4K', comments: 92, isVideo: false },
  { id: 'ex-5', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80', likes: '31.0K', comments: '1.2K', isVideo: true },
  { id: 'ex-6', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', likes: '12.8K', comments: 412, isVideo: false },
  { id: 'ex-7', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80', likes: '19.5K', comments: 640, isVideo: false },
  { id: 'ex-8', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80', likes: '7.3K', comments: 154, isVideo: true },
  { id: 'ex-9', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80', likes: '16.7K', comments: 504, isVideo: false },
  { id: 'ex-10', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', likes: '43.2K', comments: '2.1K', isVideo: false },
  { id: 'ex-11', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80', likes: '9.8K', comments: 230, isVideo: true },
  { id: 'ex-12', image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80', likes: '28.4K', comments: 915, isVideo: false }
];

export const REELS_DATA = [
  {
    id: 'reel-1',
    videoUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80',
    user: {
      username: 'bali_adventures',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    audio: 'Sal Priadi • Dari planet lain (Official Audio)',
    description: 'Spot tersembunyi di Nusa Penida yang belum banyak turis tahu! Airnya sejernih kristal 🌊💎 Simpan buat itinerary kalian!',
    likes: '89.4K',
    comments: '1,420',
    shares: '12.8K'
  },
  {
    id: 'reel-2',
    videoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    user: {
      username: 'dimas_lens',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: false
    },
    audio: 'Hindia • Rumah ke Rumah (Acoustic)',
    description: 'Timelapse milky way semalam di Gunung Bromo. Dinginnya minus 2 derajat tapi pemandangannya lunas terbayar! 🌌✨',
    likes: '142.1K',
    comments: '3,890',
    shares: '45.1K'
  },
  {
    id: 'reel-3',
    videoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    user: {
      username: 'coffee_cult',
      avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    audio: 'Chill Lofi Beats • Morning Routine',
    description: 'ASMR Pour-over V60 coffee brewing sounds to start your productive day ☕💆‍♂️',
    likes: '56.3K',
    comments: '812',
    shares: '4,210'
  }
];
