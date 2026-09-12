import React from 'react';

export default function ProfileMenuModal({ isOpen, onClose, user, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 w-80 rounded-2xl p-6 text-white shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <img 
            src={user?.photoURL} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md"
          />
          <h2 className="text-lg font-bold mt-3">{user?.displayName || "Zyro"}</h2>
          <p className="text-xs text-gray-400">{user?.email || "zyro@wallpapers.com"}</p>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-4 flex flex-col gap-2">
          <button 
            onClick={() => { alert("Settings clicked!"); onClose(); }}
            className="w-full text-left px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors"
          >
            ⚙️ Account Settings
          </button>
          <button 
            onClick={() => { onLogout(); onClose(); }}
            className="w-full text-left px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}