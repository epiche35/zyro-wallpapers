import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

export default function ProfileMenuModal({ user, isOpen, onClose, onSignOut, wallpapers, onSelectWallpaper }) {
  const [activeTab, setActiveTab] = useState('uploads'); // 'uploads' or 'settings'
  
  // Settings form states
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  // Filter wallpapers uploaded by the currently logged-in user
  const userUploads = wallpapers.filter(wp => wp.userId === user.uid);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // Update Display Name
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      // Update Email
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // Update Password if filled out
      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      setMessage('Profile updated successfully!');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-3xl relative shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{user.displayName || 'Zyro User'}</h2>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-gray-800 p-2.5 rounded-full transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs (My Uploads vs Settings) */}
        <div className="flex border-b border-gray-800 px-6 bg-gray-900/50">
          <button
            onClick={() => { setActiveTab('uploads'); setMessage(''); setError(''); }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'uploads' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            🖼️ My Uploads ({userUploads.length})
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setMessage(''); setError(''); }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            ⚙️ Account Settings
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: MY UPLOADS GRID */}
          {activeTab === 'uploads' && (
            <div>
              {userUploads.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  You haven't uploaded any wallpapers yet. Use the "+ Add Wallpaper" button to share your creations!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {userUploads.map(wp => (
                    <div 
                      key={wp.id} 
                      onClick={() => { onSelectWallpaper(wp); onClose(); }}
                      className="group relative bg-gray-800 rounded-2xl overflow-hidden cursor-pointer aspect-[9/13] border border-gray-800 hover:border-gray-700 transition"
                    >
                      <img src={wp.imageUrl} alt={wp.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <p className="text-xs font-medium text-white truncate">{wp.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACCOUNT SETTINGS FORM */}
          {activeTab === 'settings' && (
            <div className="max-w-md mx-auto">
              {message && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl mb-4">
                  {message}
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">New Password (leave blank to keep current)</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="••••••••"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl text-sm transition shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500">Need to switch accounts?</span>
                <button 
                  onClick={() => { onSignOut(); onClose(); }}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}