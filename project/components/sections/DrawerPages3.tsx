'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2, ShoppingCart, History as HistoryIcon, Download, Share2, TrendingUp, Newspaper, Info } from 'lucide-react';
import { useApp } from '../AppContext';

export function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useApp();

  const iconMap = {
    market: { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-600/20 border-green-600/30' },
    news: { icon: Newspaper, color: 'text-sky-500', bg: 'bg-sky-600/20 border-sky-600/30' },
    system: { icon: Info, color: 'text-red-500', bg: 'bg-red-600/20 border-red-600/30' },
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-black text-white">Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-800 rounded-lg px-2.5 py-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>
      <p className="text-sm text-zinc-500 mb-4">{unreadCount} unread of {notifications.length} total</p>

      <div className="space-y-2">
        {notifications.map((n) => {
          const cfg = iconMap[n.category];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={n.id}
              layout
              className={`rounded-xl border p-3 flex items-start gap-3 ${
                n.read ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-900 border-red-600/30'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-bold text-white">{n.title}</div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{n.detail}</div>
                <div className="text-[10px] text-zinc-600 mt-1">{n.time}</div>
              </div>
              {!n.read && (
                <button
                  onClick={() => markNotificationRead(n.id)}
                  className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-green-500"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function CartPage() {
  const { cartItems, removeFromCart } = useApp();

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Cart / Wishlist</h2>
      <p className="text-sm text-zinc-500 mb-4">{cartItems.length} items in your cart</p>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
            <ShoppingCart className="w-7 h-7 text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-500">Cart is empty</p>
          <p className="text-xs text-zinc-600 mt-1">Add items from Market or Recipes</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-black border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="flex-1 text-sm text-white">{item}</span>
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function HistoryPage() {
  const { pageHistory, clearHistory } = useApp();

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-black text-white">History</h2>
        {pageHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-800 rounded-lg px-2.5 py-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>
      <p className="text-sm text-zinc-500 mb-4">Recently viewed pages</p>

      {pageHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
            <HistoryIcon className="w-7 h-7 text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-500">No history yet</p>
          <p className="text-xs text-zinc-600 mt-1">Pages you visit will appear here</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {pageHistory.map((page, i) => (
            <div key={i} className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-black border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-red-500 shrink-0">
                {i + 1}
              </div>
              <span className="flex-1 text-sm text-white capitalize">{page}</span>
              <span className="text-[10px] text-zinc-600">viewed</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DownloadsPage() {
  const { downloadedItems, toggleDownload, isDownloaded } = useApp();
  const availableItems = [
    'Smoked Pork with Bamboo Shoot',
    'Axone (Fermented Soybean)',
    'Anishi (Taro Leaf Curry)',
    'Galho (Rice & Meat Stew)',
    'Nagamese Dictionary Pack',
    'Nagaland Map Offline',
  ];

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Downloads</h2>
      <p className="text-sm text-zinc-500 mb-4">Save items for offline access</p>

      <div className="space-y-2">
        {availableItems.map((item) => {
          const downloaded = isDownloaded(item);
          return (
            <div key={item} className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                downloaded ? 'bg-green-600/20 border-green-600/30 text-green-500' : 'bg-black border-zinc-800 text-zinc-600'
              }`}>
                <Download className="w-4 h-4" />
              </div>
              <span className="flex-1 text-sm text-white">{item}</span>
              <button
                onClick={() => toggleDownload(item)}
                className={`text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors ${
                  downloaded
                    ? 'bg-zinc-800 text-zinc-400'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {downloaded ? 'Remove' : 'Download'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ShareEarnPage() {
  const referralCode = 'NE360-NAGA-EXPLORER';

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Nagaland Engine 360',
        text: 'Check out Nagaland Engine 360 - 360° View of Nagaland!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard?.writeText(referralCode);
    }
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Share & Earn</h2>
      <p className="text-sm text-zinc-500 mb-6">Share Nagaland Engine 360 with friends</p>

      <div className="bg-gradient-to-br from-red-950/40 to-zinc-900 rounded-2xl border border-red-600/30 p-6 text-center mb-4">
        <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center mx-auto mb-3">
          <Share2 className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-white">Refer & Earn</h3>
        <p className="text-xs text-zinc-500 mt-1">Share your code and earn rewards</p>
        <div className="mt-4 bg-black rounded-xl border border-zinc-800 py-3 px-4">
          <div className="text-[10px] text-zinc-600 uppercase tracking-wide mb-1">Your Referral Code</div>
          <div className="text-sm font-mono font-bold text-red-500 select-all">{referralCode}</div>
        </div>
        <button
          onClick={handleShare}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 text-sm font-bold transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share Now
        </button>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <h3 className="text-sm font-bold text-white mb-2">How it works</h3>
        <div className="space-y-2 text-xs text-zinc-400">
          <div className="flex gap-2"><span className="text-red-500 font-bold">1.</span> Share the app with your friends</div>
          <div className="flex gap-2"><span className="text-red-500 font-bold">2.</span> They install using your code</div>
          <div className="flex gap-2"><span className="text-red-500 font-bold">3.</span> You both earn exclusive features</div>
        </div>
      </div>
    </div>
  );
}
