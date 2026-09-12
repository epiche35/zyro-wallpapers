import React from 'react';

export default function WallpaperGrid({ wallpapers }) {
  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No wallpapers found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wallpapers.map((wp) => (
        <div 
          key={wp.id} 
          className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:border-gray-700 transition group"
        >
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-800">
            <img
              src={wp.imageUrl}
              alt={wp.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {wp.category}
            </span>
          </div>

          {/* Details & Stats */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-sm truncate max-w-[200px]">{wp.title}</h3>
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