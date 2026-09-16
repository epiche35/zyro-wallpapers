import React from 'react';

export default function WallpaperGrid({ wallpapers, onSelectWallpaper }) {
  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        No wallpapers found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {wallpapers.map(wp => {
        const isVideo = wp.mediaType === 'video' || (typeof wp.imageUrl === 'string' && wp.imageUrl.match(/\.(mp4|webm)$/i));
        
        return (
          <div 
            key={wp.id} 
            onClick={() => onSelectWallpaper(wp)}
            className="group relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer aspect-[9/13] border border-slate-800 hover:border-blue-500/50 transition shadow-lg hover:shadow-blue-500/20"
          >
            {isVideo ? (
              <video 
                src={wp.imageUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            ) : (
              <img 
                src={wp.imageUrl} 
                alt={wp.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-sm truncate">{wp.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-blue-400 font-medium">{wp.category}</span>
                {isVideo && (
                  <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}