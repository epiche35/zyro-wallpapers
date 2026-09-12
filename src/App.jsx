import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import WallpaperGrid from './components/WallpaperGrid';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-neonCyan selection:text-slate-950 transition-colors duration-300">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          <div className="glass-card rounded-3xl p-8 text-center border border-white/10 shadow-neon">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-neonCyan via-neonPurple to-neonPink bg-clip-text text-transparent mb-4">
              Welcome to Zyro Wallpapers
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Discover, download, and share stunning high-resolution glassmorphism wallpapers.
            </p>
          </div>
          <WallpaperGrid />
        </main>
      </div>
    </ThemeProvider>
  );
}