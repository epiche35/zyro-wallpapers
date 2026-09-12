import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WallpaperGrid from './components/WallpaperGrid';
import AddWallpaperModal from './components/AddWallpaperModal';
import ProfileMenuModal from './components/ProfileMenuModal';

// Importing your exact files from assets
import avatarImg from './assets/Neon Anime Avatar_ Evolve in Blue.png';
import bmwImg from './assets/Devil BMW in Crimson Smoke.png';
import pirateImg from './assets/Crimson Devil Pirate Wallpaper.png';
import moonlitImg from './assets/hero.png';
import emberImg from './assets/Stormbound Ember Halo.png';
import ascentImg from './assets/Divine ascent under swirling clouds.png';
import supercarImg from './assets/Crimson Devil Supercar Poster.png';
import gtrImg from './assets/Midnight GT-R Dreams.png';
import animeGirlImg from './assets/Butterfly Bow Anime Girl Portrait.png';
import creeperImg from './assets/Misty Creeper Moonlit Forest Chair.png';

export default function App() {
  const [user, setUser] = useState({
    displayName: "Zyro",
    email: "zyro@wallpapers.com",
    photoURL: avatarImg,
  });

  const [wallpapers, setWallpapers] = useState([
    { id: 1, name: "Devil BMW M4", category: "Cars", url: bmwImg },
    { id: 2, name: "Crimson Devil Pirate", category: "Anime", url: pirateImg },
    { id: 3, name: "Moonlit Cliff", category: "Aesthetic", url: moonlitImg },
    { id: 4, name: "Stormbound Ember Halo", category: "Gaming", url: emberImg },
    { id: 5, name: "Divine Ascent", category: "4K", url: ascentImg },
    { id: 6, name: "Crimson Supercar Poster", category: "Cars", url: supercarImg },
    { id: 7, name: "Midnight GT-R Dreams", category: "Cars", url: gtrImg },
    { id: 8, name: "Butterfly Bow Anime", category: "Anime", url: animeGirlImg },
    { id: 9, name: "Misty Creeper Forest", category: "Gaming", url: creeperImg },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAddWallpaper = (newWallpaper) => {
    setWallpapers([newWallpaper, ...wallpapers]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <Navbar 
        user={user} 
        onOpenAuthModal={() => setIsProfileOpen(true)} 
      />

      <ProfileMenuModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={() => setUser(null)}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Zyro Wallpapers</h1>
          <p className="text-xs text-gray-400 mt-1">Same dreams, bigger moves.</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg"
        >
          + Upload Wallpaper
        </button>
      </div>

      <WallpaperGrid wallpapers={wallpapers} />

      <AddWallpaperModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddWallpaper={handleAddWallpaper}
      />
    </div>
  );
}