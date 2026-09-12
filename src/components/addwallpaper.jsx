import React, { useState } from 'react';

export default function AddWallpaperModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Anime');
  const [resolution, setResolution] = useState('4K');
  const [deviceType, setDeviceType] = useState('Desktop');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  // Handle device file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(''); // Clear URL text input if a file is chosen
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle URL text input change
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImagePreview(''); // Clear file preview if a URL is typed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = imagePreview || imageUrl;

    if (!title || !finalImage) {
      setError('Please provide a title and either upload a file or enter an image URL.');
      return;
    }

    onAdd({
      title,
      category,
      imageUrl: finalImage,
      resolution,
      deviceType,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full transition cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Add New Wallpaper</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Cyberpunk Neon City"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Anime">Anime</option>
                <option value="Cars">Cars</option>
                <option value="Gaming">Gaming</option>
                <option value="AMOLED">AMOLED</option>
                <option value="Aesthetic">Aesthetic</option>
                <option value="Space">Space</option>
                <option value="Minimal">Minimal</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Nature">Nature</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Target Device</label>
              <select 
                value={deviceType} 
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Desktop">Desktop (PC)</option>
                <option value="Mobile">Mobile (Phone)</option>
              </select>
            </div>
          </div>

          {/* Option 1: Upload from Device */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Upload Image from Device</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer cursor-pointer bg-gray-800 border border-gray-700 rounded-xl"
            />
          </div>

          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="px-3 text-gray-500 text-xs uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>

          {/* Option 2: Enter Image URL */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Image URL</label>
            <input 
              type="url" 
              value={imageUrl} 
              onChange={handleUrlChange} 
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Live Preview for either choice */}
          {(imagePreview || imageUrl) && (
            <div className="relative w-full h-32 bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <img 
                src={imagePreview || imageUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Invalid+Image+URL"; }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Resolution</label>
            <input 
              type="text" 
              value={resolution} 
              onChange={(e) => setResolution(e.target.value)} 
              placeholder="e.g. 4K, 1080p"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-lg cursor-pointer"
            >
              Upload Wallpaper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}