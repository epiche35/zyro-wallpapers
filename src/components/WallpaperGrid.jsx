import React, { useState } from 'react';

export default function WallpaperGrid({ wallpapers = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // List of category options matching your roadmap
  const categories = ["All", "Anime", "Cars", "Gaming", "Aesthetic", "AMOLED", "4K", "Minimal"];

  // Filter wallpapers by search keyword and selected category
  const filteredWallpapers = wallpapers.filter((wallpaper) => {
    const matchesSearch = 
      wallpaper.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallpaper.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || wallpaper.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Search Bar Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search wallpapers (e.g., Anime, Gojo, 4K)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto space-x-2 pb-4 mb-6 scrollbar-none justify-start md:justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Wallpaper Grid Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredWallpapers.length > 0 ? (
          filteredWallpapers.map((wallpaper, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow border dark:border-gray-800">
              <img src={wallpaper.url} alt={wallpaper.name} className="w-full h-48 object-cover" />
              <div className="p-3">
                <div className="text-sm font-semibold truncate dark:text-white">{wallpaper.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{wallpaper.category}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
            No wallpapers found matching your filter.
          </div>
        )}
      </div>
    </div>
  );
}