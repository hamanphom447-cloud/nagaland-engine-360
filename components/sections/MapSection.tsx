'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface District {
  name: string;
  hq: string;
  population: string;
  area: string;
  known: string;
  // approximate SVG x, y positions relative to viewBox 0 0 400 300
  x: number;
  y: number;
  r: number;
}

const DISTRICTS: District[] = [
  { name: 'Kohima', hq: 'Kohima', population: '107,000', area: '1,463 km²', known: 'State capital, Hornbill Festival', x: 175, y: 170, r: 12 },
  { name: 'Dimapur', hq: 'Dimapur', population: '170,000', area: '927 km²', known: 'Commercial hub, Airport & Railway', x: 110, y: 110, r: 14 },
  { name: 'Mokokchung', hq: 'Mokokchung', population: '70,000', area: '1,615 km²', known: 'Ao tribe, educational center', x: 220, y: 90, r: 11 },
  { name: 'Phek', hq: 'Phek', population: '57,000', area: '2,026 km²', known: 'Chakhesang tribe, Shilloi Lake', x: 220, y: 200, r: 11 },
  { name: 'Wokha', hq: 'Wokha', population: '64,000', area: '1,628 km²', known: 'Lotha tribe, Doyang river', x: 150, y: 120, r: 10 },
  { name: 'Zunheboto', hq: 'Zunheboto', population: '42,000', area: '1,255 km²', known: 'Sumi tribe, Satoi range', x: 230, y: 120, r: 10 },
  { name: 'Tuensang', hq: 'Tuensang', population: '51,000', area: '2,842 km²', known: 'Chang tribe, easternmost region', x: 280, y: 110, r: 12 },
  { name: 'Mon', hq: 'Mon', population: '61,000', area: '3,250 km²', known: 'Konyak tribe, former headhunters', x: 290, y: 60, r: 13 },
  { name: 'Peren', hq: 'Peren', population: '30,000', area: '1,662 km²', known: 'Zeliang tribe, Ntangki Park', x: 100, y: 170, r: 10 },
  { name: 'Kiphire', hq: 'Kiphire', population: '39,000', area: '1,242 km²', known: 'Mt. Saramati, Sangtam & Yimchunger', x: 270, y: 170, r: 10 },
  { name: 'Longleng', hq: 'Longleng', population: '24,000', area: '885 km²', known: 'Phom tribe, smallest district', x: 260, y: 80, r: 8 },
  { name: 'Noklak', hq: 'Noklak', population: '17,000', area: '1,152 km²', known: 'Khiamniungan tribe, newest', x: 310, y: 90, r: 8 },
  { name: 'Shamator', hq: 'Shamator', population: '12,000', area: '456 km²', known: 'Yimchunger tribe, newest district', x: 305, y: 130, r: 7 },
  { name: 'Niuland', hq: 'Niuland', population: '28,000', area: '284 km²', known: 'New district, Dimapur region', x: 90, y: 130, r: 8 },
  { name: 'Chumoukedima', hq: 'Chumoukedima', population: '45,000', area: '294 km²', known: 'New district, Dimapur outskirts', x: 90, y: 90, r: 8 },
  { name: 'Tseminyu', hq: 'Tseminyu', population: '32,000', area: '1,435 km²', known: 'Rengma tribe, newest district', x: 130, y: 150, r: 9 },
];

export function MapSection() {
  const [selected, setSelected] = useState<District | null>(null);

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Nagaland Map</h2>
      <p className="text-sm text-zinc-500 mb-4">16 Districts · Borders Myanmar, Arunachal, Assam & Manipur</p>

      {/* SVG Map */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-3 mb-4">
        <svg viewBox="0 0 400 300" className="w-full h-auto" style={{ touchAction: 'manipulation' }}>
          {/* Nagaland outline (approximate) */}
          <path
            d="M 70 70 Q 90 50 120 55 L 160 45 Q 200 35 240 40 L 290 30 Q 320 35 335 60 L 340 100 Q 345 140 330 170 L 320 210 Q 300 240 270 250 L 230 260 Q 190 265 160 255 L 120 240 Q 90 220 75 190 L 65 150 Q 60 110 70 70 Z"
            fill="rgba(220, 38, 38, 0.08)"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Myanmar border line */}
          <line x1="335" y1="60" x2="330" y2="170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.6" />
          <text x="340" y="120" fill="#f59e0b" fontSize="8" opacity="0.7">Myanmar</text>
          {/* Assam label */}
          <text x="60" y="100" fill="#6b7280" fontSize="8">Assam</text>
          {/* Manipur label */}
          <text x="190" y="270" fill="#6b7280" fontSize="8">Manipur</text>

          {/* District dots */}
          {DISTRICTS.map((d) => (
            <g key={d.name} onClick={() => setSelected(d)} className="cursor-pointer">
              <circle
                cx={d.x}
                cy={d.y}
                r={selected?.name === d.name ? d.r + 3 : d.r}
                fill={selected?.name === d.name ? '#dc2626' : 'rgba(220, 38, 38, 0.4)'}
                stroke="#dc2626"
                strokeWidth="1.5"
                className="transition-all"
              />
              <text
                x={d.x}
                y={d.y - d.r - 3}
                textAnchor="middle"
                fill={selected?.name === d.name ? '#fff' : '#a1a1aa'}
                fontSize="7"
                fontWeight={selected?.name === d.name ? 'bold' : 'normal'}
              >
                {d.name}
              </text>
            </g>
          ))}
        </svg>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600/40 border border-red-600" /> District
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0 border-t-2 border-dashed border-amber-500" /> Myanmar Border
          </span>
        </div>
      </div>

      {/* District info */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 rounded-2xl border border-red-600/40 p-4 mb-4"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-black text-white">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-zinc-500 text-xs">Close</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">HQ</div>
                <div className="text-sm text-white">{selected.hq}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Population</div>
                <div className="text-sm text-white">{selected.population}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Area</div>
                <div className="text-sm text-white">{selected.area}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Known For</div>
                <div className="text-sm text-white">{selected.known}</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 text-center">
            <p className="text-sm text-zinc-500">Tap a district on the map to see details</p>
          </div>
        )}
      </AnimatePresence>

      {/* District list */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {DISTRICTS.map((d) => (
          <button
            key={d.name}
            onClick={() => setSelected(d)}
            className={`text-left px-3 py-2 rounded-xl border text-sm transition-colors ${
              selected?.name === d.name
                ? 'bg-red-600/20 border-red-600/50 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}
