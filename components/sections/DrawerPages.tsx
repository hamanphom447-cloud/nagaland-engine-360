'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Save, Check } from 'lucide-react';
import { useApp, DISTRICTS } from '../AppContext';

export function EditProfilePage() {
  const { userData, setUserData } = useApp();
  const [form, setForm] = useState(userData);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setUserData(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Edit Profile</h2>
      <p className="text-sm text-zinc-500 mb-6">Update your personal information</p>

      {/* Avatar preview */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-red-600 overflow-hidden bg-zinc-900">
          <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="text-sm font-bold text-white mt-2">{form.name || 'Naga Explorer'}</div>
        <div className="text-[11px] text-zinc-500">{form.village}, {form.district}</div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide flex items-center gap-1 mb-1.5">
            <User className="w-3 h-3" /> Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide flex items-center gap-1 mb-1.5">
            <MapPin className="w-3 h-3" /> Village
          </label>
          <input
            type="text"
            value={form.village}
            onChange={(e) => setForm({ ...form, village: e.target.value })}
            placeholder="Your village"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide flex items-center gap-1 mb-1.5">
            <MapPin className="w-3 h-3" /> District
          </label>
          <select
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d} className="bg-zinc-900">{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide flex items-center gap-1 mb-1.5">
            <Phone className="w-3 h-3" /> Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Your phone number"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${
            saved ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Profile</>}
        </button>
      </div>
    </div>
  );
}

export function FavoritesPage() {
  const { favorites, toggleFavorite } = useApp();

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">My Favorites</h2>
      <p className="text-sm text-zinc-500 mb-4">{favorites.length} saved items</p>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
            <span className="text-2xl">❤️</span>
          </div>
          <p className="text-sm text-zinc-500 text-center">No favorites yet</p>
          <p className="text-xs text-zinc-600 text-center mt-1">Tap the heart icon on Dictionary words, Market items, or Recipes to save them here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {favorites.map((f) => (
            <motion.div
              key={f.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-xl shrink-0">
                {f.emoji || '⭐'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white">{f.title}</div>
                <div className="text-[11px] text-zinc-500">{f.subtitle}</div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-600/20 text-red-500 border border-red-600/30 mt-1 inline-block">
                  {f.type}
                </span>
              </div>
              <button
                onClick={() => toggleFavorite(f)}
                className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 active:scale-95 transition-transform"
              >
                ❤️
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
