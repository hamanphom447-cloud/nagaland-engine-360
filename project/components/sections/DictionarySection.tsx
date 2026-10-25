'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { NAGAMESE_DICTIONARY } from '@/app/data/dictionary';

const CATEGORIES = ['All', 'Greeting', 'Common', 'Food', 'Family', 'Action', 'Place', 'Nature', 'Market'];

export function DictionarySection() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const total = NAGAMESE_DICTIONARY.length;

  const filtered = NAGAMESE_DICTIONARY.filter((w) => {
    const q = query.toLowerCase();
    const matchesQuery =
      w.nagamese.toLowerCase().includes(q) ||
      w.hindi.toLowerCase().includes(q) ||
      w.english.toLowerCase().includes(q);
    const matchesCat = activeCat === 'All' || w.category === activeCat;
    return matchesQuery && matchesCat;
  });

  const catCount = (cat: string) =>
    cat === 'All' ? total : NAGAMESE_DICTIONARY.filter((w) => w.category === cat).length;

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Dictionary</h2>
      <p className="text-sm text-zinc-500 mb-4">
        {filtered.length} / {total} Words
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Nagamese, Hindi, English..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
        />
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
              activeCat === cat
                ? 'bg-red-600 border-red-600 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {cat} ({catCount(cat)})
          </button>
        ))}
      </div>

      {/* Word list */}
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        {filtered.map((w, i) => (
          <div
            key={`${w.nagamese}-${i}`}
            className="bg-zinc-900 rounded-xl border border-zinc-800 p-3"
          >
            <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-red-600/20 text-red-500 border border-red-600/30 mb-2">
              {w.category}
            </span>
            <div className="text-lg font-bold text-white leading-tight">{w.nagamese}</div>
            <div className="text-sm text-orange-400 mt-0.5">{w.hindi}</div>
            <div className="text-sm text-zinc-400 mt-0.5">{w.english}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-zinc-600">
            No words found for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
