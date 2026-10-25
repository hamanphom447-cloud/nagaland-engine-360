import { Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from './AppContext';

export type PageId =
  | 'home'
  | 'history'
  | 'map'
  | 'flag'
  | 'scanner'
  | 'dictionary'
  | 'market'
  | 'news'
  | 'recipes'
  | 'transport'
  | 'emergency'
  | 'geography'
  | 'social';

export const ALL_PAGES: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'history', label: 'Full History' },
  { id: 'map', label: 'Nagaland Map' },
  { id: 'flag', label: 'Naga Flag' },
  { id: 'scanner', label: 'Photo Scanner' },
  { id: 'dictionary', label: 'Dictionary' },
  { id: 'market', label: 'Market Price' },
  { id: 'news', label: 'News' },
  { id: 'recipes', label: 'Recipes' },
  { id: 'transport', label: 'Transport' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'geography', label: 'Geography' },
  { id: 'social', label: 'Social & Earn' },
];

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { settings } = useApp();
  const logoSrc = settings.customLogo || '/logo.png';
  const dims = {
    sm: { img: 'w-10 h-10', ring: 'w-12 h-12' },
    md: { img: 'w-14 h-14', ring: 'w-16 h-16' },
    lg: { img: 'w-24 h-24', ring: 'w-28 h-28' },
  };
  const d = dims[size];

  return (
    <motion.div
      animate={{ rotate: [0, 4, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`relative ${d.ring} flex items-center justify-center`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-2xl border border-red-600/30"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(220,38,38,0.15), transparent, rgba(220,38,38,0.15), transparent)',
        }}
      />
      <motion.img
        src={logoSrc}
        alt="Nagaland Engine 360"
        className={`${d.img} relative z-10 rounded-xl shadow-lg shadow-red-900/30`}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
}

export function Header({
  onSearch,
  onLogoClick,
  onMenuClick,
  notifCount,
}: {
  onSearch: (q: string) => void;
  onLogoClick: () => void;
  onMenuClick: () => void;
  notifCount?: number;
}) {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/40">
      <div className="flex items-center justify-between px-3 py-2.5 gap-2">
        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors shrink-0 relative"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo + title */}
        <button onClick={onLogoClick} className="flex items-center gap-2 shrink-0">
          <Logo size="sm" />
          <div className="text-left hidden sm:block">
            <div className="text-sm font-black text-white tracking-tight">
              NAGALAND ENGINE <span className="text-red-600">360</span>
            </div>
            <div className="text-[9px] text-zinc-500 -mt-0.5">v2.0 · 360° View of Nagaland</div>
          </div>
          <div className="text-left sm:hidden">
            <div className="text-xs font-black text-white tracking-tight leading-none">
              NE<span className="text-red-600">360</span>
            </div>
          </div>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-[180px] sm:max-w-xs">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
