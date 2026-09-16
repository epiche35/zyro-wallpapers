import React, { useState } from 'react';

export default function AddWallpaperModal({ isOpen, onClose, user, onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Anime');
  const [type, setType] = useState('Desktop');
  const [imageUrl, setImageUrl] = useState('');
  const [mediaType, setMediaType] = useState('image'); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const categories = ["Anime", "Cars", "Gaming", "AMOLED", "Aesthetic", "Space", "Minimal", "Fantasy", "Nature"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { 
        setError('File is too large. Please keep videos/images under 5MB for local storage.');
        return;
      }
      setError('');
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setMediaType(isVideo ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError('Please provide a title and upload a file.');
      return;
    }
    setLoading(true);
    try {
      const newWallpaper = {
        title,
        category,
        type,
        imageUrl,
        mediaType, 
        authorAvatar: user?.photoURL || '',
        createdAt: new Date().toISOString()
      };
      await onAdd(newWallpaper);
      setTitle('');
      setImageUrl('');
      setMediaType('image');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition text-lg cursor-pointer">✕</button>
        <h2 className="text-xl font-bold text-white mb-6">Add New Wallpaper</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Upload File (Image, MP4, WebM)</label>
            <input 
              type="file" 
              accept="image/*,video/mp4,video/webm"
              onChange={handleFileChange}
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer bg-slate-800 border border-slate-700 rounded-xl"
            />
          </div>
          
          {imageUrl && mediaType === 'video' && (
             <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mt-2 border border-slate-800">
               <video src={imageUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
             </div>
          )}
          {imageUrl && mediaType === 'image' && (
             <div className="w-full h-32 bg-black rounded-xl overflow-hidden mt-2 border border-slate-800">
               <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
             </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 outline-none" placeholder="e.g. Neon City" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 outline-none cursor-pointer">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Device Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 outline-none cursor-pointer">
                <option value="Desktop">Desktop</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl text-sm transition mt-4 disabled:opacity-50 cursor-pointer">
            {loading ? 'Uploading...' : 'Publish Wallpaper'}
          </button>
        </form>
      </div>
    </div>
  );
}