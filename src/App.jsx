import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WallpaperGrid from './components/WallpaperGrid';
import AddWallpaperModal from './components/AddWallpaperModal';
import ProfileMenuModal from './components/ProfileMenuModal';
import WallpaperModal from './components/WallpaperModal';

// Importing assets
import heroImg from './assets/hero.png';
import butterflyImg from './assets/Butterfly Bow Anime Girl Portrait.png';
import crimsonDevilImg from './assets/Crimson Devil Pirate Wallpaper.png';
import supercarImg from './assets/Crimson Devil Supercar Poster.png';
import devilBmwImg from './assets/Devil BMW in Crimson Smoke.png';
import divineAscentImg from './assets/Divine ascent under swirling clouds.png';
import midnightGtrImg from './assets/Midnight GT-R Dreams.png';
import mistyCreeperImg from './assets/Misty Creeper Moonlit Forest Chair.png';
import neonAvatarImg from './assets/Neon Anime Avatar_ Evolve in Blue.png';
import stormboundImg from './assets/Stormbound Ember Halo.png';

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  
  // Track liked wallpaper IDs for the Favorites tab
  const [likedIds, setLikedIds] = useState([]);

  const [user, setUser] = useState({
    displayName: "Zyro User",
    email: "zyro@wallpapers.com",
    photoURL: neonAvatarImg
  });

  const [wallpapers, setWallpapers] = useState([
    { id: 1, title: "Heroic Cliff Edge", category: "Anime", imageUrl: heroImg, downloads: "1.2k", likes: "342" },
    { id: 2, title: "Butterfly Bow Anime Portrait", category: "Anime", imageUrl: butterflyImg, downloads: "2.4k", likes: "512" },
    { id: 3, title: "Crimson Devil Pirate", category: "Fantasy", imageUrl: crimsonDevilImg, downloads: "3.1k", likes: "890" },
    { id: 4, title: "Crimson Supercar Poster", category: "Cars", imageUrl: supercarImg, downloads: "4.5k", likes: "1.1k" },
    { id: 5, title: "Devil BMW in Smoke", category: "Cars", imageUrl: devilBmwImg, downloads: "1.9k", likes: "430" },
    { id: 6, title: "Divine Ascent Clouds", category: "Nature", imageUrl: divineAscentImg, downloads: "850", likes: "210" },
    { id: 7, title: "Midnight GT-R Dreams", category: "Cars", imageUrl: midnightGtrImg, downloads: "5.2k", likes: "1.4k" },
    { id: 8, title: "Misty Moonlit Forest", category: "Nature", imageUrl: mistyCreeperImg, downloads: "920", likes: "315" },
    { id: 9, title: "Stormbound Ember Halo", category: "Fantasy", imageUrl: stormboundImg, downloads: "3.8k", likes: "950" }
  ]);

  // Updated filter to handle the "Favorites" tab selection
  const filteredWallpapers = wallpapers.filter((wp) => {
    const matchesSearch = wp.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === "Favorites") {
      return matchesSearch && likedIds.includes(wp.id);
    }

    const matchesCategory = selectedCategory === "All" || wp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddWallpaper = (newWallpaper) => {
    setWallpapers([
      { id: wallpapers.length + 1, downloads: "0", likes: "0", ...newWallpaper },
      ...wallpapers
    ]);
  };

  const handleLike = (id) => {
    setWallpapers(wallpapers.map(wp => {
      if (wp.id === id) {
        const currentLikes = parseInt(wp.likes.replace('k', '000')) || 100;
        return { ...wp, likes: (currentLikes + 1).toLocaleString() };
      }
      return wp;
    }));

    // Add to liked IDs list if not already liked
    if (!likedIds.includes(id)) {
      setLikedIds([...likedIds, id]);
    }

    setSelectedWallpaper(prev => prev ? { ...prev, likes: (parseInt(prev.likes.replace('k', '000')) + 1).toLocaleString() } : null);
  };

  const handleDownload = (id) => {
    setWallpapers(wallpapers.map(wp => {
      if (wp.id === id) {
        const currentDownloads = parseInt(wp.downloads.replace('k', '000')) || 100;
        return { ...wp, downloads: (currentDownloads + 1).toLocaleString() };
      }
      return wp;
    }));
    setSelectedWallpaper(prev => prev ? { ...prev, downloads: (parseInt(prev.downloads.replace('k', '000')) + 1).toLocaleString() } : null);
  };

  const handleLogout = () => {
    setUser(null);
    alert("Signed out successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        user={user}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <WallpaperGrid 
          wallpapers={filteredWallpapers} 
          onSelectWallpaper={(wp) => setSelectedWallpaper(wp)} 
        />
      </main>

      <AddWallpaperModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddWallpaper}
      />

      <ProfileMenuModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      <WallpaperModal 
        wallpaper={selectedWallpaper}
        onClose={() => setSelectedWallpaper(null)}
        onLike={handleLike}
        onDownload={handleDownload}
      />
    </div>
  );
}