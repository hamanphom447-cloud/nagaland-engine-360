'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { AppProvider, useApp } from '@/components/AppContext';
import { Header, ALL_PAGES, type PageId } from '@/components/shared';
import { BottomNav } from '@/components/BottomNav';
import { Drawer, type DrawerPage } from '@/components/Drawer';
import { HomeSection } from '@/components/sections/HomeSection';
import { HistorySection } from '@/components/sections/HistorySection';
import { MapSection } from '@/components/sections/MapSection';
import { FlagSection } from '@/components/sections/FlagSection';
import { ScannerSection } from '@/components/sections/ScannerSection';
import { DictionarySection } from '@/components/sections/DictionarySection';
import { MarketSection } from '@/components/sections/MarketSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { RecipesSection } from '@/components/sections/RecipesSection';
import { TransportSection } from '@/components/sections/TransportSection';
import { EmergencySection } from '@/components/sections/EmergencySection';
import { GeographySection } from '@/components/sections/GeographySection';
import { MoreSection } from '@/components/sections/MoreSection';
import { EditProfilePage, FavoritesPage } from '@/components/sections/DrawerPages';
import { ListingsPage, EditHomePage, ChangeLogoPage, LanguagePage } from '@/components/sections/DrawerPages2';
import { NotificationsPage, CartPage, HistoryPage, DownloadsPage, ShareEarnPage } from '@/components/sections/DrawerPages3';
import { AppearancePage, VoiceSettingsPage, MarketSettingsPage, StoragePage, PrivacyPage } from '@/components/sections/DrawerPages4';
import { HelpPage, FeedbackPage, ContactPage, RatePage, AboutPage } from '@/components/sections/DrawerPages5';
import { PrivacyPolicyPage, TermsOfServicePage } from '@/components/sections/LegalPages';

type ActivePage = PageId | 'more' | DrawerPage | 'history-page';

function AppContent() {
  const [page, setPage] = useState<ActivePage>('home');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { unreadCount, addToHistory, homeCards } = useApp();
  const swipeZoneRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return ALL_PAGES.filter((p) => p.label.toLowerCase().includes(q));
  }, [search]);

  function navigate(p: ActivePage) {
    setPage(p);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const pageLabel = typeof p === 'string' ? p : 'home';
    addToHistory(pageLabel);
  }

  function navigateToMain(p: PageId | 'more') {
    navigate(p);
  }

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX;
    }
    function handleTouchMove(e: TouchEvent) {
      if (touchStartX.current !== null && !drawerOpen) {
        const delta = e.touches[0].clientX - touchStartX.current;
        if (touchStartX.current < 30 && delta > 60) {
          setDrawerOpen(true);
          touchStartX.current = null;
        }
      }
    }
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [drawerOpen]);

  function renderPage() {
    switch (page) {
      case 'home': return <HomeSection onNavigate={navigate as any} />;
      case 'history': return <HistorySection />;
      case 'map': return <MapSection />;
      case 'flag': return <FlagSection />;
      case 'scanner': return <ScannerSection />;
      case 'dictionary': return <DictionarySection />;
      case 'market': return <MarketSection />;
      case 'news': return <NewsSection />;
      case 'recipes': return <RecipesSection />;
      case 'transport': return <TransportSection />;
      case 'emergency': return <EmergencySection />;
      case 'geography': return <GeographySection />;
      case 'more': return <MoreSection onNavigate={navigate as any} />;
      case 'edit-profile': return <EditProfilePage />;
      case 'favorites': return <FavoritesPage />;
      case 'listings': return <ListingsPage />;
      case 'edit-home': return <EditHomePage />;
      case 'change-logo': return <ChangeLogoPage />;
      case 'language': return <LanguagePage />;
      case 'notifications': return <NotificationsPage />;
      case 'cart': return <CartPage />;
      case 'history-page': return <HistoryPage />;
      case 'downloads': return <DownloadsPage />;
      case 'share-earn': return <ShareEarnPage />;
      case 'appearance': return <AppearancePage />;
      case 'voice-settings': return <VoiceSettingsPage />;
      case 'market-settings': return <MarketSettingsPage />;
      case 'storage': return <StoragePage />;
      case 'privacy': return <PrivacyPage />;
      case 'help': return <HelpPage />;
      case 'feedback': return <FeedbackPage />;
      case 'contact': return <ContactPage />;
      case 'rate': return <RatePage />;
      case 'about': return <AboutPage />;
      case 'privacy-policy': return <PrivacyPolicyPage />;
      case 'terms': return <TermsOfServicePage />;
      default: return <HomeSection onNavigate={navigate as any} />;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onSearch={setSearch} onLogoClick={() => navigate('home')} onMenuClick={() => setDrawerOpen(true)} notifCount={unreadCount} />
      <main className="pb-20">{renderPage()}</main>
      <BottomNav active={page as any} onNavigate={navigateToMain} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={navigate as any} />
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}