import React from 'react';

export default function WallpaperModal({ wallpaper, onClose, onLike, onDownload }) {
  if (!wallpaper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer"
        >
          ✕
        </button>

        {/* Left Side: Full Image Preview */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-2 overflow-hidden">
          <img
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            className="max-h-[80vh] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-between bg-gray-950">
          <div>
            <span className="inline-block bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium mb-3">
              {wallpaper.category}
            </span>
            <h2 className="text-xl font-bold text-white mb-2">{wallpaper.title}</h2>
            <p className="text-gray-400 text-sm mb-6">
              Download this high-resolution wallpaper for your desktop or mobile setup. Handcrafted quality optimized for all screens.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-300 py-4 border-t border-b border-gray-800 mb-6">
              <div>
                <span className="block text-gray-500 text-xs">Likes</span>
                <span className="font-semibold text-white">❤️ {wallpaper.likes}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Downloads</span>
                <span className="font-semibold text-white">⬇️ {wallpaper.downloads}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onLike(wallpaper.id)}
              className="w-full bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 border border-pink-500/30 font-medium py-2.5 rounded-xl text-center transition cursor-pointer flex items-center justify-center gap-2"
            >
              ❤️ Like Wallpaper
            </button>

            <a
              href={wallpaper.imageUrl}
              download={`${wallpaper.title}.png`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onDownload(wallpaper.id)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-center transition cursor-pointer flex items-center justify-center gap-2"
            >
              ⬇️ Download Full Resolution
            </a>

            <button
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}