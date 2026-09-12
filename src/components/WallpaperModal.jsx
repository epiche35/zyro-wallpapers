import React from 'react';

export default function WallpaperModal({ wallpaper, onClose, onLike, onDownload, isLiked }) {
  if (!wallpaper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
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
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-between bg-gray-950 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium">
                🏷️ {wallpaper.category}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                📐 {wallpaper.resolution}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">{wallpaper.title}</h2>

            <div className="flex items-center gap-6 text-sm text-gray-300 py-4 border-t border-b border-gray-800 mb-6">
              <div>
                <span className="block text-gray-500 text-xs">Likes</span>
                <span className="font-semibold text-white">❤️ {wallpaper.likes} Likes</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Downloads</span>
                <span className="font-semibold text-white">⬇️ {wallpaper.downloads} Downloads</span>
              </div>
            </div>

            {/* Tags list */}
            {wallpaper.tags && (
              <div className="mb-6">
                <span className="block text-xs text-gray-400 mb-2">Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {wallpaper.tags.map(tag => (
                    <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {/* Download Button */}
            <a
              href={wallpaper.imageUrl}
              download={`${wallpaper.title}.png`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onDownload(wallpaper.id)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl text-center transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              📥 Download Wallpaper
            </a>

            {/* Favorite Toggle Button */}
            <button
              onClick={() => onLike(wallpaper.id)}
              className={`w-full font-medium py-2.5 rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2 ${
                isLiked 
                  ? 'bg-pink-600 text-white hover:bg-pink-500' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {isLiked ? '❤️ Remove from Favorites' : '♡ Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}