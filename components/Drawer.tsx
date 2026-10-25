'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import {
  X, ChevronRight, Heart, ShoppingBag, Bell, History as HistoryIcon, Download,
  Share2, Settings, HelpCircle, Bug, Mail, Star, Info, LogOut, Instagram,
  Youtube, Pencil, Grid3x3, Image, Languages, Palette, Volume2, RefreshCw,
  Trash2, Shield, FileText, Camera, Home,
} from 'lucide-react';
import { useApp } from './AppContext';

export type DrawerPage =
  | 'edit-profile'
  | 'favorites'
  | 'listings'
  | 'edit-home'
  | 'change-logo'
  | 'language'
  | 'notifications'
  | 'cart'
  | 'history'
  | 'downloads'
  | 'share-earn'
  | 'appearance'
  | 'voice-settings'
  | 'market-settings'
  | 'storage'
  | 'privacy'
  | 'privacy-policy'
  | 'terms'
  | 'help'
  | 'feedback'
  | 'contact'
  | 'rate'
  | 'about';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: DrawerPage) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
      {children}
    </div>
  );
}

function DrawerItem({
  icon: Icon,
  label,
  onClick,
  badge,
  rightLabel,
  danger,
}: {
  icon: typeof X;
  label: string;
  onClick: () => void;
  badge?: number;
  rightLabel?: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-900 active:bg-zinc-800 transition-colors text-left group"
    >
      <Icon className={`w-[18px] h-[18px] shrink-0 ${danger ? 'text-red-500' : 'text-zinc-400 group-hover:text-red-500'} transition-colors`} />
      <span className={`flex-1 text-sm ${danger ? 'text-red-500' : 'text-zinc-200'}`}>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="text-[10px] font-bold bg-red-600 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {badge}
        </span>
      )}
      {rightLabel && <span className="text-[11px] text-zinc-600">{rightLabel}</span>}
      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500" />
    </button>
  );
}

