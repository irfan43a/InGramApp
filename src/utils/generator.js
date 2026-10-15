// Infinite post generator for Instagram Clone

const USERS = [
  { username: 'fajar_nugraha', fullName: 'Fajar Nugraha', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', verified: true },
  { username: 'maya.lestari', fullName: 'Maya Lestari', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', verified: false },
  { username: 'bintang_samudra', fullName: 'Bintang Samudra', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', verified: true },
  { username: 'clarissa.wanderer', fullName: 'Clarissa Valerie', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', verified: false },
  { username: 'rendy_visuals', fullName: 'Rendy Visuals', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', verified: true },
  { username: 'alya.adisti', fullName: 'Alya Adisti', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', verified: true },
  { username: 'wanderlust_indo', fullName: 'Explore Indonesia ID', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', verified: true },
  { username: 'dian.arts', fullName: 'Dian Kusuma Art', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', verified: false },
  { username: 'kevin.developer', fullName: 'Kevin Pratama', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', verified: false }
];

const LOCATIONS = [
  'Labuan Bajo, Flores, NTT',
  'Canggu, Bali, Indonesia',
  'Shibuya Crossing, Tokyo, Japan',
  'Raja Ampat, Papua Barat',
  'Dolomites, Italian Alps',
  'Kawasan Blok M, Jakarta Selatan',
  'Santorini, Greece',
  'Gunung Bromo, Jawa Timur',
  'Zermatt, Matterhorn, Switzerland',
  'Amalfi Coast, Italy',
  'Paris, France',
  'Taman Nasional Komodo',
  'Seoul, South Korea'
];

const PHOTO_POOLS = [
  {
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Suara ombak dan aroma laut selalu punya cara sendiri menenangkan pikiran 🌊💙 Semoga minggu kalian menyenangkan!',
    tags: '#beachlife #vitaminsea #oceanlove #tropicalvibes #healing'
  },
  {
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Golden hour hits different when you are surrounded by the mountains 🏔️✨ Warm light, cold breeze, peaceful soul.',
    tags: '#goldenhour #naturephotography #mountainvibes #earthpix #roamtheplanet'
  },
  {
    images: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Kabut pagi di lembah yang tenang. Alam raya selalu mengingatkan kita betapa megahnya semesta ciptaan Tuhan 🌲🌫️',
    tags: '#foggyforest #mistymountains #natureescape #exploreindonesia #folkscenery'
  },
  {
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1080&auto=format&fit=crop&q=80'
    ],
    caption: 'Setup meja kerja minimalis untuk boost produktivitas coding hari ini ⌨️🖥️ Mechanical keyboard clicky sound and warm ambient light!',
    tags: '#desksetup #minimalsetup #workspace #coderslife #techlifestyle'
  },
  {
    images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Makan siang legendaris hari ini! Gurih, kaya rempah nusantara dan sambal matah pedas nampol 🌶️🤤 Siapa yang ngiler?',
    tags: '#kulinerindonesia #foodgasm #indonesianfood #jktfoodbang #pergikuliner'
  },
  {
    images: ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Lost in the magical bridge of nature 🌿 Keindahan tersembunyi yang sayang dilewatkan kalau lagi trekking.',
    tags: '#wanderer #adventuretime #forestwalk #greenery #peaceofmind'
  },
  {
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1080&auto=format&fit=crop&q=80'
    ],
    caption: 'Konsep arsitektur tropis modern dengan pencahayaan alami maksimal. Inspirasi rumah impian masa depan 🏡🪴',
    tags: '#architecture #interiordesign #tropicalmodern #dreamhouse #archdaily'
  },
  {
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Menyusuri jalur pendakian saat pagi hari. Udara sejuk dan rasa lelah yang terbayar lunas begitu sampai di puncak ☀️🥾',
    tags: '#pendakiindonesia #sunrise #hikingadventures #explorealam #mountaintrek'
  },
  {
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Bintang-bintang bersinar begitu terang di langit malam tanpa polusi cahaya. Momen yang tak terlupakan 🌌🌠',
    tags: '#astrophotography #nightsky #milkywaychasers #stargazing #nightscape'
  },
  {
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1080&auto=format&fit=crop&q=80'],
    caption: 'Portrait session with warm natural glow 📸 Belajar mengatur eksposur dan tone warna vintage.',
    tags: '#portraitphotography #vintagetones #moodyports #photographylovers'
  }
];

const COMMENTS_POOL = [
  'Keren banget komposisinya! 👏',
  'Gila aesthetic parah vibesnya! 🔥',
  'Save buat rekomendasi trip selanjutnya ✨',
  'Cakep banget warnanya, preset apa nih kak?',
  'Auto masuk bucket list! 😍',
  'Mantap kak, sehat-sehat terus yaa!',
  'Bikin kangen liburan sumpah 🥹',
  'Spot ini emang juara banget pemandangannya!',
  'Top markotop! Keren abis 🔥🔥🔥'
];

let counter = 100;

export function generateNextPosts(count = 4) {
  const generated = [];

  for (let i = 0; i < count; i++) {
    counter++;
    const user = USERS[Math.floor(Math.random() * USERS.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const photoTemplate = PHOTO_POOLS[Math.floor(Math.random() * PHOTO_POOLS.length)];
    
    // Pick 1-2 random comments
    const numComments = Math.floor(Math.random() * 3) + 1;
    const postComments = [];
    for (let c = 0; c < numComments; c++) {
      const commentUser = USERS[Math.floor(Math.random() * USERS.length)];
      postComments.push({
        id: `c-gen-${counter}-${c}`,
        username: commentUser.username,
        text: COMMENTS_POOL[Math.floor(Math.random() * COMMENTS_POOL.length)],
        likes: Math.floor(Math.random() * 25),
        timestamp: `${Math.floor(Math.random() * 50) + 5}m lalu`
      });
    }

    const hoursAgo = Math.floor(Math.random() * 20) + 1;

    generated.push({
      id: `post-gen-${counter}-${Date.now()}-${i}`,
      user: { ...user },
      location: location,
      images: [...photoTemplate.images],
      caption: `${photoTemplate.caption}\n\n${photoTemplate.tags}`,
      likesCount: Math.floor(Math.random() * 8500) + 120,
      isLiked: false,
      isSaved: false,
      timestamp: `${hoursAgo} jam lalu`,
      comments: postComments
    });
  }

  return generated;
}
