import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import Navbar from './components/Navbar';
import WallpaperGrid from './components/WallpaperGrid';
import AddWallpaperModal from './components/AddWallpaperModal';
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar 
        user={user} 
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
      
      <main className="container mx-auto px-4 py-8">
        <WallpaperGrid 
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

      {/* Other custom modals will go here */}
    </div>
  );
}