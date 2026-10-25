'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Volume2, RefreshCw, Trash2, Shield, FileText, Camera, Check, HardDrive, ChevronRight } from 'lucide-react';
import { useApp } from '../AppContext';

export function AppearancePage() {
  const { settings, setSettings } = useApp();
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Appearance</h2>
      <p className="text-sm text-zinc-500">Theme: {settings.theme}</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setSettings({ theme: 'dark' as any })} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl py-3 text-white">Dark</button>
        <button onClick={() => setSettings({ theme: 'light' as any })} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl py-3 text-white">Light</button>
      </div>
    </div>
  );
}

export function VoiceSettingsPage() {
  const { settings, setSettings } = useApp();
  function speakTest() {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Hello test');
      u.lang = 'en-IN';
      u.rate = settings.voiceSpeed || 1;
      window.speechSynthesis.speak(u);
    } catch {}
  }
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Voice Settings</h2>
      <p className="text-sm text-zinc-500 mb-6">Configure speech for Dictionary audio</p>
      <div className="space-y-4">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="text-xs text-zinc-500 mb-2">Speed: {(settings.voiceSpeed || 1).toFixed(2)}x</div>
          <input type="range" min="0.5" max="1.5" step="0.05" value={settings.voiceSpeed || 1} onChange={(e) => setSettings({ voiceSpeed: parseFloat(e.target.value) })} className="w-full accent-red-600" />
        </div>
        <button onClick={speakTest} className="w-full bg-red-600 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2">
          <Volume2 className="w-4 h-4" /> Test Voice
        </button>
      </div>
    </div>
  );
}

export function MarketSettingsPage() {
  const { settings, setSettings } = useApp();
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Market Auto-Update</h2>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 flex items-center justify-between mt-4">
        <div className="text-sm text-white font-bold">Auto-Update</div>
        <button onClick={() => setSettings({ autoUpdateMarket: !settings.autoUpdateMarket })} className={`w-12 h-7 rounded-full ${settings.autoUpdateMarket ? 'bg-red-600' : 'bg-zinc-700'}`} />
      </div>
    </div>
  );
}

export function StoragePage() {
  const { storageUsed, clearCache } = useApp();
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Storage & Cache</h2>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-center mt-4">
        <HardDrive className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <div className="text-2xl font-black text-white">{storageUsed}</div>
      </div>
      <button onClick={() => clearCache()} className="w-full mt-4 bg-red-600 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2"><Trash2 className="w-4 h-4" /> Clear Cache</button>
    </div>
  );
}

export function PrivacyPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Privacy & Security</h2>
      <div className="space-y-2 mt-6">
        <button onClick={() => onNavigate?.('terms')} className="w-full flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-left"><FileText className="w-5 h-5 text-red-500" /><span className="text-sm text-white">Terms of Service</span><ChevronRight className="w-4 h-4 text-zinc-700 ml-auto" /></button>
        <button onClick={() => onNavigate?.('privacy-policy')} className="w-full flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-left"><Shield className="w-5 h-5 text-red-500" /><span className="text-sm text-white">Privacy Policy</span><ChevronRight className="w-4 h-4 text-zinc-700 ml-auto" /></button>
      </div>
    </div>
  );
}