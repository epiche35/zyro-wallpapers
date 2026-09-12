import React from 'react';

export default function WallpaperModal({ wallpaper, onClose, isLiked, onLike, onFilterByUser }) {
  if (!wallpaper) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-4xl w-full overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black/50 hover:bg-black p-2.5 rounded-full transition cursor-pointer"
        >
          ✕
        </button>

        {/* Wallpaper Image Preview */}
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center max-h-[80vh]">
          <img 
            src={wallpaper.imageUrl} 
            alt={wallpaper.title} 
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </div>

        {/* Details & Uploader Info */}
        <div className="w-full md:w-2/5 p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">
              {wallpaper.category}
            </span>
            <h2 className="text-2xl font-bold text-white mt-3 mb-1">{wallpaper.title}</h2>
            <p className="text-gray-400 text-xs mb-6">Resolution: {wallpaper.resolution || '4K'}</p>

            {/* Creator / Uploader Profile Section */}
            <div className="bg-gray-800/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {wallpaper.userName ? wallpaper.userName.charAt(0).toUpperCase() : 'Z'}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Uploaded by</p>
                  <p className="text-sm font-semibold text-white">{wallpaper.userName || 'Zyro Community'}</p>
                </div>
              </div>

              {wallpaper.userId && (
                <button
                  onClick={() => {
                    onFilterByUser(wallpaper.userId);
                    onClose();
                  }}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-400 font-medium px-3 py-2 rounded-xl transition cursor-pointer border border-gray-700"
                >
                  View Profile
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons (Like / Download) */}
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={() => onLike(wallpaper.id)}
              className={`flex-1 py-3 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                isLiked 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/30' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              ♥ {isLiked ? 'Favorited' : 'Favorite'}
            </button>
            <a
              href={wallpaper.imageUrl}
              download={`${wallpaper.title}.jpg`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium text-sm transition text-center shadow-lg cursor-pointer"
            >
              Download
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}