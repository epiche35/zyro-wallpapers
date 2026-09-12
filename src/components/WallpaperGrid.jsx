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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);

  // Real Firebase User State
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Wallpaper Items Array matching WallpaperGrid props (imageUrl, downloads, likes)
  const wallpapers = [
    { id: 1, title: "Butterfly Anime Girl", category: "Anime", imageUrl: butterflyImg, resolution: "4K", downloads: 1240, likes: 342 },
    { id: 2, title: "Crimson Devil Pirate", category: "Anime", imageUrl: crimsonDevilImg, resolution: "4K", downloads: 850, likes: 215 },
    { id: 3, title: "Crimson Devil Supercar", category: "Cars", imageUrl: supercarImg, resolution: "4K", downloads: 2300, likes: 512 },
    { id: 4, title: "Devil BMW in Smoke", category: "Cars", imageUrl: devilBmwImg, resolution: "4K", downloads: 1420, likes: 389 },
    { id: 5, title: "Divine Ascent", category: "Fantasy", imageUrl: divineAscentImg, resolution: "4K", downloads: 930, likes: 178 },
    { id: 6, title: "Midnight GT-R Dreams", category: "Cars", imageUrl: midnightGtrImg, resolution: "4K", downloads: 3100, likes: 740 },
    { id: 7, title: "Misty Creeper Forest", category: "Nature", imageUrl: mistyCreeperImg, resolution: "4K", downloads: 640, likes: 120 },
    { id: 8, title: "Neon Anime Avatar", category: "Anime", imageUrl: neonAvatarImg, resolution: "4K", downloads: 1890, likes: 430 },
    { id: 9, title: "Stormbound Ember Halo", category: "Space", imageUrl: stormboundImg, resolution: "4K", downloads: 1150, likes: 290 },
  ];

  // Filter wallpapers based on search and category
  const filteredWallpapers = wallpapers.filter((wp) => {
    const matchesCategory = selectedCategory === "All" || wp.category === selectedCategory;
    const matchesSearch = wp.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Listen to Google Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user favorites from Firestore
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

  // Toggle Favorite handler with Firestore sync
  const toggleFavorite = async (wallpaperId) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    let updatedFavorites;

    if (favorites.includes(wallpaperId)) {
      updatedFavorites = favorites.filter(id => id !== wallpaperId);
      await updateDoc(userRef, {
        favorites: arrayRemove(wallpaperId)
      });
    } else {
      updatedFavorites = [...favorites, wallpaperId];
      await updateDoc(userRef, {
        favorites: arrayUnion(wallpaperId)
      });
    }

    setFavorites(updatedFavorites);
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar 
        user={user} 
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
      
      <main className="container mx-auto px-4 py-8">
        <WallpaperGrid 
          wallpapers={filteredWallpapers}
          likedIds={favorites}
          onLike={toggleFavorite}
          onSelectWallpaper={(wp) => setSelectedWallpaper(wp)}
        />
      </main>

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}

      {isProfileModalOpen && user && (
        <ProfileMenuModal 
          user={user} 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)} 
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
}