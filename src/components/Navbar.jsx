import React from 'react';
import logoImg from '../assets/logo.png';

export default function Navbar({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  onOpenAddModal, 
  onOpenProfileModal, 
  onOpenLoginModal, 
  user 
}) {
  const categories = ["All", "Favorites", "Anime", "Cars", "Gaming", "AMOLED", "Aesthetic", "Space", "Minimal", "Fantasy", "Nature"];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="container mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div 
            className="flex items-center gap-2.5 cursor-pointer" 
            onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
          >
            <img 
              src={typeof logoImg === 'object' ? logoImg.default : logoImg} 
              alt="ZyroWallpapers Logo" 
              className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-blue-500/20 border border-slate-800"
            />
            <span className="font-bold text-lg tracking-tight text-white">Zyro<span className="text-blue-500">Wallpapers</span></span>
          </div>

          {/* Mobile Profile / Auth Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-2 rounded-xl text-xs transition shadow-lg cursor-pointer"
            >
              + Add
            </button>
            {user ? (
              <button 
                onClick={onOpenProfileModal}
                className="w-9 h-9 rounded-full overflow-hidden border border-slate-700 focus:outline-none cursor-pointer shadow-md"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </button>
            ) : (
              <button 
                onClick={onOpenLoginModal}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-3 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-md relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search high-res wallpapers..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition shadow-inner"
          />
        </div>

        {/* Desktop Actions (+ Add Wallpaper & User Avatar) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-blue-600/20 cursor-pointer flex items-center gap-1.5"
          >
            <span>+</span> Add Wallpaper
          </button>

          {user ? (
            <button 
              onClick={onOpenProfileModal}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 hover:border-blue-500 transition focus:outline-none cursor-pointer shadow-md"
              title="Open Profile Dashboard & Settings"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </button>
          ) : (
            <button 
              onClick={onOpenLoginModal}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-slate-900 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <div className="container mx-auto px-4 flex items-center gap-2 py-2.5 whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {category === "Favorites" ? "♥ Favorites" : category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}