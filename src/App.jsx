import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import Navbar from './components/Navbar';
import WallpaperGrid from './components/WallpaperGrid';
import AddWallpaperModal from './components/addwallpaper';
import ProfileMenuModal from './components/ProfileMenuModal';
import WallpaperModal from './components/WallpaperModal';
import LoginModal from './components/LoginModal';

// Importing default fallback assets
import butterflyImg from './assets/Butterfly Bow Anime Girl Portrait.png';
import crimsonDevilImg from './assets/Crimson Devil Pirate Wallpaper.png';
import supercarImg from './assets/Crimson Devil Supercar Poster.png';
import devilBmwImg from './assets/Devil BMW in Crimson Smoke.png';
import divineAscentImg from './assets/Divine ascent under swirling clouds.png';
import midnightGtrImg from './assets/Midnight GT-R Dreams.png';
import mistyCreeperImg from './assets/Misty Creeper Moonlit Forest Chair.png';
import neonAvatarImg from './assets/Neon Anime Avatar_ Evolve in Blue.png';
import stormboundImg from './assets/Stormbound Ember Halo.png';

const defaultWallpapers = [
  { id: 1, title: "Butterfly Anime Girl", category: "Anime", deviceType: "Desktop", mediaType: "image", imageUrl: typeof butterflyImg === 'object' ? butterflyImg.default : butterflyImg, resolution: "4K", downloads: 1240, likes: 342, userName: "Zyro Official" },
  { id: 2, title: "Crimson Devil Pirate", category: "Anime", deviceType: "Desktop", mediaType: "image", imageUrl: typeof crimsonDevilImg === 'object' ? crimsonDevilImg.default : crimsonDevilImg, resolution: "4K", downloads: 850, likes: 215, userName: "Zyro Official" },
  { id: 3, title: "Crimson Devil Supercar", category: "Cars", deviceType: "Desktop", mediaType: "image", imageUrl: typeof supercarImg === 'object' ? supercarImg.default : supercarImg, resolution: "4K", downloads: 2300, likes: 512, userName: "Zyro Official" },
  { id: 4, title: "Devil BMW in Smoke", category: "Cars", deviceType: "Desktop", mediaType: "image", imageUrl: typeof devilBmwImg === 'object' ? devilBmwImg.default : devilBmwImg, resolution: "4K", downloads: 1420, likes: 389, userName: "Zyro Official" },
  { id: 5, title: "Divine Ascent", category: "Fantasy", deviceType: "Desktop", mediaType: "image", imageUrl: typeof divineAscentImg === 'object' ? divineAscentImg.default : divineAscentImg, resolution: "4K", downloads: 930, likes: 178, userName: "Zyro Official" },
  { id: 6, title: "Midnight GT-R Dreams", category: "Cars", deviceType: "Desktop", mediaType: "image", imageUrl: typeof midnightGtrImg === 'object' ? midnightGtrImg.default : midnightGtrImg, resolution: "4K", downloads: 3100, likes: 740, userName: "Zyro Official" },
  { id: 7, title: "Misty Creeper Forest", category: "Nature", deviceType: "Mobile", mediaType: "image", imageUrl: typeof mistyCreeperImg === 'object' ? mistyCreeperImg.default : mistyCreeperImg, resolution: "4K", downloads: 640, likes: 120, userName: "Zyro Official" },
  { id: 8, title: "Neon Anime Avatar", category: "Anime", deviceType: "Mobile", mediaType: "image", imageUrl: typeof neonAvatarImg === 'object' ? neonAvatarImg.default : neonAvatarImg, resolution: "4K", downloads: 1890, likes: 430, userName: "Zyro Official" },
  { id: 9, title: "Stormbound Ember Halo", category: "Space", deviceType: "Desktop", mediaType: "image", imageUrl: typeof stormboundImg === 'object' ? stormboundImg.default : stormboundImg, resolution: "4K", downloads: 1150, likes: 290, userName: "Zyro Official" },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deviceFilter, setDeviceFilter] = useState("All"); // "All", "Desktop", "Mobile", "Live"
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const [wallpapers, setWallpapers] = useState(() => {
    try {
      const saved = localStorage.getItem('zyro_custom_wallpapers');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...defaultWallpapers];
      }
    } catch (e) {
      console.error("Failed to load local wallpapers", e);
    }
    return defaultWallpapers;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setFavorites(userSnap.data().favorites || []);
        } else {
          await setDoc(userRef, { favorites: [] });
          setFavorites([]);
        }
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddWallpaper = (newWallpaper) => {
    if (!user) {
      setIsAddModalOpen(false);
      setIsLoginModalOpen(true);
      return;
    }

    setIsAddModalOpen(false);

    const wallpaperData = {
      id: Date.now(),
      ...newWallpaper,
      userId: user.uid,
      userName: user.displayName || user.email.split('@')[0],
      downloads: 0,
      likes: 0
    };

    setWallpapers(prev => {
      const updated = [wallpaperData, ...prev];
      const customOnly = updated.filter(w => !defaultWallpapers.some(dw => dw.id === w.id));
      localStorage.setItem('zyro_custom_wallpapers', JSON.stringify(customOnly));
      return updated;
    });
  };

  const toggleFavorite = async (wallpaperId) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    let updatedFavorites;

    if (favorites.includes(wallpaperId)) {
      updatedFavorites = favorites.filter(id => id !== wallpaperId);
      await updateDoc(userRef, { favorites: arrayRemove(wallpaperId) });
    } else {
      updatedFavorites = [...favorites, wallpaperId];
      await updateDoc(userRef, { favorites: arrayUnion(wallpaperId) });
    }

    setFavorites(updatedFavorites);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const filteredWallpapers = wallpapers.filter((wp) => {
    const matchesSearch = wp.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" ? true :
      selectedCategory === "Favorites" ? favorites.includes(wp.id) :
      wp.category === selectedCategory;

    const matchesUser = selectedUserId ? wp.userId === selectedUserId : true;
    
    // Check for "Live" videos vs Standard Devices
    let matchesDevice = false;
    if (deviceFilter === "All") {
      matchesDevice = true;
    } else if (deviceFilter === "Live") {
      matchesDevice = wp.mediaType === 'video' || (typeof wp.imageUrl === 'string' && wp.imageUrl.match(/\.(mp4|webm)$/i));
    } else {
      const wpDevice = wp.deviceType || wp.type || "Desktop";
      matchesDevice = wpDevice === deviceFilter;
    }

    return matchesCategory && matchesUser && matchesDevice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => { setSelectedCategory(cat); setSelectedUserId(null); }}
        onOpenAddModal={() => {
          if (!user) setIsLoginModalOpen(true);
          else setIsAddModalOpen(true);
        }}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        user={user}
        onLogout={handleSignOut}
      />
      
      {selectedUserId && (
        <div className="bg-blue-600/10 border-b border-blue-500/20 px-4 py-2.5 text-center text-xs text-blue-400 flex items-center justify-center gap-3">
          <span>Showing wallpapers uploaded by user profile</span>
          <button 
            onClick={() => setSelectedUserId(null)} 
            className="underline font-semibold cursor-pointer hover:text-blue-300"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Device & Media Filter Bar */}
      <div className="container mx-auto px-4 pt-4 flex flex-wrap items-center justify-center gap-2">
        {["All", "Desktop", "Mobile", "Live"].map((filter) => (
          <button
            key={filter}
            onClick={() => setDeviceFilter(filter)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              deviceFilter === filter
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {filter === "Desktop" ? "🖥️ Desktop" : filter === "Mobile" ? "📱 Mobile" : filter === "Live" ? "🎬 Live" : "✨ All"}
          </button>
        ))}
      </div>

      <main className="container mx-auto px-4 py-6">
        <WallpaperGrid 
          wallpapers={filteredWallpapers}
          likedIds={favorites}
          onLike={toggleFavorite}
          onSelectWallpaper={(wp) => setSelectedWallpaper(wp)}
        />
      </main>

      {selectedWallpaper && (
        <WallpaperModal 
          wallpaper={selectedWallpaper} 
          isOpen={true}
          onClose={() => setSelectedWallpaper(null)}
          isLiked={favorites.includes(selectedWallpaper.id)}
          onLike={toggleFavorite}
          onFilterByUser={(uid) => {
            setSelectedUserId(uid);
            setSelectedCategory("All");
          }}
        />
      )}

      {isAddModalOpen && (
        <AddWallpaperModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddWallpaper}
          user={user}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}

      {isProfileModalOpen && user && (
        <ProfileMenuModal 
          user={user} 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)} 
          onSignOut={handleSignOut}
          wallpapers={wallpapers}
          onSelectWallpaper={(wp) => setSelectedWallpaper(wp)}
        />
      )}
    </div>
  );
}