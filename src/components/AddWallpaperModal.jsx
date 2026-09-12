import React, { useState } from 'react';

export default function AddWallpaperModal({ isOpen, onClose, onAddWallpaper }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Anime");
  const [imageSource, setImageSource] = useState(""); // Can be local file or URL

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creates a local URL for the file from your PC
      const localUrl = URL.createObjectURL(file);
      setImageSource(localUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageSource) return;

    const newWallpaper = {
      name: name || "Custom Wallpaper",
      category: category,
      url: imageSource,
    };

    onAddWallpaper(newWallpaper);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full p-6 text-white relative">
        <h3 className="text-lg font-bold mb-4">Add New Wallpaper</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Option A: Upload from PC */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Upload from PC</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
          </div>

          <div className="text-center text-xs text-gray-500">- OR -</div>

          {/* Option B: Paste Image URL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Paste Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              onChange={(e) => setImageSource(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
            />
          </div>

          {/* Wallpaper Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Wallpaper Title</label>
            <input
              type="text"
              placeholder="e.g. Cyberpunk City"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
            >
              <option value="Anime">Anime</option>
              <option value="Cars">Cars</option>
              <option value="Gaming">Gaming</option>
              <option value="Aesthetic">Aesthetic</option>
              <option value="AMOLED">AMOLED</option>
              <option value="4K">4K</option>
              <option value="Minimal">Minimal</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Add Wallpaper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}