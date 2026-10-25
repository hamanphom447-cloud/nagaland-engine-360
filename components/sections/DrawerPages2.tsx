'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Upload, Check, Save, X } from 'lucide-react';
import { useApp, DISTRICTS } from '../AppContext';

export function ListingsPage() {
  const { customListings, addListing, removeListing } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', unit: 'kg', village: '', emoji: '🛒' });

  function handleAdd() {
    if (!form.name || !form.price) return;
    addListing({
      id: `listing_${Date.now()}`,
      name: form.name,
      price: parseInt(form.price) || 0,
      unit: form.unit,
      village: form.village || 'Kohima',
      emoji: form.emoji || '🛒',
    });
    setForm({ name: '', price: '', unit: 'kg', village: '', emoji: '🛒' });
    setShowForm(false);
  }

  const EMOJIS = ['🛒', '🐂', '🌶️', '🍚', '🎋', '🪵', '🐟', '🌽', '🥬', '🍯'];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-black text-white">My Listings</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg px-2.5 py-1.5 font-semibold transition-colors"
        >
          {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          {showForm ? 'Cancel' : 'Add'}
        </button>
      </div>
      <p className="text-sm text-zinc-500 mb-4">Add your own products to Market Price</p>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-zinc-900 rounded-xl border border-red-600/30 p-4 space-y-3">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Smoked Fish"
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Price (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="350"
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="w-24">
                  <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Unit</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="kg">per kg</option>
                    <option value="piece">per pc</option>
                    <option value="bunch">per bunch</option>
                    <option value="litre">per litre</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Village / Source</label>
                <input
                  type="text"
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                  placeholder="e.g. Dimapur Market"
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">Icon</label>
                <div className="flex flex-wrap gap-1.5">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setForm({ ...form, emoji: e })}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-colors ${
                        form.emoji === e ? 'bg-red-600/20 border-red-600' : 'bg-black border-zinc-800'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAdd}
                disabled={!form.name || !form.price}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white rounded-lg py-2.5 text-sm font-bold transition-colors"
              >
                <Save className="w-4 h-4" /> Add Listing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {customListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
            <Plus className="w-7 h-7 text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-500">No listings yet</p>
          <p className="text-xs text-zinc-600 mt-1">Add your own products to see them here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {customListings.map((l) => (
            <motion.div
              key={l.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-xl shrink-0">{l.emoji}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{l.name}</div>
                <div className="text-[11px] text-zinc-500">{l.village}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-white">₹{l.price}<span className="text-[10px] text-zinc-500">/{l.unit}</span></div>
              </div>
              <button
                onClick={() => removeListing(l.id)}
                className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EditHomePage() {
  const { homeCards, toggleCardVisible, moveCard } = useApp();
  const sorted = [...homeCards].sort((a, b) => a.order - b.order);

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Edit Home Layout</h2>
      <p className="text-sm text-zinc-500 mb-4">Reorder and toggle visibility of home cards</p>

      <div className="space-y-2">
        {sorted.map((card, i) => (
          <motion.div
            key={card.id}
            layout
            className={`bg-zinc-900 rounded-xl border p-3 flex items-center gap-3 ${
              card.visible ? 'border-zinc-800' : 'border-zinc-800/50 opacity-50'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => moveCard(card.id, 'up')}
                disabled={i === 0}
                className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 disabled:opacity-30 hover:text-white"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveCard(card.id, 'down')}
                disabled={i === sorted.length - 1}
                className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 disabled:opacity-30 hover:text-white"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="w-7 h-7 rounded-lg bg-black border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-red-500 shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-bold ${card.visible ? 'text-white' : 'text-zinc-600'}`}>{card.label}</div>
              <div className="text-[11px] text-zinc-600">{card.desc}</div>
            </div>
            <button
              onClick={() => toggleCardVisible(card.id)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                card.visible
                  ? 'bg-green-600/10 border-green-600/30 text-green-500'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-600'
              }`}
            >
              {card.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-center">
        <p className="text-[11px] text-zinc-500">
          {homeCards.filter((c) => c.visible).length} of {homeCards.length} cards visible on home
        </p>
      </div>
    </div>
  );
}

export function ChangeLogoPage() {
  const { settings, setSettings } = useApp();
  const [uploaded, setUploaded] = useState<string | null>(settings.customLogo);
  const [saved, setSaved] = useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploaded(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    setSettings({ customLogo: uploaded });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    setUploaded(null);
    setSettings({ customLogo: null });
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Change Logo</h2>
      <p className="text-sm text-zinc-500 mb-6">Upload a custom logo for the app</p>

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-2xl border-2 border-red-600 overflow-hidden bg-zinc-900 mb-3">
          <img src={uploaded || '/logo.png'} alt="Logo" className="w-full h-full object-cover" />
        </div>
        {uploaded ? (
          <div className="text-sm text-green-500 flex items-center gap-1">
            <Check className="w-4 h-4" /> Custom logo ready
          </div>
        ) : (
          <div className="text-sm text-zinc-500">Default logo</div>
        )}
      </div>

      <div className="space-y-3">
        <label className="flex flex-col items-center justify-center gap-2 bg-zinc-900 border-2 border-dashed border-zinc-700 hover:border-red-600 rounded-xl py-8 cursor-pointer transition-colors">
          <Upload className="w-8 h-8 text-zinc-600" />
          <span className="text-sm text-zinc-400">Tap to upload image</span>
          <span className="text-[10px] text-zinc-600">PNG, JPG up to 1MB</span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!uploaded}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors ${
              saved ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white'
            }`}
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Logo</>}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl py-2.5 px-4 text-sm font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export function LanguagePage() {
  const { settings, setSettings } = useApp();
  const [selected, setSelected] = useState(settings.voiceAccent);
  const languages = [
    { id: 'english' as const, label: 'English', native: 'English', flag: '🇬🇧' },
    { id: 'nagamese' as const, label: 'Nagamese', native: 'Naga', flag: '🇮🇳' },
    { id: 'hindi' as const, label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { id: 'nagamizo' as const, label: 'Nagamizo', native: 'Mizo', flag: '🇮🇳' },
  ];

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Language</h2>
      <p className="text-sm text-zinc-500 mb-4">Select your preferred language</p>

      <div className="space-y-2">
        {languages.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              setSelected(l.id);
              setSettings({ voiceAccent: l.id });
            }}
            className={`w-full flex items-center gap-3 rounded-xl border p-3 transition-colors ${
              selected === l.id ? 'bg-red-600/15 border-red-600/50' : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <span className="text-2xl">{l.flag}</span>
            <div className="flex-1 text-left">
              <div className={`text-sm font-bold ${selected === l.id ? 'text-white' : 'text-zinc-300'}`}>{l.label}</div>
              <div className="text-[11px] text-zinc-500">{l.native}</div>
            </div>
            {selected === l.id && (
              <Check className="w-5 h-5 text-red-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
