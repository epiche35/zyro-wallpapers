import React from 'react';

export default function WallpaperModal({ wallpaper, isOpen, onClose, onFilterByUser }) {
  if (!isOpen || !wallpaper) return null;

  const isVideo = wallpaper.mediaType === 'video' || (typeof wallpaper.imageUrl === 'string' && wallpaper.imageUrl.match(/\.(mp4|webm)$/i));

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
      <div className="bg-slate-900 rounded-3xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative shadow-2xl border border-slate-800 max-h-[90vh]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer text-lg"
        >
          ✕
        </button>

        {/* Media Viewer Section */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center min-h-[40vh] relative overflow-hidden">
          {isVideo ? (
            <video 
              src={wallpaper.imageUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              controls
              className="max-w-full max-h-[80vh] object-contain"
            />
          ) : (
            <img 
              src={wallpaper.imageUrl} 
              alt={wallpaper.title} 
              className="max-w-full max-h-[80vh] object-contain"
            />
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-slate-900 overflow-y-auto">
          <div 
            className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition"
            onClick={() => {
              if (wallpaper.userId) {
                onFilterByUser(wallpaper.userId);
                onClose();
              }
            }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
               {wallpaper.authorAvatar ? (
                 <img src={wallpaper.authorAvatar} alt="Author" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                   {wallpaper.userName ? wallpaper.userName.charAt(0).toUpperCase() : 'U'}
                 </div>
               )}
            </div>
            <div>
              <p className="text-white font-bold">{wallpaper.userName || 'Zyro Official'}</p>
              <p className="text-xs text-slate-400">Uploaded {new Date(wallpaper.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{wallpaper.title}</h2>
          
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-xs font-semibold">
              {wallpaper.category}
            </span>
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold">
              {wallpaper.type || wallpaper.deviceType || 'Desktop'}
            </span>
            {isVideo && (
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Animated
              </span>
            )}
          </div>

          <div className="mt-auto pt-4 space-y-3">
            <a 
              href={wallpaper.imageUrl} 
              download={`Zyro_${wallpaper.title}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              📥 Download {isVideo ? 'Live Video' : 'Wallpaper'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}