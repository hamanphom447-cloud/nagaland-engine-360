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
  Info,
  Gamepad2,
} from 'lucide-react';
import type { PageId } from '../shared';
import { useApp } from '../AppContext';

const CARD_ICONS: Record<string, { icon: typeof HomeIcon; color: string }> = {
  history: { icon: ScrollText, color: 'text-amber-500' },
  map: { icon: MapPin, color: 'text-blue-500' },
  flag: { icon: Flag, color: 'text-cyan-500' },
  scanner: { icon: ScanLine, color: 'text-purple-500' },
  dictionary: { icon: Languages, color: 'text-green-500' },
  market: { icon: TrendingUp, color: 'text-emerald-500' },
  news: { icon: Newspaper, color: 'text-sky-500' },
  recipes: { icon: UtensilsCrossed, color: 'text-orange-500' },
  transport: { icon: Bus, color: 'text-indigo-500' },
  emergency: { icon: Siren, color: 'text-red-500' },
  geography: { icon: Mountain, color: 'text-teal-500' },
  'anime-adventure': { icon: Gamepad2, color: 'text-pink-500' },
  about: { icon: Info, color: 'text-zinc-400' },
};

export function HomeSection({ onNavigate }: { onNavigate: (p: PageId | 'about') => void }) {
  const { settings, homeCards } = useApp();
  const logoSrc = settings.customLogo || '/logo.png';

  const visibleCards = [...homeCards]
    .filter((c) => c.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <motion.div
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center relative mb-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-2xl border border-red-600/30"
            style={{
              background:
                'conic-gradient(from 0deg, transparent, rgba(220,38,38,0.2), transparent, rgba(220,38,38,0.2), transparent)',
            }}
          />
          <motion.img
            src={logoSrc}
            alt="Nagaland Engine 360"
            className="w-20 h-20 rounded-2xl shadow-2xl shadow-red-900/40 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          NAGALAND ENGINE <span className="text-red-600">360</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">360° View of Nagaland · v2.0</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/20 text-red-500 border border-red-600/30">
            {visibleCards.length} Features
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            16 Districts
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            16 Tribes
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {visibleCards.map((card, i) => {
          const cfg = CARD_ICONS[card.id] || CARD_ICONS.about;
          const Icon = cfg.icon;
          const navId = card.id === 'about' ? 'home' : (card.id as PageId);
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(navId)}
              className="group bg-zinc-900 rounded-2xl border border-zinc-800 p-4 flex flex-col items-start gap-2 text-left hover:border-red-600/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-black flex items-center justify-center ${cfg.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">
                  {card.label}
                </div>
                <div className="text-[11px] text-zinc-500">{card.desc}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
