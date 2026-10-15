import React, { useState } from 'react';
import { X, Image as ImageIcon, MapPin, Sparkles, ArrowLeft } from 'lucide-react';

const FILTERS = [
  { name: 'Normal', class: 'filter-none', style: {} },
  { name: 'Clarendon', class: 'filter-clarendon', style: { contrast: '1.2', saturate: '1.25' } },
  { name: 'Gingham', class: 'filter-gingham', style: { brightness: '1.05', sepia: '0.1' } },
  { name: 'Juno', class: 'filter-juno', style: { contrast: '1.15', saturate: '1.4' } },
  { name: 'Slumber', class: 'filter-slumber', style: { saturate: '0.66', brightness: '1.05' } },
  { name: 'Moon (B&W)', class: 'filter-moon', style: { grayscale: '1', contrast: '1.1' } },
  { name: 'Valencia', class: 'filter-valencia', style: { sepia: '0.15', saturate: '1.3' } },
  { name: 'Vibrant', class: 'filter-vibrant', style: { saturate: '1.8', contrast: '1.1' } }
];

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
];

export default function CreatePostModal({ isOpen, onClose, onPostCreated, currentUser }) {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [customUrl, setCustomUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [step, setStep] = useState(1); // 1: Select & Filter, 2: Caption & Share

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = (e) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setSelectedImage(customUrl.trim());
      setCustomUrl('');
    }
  };

  const handlePublish = () => {
    const newPost = {
      id: `post-user-${Date.now()}`,
      user: {
        username: currentUser.username,
        fullName: currentUser.fullName,
        avatar: currentUser.avatar,
        verified: currentUser.verified
      },
      location: location.trim() || 'Indonesia',
      images: [selectedImage],
      caption: caption.trim() || 'Momen indah hari ini ✨ #instagram #share',
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      timestamp: 'Baru saja',
      comments: []
    };

    onPostCreated(newPost);
    // Reset state and close
    setCaption('');
    setStep(1);
    onClose();
  };

  const getFilterStyle = (f) => {
    return Object.entries(f.style)
      .map(([k, v]) => `${k}(${v})`)
      .join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2"
      >
        <X className="w-7 h-7" />
      </button>

      <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 dark:border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          {step === 2 ? (
            <button 
              onClick={() => setStep(1)}
              className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <span className="w-5" />
          )}

          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
            {step === 1 ? 'Pilih Foto & Filter' : 'Buat Postingan Baru'}
          </h3>

          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="text-sky-500 hover:text-sky-600 font-semibold text-xs"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="text-sky-500 hover:text-sky-600 font-bold text-xs"
            >
              Bagikan
            </button>
          )}
        </div>

        {/* Body */}
        {step === 1 ? (
          <div className="flex flex-col md:flex-row h-[480px]">
            {/* Image Preview with Filter */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden relative">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="w-full h-full object-cover"
                style={{ filter: getFilterStyle(selectedFilter) }}
              />
            </div>

            {/* Filter and Source Options */}
            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Filter Gambar
                </span>

                {/* Filter presets grid */}
                <div className="grid grid-cols-3 gap-2">
                  {FILTERS.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFilter(f)}
                      className={`flex flex-col items-center gap-1 p-1 rounded-lg border text-[10px] transition-all ${
                        selectedFilter.name === f.name
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 font-bold text-sky-600 dark:text-sky-400'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={selectedImage} 
                          alt={f.name} 
                          className="w-full h-full object-cover"
                          style={{ filter: getFilterStyle(f) }}
                        />
                      </div>
                      <span>{f.name}</span>
                    </button>
                  ))}
                </div>

                {/* Choose from samples */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">
                    Foto Contoh
                  </span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {SAMPLE_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className={`w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-transform hover:scale-105 ${
                          selectedImage === img ? 'border-sky-500 scale-105' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="Sample" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upload file or custom URL */}
              <div className="flex flex-col gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <label className="w-full cursor-pointer bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-2 rounded-xl text-center text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Upload Dari Komputer
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <form onSubmit={handleApplyCustomUrl} className="flex gap-1">
                  <input 
                    type="url"
                    placeholder="Atau tempel URL gambar..."
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg px-2.5 py-1.5 outline-none text-neutral-900 dark:text-neutral-100"
                  />
                  <button type="submit" className="bg-sky-500 text-white text-xs px-2 rounded-lg font-medium">
                    OK
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Write Caption & Details */
          <div className="flex flex-col md:flex-row h-[480px]">
            <div className="w-full md:w-1/2 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="w-full h-full object-cover"
                style={{ filter: getFilterStyle(selectedFilter) }}
              />
            </div>

            <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                {/* User info */}
                <div className="flex items-center gap-2.5">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.username} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">
                    {currentUser.username}
                  </span>
                </div>

                {/* Caption textarea */}
                <textarea 
                  rows={5}
                  placeholder="Tulis keterangan foto... Bagikan ceritamu! ✨"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full text-xs p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl outline-none resize-none border border-neutral-200 dark:border-neutral-700/60 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
                />

                {/* Quick hashtags */}
                <div className="flex flex-wrap gap-1.5">
                  {['#aesthetic', '#indonesia', '#photography', '#lifestyle', '#explore'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setCaption(prev => `${prev} ${tag}`)}
                      className="text-[11px] bg-neutral-100 dark:bg-neutral-800 text-sky-500 px-2 py-0.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Location Input */}
                <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700/60">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <input 
                    type="text"
                    placeholder="Tambahkan lokasi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 outline-none"
                  />
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 text-center">
                Postingan Anda akan langsung muncul di bagian teratas feed.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