export function Drawer({ open, onClose, onNavigate }: DrawerProps) {
  const { userData, favorites, notifications, unreadCount, cartItems, pageHistory, downloadedItems, settings } = useApp();
  const dragControlsRef = useRef<HTMLDivElement>(null);

  // Swipe from left edge to open is handled by parent; here we handle swipe-to-close
  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) onClose();
  }

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const logoSrc = settings.customLogo || '/logo.png';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer panel */}
          <motion.div
            ref={dragControlsRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.4, right: 0 }}
            onDragEnd={handleDragEnd}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-black border-r border-zinc-800 z-[61] flex flex-col overflow-hidden"
          >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {/* Header / Profile section */}
              <div className="relative pb-3">
                <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-transparent" />
                <div className="relative px-4 pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full border-2 border-red-600 overflow-hidden bg-zinc-900">
                          <img src={logoSrc} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={() => onNavigate('edit-profile')}
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center border-2 border-black"
                        >
                          <Pencil className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{userData.name}</div>
                        <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {userData.village}, {userData.district}
                        </div>
                      </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-900/80 rounded-lg py-1.5 text-center border border-zinc-800">
                      <div className="text-sm font-black text-white">12</div>
                      <div className="text-[8px] text-zinc-500 uppercase">Features</div>
                    </div>
                    <div className="flex-1 bg-zinc-900/80 rounded-lg py-1.5 text-center border border-zinc-800">
                      <div className="text-sm font-black text-white">16</div>
                      <div className="text-[8px] text-zinc-500 uppercase">Districts</div>
                    </div>
                    <div className="flex-1 bg-zinc-900/80 rounded-lg py-1.5 text-center border border-zinc-800">
                      <div className="text-sm font-black text-white">v2.0</div>
                      <div className="text-[8px] text-zinc-500 uppercase">Version</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-800 mx-4" />

              {/* Section: Edit App / Customize */}
              <SectionTitle>Edit App / Customize</SectionTitle>
              <DrawerItem icon={Heart} label="My Favorites" onClick={() => onNavigate('favorites')} badge={favorites.length} />
              <DrawerItem icon={ShoppingBag} label="My Listings" onClick={() => onNavigate('listings')} rightLabel="Market" />
              <DrawerItem icon={Grid3x3} label="Edit Home Layout" onClick={() => onNavigate('edit-home')} />
              <DrawerItem icon={Image} label="Change Logo" onClick={() => onNavigate('change-logo')} />
              <DrawerItem icon={Languages} label="Language" onClick={() => onNavigate('language')} rightLabel="English" />

              {/* Section: Main App Tools */}
              <SectionTitle>Main App Tools</SectionTitle>
              <DrawerItem icon={Bell} label="Notifications" onClick={() => onNavigate('notifications')} badge={unreadCount} />
              <DrawerItem icon={ShoppingBag} label="Cart / Wishlist" onClick={() => onNavigate('cart')} badge={cartItems.length} />
              <DrawerItem icon={HistoryIcon} label="History" onClick={() => onNavigate('history')} rightLabel={`${pageHistory.length} pages`} />
              <DrawerItem icon={Download} label="Downloads" onClick={() => onNavigate('downloads')} rightLabel={`${downloadedItems.length} items`} />
              <DrawerItem icon={Share2} label="Share & Earn" onClick={() => onNavigate('share-earn')} />

              {/* Section: Settings */}
              <SectionTitle>Settings</SectionTitle>
              <DrawerItem icon={Palette} label="Appearance" onClick={() => onNavigate('appearance')} rightLabel={settings.theme} />
              <DrawerItem icon={Volume2} label="Voice Settings" onClick={() => onNavigate('voice-settings')} />
              <DrawerItem icon={RefreshCw} label="Auto-Update Market" onClick={() => onNavigate('market-settings')} rightLabel={settings.autoUpdateMarket ? 'ON' : 'OFF'} />
              <DrawerItem icon={Trash2} label="Clear Cache" onClick={() => onNavigate('storage')} rightLabel="Storage" />
              <DrawerItem icon={Shield} label="Privacy & Security" onClick={() => onNavigate('privacy')} />

              {/* Section: Support */}
              <SectionTitle>Support</SectionTitle>
              <DrawerItem icon={HelpCircle} label="Help Center" onClick={() => onNavigate('help')} />
              <DrawerItem icon={Bug} label="Feedback / Report Bug" onClick={() => onNavigate('feedback')} />
              <DrawerItem icon={Mail} label="Contact Us" onClick={() => onNavigate('contact')} />
              <DrawerItem icon={Star} label="Rate App" onClick={() => onNavigate('rate')} />
              <DrawerItem icon={Info} label="About" onClick={() => onNavigate('about')} />

              {/* Divider */}
              <div className="h-px bg-zinc-800 mx-4 mt-3" />

              {/* Action Footer */}
              <div className="px-4 py-3">
                <button
                  onClick={() => onNavigate('edit-profile')}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 text-sm text-zinc-400 hover:text-white hover:border-red-600/40 transition-colors mb-3"
                >
                  <LogOut className="w-4 h-4" />
                  Switch Village
                </button>

                {/* Social icons */}
                <div className="flex items-center justify-center gap-3">
                  <button onClick={() => onNavigate('share-earn')} className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/40 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-pink-500 hover:border-pink-600/40 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/40 transition-colors">
                    <Youtube className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mt-3 text-[9px] text-zinc-700">
                  NAGALAND ENGINE 360 v2.0 · Made with care
                </div>
              </div>
            </div>

            {/* Drag indicator */}
            <div className="shrink-0 flex items-center justify-center py-2 border-t border-zinc-800 bg-black">
              <div className="flex items-center gap-1.5 text-zinc-700">
                <Home className="w-3 h-3" />
                <span className="text-[10px]">Swipe left to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
