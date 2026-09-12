import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Welcome to ZyroWallpapers</h2>
            <p className="text-xs text-gray-400 mt-0.5">Sign in to save your favorite wallpapers</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition cursor-pointer text-sm bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-3 mb-6 shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.15 21.32 7.22 24 12 24z"/>
            <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.14 0 9.87 0 12s.43 3.86 1.18 5.38l4.09-3.14z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="text-xs text-gray-500 uppercase">Or email</span>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl text-sm transition cursor-pointer mt-2 shadow-lg"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-blue-400 hover:underline cursor-pointer"
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

      </div>
    </div>
  );
}