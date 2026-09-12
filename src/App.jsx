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

  // Wallpaper Items Array
  const wallpapers = [
    { id: 1, title: "Butterfly Anime Girl", category: "Anime", url: butterflyImg, resolution: "4K" },
    { id: 2, title: "Crimson Devil Pirate", category: "Anime", url: crimsonDevilImg, resolution: "4K" },
    { id: 3, title: "Crimson Devil Supercar", category: "Cars", url: supercarImg, resolution: "4K" },
    { id: 4, title: "Devil BMW in Smoke", category: "Cars", url: devilBmwImg, resolution: "4K" },
    { id: 5, title: "Divine Ascent", category: "Fantasy", url: divineAscentImg, resolution: "4K" },
    { id: 6, title: "Midnight GT-R Dreams", category: "Cars", url: midnightGtrImg, resolution: "4K" },
    { id: 7, title: "Misty Creeper Forest", category: "Nature", url: mistyCreeperImg, resolution: "4K" },
    { id: 8, title: "Neon Anime Avatar", category: "Anime", url: neonAvatarImg, resolution: "4K" },
    { id: 9, title: "Stormbound Ember Halo", category: "Space", url: stormboundImg, resolution: "4K" },
  ];

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
          // Create user document if it doesn't exist yet
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
          wallpapers={wallpapers}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
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