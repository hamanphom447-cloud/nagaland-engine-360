'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  district: string;
  tribe: string;
  age: string;
  gender: string;
  occupation: string;
  bio: string;
  verified: boolean;
  followers: number;
  following: number;
  totalEarning: number;
  walletBalance: number;
  joinedAt: string;
}

export interface UserData {
  name: string;
  village: string;
  district: string;
  phone: string;
}

export interface FavoriteItem {
  id: string;
  type: 'dictionary' | 'market' | 'recipe';
  title: string;
  subtitle: string;
  emoji?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  category: 'market' | 'news' | 'system';
}

export interface CustomListing {
  id: string;
  name: string;
  price: number;
  unit: string;
  village: string;
  emoji: string;
}

export interface HomeCardConfig {
  id: string;
  label: string;
  desc: string;
  visible: boolean;
  order: number;
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'auto';
  accent: 'red' | 'black';
  voiceSpeed: number;
  voiceAccent: 'nagamese' | 'hindi' | 'english' | 'nagamizo';
  autoUpdateMarket: boolean;
  marketInterval: number;
  customLogo: string | null;
}

export interface AppState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateEarning: (amount: number) => void;
  isFirstTime: boolean;
  userData: UserData;
  setUserData: (d: UserData) => void;
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;
  customListings: CustomListing[];
  addListing: (l: CustomListing) => void;
  removeListing: (id: string) => void;
  homeCards: HomeCardConfig[];
  setHomeCards: (c: HomeCardConfig[]) => void;
  toggleCardVisible: (id: string) => void;
  moveCard: (id: string, dir: 'up' | 'down') => void;
  settings: AppSettings;
  setSettings: (s: Partial<AppSettings>) => void;
  pageHistory: string[];
  addToHistory: (page: string) => void;
  clearHistory: () => void;
  cartItems: string[];
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
  downloadedItems: string[];
  toggleDownload: (item: string) => void;
  isDownloaded: (item: string) => boolean;
  storageUsed: string;
  clearCache: () => void;
}

const DEFAULT_USER: UserData = {
  name: 'Naga Explorer',
  village: 'Kohima Village',
  district: 'Kohima',
  phone: '',
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'King Chili price up 8%', detail: '₹1,296/kg at Sechu Zubza', time: '2m ago', read: false, category: 'market' },
  { id: 'n2', title: 'New: Dimapur Airport expansion', detail: 'Centre approves phase 2', time: '1h ago', read: false, category: 'news' },
  { id: 'n3', title: 'Mithun Meat price stable', detail: '₹450/kg at Phek Bazaar', time: '3h ago', read: true, category: 'market' },
  { id: 'n4', title: 'Welcome to NE360 v2.0!', detail: 'Explore 12 features of Nagaland', time: '1d ago', read: true, category: 'system' },
];

