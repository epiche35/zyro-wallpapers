import React from 'react';

export default function WallpaperGrid({ wallpapers, onSelectWallpaper, likedIds = [], onLike }) {
  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No wallpapers found matching your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {wallpapers.map((wp) => {
        const isLiked = Array.isArray(likedIds) && likedIds.includes(wp.id);

        return (
          <div 
            key={wp.id} 
            onClick={() => onSelectWallpaper(wp)}
            className="mb-6 break-inside-avoid bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700 transition group cursor-pointer relative block"
          >
            {/* Image Container */}
            <div className="relative w-full bg-gray-800 overflow-hidden">
              <img
                src={wp.imageUrl}
                alt={wp.title}
                className="w-full h-auto block object-cover group-hover:scale-105 transition duration-500 ease-out"
                onError={(e) => {
                  // Fallback if local asset path fails to load
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              
              {/* Dark Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                
                {/* Top quick badges */}
                <div className="flex justify-between items-center">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {wp.resolution}
                  </span>
                  
                  {/* Quick Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening modal
                      onLike(wp.id);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                      isLiked ? 'bg-pink-600 text-white' : 'bg-black/60 text-gray-300 hover:text-white'
                    }`}
                  >
                    {isLiked ? '❤️' : '♡'}
                  </button>
                </div>

                {/* Bottom quick title & download hint */}
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-sm truncate max-w-[200px]">{wp.title}</h3>
                    <p className="text-xs text-gray-300">{wp.category}</p>
                  </div>
                  <span className="bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-xl font-medium shadow-lg flex items-center gap-1">
                    ↓ {wp.downloads}
                  </span>
                </div>
              </div>

              {/* Default category tag when not hovering */}
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium group-hover:opacity-0 transition-opacity pointer-events-none">
                {wp.category}
              </span>
            </div>

            {/* Bottom details card info */}
            <div className="p-4 flex items-center justify-between bg-gray-900">
              <div>
                <h3 className="text-white font-semibold text-sm truncate max-w-[180px]">{wp.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{wp.resolution}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1">❤️ {wp.likes}</span>
                <span className="flex items-center gap-1">⬇️ {wp.downloads}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}