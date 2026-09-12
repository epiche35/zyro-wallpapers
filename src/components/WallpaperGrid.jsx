import React, { useState } from 'react';
import { Search, Download, Heart } from 'lucide-react';

const SAMPLE_WALLPAPERS = [
  { id: 1, title: 'Neon Horizon', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Cyber Pulse', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Glass Wave', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Abstract Prism', url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80' }
];

export default function WallpaperGrid() {
  const [search, setSearch] = useState('');

  const filteredWallpapers = SAMPLE_WALLPAPERS.filter(wp =>
    wp.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search wallpapers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl glass-card bg-slate-900/50 border border-white/10 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-neonCyan transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredWallpapers.map((wp) => (
          <div key={wp.id} className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-neonCyan/50 transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img
                src={wp.url}
                alt={wp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="font-semibold text-slate-100">{wp.title}</span>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-xl glass-card hover:bg-white/20 text-neonPink transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <a
                    href={wp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl glass-card hover:bg-white/20 text-neonCyan transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}