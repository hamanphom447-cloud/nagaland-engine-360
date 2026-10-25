'use client';

import { Home, Map, BookOpen, TrendingUp, Grid3x3 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PageId } from './shared';

const TABS: { id: PageId | 'more'; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'dictionary', label: 'Dictionary', icon: BookOpen },
  { id: 'market', label: 'Market', icon: TrendingUp },
  { id: 'more', label: 'More', icon: Grid3x3 },
];

export function BottomNav({
  active,
  onNavigate,
}: {
  active: PageId;
  onNavigate: (page: PageId | 'more') => void;
}) {
  // Determine which tab is highlighted
  const activeTab =
    active === 'home' || active === 'map' || active === 'dictionary' || active === 'market'
      ? active
      : 'more';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-red-900/40">
      <div className="flex items-center justify-around px-2 py-1.5 max-w-lg mx-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-600/15 rounded-xl border border-red-600/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 relative z-10 ${isActive ? 'text-red-500' : 'text-zinc-500'}`}
              />
              <span
                className={`text-[10px] relative z-10 ${isActive ? 'text-red-500 font-semibold' : 'text-zinc-500'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
