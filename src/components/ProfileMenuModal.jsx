import React, { useState } from 'react';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

export default function ProfileMenuModal({ user, isOpen, onClose, onSignOut, wallpapers, onSelectWallpaper }) {
  const [activeTab, setActiveTab] = useState('uploads'); // 'uploads' or 'settings'
  
  // Settings form states
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [imagePreview, setImagePreview] = useState(user?.photoURL || '');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  const userUploads = wallpapers.filter(wp => wp.userId === user.uid);

  // Handle image file selection with a compression/size guard
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800000) { // ~800KB limit for profile pics to avoid token bloat
        setError('Profile picture is too large. Please choose an image under 800KB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // 1. Update Profile (Name & Photo)
      const profileUpdates = {};
      if (displayName !== user.displayName) profileUpdates.displayName = displayName;
      if (photoURL !== user.photoURL) profileUpdates.photoURL = photoURL;

      if (Object.keys(profileUpdates).length > 0) {
        await updateProfile(user, profileUpdates);
      }

      // 2. Update Email if changed
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }

      // 3. Update Password if provided
      if (newPassword && newPassword.trim() !== '') {
        await updatePassword(user, newPassword);
      }

      setMessage('Profile updated successfully!');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      // Clean up common firebase errors for the user
      if (err.code === 'auth/requires-recent-login') {
        setError('For security reasons, changing email or password requires logging out and signing back in first.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl relative shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
              {imagePreview || user.photoURL ? (
                <img src={imagePreview || user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{user.displayName || 'Zyro User'}</h2>
              <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">{user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 p-2.5 rounded-full transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50">
          <button
            onClick={() => { setActiveTab('uploads'); setMessage(''); setError(''); }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'uploads' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            🖼️ My Uploads ({userUploads.length})
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setMessage(''); setError(''); }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Account Settings
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {activeTab === 'uploads' && (
            <div>
              {userUploads.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  You haven't uploaded any wallpapers yet. Use the "+ Add Wallpaper" button to share your creations!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {userUploads.map(wp => (
                    <div 
                      key={wp.id} 
                      onClick={() => { onSelectWallpaper(wp); onClose(); }}
                      className="group relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer aspect-[9/13] border border-slate-800 hover:border-slate-700 transition"
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">Profile Picture (Max ~800KB)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                      <img 
                        src={imagePreview || "https://via.placeholder.com/150"} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer cursor-pointer bg-slate-800 border border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">New Password (leave blank to keep current)</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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

              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-500">Need to switch accounts?</span>
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