import React, { useState } from 'react';

export default function ProfileMenuModal({ isOpen, onClose, user, onSignOut }) {
  if (!isOpen || !user) return null;

  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Profile update logic can be added here if needed
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Profile Settings</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage your account details</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition cursor-pointer text-sm bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Avatar Preview */}
          <div className="flex flex-col items-center justify-center mb-2">
            <img
              src={photoURL || user.photoURL || "https://via.placeholder.com/80"}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mb-2 shadow-md"
            />
            <p className="text-xs text-gray-400">{user.displayName || "Zyro User"}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition cursor-pointer"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 font-medium py-2.5 rounded-xl text-sm transition cursor-pointer"
            >
              Log Out
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}