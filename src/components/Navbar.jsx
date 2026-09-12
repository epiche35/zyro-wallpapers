import React from 'react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenAddModal,
  onOpenProfileModal,
  user
}) {
  // Added "Favorites" to the categories list
  const categories = ["All", "Favorites", "Anime", "Cars", "Fantasy", "Nature"];

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            ZyroWallpapers
          </span>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search wallpapers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onOpenAddModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            + Add Wallpaper
          </button>

          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full border border-gray-700 transition cursor-pointer"
          >
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Categories & Favorites Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat === "Favorites" ? "❤️ Favorites" : cat}
          </button>
        ))}
      </div>
    </header>
  );
}