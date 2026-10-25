'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Train, Plane, Car, Phone } from 'lucide-react';

type TransportTab = 'nst' | 'train' | 'flight' | 'taxi';

const NST_CONTACTS = [
  { district: 'Kohima', phone: '03862-222145', detail: 'NST Counter, Bus Stand' },
  { district: 'Dimapur', phone: '03862-224732', detail: 'City Bus Terminal' },
  { district: 'Mokokchung', phone: '03862-230984', detail: 'Town Bus Stand' },
  { district: 'Phek', phone: '03867-221456', detail: 'Phek Bus Stop' },
  { district: 'Wokha', phone: '03860-222431', detail: 'Wokha Bus Stand' },
  { district: 'Zunheboto', phone: '03862-223781', detail: 'Zunheboto Counter' },
  { district: 'Tuensang', phone: '03862-227632', detail: 'Tuensang Bus Stand' },
  { district: 'Mon', phone: '03862-227891', detail: 'Mon Bus Terminal' },
  { district: 'Peren', phone: '03866-223421', detail: 'Peren Bus Stop' },
];

const TAXI_DATA = [
  { route: 'Kohima → Dimapur', rate: '₹250/km', phone: '03862-229931', union: 'Kohima Taxi Union' },
  { route: 'Dimapur → Kohima', rate: '₹250/km', phone: '03862-229932', union: 'Dimapur Taxi Union' },
  { route: 'Mokokchung → Kohima', rate: '₹220/km', phone: '03862-230145', union: 'Mokokchung Taxi Union' },
  { route: 'Kohima → Phek', rate: '₹200/km', phone: '03867-221765', union: 'Phek Taxi Union' },
  { route: 'Dimapur → Wokha', rate: '₹230/km', phone: '03860-222387', union: 'Wokha Taxi Union' },
];

const TABS: { id: TransportTab; label: string; icon: typeof Bus }[] = [
  { id: 'nst', label: 'NST Bus', icon: Bus },
  { id: 'train', label: 'Train', icon: Train },
  { id: 'flight', label: 'Flight', icon: Plane },
  { id: 'taxi', label: 'Taxi', icon: Car },
];

export function TransportSection() {
  const [tab, setTab] = useState<TransportTab>('nst');

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-black text-white mb-1">Transportation</h2>
      <p className="text-sm text-zinc-500 mb-4">Contact numbers & travel info across Nagaland</p>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 mb-4 overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 rounded-lg py-2 px-2 text-xs font-semibold transition-colors whitespace-nowrap min-w-[70px] ${
                tab === t.id ? 'bg-red-600 text-white' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-2"
        >
          {/* NST */}
          {tab === 'nst' && (
            <>
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-2">
                <div className="text-sm font-bold text-white">Nagaland State Transport (NST)</div>
                <p className="text-[11px] text-zinc-500 mt-0.5">Inter-district bus services</p>
              </div>
              {NST_CONTACTS.map((c) => (
                <a
                  key={c.district}
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 active:scale-[0.98] transition-transform"
                >
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{c.district}</div>
                    <div className="text-[11px] text-zinc-500">{c.detail}</div>
                    <div className="text-sm text-red-500 font-semibold mt-0.5">{c.phone}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center text-green-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </>
          )}

          {/* Train */}
          {tab === 'train' && (
            <div className="space-y-3">
              <a
                href="tel:03862-223312"
                className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-500 shrink-0">
                  <Train className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Dimapur Railway Station</div>
                  <div className="text-[11px] text-zinc-500">The only railway station in Nagaland</div>
                  <div className="text-sm text-red-500 font-semibold mt-0.5">03862-223312</div>
                </div>
                <Phone className="w-5 h-5 text-green-500" />
              </a>
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
                <h3 className="text-sm font-bold text-white mb-2">Trains from Dimapur</h3>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex justify-between"><span>Rajdhani Express → Delhi</span><span className="text-zinc-500">Daily</span></div>
                  <div className="flex justify-between"><span>InterCity → Guwahati</span><span className="text-zinc-500">Daily</span></div>
                  <div className="flex justify-between"><span>Jan Shatabdi → Dibrugarh</span><span className="text-zinc-500">Mon-Sat</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Flight */}
          {tab === 'flight' && (
            <div className="space-y-3">
              <a
                href="tel:03862-223344"
                className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-600/30 flex items-center justify-center text-sky-500 shrink-0">
                  <Plane className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Dimapur Airport (DMR)</div>
                  <div className="text-[11px] text-zinc-500">3rd mile, Dimapur</div>
                  <div className="text-sm text-red-500 font-semibold mt-0.5">03862-223344</div>
                </div>
                <Phone className="w-5 h-5 text-green-500" />
              </a>
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
                <h3 className="text-sm font-bold text-white mb-2">Flight Routes</h3>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex justify-between"><span>IndiGo → Kolkata</span><span className="text-zinc-500">Daily</span></div>
                  <div className="flex justify-between"><span>Air India → Delhi</span><span className="text-zinc-500">Mon/Wed/Fri</span></div>
                  <div className="flex justify-between"><span>IndiGo → Imphal</span><span className="text-zinc-500">Daily</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Taxi */}
          {tab === 'taxi' && (
            <>
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-2">
                <div className="text-sm font-bold text-white">District Taxi Unions</div>
                <p className="text-[11px] text-zinc-500 mt-0.5">Per km rates & contact numbers</p>
              </div>
              {TAXI_DATA.map((t) => (
                <a
                  key={t.route}
                  href={`tel:${t.phone}`}
                  className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 p-3 active:scale-[0.98] transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-600/30 flex items-center justify-center text-amber-500 shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{t.route}</div>
                    <div className="text-[11px] text-zinc-500">{t.union}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-green-500 font-semibold">{t.rate}</span>
                      <span className="text-xs text-red-500">{t.phone}</span>
                    </div>
                  </div>
                  <Phone className="w-5 h-5 text-green-500 shrink-0" />
                </a>
              ))}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
