import React, { useState } from 'react';
import { Sun, Moon, Image, User } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 glass-card bg-slate-900/40 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image className="h-7 w-7 text-neonCyan" />
          <span className="text-xl font-bold bg-gradient-to-r from-neonCyan via-neonPurple to-neonPink bg-clip-text text-transparent">
            Zyro Wallpapers
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-card hover:bg-white/10 text-slate-200 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-neonCyan" /> : <Moon className="h-5 w-5 text-neonPurple" />}
          </button>

          <button 
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple text-slate-950 font-semibold hover:opacity-90 transition-opacity"
          >
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </button>
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}