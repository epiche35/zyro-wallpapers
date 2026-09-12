import React, { useState, useRef, useEffect } from 'react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenAddModal,
  onOpenProfileModal,
  onOpenLoginModal,
  user,
  onLogout
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "All", 
    "Favorites", 
    "Anime", 
    "Cars", 
    "Gaming", 
    "AMOLED", 
    "Aesthetic", 
    "Space", 
    "Minimal", 
    "Fantasy", 
    "Nature"
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCategory("All")}>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            ZyroWallpapers
          </span>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search title, tags, resolution (e.g. 4K, BMW)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Actions & Profile / Login */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end relative" ref={dropdownRef}>
          <button
            onClick={onOpenAddModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            + Add Wallpaper
          </button>

          {user ? (
            <>
              {/* Profile Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-full border border-gray-700 transition cursor-pointer focus:outline-none"
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-800 mb-1">
                    <p className="text-sm font-semibold text-white truncate">{user?.displayName}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory("Favorites");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2 cursor-pointer"
                  >
                    ❤️ My Favorites
                  </button>

                  <button
                    onClick={() => {
                      onOpenProfileModal();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2 cursor-pointer"
                  >
                    ⚙️ Profile Settings
                  </button>

                  <div className="border-t border-gray-800 my-1"></div>

                  <button
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600/10 transition flex items-center gap-2 cursor-pointer"
                  >
                    🚪 Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Sign In Button if Logged Out */
            <button
              onClick={onOpenLoginModal}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 transition cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
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