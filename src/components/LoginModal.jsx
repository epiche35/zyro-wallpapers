import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function LoginModal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Helper to initialize user document in Firestore if it doesn't exist
  const createFirestoreUser = async (user, displayName) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: displayName || user.displayName || "Wallpaper Creator",
        email: user.email,
        favorites: []
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createFirestoreUser(result.user, result.user.displayName);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Register new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name || email.split('@')[0] });
        await createFirestoreUser(userCredential.user, name || email.split('@')[0]);
      } else {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await createFirestoreUser(userCredential.user, userCredential.user.displayName);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full transition cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 text-xs">
            {isSignUp ? "Join ZyroWallpapers to upload and save favorites" : "Sign in to manage your favorites and wallpapers"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-3 shadow-lg cursor-pointer text-sm mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.23 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.8 0 12s.43 3.9 1.19 5.42l4.09-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="px-3 text-gray-500 text-xs uppercase tracking-wider">or email</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your Name"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-xl transition shadow-lg cursor-pointer text-sm mt-2"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle between Sign In and Sign Up */}
        <div className="text-center mt-5">
          <button 
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="text-xs text-blue-400 hover:underline cursor-pointer"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}