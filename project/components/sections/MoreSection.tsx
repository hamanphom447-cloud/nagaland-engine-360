'use client';

import { motion } from 'framer-motion';
import {
  ScrollText,
  MapPin,
  Flag,
  ScanLine,
  Languages,
  TrendingUp,
  Newspaper,
  UtensilsCrossed,
  Bus,
  Siren,
  Mountain,
  Home as HomeIcon,
} from 'lucide-react';
import type { PageId } from '../shared';

const ALL: { id: PageId; label: string; desc: string; icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home', desc: 'Dashboard & grid menu', icon: HomeIcon },
  { id: 'history', label: 'Full History', desc: 'Timeline & 16 tribes', icon: ScrollText },
  { id: 'map', label: 'Nagaland Map', desc: '16 districts interactive', icon: MapPin },
  { id: 'flag', label: 'Naga Flag', desc: 'Cultural flag & meanings', icon: Flag },
  { id: 'scanner', label: 'Photo Scanner', desc: 'AI identification', icon: ScanLine },
  { id: 'dictionary', label: 'Dictionary', desc: 'Nagamese + Hindi + English', icon: Languages },
  { id: 'market', label: 'Market Price', desc: 'Live village rates', icon: TrendingUp },
  { id: 'news', label: 'News', desc: 'Local & international', icon: Newspaper },
  { id: 'recipes', label: 'Recipes', desc: 'Traditional Naga cuisine', icon: UtensilsCrossed },
  { id: 'transport', label: 'Transport', desc: 'NST, Train, Flight, Taxi', icon: Bus },
  { id: 'emergency', label: 'Emergency', desc: 'SOS & helplines', icon: Siren },
  { id: 'geography', label: 'Geography', desc: 'Land, rivers & wildlife', icon: Mountain },
];

export function MoreSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">All Features</h2>
      <p className="text-sm text-zinc-500 mb-4">All 12 sections of Nagaland Engine 360</p>

      <div className="space-y-2">
        {ALL.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 hover:border-red-600/40 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-red-500 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{item.label}</div>
                <div className="text-[11px] text-zinc-500">{item.desc}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-center">
        <p className="text-xs text-zinc-500">NAGALAND ENGINE 360 v2.0</p>
        <p className="text-[10px] text-zinc-600 mt-1">360° View of Nagaland · Built with Next.js</p>
      </div>
    </div>
  );
}