const DEFAULT_HOME_CARDS: HomeCardConfig[] = [
  { id: 'history', label: 'Full History', desc: 'Timeline & Tribes', visible: true, order: 0 },
  { id: 'map', label: 'Nagaland Map', desc: '16 Districts', visible: true, order: 1 },
  { id: 'flag', label: 'Naga Flag', desc: 'Cultural symbol', visible: true, order: 2 },
  { id: 'scanner', label: 'Photo Scanner', desc: 'AI Identify', visible: true, order: 3 },
  { id: 'dictionary', label: 'Dictionary', desc: 'Nagamese + more', visible: true, order: 4 },
  { id: 'market', label: 'Market Price', desc: 'Live rates', visible: true, order: 5 },
  { id: 'news', label: 'News', desc: 'Local & World', visible: true, order: 6 },
  { id: 'recipes', label: 'Recipes', desc: 'Naga cuisine', visible: true, order: 7 },
  { id: 'transport', label: 'Transport', desc: 'NST, Train, Taxi', visible: true, order: 8 },
  { id: 'emergency', label: 'Emergency', desc: 'SOS & Helplines', visible: true, order: 9 },
  { id: 'geography', label: 'Geography', desc: 'Land & Nature', visible: true, order: 10 },
  { id: 'about', label: 'About', desc: 'App info', visible: true, order: 11 },
];

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  accent: 'red',
  voiceSpeed: 0.85,
  voiceAccent: 'nagamese',
  autoUpdateMarket: true,
  marketInterval: 30,
  customLogo: null,
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);
  const [customListings, setCustomListings] = useState<CustomListing[]>([]);
  const [homeCards, setHomeCards] = useState<HomeCardConfig[]>(DEFAULT_HOME_CARDS);
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [pageHistory, setPageHistory] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [downloadedItems, setDownloadedItems] = useState<string[]>(['Smoked Pork with Bamboo Shoot']);

  const login = useCallback((u: User) => {
    setUser(u);
    setIsFirstTime(false);
    try {
      localStorage.setItem('ne360-user', JSON.stringify(u));
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsFirstTime(true);
    try {
      localStorage.removeItem('ne360-user');
    } catch {
      // ignore
    }
  }, []);

  const updateEarning = useCallback((amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        walletBalance: prev.walletBalance + amount,
        totalEarning: amount > 0 ? prev.totalEarning + amount : prev.totalEarning,
      };
      try {
        localStorage.setItem('ne360-user', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const setSettings = useCallback((s: Partial<AppSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...s }));
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      return exists ? prev.filter((f) => f.id !== item.id) : [...prev, item];
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addListing = useCallback((l: CustomListing) => {
    setCustomListings((prev) => [...prev, l]);
  }, []);

  const removeListing = useCallback((id: string) => {
    setCustomListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const toggleCardVisible = useCallback((id: string) => {
    setHomeCards((prev) => prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)));
  }, []);

  const moveCard = useCallback((id: string, dir: 'up' | 'down') => {
    setHomeCards((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((c) => c.id === id);
      if (idx < 0) return prev;
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= sorted.length) return prev;
      const tmpOrder = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmpOrder;
      return [...sorted];
    });
  }, []);

  const addToHistory = useCallback((page: string) => {
    setPageHistory((prev) => {
      const filtered = prev.filter((p) => p !== page);
      return [page, ...filtered].slice(0, 20);
    });
  }, []);

  const clearHistory = useCallback(() => setPageHistory([]), []);

  const addToCart = useCallback((item: string) => {
    setCartItems((prev) => (prev.includes(item) ? prev : [...prev, item]));
  }, []);

  const removeFromCart = useCallback((item: string) => {
    setCartItems((prev) => prev.filter((i) => i !== item));
  }, []);

  const toggleDownload = useCallback((item: string) => {
    setDownloadedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  }, []);

  const isDownloaded = useCallback((item: string) => downloadedItems.includes(item), [downloadedItems]);

  const storageUsed = `${(favorites.length * 0.2 + customListings.length * 0.5 + downloadedItems.length * 1.2 + 2.4).toFixed(1)} MB`;

  const clearCache = useCallback(() => {
    setFavorites([]);
    setPageHistory([]);
    setCartItems([]);
    setDownloadedItems([]);
  }, []);

  // Load user and app state from localStorage on mount
  useEffect(() => {
    try {
      const userRaw = localStorage.getItem('ne360-user');
      if (userRaw) {
        const parsedUser: User = JSON.parse(userRaw);
        setUser(parsedUser);
        setIsFirstTime(false);
      } else {
        setIsFirstTime(true);
      }

      const saved = localStorage.getItem('ne360_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userData) setUserData(parsed.userData);
        if (parsed.favorites) setFavorites(parsed.favorites);
        if (parsed.customListings) setCustomListings(parsed.customListings);
        if (parsed.homeCards) setHomeCards(parsed.homeCards);
        if (parsed.settings) setSettingsState({ ...DEFAULT_SETTINGS, ...parsed.settings });
        if (parsed.downloadedItems) setDownloadedItems(parsed.downloadedItems);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ne360_state', JSON.stringify({
        userData, favorites, customListings, homeCards, settings, downloadedItems,
      }));
    } catch {
      // ignore
    }
  }, [userData, favorites, customListings, homeCards, settings, downloadedItems]);

  const value: AppState = {
    user, login, logout, updateEarning, isFirstTime,
    userData, setUserData,
    favorites, toggleFavorite, isFavorite,
    notifications, markNotificationRead, markAllNotificationsRead, unreadCount,
    customListings, addListing, removeListing,
    homeCards, setHomeCards, toggleCardVisible, moveCard,
    settings, setSettings,
    pageHistory, addToHistory, clearHistory,
    cartItems, addToCart, removeFromCart,
    downloadedItems, toggleDownload, isDownloaded,
    storageUsed, clearCache,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export const DISTRICTS = [
  'Kohima', 'Dimapur', 'Mokokchung', 'Phek', 'Wokha', 'Zunheboto',
  'Tuensang', 'Mon', 'Peren', 'Kiphire', 'Longleng', 'Noklak',
  'Shamator', 'Niuland', 'Chumoukedima', 'Tseminyu',
];

export const TRIBES = [
  'Ao', 'Angami', 'Sumi', 'Lotha', 'Konyak', 'Chakhesang', 'Zeme', 'Rengma',
  'Phom', 'Chang', 'Sangtam', 'Pochury', 'Yimkhiung', 'Khiamniungan', 'Tikhir', 'Kuki',
];
