import React from 'react';

export default function WallpaperGrid({ wallpapers, onSelectWallpaper }) {
  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No wallpapers found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] box-border">
      {wallpapers.map((wp) => (
        <div 
          key={wp.id} 
          onClick={() => onSelectWallpaper(wp)}
          className="mb-6 break-inside-avoid bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700 transition group cursor-pointer"
        >
          <div className="relative overflow-hidden bg-gray-800">
            <img
              src={wp.imageUrl}
              alt={wp.title}
              className="w-full h-auto object-cover group-hover:scale-105 transition duration-300"
            />
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {wp.category}
            </span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-sm truncate max-w-[180px]">{wp.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">High Resolution</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1">❤️ {wp.likes}</span>
              <span className="flex items-center gap-1">⬇️ {wp.downloads}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}