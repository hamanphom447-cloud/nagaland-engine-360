'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const COLORS = [
  { color: 'bg-blue-600', name: 'Blue', meaning: 'Sky & the Naga people\'s aspirations' },
  { color: 'bg-red-600', name: 'Red', meaning: 'Courage & sacrifice of Naga warriors' },
  { color: 'bg-green-600', name: 'Green', meaning: 'Lush forests & agricultural land' },
  { color: 'bg-yellow-500', name: 'Yellow', meaning: 'Sunshine & hope for the future' },
  { color: 'bg-purple-600', name: 'Purple', meaning: 'Dignity & cultural pride' },
];

export function FlagSection() {
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Naga Cultural Flag</h2>
      <p className="text-sm text-zinc-500 mb-4">Historical cultural symbol of the Naga people</p>

      {/* Flag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-4 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full max-w-xs aspect-[3/2] rounded-lg overflow-hidden shadow-2xl shadow-blue-900/30"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Rainbow arc */}
            <svg viewBox="0 0 200 120" className="w-full h-full">
              <path d="M 30 100 A 70 70 0 0 1 170 100" fill="none" stroke="#ef4444" strokeWidth="8" />
              <path d="M 38 100 A 62 62 0 0 1 162 100" fill="none" stroke="#f59e0b" strokeWidth="6" />
              <path d="M 46 100 A 54 54 0 0 1 154 100" fill="none" stroke="#facc15" strokeWidth="6" />
              <path d="M 54 100 A 46 46 0 0 1 146 100" fill="none" stroke="#22c55e" strokeWidth="5" />
              <path d="M 62 100 A 38 38 0 0 1 138 100" fill="none" stroke="#3b82f6" strokeWidth="5" />
              <path d="M 70 100 A 30 30 0 0 1 130 100" fill="none" stroke="#a855f7" strokeWidth="4" />
              {/* Star */}
              <polygon
                points="100,15 103,25 113,25 105,31 108,41 100,35 92,41 95,31 87,25 97,25"
                fill="#fefce8"
                stroke="#facc15"
                strokeWidth="1"
              />
            </svg>
          </div>
        </motion.div>

        <div className="mt-4 flex items-start gap-2 bg-amber-950/30 border border-amber-900/40 rounded-xl p-3 w-full">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300/80">
            <span className="font-bold">Disclaimer:</span> This is a cultural flag, not an official state flag. It represents the shared identity of the Naga people historically.
          </p>
        </div>
      </motion.div>

      {/* Color meanings */}
      <h3 className="text-sm font-bold text-white mb-3">Color Meanings</h3>
      <div className="space-y-2">
        {COLORS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-lg ${c.color} shrink-0`} />
            <div>
              <div className="text-sm font-bold text-white">{c.name}</div>
              <div className="text-xs text-zinc-500">{c.meaning}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Star meaning */}
      <div className="mt-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center shrink-0">
          <span className="text-yellow-400 text-lg">★</span>
        </div>
        <div>
          <div className="text-sm font-bold text-white">Rainbow Star</div>
          <div className="text-xs text-zinc-500">Unity of all Naga tribes under one sky</div>
        </div>
      </div>
    </div>
  );
}
