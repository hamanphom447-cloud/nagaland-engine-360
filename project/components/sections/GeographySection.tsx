'use client';

import { motion } from 'framer-motion';
import { Mountain, Droplets, Trees, Bird, Ruler, Compass } from 'lucide-react';

const FACTS = [
  { label: 'Total Area', value: '16,579 km²', icon: Ruler, detail: 'Roughly the size of East Timor' },
  { label: 'Statehood', value: 'Dec 1, 1963', icon: Compass, detail: '16th state of India' },
  { label: 'Highest Peak', value: 'Mt. Saramati 3,841m', icon: Mountain, detail: 'On Nagaland-Myanmar border' },
  { label: 'Forest Cover', value: '73.9%', icon: Trees, detail: 'One of the greenest states' },
];

const BORDERS = [
  { name: 'Myanmar', dir: 'East', color: 'border-amber-600/40 text-amber-500' },
  { name: 'Arunachal Pradesh', dir: 'North', color: 'border-blue-600/40 text-blue-500' },
  { name: 'Assam', dir: 'West & North', color: 'border-green-600/40 text-green-500' },
  { name: 'Manipur', dir: 'South', color: 'border-purple-600/40 text-purple-500' },
];

const RIVERS = [
  { name: 'Doyang', detail: 'Longest river in Nagaland, major hydroelectric source' },
  { name: 'Dikhu', detail: 'Flows through Mokokchung & Tuensang districts' },
  { name: 'Tizu', detail: 'Flows eastward into Myanmar, important for Tuensang' },
  { name: 'Jhanji', detail: 'Tributary flowing through central Nagaland' },
];

const FAUNA = [
  { name: 'Mithun (Bos frontalis)', emoji: '🐂', desc: 'State animal, domesticated bovine' },
  { name: "Blyth's Tragopan", emoji: '🦃', desc: 'State bird, endangered pheasant' },
  { name: 'Hoolock Gibbon', emoji: '🦍', desc: 'Only ape species in India' },
  { name: 'Clouded Leopard', emoji: '🐆', desc: 'Elusive big cat of Naga hills' },
];

const CLIMATE = 'Sub-tropical monsoon. Heavy rainfall Jun-Sep (2000-2500mm). Winters cool (4-15°C), summers warm (20-30°C).';

export function GeographySection() {
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Geography</h2>
      <p className="text-sm text-zinc-500 mb-4">Land, rivers, climate & wildlife of Nagaland</p>

      {/* Key Facts */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {FACTS.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-3"
            >
              <Icon className="w-5 h-5 text-red-500 mb-2" />
              <div className="text-[10px] text-zinc-500 uppercase tracking-wide">{f.label}</div>
              <div className="text-sm font-bold text-white">{f.value}</div>
              <div className="text-[10px] text-zinc-600 mt-0.5">{f.detail}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Borders */}
      <h3 className="text-sm font-bold text-white mb-2">Borders</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {BORDERS.map((b) => (
          <div key={b.name} className={`bg-zinc-900 rounded-xl border ${b.color} p-3`}>
            <div className="text-[10px] text-zinc-500 uppercase">{b.dir}</div>
            <div className="text-sm font-bold text-white">{b.name}</div>
          </div>
        ))}
      </div>

      {/* Rivers */}
      <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
        <Droplets className="w-4 h-4 text-blue-500" /> Major Rivers
      </h3>
      <div className="space-y-2 mb-4">
        {RIVERS.map((r) => (
          <div key={r.name} className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-500 shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{r.name}</div>
              <div className="text-[11px] text-zinc-500">{r.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Climate */}
      <h3 className="text-sm font-bold text-white mb-2">Climate</h3>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-4">
        <p className="text-xs text-zinc-400 leading-relaxed">{CLIMATE}</p>
      </div>

      {/* Flora & Fauna */}
      <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
        <Bird className="w-4 h-4 text-green-500" /> Flora & Fauna
      </h3>
      <div className="space-y-2">
        {FAUNA.map((f) => (
          <div key={f.name} className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-xl shrink-0">
              {f.emoji}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{f.name}</div>
              <div className="text-[11px] text-zinc-500">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
